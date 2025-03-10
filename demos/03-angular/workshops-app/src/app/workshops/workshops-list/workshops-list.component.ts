import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { WorkshopsService } from '../workshops.service';
import IWorkshop from '../models/IWorkshop';
import { LoadingSpinnerComponent } from '../../common/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../../common/error-alert/error-alert.component';
import { PaginationComponent } from '../../common/pagination/pagination.component';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-workshops-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    ItemComponent,
    PaginationComponent,
  ],
  templateUrl: './workshops-list.component.html',
  styleUrl: './workshops-list.component.scss',
})
export class WorkshopsListComponent implements OnInit {
  workshops!: IWorkshop[];
  loading = true;
  error: Error | null = null;
  page = 1;

  filterKey = 'Angular';
  filteredWorkshops!: IWorkshop[];

  constructor(
    private w: WorkshopsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  getWorkshops() {
    this.loading = true;

    this.w.getWorkshops(this.page).subscribe({
      next: (workshops) => {
        this.workshops = workshops;
        this.filteredWorkshops = workshops;
        this.loading = false;
        console.log(workshops);
      },
      error: (error) => {
        this.error = error;
        this.loading = false;
        console.log(error);
      },
    });
  }

  filterWorkshops() {
    this.filteredWorkshops = this.workshops.filter((w) =>
      w.name.toLowerCase().includes(this.filterKey.toLowerCase())
    );
  }

  filterByCategory(category: string) {
    this.w.getWorkshops(this.page, category).subscribe({
      next: (workshops) => {
        this.workshops = workshops;
        // A better alternative: If you make `this.workshops` and `this.filterKey` as signals, you can compute `this.filteredWorkshops` automatically when either `this.workshops` changes or `this.filterKey` changes
        this.filterWorkshops();
      },
    });
  }

  ngOnInit() {
    // this.getWorkshops();
    this.activatedRoute.queryParamMap.subscribe({
      next: (queryParams) => {
        const queryStr = queryParams.get('page');

        // when the page loads for the first time, there is no `page` query string parameter -> so we set page to 1. Later on there is some `page` value
        if (queryStr === null) {
          this.page = 1;
        } else {
          this.page = +queryStr; // convert `page` from string type to number
        }

        this.getWorkshops(); // page has changed -> get fresh data
      },
    });
  }

  trackById(index: number, item: IWorkshop) {
    // console.log(index);
    return item.id;
  }

  nextPage() {
    this.page++;
  }

  changePage(newPage: number) {
    this.page = newPage;

    // set the query string in the route
    this.router.navigate(['/workshops'], {
      queryParams: {
        page: this.page,
      },
    });
  }

  deleteWorkshop(workshop: IWorkshop) {
    console.log(workshop);
  }
}
