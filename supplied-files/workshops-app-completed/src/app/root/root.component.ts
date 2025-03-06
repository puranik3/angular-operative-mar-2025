// https://stackblitz.com/run?file=src%2Fapp%2Fdropdown-navbar.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {
  animate,
  query,
  style,
  trigger,
  transition,
} from '@angular/animations';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from '../menu/menu.component';
import { ToastContainerComponent } from 'app/common/toast/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, NgbAlert, ToastContainerComponent],
  templateUrl: './root.component.html',
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Fade out the old page
        // query(
        //   ':leave',
        //   [
        //     style({ opacity: 1 }),
        //     animate('0ms ease-out', style({ opacity: 0 })),
        //   ],
        //   { optional: true }
        // ),
        // Fade in the new page
        query(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('300ms ease-in', style({ opacity: 1 })),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class RootComponent {
  title = 'workshops-app';
  isOpen = true;

  getRouteAnimationState(outlet: RouterOutlet): string {
    return (
      outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animation']
    );
  }
}
