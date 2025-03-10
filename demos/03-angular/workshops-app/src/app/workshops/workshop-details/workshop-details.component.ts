import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
// this gives the individual icons we want to use
import {
  faCheckCircle,
  faTimesCircle,
} from '@fortawesome/free-regular-svg-icons';

import { LocationPipe } from '../../common/location.pipe';
import { WorkshopsService } from '../workshops.service';
import { LoadingSpinnerComponent } from '../../common/loading-spinner/loading-spinner.component';
import { ErrorAlertComponent } from '../../common/error-alert/error-alert.component';
import IWorkshop from '../models/IWorkshop';

@Component({
  selector: 'app-workshop-details',
  standalone: true,
  imports: [
    DatePipe,
    LocationPipe,
    LoadingSpinnerComponent,
    ErrorAlertComponent,
    FontAwesomeModule,
  ],
  templateUrl: './workshop-details.component.html',
  styleUrl: './workshop-details.component.scss',
})
export class WorkshopDetailsComponent implements OnInit {
  loading = true;
  error: Error | null = null;
  workshop!: IWorkshop;
  workshopId!: number;

  icons = {
    // The below is just ES2015+ short for faCheckCircle: faCheckCircle,
    faCheckCircle,
    faTimesCircle,
  };

  constructor(
    private workshopsService: WorkshopsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.loading = true;

    this.activatedRoute.paramMap.subscribe({
      next: (params) => {
        const idStr = params.get('id');
        this.workshopId = +(idStr as string);

        // alert(this.workshopId);

        this.workshopsService.getWorkshopById(this.workshopId).subscribe({
          next: (workshop) => {
            this.workshop = workshop;
            this.loading = false;
          },
          error: (error) => {
            this.error = error;
            this.loading = false;
          },
        });
      },
    });
  }
}
