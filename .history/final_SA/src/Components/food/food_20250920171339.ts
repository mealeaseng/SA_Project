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
  product_item = [
    {
      img: 'https://webassets.meowwolf.com/cdn.prod/5daf07de1a61d008bdf579d8/60368a3dd74b5d4fadcd4091_RhkaUa-ZTSfJj0Rv5rRJP9wbPnQ-htAow9ZhXqTihsYNv3wu8qMMUuWejYXjyBFf_sVwfV4inStfS-A84qvs6WsgOwOuj2EC4zyi0mFHGih9PoCgni4ijSK_0_IYUWb7xH0XtaEy.jpeg',
      name: 'Product 1',
      price: 25,
      description: 'A beautiful piece of artwork from Meow Wolf.',
    },
    {
      img: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
      name: 'Product 2',
      price: 15,
      description: 'Default placeholder product with no image.',
    },
    {
      img: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
      name: 'Product 3',
      price: 12,
      description: 'Another simple placeholder product.',
    },
  ];

  cart: any[] = [];

  constructor() {
    // ✅ Load cart from localStorage on init
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  addToCart(product: any): void {
    const existingItem = this.cart.find((item) => item.name === product.name);
    if (existingItem) {
      existingItem.qty++;
    } else {
      this.cart.push({ ...product, qty: 1 });
    }
    this.saveCart();
  }

  getCartQty(product: any): number {
    const item = this.cart.find((i) => i.name === product.name);
    return item ? item.qty : 0;
  }

  trackProduct(index: number, product: any): string {
    return product.name; // unique key for ngFor
  }

  // ✅ Save cart to localStorage
  private saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}
