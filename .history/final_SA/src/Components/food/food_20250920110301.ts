import { Component } from '@angular/core';

@Component({
  selector: 'app-food',
  imports: [],
  templateUrl: './food.html',
  styleUrl: './food.css',
})
export class Food {
  product_item = [{ img: '', name: 'product' }, { name: 'asdf' }];
}
