import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-fruit',
  imports: [NgFor, CurrencyPipe, RouterLink],
  templateUrl: './fruit.html',
  styleUrl: './fruit.css',
})
export class Fruit {
  product_fruits = [
    {
      img: 'https://webassets.meowwolf.com/cdn.prod/5daf07de1a61d008bdf579d8/60368a3dd74b5d4fadcd4091_RhkaUa-ZTSfJj0Rv5rRJP9wbPnQ-htAow9ZhXqTihsYNv3wu8qMMUuWejYXjyBFf_sVwfV4inStfS-A84qvs6WsgOwOuj2EC4zyi0mFHGih9PoCgni4ijSK_0_IYUWb7xH0XtaEy.jpeg',
      name: 'Fruit 1',
      price: 25,
      description: 'A beautiful piece of artwork from Meow Wolf.',
    },
    {
      img: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
      name: 'Fruit 2',
      price: 15,
      description: 'Default placeholder product with no image.',
    },
    {
      img: 'https://www.iprcenter.gov/image-repository/blank-profile-picture.png/@@images/image.png',
      name: 'Fruit 3',
      price: 12,
      description: 'Another simple placeholder product.',
    },
  ];

  // ✅ renamed cart -> cartSolftdrink
  cartFruit: any[] = [];

  constructor() {
    // ✅ Load from localStorage
    const storedCart = localStorage.getItem('cartFruit');
    if (storedCart) {
      this.cartFruit = JSON.parse(storedCart);
    }
  }

  addToCart(product: any) {
    const found = this.cartFruit.find((item) => item.name === product.name);
    if (found) {
      found.qty += 1;
    } else {
      this.cartFruit.push({ ...product, qty: 1 });
    }
    this.saveCart();
  }

  getCartQty(product: any): number {
    const found = this.cartFruit.find((item) => item.name === product.name);
    return found ? found.qty : 0;
  }

  trackProduct(index: number, product: any) {
    return product.name;
  }

  // ✅ Save cart to localStorage
  saveCart() {
    localStorage.setItem('cartFruit', JSON.stringify(this.cartFruit));
  }
}
