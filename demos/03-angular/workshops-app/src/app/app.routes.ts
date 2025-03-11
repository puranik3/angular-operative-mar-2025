import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    title: 'Workshops App',
  },
  {
    path: 'home',
    redirectTo: '',
    // pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login to Workshops App',
  },
  {
    path: '**',
    component: PageNotFoundComponent,
    title: 'Page Not Found | Workshops App',
  },
];
