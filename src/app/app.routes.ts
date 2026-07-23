import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Favoritos } from './pages/favoritos/favoritos';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'favoritos',
    component: Favoritos
  }
];