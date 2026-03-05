import { Component } from '@angular/core';

@Component({
  selector: 'app-typefruit',
  imports: [],
  templateUrl: './typefruit.html',
  styleUrl: './typefruit.css',
})
export class Typefruit {
  constructor() {
    const storedCart = localStorage.getItem('cartSolftdrink');
    if (storedCart) {
      this.cartSolftdrink = JSON.parse(storedCart);
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
      this.cartSolftdrink = this.cartSolftdrink.filter((p) => p !== item);
    }
    this.saveCart();
  }

  removeFromCart(index: number): void {
    this.cartSolftdrink.splice(index, 1);
    this.saveCart();
  }

  clearCart(): void {
    this.cartSolftdrink = [];
    localStorage.removeItem('cartSolftdrink');
  }

  getTotal(): number {
    return this.cartSolftdrink.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  private saveCart(): void {
    localStorage.setItem('cartSolftdrink', JSON.stringify(this.cartSolftdrink));
  }
}
