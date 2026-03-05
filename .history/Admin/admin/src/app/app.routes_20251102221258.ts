import { Routes } from '@angular/router';
import { Home } from '../Components/home/home/home';
import { Product } from '../Components/product/product';
import { Hommepage } from '../Components/hommepage/hommepage';
import { AddProduct } from '../Components/add-product/add-product';

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
      {
        path: 'postProduct',
        component: AddProduct,
      },
    ],
  },
];
