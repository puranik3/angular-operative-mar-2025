import { Component } from '@angular/core';
import { WorkshopsService } from '../workshops.service';
import IWorkshop from '../models/IWorkshop';

@Component({
  selector: 'app-workshops-list',
  standalone: true,
  imports: [],
  templateUrl: './workshops-list.component.html',
  styleUrl: './workshops-list.component.scss',
})
export class WorkshopsListComponent {
  workshops!: IWorkshop[];
  constructor(private w: WorkshopsService) {}

  ngOnInit() {
    this.workshops = this.w.getWorkshops();
    console.log(this.workshops);
  }
}
