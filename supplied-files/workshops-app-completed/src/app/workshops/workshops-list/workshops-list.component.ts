import {
  Component,
  // inject,
  OnInit,
  // Signal,
  // WritableSignal,
  inject,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, style, trigger, transition } from '@angular/animations';
import { NgbModal, NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { ItemComponent } from './item/item.component';
import { LoadingComponent } from 'app/common/loading/loading.component';
import { PaginationComponent } from 'app/common/pagination/pagination.component';

import { WorskhopsService } from '../worskhops.service';
import { ToastService } from 'app/common/toast/toast.service';
import { useFilterableData } from 'app/signals/filter.signal';

import IWorkshop from '../models/IWorkshop';
import { FavoritesService } from '../favorites.service';

@Component({
  selector: 'app-workshops-list',
  standalone: true,
  imports: [ItemComponent, NgbAlert, LoadingComponent, PaginationComponent],
  templateUrl: './workshops-list.component.html',
  animations: [
    trigger('fadeSlideOut', [
      transition(':leave', [
        animate(
          '300ms ease-out',
          style({
            opacity: 0,
            transform: 'scale(0.9)',
          })
        ),
      ]),
    ]),
  ],
})
export class WorkshopsListComponent implements OnInit {
  // Use either inject() or ctor injection
  // router = inject(Router);

  loading = true;
  error: Error | null = null;
  page = 1;
  isOpen = true;

  // workshops: WritableSignal<IWorkshop[]>;
  // filterKey: WritableSignal<string>;
  // filteredWorkshops: Signal<IWorkshop[]>;

  filterable: ReturnType<typeof useFilterableData<IWorkshop>>;

  favorites: IWorkshop[] = [];

  // Use @ViewChild to get a reference to the ng-template
  @ViewChild('deleteConfirmationModal')
  deleteConfirmationModalRef!: TemplateRef<any>;

  private modalService = inject(NgbModal);

  getWorkshops() {
    this.loading = true;

    // https://rxjs.dev/deprecations/subscribe-arguments
    this.workshopsService.getWorkshops(this.page).subscribe({
      next: (fetchedWorkshops) => {
        this.filterable.array.set(fetchedWorkshops);
        this.loading = false;
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
      },
    });
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private workshopsService: WorskhopsService,
    private favoritesService: FavoritesService,
    private toastService: ToastService
  ) {
    // const { array, filterKey, filteredArray } = useFilterableData<IWorkshop>();

    // this.workshops = array;
    // this.filterKey = filterKey;
    // this.filteredWorkshops = filteredArray;

    this.filterable = useFilterableData<IWorkshop>();

    this.activatedRoute.queryParamMap.subscribe({
      next: (queryParamMap) => {
        const pageStr = queryParamMap.get('page');

        if (pageStr) {
          this.page = +pageStr;
          this.getWorkshops();
        }
      },
    });

    this.favoritesService.favorites$.subscribe({
      next: (favorites) => {
        this.favorites = favorites;
      },
    });
  }

  ngOnInit(): void {
    this.getWorkshops();
  }

  onPageChange(page: number) {
    this.router.navigate(['/workshops'], {
      queryParams: {
        page: page,
      },
    });
  }

  onFilter(event: Event) {
    this.filterable.filterKey.set((event?.target as HTMLInputElement).value);
  }

  open(content: TemplateRef<any>, workshop: IWorkshop) {
    this.modalService
      .open(content, { ariaLabelledBy: 'delete-confirmation-modal' })
      .result.then((result) => {
        if (result === 'ok') {
          this.deleteWorkshop(workshop);
        }
      });
  }

  confirmAndDeleteWorkshop(workshop: IWorkshop) {
    this.open(this.deleteConfirmationModalRef, workshop);
  }

  deleteWorkshop(workshop: IWorkshop) {
    this.workshopsService.deleteWorkshopById(workshop.id).subscribe({
      next: () => {
        this.filterable.array.set(
          this.filterable.array().filter((w) => w.id !== workshop.id)
        );

        this.toastService.show({
          templateOrMessage: `Workshop - "${workshop.name}" has been deleted`,
          classname: 'bg-success text-light',
          delay: 2000,
        });
      },
      error: (error) => {
        this.toastService.show({
          templateOrMessage: `Workshop - "${workshop.name}" could not be deleted. ${error.message}.`,
          classname: 'bg-danger text-light',
          delay: 2000,
        });
      },
    });
  }
}
