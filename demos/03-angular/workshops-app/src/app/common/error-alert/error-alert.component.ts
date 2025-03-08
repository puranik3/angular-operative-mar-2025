import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-error-alert',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './error-alert.component.html',
  styleUrl: './error-alert.component.scss',
})
export class ErrorAlertComponent implements OnChanges {
  @Input()
  error: Error | null = null;

  @Input()
  page = 1;

  // called first time after the constructor is called, before ngOnInit is called
  // it receives the input attributes passed by the parent as an object
  // Later ngOnChanges can get called  multiple times whenever parent passes new values for input
  ngOnChanges(simpleChanges: SimpleChanges) {
    console.log(simpleChanges);
  }
}
