import { Component, inject } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../app/common/auth/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [NgbModule, RouterLink, RouterLinkActive],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  isNavbarCollapsed = true;

  // Add this - this will change whenever user logs in / logs out - this is done by subscribing to the observable in ngOnInit()
  isLoggedIn = false;

  authenticationService = inject(AuthService);
  router = inject(Router);

  ngOnInit(): void {
    // Add this - subscribe to the observable to be notified when user logs in / logs out
    // we subscribe to be notified of changes in login status
    this.authenticationService.loggedInStatus$.subscribe(
      (isLoggedIn) => (this.isLoggedIn = isLoggedIn)
    );
  }

  logout(event: Event) {
    event.preventDefault();

    this.authenticationService.logout();

    this.router.navigateByUrl('/');
  }
}
