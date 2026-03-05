import { Component } from '@angular/core';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [NgIf, NgFor, CurrencyPipe, RouterLink],
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
  showPayment = false;

  constructor() {
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

  increaseQty(item: any): void {
    item.qty++;
    this.saveCart();
  }

  decreaseQty(item: any): void {
    if (item.qty > 1) {
      item.qty--;
    } else {
      this.cart = this.cart.filter((p) => p !== item);
    }
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cart.splice(index, 1);
    this.saveCart();
  }

  clearCart(): void {
    this.cart = [];
    localStorage.removeItem('cart');
  }

  getTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  saveCart(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  getCartQty(product: any): number {
    const item = this.cart.find((p) => p.name === product.name);
    return item ? item.qty : 0;
  }

  trackProduct(index: number, product: any): number {
    return index;
  }

  // --- Payment Modal ---
  openPayment(): void {
    this.showPayment = true;
  }

  closePayment(): void {
    this.showPayment = false;
  }

  confirmPayment(): void {
    alert('✅ Payment Successful! Thank you for your order.');
    this.clearCart();
    this.closePayment();
  }
}
