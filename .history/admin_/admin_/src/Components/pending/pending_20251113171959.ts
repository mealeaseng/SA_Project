import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/order';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pending',
  imports: [NgFor],
  templateUrl: './pending.html',
})
export class Pending implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadPending();
  }

  loadPending() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error(err),
    });
  }

  confirm(id: string) {
    this.orderService.confirmOrder(id).subscribe(() => this.loadPending());
  }

  cancel(id: string) {
    this.orderService.cancelOrder(id).subscribe(() => this.loadPending());
  }
  remove(id: string) {
    if (confirm('Are you sure you want to remove this order?')) {
      this.orderService.deleteOrder(id).subscribe(() => {
        this.loadPending(); // refresh list
      });
    }
  }
}
