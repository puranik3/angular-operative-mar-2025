import { Component, OnInit } from '@angular/core';
import { WorkshopsService } from '../workshops.service';
import IWorkshop from '../models/IWorkshop';

@Component({
  selector: 'app-workshops-list',
  standalone: true,
  imports: [],
  templateUrl: './workshops-list.component.html',
  styleUrl: './workshops-list.component.scss',
})
export class WorkshopsListComponent implements OnInit {
  workshops!: IWorkshop[];
  loading = true;
  error: Error | null = null;

  constructor(private w: WorkshopsService) {}

  ngOnInit() {
    this.w.getWorkshops().subscribe({
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
    // console.log(this.workshops);
  }
}
