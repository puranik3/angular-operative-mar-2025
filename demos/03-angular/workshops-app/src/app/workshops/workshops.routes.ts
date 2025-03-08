import { Routes } from '@angular/router';

import { WorkshopsListComponent } from './workshops-list/workshops-list.component';
import { AddWorkshopComponent } from './add-workshop/add-workshop.component';
import { FavoritesComponent } from './favorites/favorites.component';

export const routes: Routes = [
  {
    path: 'workshops',
    component: WorkshopsListComponent,
    title: 'List of workshops',
  },
  {
    path: 'workshops/add',
    component: AddWorkshopComponent,
    title: 'Add a workshop',
  },
  {
    path: 'workshops/favorites',
    component: FavoritesComponent,
    title: 'Favorite workshops',
  },
];

// export {
//     routes
// }
