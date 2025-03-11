import { Routes } from '@angular/router';

import { WorkshopsListComponent } from './workshops-list/workshops-list.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { WorkshopDetailsComponent } from './workshop-details/workshop-details.component';
import { SessionsListComponent } from './workshop-details/sessions-list/sessions-list.component';
import { AddSessionComponent } from './workshop-details/add-session/add-session.component';
import { authGuard } from '../common/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'workshops',
    component: WorkshopsListComponent,
    title: 'List of workshops',
    canActivate: [authGuard],
  },
  {
    path: 'workshops/add',
    component: AddWorkshopComponent,
    title: 'Add a workshop',
    canActivate: [authGuard],
  },
  {
    path: 'workshops/favorites',
    component: FavoritesComponent,
    title: 'Favorite workshops',
    canActivate: [authGuard],
  },
  {
    path: 'workshops/:id',
    component: WorkshopDetailsComponent,
    title: 'Workshop Details',
    canActivate: [authGuard],
    children: [
      {
        path: '', // same as parent route as nothing is to be added to that route
        component: SessionsListComponent,
      },
      {
        path: 'add-session',
        component: AddSessionComponent,
      },
    ],
  },
];

// export {
//     routes
// }
