import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-typeother',
  imports: [CurrencyPipe, NgIf, NgFor, RouterLink],
  templateUrl: './typeother.html',
  styleUrl: './typeother.css',
})
export class Typeother {
  cartOther: any[] = [];

  constructor() {
    const storedCart = localStorage.getItem('cartOther');
    if (storedCart) {
      this.cartOther = JSON.parse(storedCart);
    }
  }

  paymetn() {
    alert('💳 Payment started!');
  }

  increaseQty(item: any): void {
    item.qty++;
    this.saveCart();
  }

  decreaseQty(item: any): void {
    if (item.qty > 1) {
      item.qty--;
    } else {
      this.cartOther = this.cartOther.filter((p) => p !== item);
    }
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cartOther.splice(index, 1);
    this.saveCart();
  }

  clearCart(): void {
    this.cartOther = [];
    localStorage.removeItem('cartOther');
  }

  getTotal(): number {
    return this.cartOther.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  private saveCart(): void {
    localStorage.setItem('cartOther', JSON.stringify(this.cartOther));
  }
}
