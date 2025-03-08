import { Component } from '@angular/core';
// import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from './menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true, // not part of any module (since Angular 17)
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    NgbAlertModule, // alert component
    // CommonModule, // *ngIf directive - not needed if using @if(){}
    MenuComponent,
  ],
})
export class AppComponent {
  title = 'Workshops App';
  isOpen = true;

  changeTitle() {
    this.title = 'Workshops Application';
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
