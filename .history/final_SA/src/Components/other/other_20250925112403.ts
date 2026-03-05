import { CurrencyPipe, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-other',
  imports: [CurrencyPipe, NgFor, RouterLink],
  templateUrl: './other.html',
  styleUrl: './other.css',
})
export class Other {
  product_others = [
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

  // ✅ renamed cart -> cartSolftdrink
  cartOther: any[] = [];

  constructor() {
    // ✅ Load from localStorage
    const storedCart = localStorage.getItem('cartOther');
    if (storedCart) {
      this.cartOther = JSON.parse(storedCart);
    }
  }

  addToCart(product: any) {
    const found = this.cartOther.find((item) => item.name === product.name);
    if (found) {
      found.qty += 1;
    } else {
      this.cartOther.push({ ...product, qty: 1 });
    }
    this.saveCart();
  }

  getCartQty(product: any): number {
    const found = this.cartOther.find((item) => item.name === product.name);
    return found ? found.qty : 0;
  }

  trackProduct(index: number, product: any) {
    return product.name;
  }

  // ✅ Save cart to localStorage
  saveCart() {
    localStorage.setItem('cartOther', JSON.stringify(this.cartOther));
  }
}
