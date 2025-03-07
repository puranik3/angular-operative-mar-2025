import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkshopsService } from '../workshops.service';
import IWorkshop from '../models/IWorkshop';
import { LoadingSpinnerComponent } from '../../common/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../../common/error-alert/error-alert.component';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-workshops-list',
  standalone: true,
  imports: [
    CommonModule,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    ItemComponent,
  ],
  templateUrl: './workshops-list.component.html',
  styleUrl: './workshops-list.component.scss',
})
export class WorkshopsListComponent implements OnInit {
  workshops!: IWorkshop[];
  loading = true;
  error: Error | null = null;
  page = 1;

  constructor(private w: WorkshopsService) {}

  getWorkshops() {
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
    this.getWorkshops();
  }

  trackById(index: number, item: IWorkshop) {
    // console.log(index);
    return item.id;
  }

  nextPage() {
    this.page++;
  }

  changePage(by: number) {
    if (this.page + by <= 0) {
      return;
    }

    this.page = this.page + by;

    this.getWorkshops();
  }
}
