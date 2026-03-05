import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-solf-drink',
  imports: [CurrencyPipe, NgFor],
  templateUrl: './solf-drink.html',
  styleUrl: './solf-drink.css',
})
export class SolfDrink {
  product_solft_drinks = [];
}
