import { NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-food',
  imports: [NgIf],
  standalone: true,
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
  ];

  cart: any[] = [];

  constructor() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
    }
  }

  addToCart(product: any) {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  removeFromCart(index: number) {
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart() {
    this.cart = [];
    localStorage.removeItem('cart');
  }
}
