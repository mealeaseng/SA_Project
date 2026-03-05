import { Component } from '@angular/core';
import { NgFor, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [NgFor, CurrencyPipe, RouterLink],
  templateUrl: './food.html',
  styleUrls: ['./food.css'],
})
export class Food {
  products_foods = [
    {
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgv47RNBjf75kuRvrpNhq9PIPrUW21FVYsxA&s',
      name: 'Food 1',
      price: 25,
      description: 'A beautiful piece of artwork from Meow Wolf.',
    },
    {
      img: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
      name: 'Food 2',
      price: 15,
      description: 'Default placeholder product with no image.',
    },
    {
      img: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
      name: 'Food 3',
      price: 12,
      description: 'Another simple placeholder product.',
    },
  ];

  cartFood: any[] = [];

  constructor() {
    // ✅ Load cart from localStorage on init
    const savedCart = localStorage.getItem('cartFood');
    if (savedCart) {
      this.cartFood = JSON.parse(savedCart);
    }
  }

  addToCart(product: any): void {
    const existingItem = this.cartFood.find((item) => item.name === product.name);
    if (existingItem) {
      existingItem.qty++;
    } else {
      this.cartFood.push({ ...product, qty: 1 });
    }
    this.saveCart();
  }

  getCartQty(product: any): number {
    const item = this.cartFood.find((i) => i.name === product.name);
    return item ? item.qty : 0;
  }

  trackProduct(index: number, product: any): string {
    return product.name; // unique key for ngFor
  }

  // ✅ Save cart to localStorage
  private saveCart(): void {
    localStorage.setItem('cartFood', JSON.stringify(this.cartFood));
  }
}
