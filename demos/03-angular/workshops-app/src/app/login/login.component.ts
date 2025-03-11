import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastService } from '../../app/common/toast.service';
import { AuthService, ICredentials } from '../../app/common/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  credentials: ICredentials = {
    email: 'john.doe@example.com',
    password: 'Password123#',
  };

  loading = false;
  returnUrl!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    // reset login status
    // this.authenticationService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    this.authenticationService.login(this.credentials).subscribe({
      next: (data) => {
        this.router.navigate([this.returnUrl]);
        this.loading = false;
      },
      error: (error) => {
        this.toastService.add({
          message: error.message,
          className: 'bg-danger text-light',
          duration: 2000,
        });

        this.loading = false;
      },
    });
  }
}
