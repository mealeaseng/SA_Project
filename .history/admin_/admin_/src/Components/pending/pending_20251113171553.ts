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

  // 🔄 Load PENDING only (not all)
  loadPending() {
    this.orderService.getPending().subscribe({
      next: (data) => (this.orders = data),
      error: (err) => console.error(err),
    });
  }

  // ✅ Confirm Order With Alert
  confirm(id: string) {
    if (!confirm('Are you sure you want to CONFIRM this order?')) return;

    this.orderService.confirmOrder(id).subscribe({
      next: () => {
        alert('✅ Order confirmed!');
        this.loadPending();
      },
      error: (err) => console.error(err),
    });
  }

  // ❌ Cancel Order With Alert
  cancel(id: string) {
    if (!confirm('Are you sure you want to CANCEL this order?')) return;

    this.orderService.cancelOrder(id).subscribe({
      next: () => {
        alert('❌ Order cancelled!');
        this.loadPending();
      },
      error: (err) => console.error(err),
    });
  }

  // 🗑 Remove Order With Alert
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
