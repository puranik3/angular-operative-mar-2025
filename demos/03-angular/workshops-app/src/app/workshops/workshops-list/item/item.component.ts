import { Component, Input } from '@angular/core';
import IWorkshop from '../../models/IWorkshop';

@Component({
  selector: 'app-item',
  standalone: true,
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input()
  workshop!: IWorkshop;
}
