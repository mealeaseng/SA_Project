import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private cartItems: CartItem[] = [];
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    // Load cart from sessionStorage on service init
    const savedCart = sessionStorage.getItem('cart');
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    this.cartItemsSubject.next(this.cartItems);
  }

  private updateSessionStorage() {
    sessionStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(item: CartItem) {
    const index = this.cartItems.findIndex((ci) => ci.id === item.id);
    if (index > -1) {
      this.cartItems[index].quantity += item.quantity;
    } else {
      this.cartItems.push(item);
    }
    this.cartItemsSubject.next(this.cartItems);
    this.updateSessionStorage();
  }

  removeFromCart(id: string) {
    this.cartItems = this.cartItems.filter((item) => item.id !== id);
    this.cartItemsSubject.next(this.cartItems);
    this.updateSessionStorage();
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
    this.updateSessionStorage();
  }

  getCartItems() {
    return [...this.cartItems]; // return copy of array
  }
}
