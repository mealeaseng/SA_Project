import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-typefruit',
  imports: [CurrencyPipe, NgIf, NgFor],
  templateUrl: './typefruit.html',
  styleUrl: './typefruit.css',
})
export class Typefruit {
  cartFruit: any[] = [];
  constructor() {
    const storedCart = localStorage.getItem('cartFruit');
    if (storedCart) {
      this.cartFruit = JSON.parse(storedCart);
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
      this.cartFruit = this.cartFruit.filter((p) => p !== item);
    }
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cartFruit.splice(index, 1);
    this.saveCart();
  }

  clearCart(): void {
    this.cartFruit = [];
    localStorage.removeItem('cartFruit');
  }

  getTotal(): number {
    return this.cartFruit.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  private saveCart(): void {
    localStorage.setItem('cartFruit', JSON.stringify(this.cartFruit));
  }
}
