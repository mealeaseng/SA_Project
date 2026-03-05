import { Component, OnInit } from '@angular/core';
import { OrderService } from '../Services/order';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pending',
  standalone: true,
  imports: [NgFor],
  templateUrl: './pending.html',
})
export class Pending implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadPending();
  }

  // Load only orders with status = "Pending"
  loadPending() {
    this.orderService.getPending().subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error(err),
    });
  }

  // CONFIRM (do not delete — only update status)
  confirm(id: string) {
    if (!confirm('Are you sure you want to CONFIRM this order?')) return;

    this.orderService.confirmOrder(id).subscribe({
      next: () => {
        alert('✅ Order confirmed!');
        this.loadPending(); // removes from UI but NOT from DB
      },
      error: (err) => console.error(err),
    });
  }

  // CANCEL (do not delete — only update status)
  cancel(id: string) {
    if (!confirm('Are you sure you want to CANCEL this order?')) return;

    this.orderService.cancelOrder(id).subscribe({
      next: () => {
        alert('❌ Order cancelled!');
        this.loadPending(); // removes from UI but NOT from DB
      },
      error: (err) => console.error(err),
    });
  }

  // REMOVE = delete permanently
  remove(id: string) {
    if (!confirm('⚠️ Are you sure you want to REMOVE this order permanently?')) return;

    this.orderService.deleteOrder(id).subscribe({
      next: () => {
        alert('🗑 Order removed!');
        this.loadPending();
      },
      error: (err) => console.error(err),
    });
  }
}
