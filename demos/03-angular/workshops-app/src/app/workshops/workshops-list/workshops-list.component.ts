import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
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
}
