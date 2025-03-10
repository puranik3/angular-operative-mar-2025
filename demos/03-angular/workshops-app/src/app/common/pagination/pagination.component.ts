import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input()
  page: number = 1;

  @Output()
  pageChange = new EventEmitter<number>();

  changePage(by: number) {
    this.pageChange.emit(by);
  }
}
