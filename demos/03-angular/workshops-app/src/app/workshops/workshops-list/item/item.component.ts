import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import IWorkshop from '../../models/IWorkshop';
import { LocationPipe } from '../../../common/location.pipe';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [DatePipe, LocationPipe, RouterLink, FontAwesomeModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input()
  workshop!: IWorkshop;

  @Output()
  delete = new EventEmitter();

  icons = {
    faPencil,
    faTrash,
  };

  onDeleteWorkshop() {
    this.delete.emit()
  }
}
