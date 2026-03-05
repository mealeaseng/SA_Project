import { Routes } from '@angular/router';
import { Home } from '../Components/home/home/home';
import { Product } from '../Components/product/product';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: Home,
    children: [
      {
        path: 'home',
        component: Product,
      },
    ],
  },
];
