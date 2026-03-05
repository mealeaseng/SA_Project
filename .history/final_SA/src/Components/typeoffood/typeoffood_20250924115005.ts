import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-typeoffood',
  standalone: true, // ✅ important if you use it directly in other components
  imports: [NgFor, NgIf, CurrencyPipe],
  templateUrl: './typeoffood.html',
  styleUrl: './typeoffood.css',
})
export class Typeoffood {
  cartFood: any[] = [];

  constructor() {
    // ✅ Load saved cartFood from localStorage
    const savedCart = localStorage.getItem('cartFood');
    if (savedCart) {
      this.cartFood = JSON.parse(savedCart);
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
      this.cartFood = this.cartFood.filter((p) => p !== item);
    }
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cartFood.splice(index, 1);
    this.saveCart();
  }

  clearCart(): void {
    this.cartFood = [];
    localStorage.removeItem('cartFood');
    this.refreshParent();
  }

  getTotal(): number {
    return this.cartFood.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  private saveCart(): void {
    localStorage.setItem('cartFood', JSON.stringify(this.cartFood));
    this.refreshParent();
  }

  private refreshParent(): void {
    // 🔔 Let Payment (and other components) know localStorage changed
    window.dispatchEvent(new Event('storage'));
  }
}
