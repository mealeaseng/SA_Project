import { Component } from '@angular/core';

@Component({
  selector: 'app-pending',
  templateUrl: './pending.html',
  styleUrl: './pending.css', // can be empty
})
export class Pending {
  orders = [
    {
      id: 1,
      user: { name: 'Petar', email: 'petar@gmail.com' },
      product: { name: 'Blue Shirt', price: 25 },
    },
    {
      id: 2,
      user: { name: 'John Doe', email: 'john@gmail.com' },
      product: { name: 'Red Hoodie', price: 40 },
    },
  ];

  confirm(id: number) {
    alert('Order ' + id + ' confirmed!');
  }

  cancel(id: number) {
    alert('Order ' + id + ' cancelled!');
  }
}
