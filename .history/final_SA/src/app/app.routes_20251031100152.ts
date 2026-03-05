import { Routes } from '@angular/router';
import { Home } from '../Components/Home/home/home';
import { Cetecory } from '../Components/cetecory/cetecory';
import { About } from '../Components/Home/about/about';
import { Contact } from '../Components/Home/contact/contact';
import { Service } from '../Components/Home/service/service';
import { Login } from '../Components/Home/login/login';
import { Menu } from '../Components/Home/menu/menu';
import { Food } from '../Components/food/food';
import { SolfDrink } from '../Components/solf-drink/solf-drink';
import { Fruit } from '../Components/fruit/fruit';
import { Other } from '../Components/other/other';
import { Payment } from '../Components/payment/payment';
import { CategoryDetailt } from '../Components/category-detail/category-detail';
import { Setting } from '../Components/Home/setting/setting';
import { OldAcc } from '../Components/Home/old-acc/old-acc';

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
        component: Cetecory,
      },
      {
        path: 'about',
        component: About,
      },
      {
        path: 'service',
        component: Service,
      },
      {
        path: 'contact',
        component: Contact,
      },
      // {
      //   path: 'menu',
      //   component: Menu,
      // },
      {
        path: 'category/:id',
        component: CategoryDetailt,
      },
      {
        path: 'setting',
        component: Setting,
      },
      {
        path: 'food',
        component: Food,
      },
      {
        path: 'solf_drink',
        component: SolfDrink,
      },
      {
        path: 'fruit',
        component: Fruit,
      },
      {
        path: 'other',
        component: Other,
      },
      {
        path: 'payment',
        component: Payment,
      },
    ],
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'oldacc',
    component: OldAcc,
  },
];
