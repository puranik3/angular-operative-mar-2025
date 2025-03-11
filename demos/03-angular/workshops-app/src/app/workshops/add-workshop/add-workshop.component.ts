import { Component } from '@angular/core';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { WorkshopsService } from '../workshops.service';
import { ToastService } from '../../common/toast.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-workshop',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-workshop.component.html',
  styleUrl: './add-workshop.component.scss',
})
export class AddWorkshopComponent {
  addWorkshopForm: FormGroup;
  isEditing = false;
  id!: number;

  constructor(
    private fb: FormBuilder,
    private workshopsService: WorkshopsService,
    private toastService: ToastService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.addWorkshopForm = this.fb.group({
      name: ['', [Validators.required]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      time: ['', [Validators.required]],
      location: this.fb.group({
        address: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
      }),
      modes: this.fb.group({
        inPerson: this.fb.control(false),
        online: this.fb.control(false),
      }),
      imageUrl: ['', [Validators.required]],
    });

    const idStr = this.activatedRoute.snapshot.paramMap.get('id');

    if (idStr === null) {
      this.isEditing = false;
    } else {
      this.isEditing = true;
      this.id = +idStr;

      // @todo Fetch the details of the workshop being edited, and populate the form controls
      // Step 1: get the details of workshop with given id
      // Step 2: (inside next) once we get the details, we can use this.addWorkshopForm.patchValue()
      this.workshopsService.getWorkshopById(this.id).subscribe({
        next: (workshop) => {
          // if you use setValue, the value you pass (in this case `workshop`), should not have any extra / missing fields
          // to take care of difference in format of dates in the backend, and the date format of datepicker
          workshop.startDate = workshop.startDate.substring(0, 10);
          workshop.endDate = workshop.endDate.substring(0, 10);

          this.addWorkshopForm.patchValue(workshop);
        },
        error: () => {
          alert(
            `Something went wrong fetching workshop details. Please reload the page.`
          );
        },
      });
    }
  }

  addWorkshop() {
    if (this.isEditing) {
      this.workshopsService
        .putWorkshop(this.addWorkshopForm.value, this.id)
        .subscribe({
          next: (workshop) => {
            this.toastService.add({
              message: `Successfully updated workshop with id ${workshop.id}`,
              className: 'bg-success text-light',
              duration: 5000,
            });

            this.router.navigateByUrl('/workshops');
          },
          error: (error) => {
            this.toastService.add({
              message: `Could not edit workshop | ${error.message}`,
              className: 'bg-danger text-light',
              duration: 5000,
            });
          },
        });
    } else {
      this.workshopsService.postWorkshop(this.addWorkshopForm.value).subscribe({
        next: (workshop) => {
          this.toastService.add({
            message: `Successfully added workshop - ${workshop.name}`,
            className: 'bg-success text-light',
            duration: 5000,
          });

          this.router.navigateByUrl('/workshops');
        },
        error: (error) => {
          this.toastService.add({
            message: `Could not add workshop | ${error.message}`,
            className: 'bg-danger text-light',
            duration: 5000,
          });
        },
      });
    }
  }
}
