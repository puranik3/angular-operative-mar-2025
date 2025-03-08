import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

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
];
