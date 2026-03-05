import { Routes } from '@angular/router';
import { Home } from '../Components/home/home/home';
import { Product } from '../Components/product/product';
import { Hommepage } from '../Components/hommepage/hommepage';

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
        component: Hommepage,
      },
      {
        path: 'product',
        component: Product,
      },
    ],
  },
];
