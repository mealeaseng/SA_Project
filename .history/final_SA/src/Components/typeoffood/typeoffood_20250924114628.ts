import { Component } from '@angular/core';

@Component({
  selector: 'app-typeoffood',
  imports: [],
  templateUrl: './typeoffood.html',
  styleUrl: './typeoffood.css',
})
export class Typeoffood {
  cart: any[] = [];

  constructor() {
    // ✅ Load saved cart from localStorage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cart = JSON.parse(savedCart);
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
}
