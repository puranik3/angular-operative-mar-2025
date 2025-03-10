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

  @Input()
  loading: boolean = false;

  @Output()
  pageChange = new EventEmitter<number>();

  changePage(by: number) {
    if (this.page + by <= 0) {
      return;
    }

    // communicate the new page number to the parent
    this.pageChange.emit(this.page + by);
  }
}
