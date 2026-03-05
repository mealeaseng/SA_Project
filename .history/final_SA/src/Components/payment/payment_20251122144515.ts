import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CurrencyPipe, NgIf, NgFor],
  templateUrl: './payment.html',
  styleUrls: ['./payment.css'],
})
export class Payment implements OnInit {
  loggedIn = false;
  step = 0;
  choice = '';

  qrImage = '/aba.png';
  imgCheck = '/check.png';

  showQRCode = false;
  showCash = false;

  total_Products: any[] = [];
  totalQty = 0;
  totalPrice = 0;
  toalPrice_product = 0;
  totalPriceWithDiscount = 0;
  payment_method = '';

  orders: any[] = []; // ✅ needed for checking status

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.checkLogin();
    this.loadCart();
    this.loadMyOrders(); // load user orders

    window.addEventListener('storage', () => {
      this.checkLogin();
      this.loadCart();
    });
  }

  // ---------------------------------------------------
  // 🔥 Show alert to customer when admin confirms/cancels
  // ---------------------------------------------------
  loadMyOrders() {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    this.http.get(`http://localhost:3000/api/order/user/${userId}`).subscribe({
      next: (data: any) => {
        this.orders = data;
        this.checkStatusAlerts();
      },
      error: (err) => console.error(err),
    });
  }

  checkStatusAlerts() {
    if (!this.orders.length) return;

    const lastStatus = localStorage.getItem('lastOrderStatus');
    const latestOrder = this.orders[this.orders.length - 1];
    const currentStatus = latestOrder.status;

    if (currentStatus === lastStatus) return;

    if (currentStatus === 'confirmed') {
      alert('✅ Good news! Your order has been CONFIRMED!');
    } else if (currentStatus === 'cancelled') {
      alert('❌ Sorry! Your order has been CANCELLED.');
    }

    localStorage.setItem('lastOrderStatus', currentStatus);
  }

  // ---------------------------------------------------
  // CUSTOMER PAYMENT SYSTEM
  // ---------------------------------------------------

  checkLogin() {
    this.loggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  loadCart() {
    this.total_Products = JSON.parse(localStorage.getItem('cart') || '[]');

    // FIX: Make sure every product has qtyAdded
    this.total_Products = this.total_Products.map((p) => ({
      ...p,
      qtyAdded: p.qtyAdded && p.qtyAdded > 0 ? p.qtyAdded : 1,
    }));

    // Calculate quantity
    this.totalQty = this.total_Products.reduce((sum, item) => sum + item.qtyAdded, 0);

    // Calculate total price with discount
    this.totalPriceWithDiscount = this.total_Products.reduce((sum, p) => {
      const priceAfterDiscount = p.price * (1 - (p.discount || 0) / 100);
      return sum + priceAfterDiscount * p.qtyAdded;
    }, 0);

    // Save back to localStorage
    localStorage.setItem('cart', JSON.stringify(this.total_Products));
    localStorage.setItem('totalqty', JSON.stringify(this.totalQty));
    localStorage.setItem('totalpriceWithDiscount', JSON.stringify(this.totalPriceWithDiscount));
  }

  getTotalQty() {
    return this.totalQty;
  }

  getGrandTotal() {
    return this.totalPriceWithDiscount;
  }

  increase(product: any) {
    product.qtyAdded++;
    product.total = (product.price - (product.price * product.discount) / 100) * product.qtyAdded;
    this.updateCartItem(product);
  }

  decrease(product: any) {
    if (product.qtyAdded > 0) {
      product.qtyAdded--;
      product.total = (product.price - (product.price * product.discount) / 100) * product.qtyAdded;
      this.updateCartItem(product);
    }
  }

  updateCartItem(product: any) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const index = cart.findIndex((item: any) => item._id === product._id);

    if (index !== -1) {
      if (product.qtyAdded === 0) cart.splice(index, 1);
      else cart[index].qtyAdded = product.qtyAdded;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    this.loadCart();
  }

  payNow(): void {
    // Check if any product has stock = 0
    const outOfStock = this.total_Products.find((p) => p.stock <= 0);

    if (outOfStock) {
      alert(`🛑 ${outOfStock.name_product} is out of stock!`);
      return;
    }

    // if (this.getGrandTotal() === 0) {
    //   alert('🛑 Your cart is empty.');
    //   this.router.navigate(['/home']);
    //   return;
    // }

    if (!this.loggedIn) {
      alert('⚠️ Please login first.');
      this.router.navigate(['/login']);
      return;
    }

    this.step = 1;
  }

  cancelOrder() {
    if (confirm('Are you sure you want to cancel your order?')) {
      this.clearCart();
      alert('❌ Order canceled');
      location.reload();
    }
  }

  clearCart() {
    ['cartFood', 'cartSolftdrink', 'cartFruit', 'cartOther'].forEach((k) =>
      localStorage.removeItem(k)
    );
    ['totalqty', 'totalprice', 'toalPrice_product', 'totalpriceWithDiscount', 'cart'].forEach((k) =>
      localStorage.removeItem(k)
    );

    this.total_Products = [];
  }

  selectOption(option: string) {
    this.choice = option;
    this.step = 2;
  }

  submitOrder() {
    const order = {
      user_id: localStorage.getItem('userId'),
      customer_name: localStorage.getItem('user'),
      customer_phone: localStorage.getItem('phone_number'),
      customer_address: localStorage.getItem('address'),

      delivery_method: this.choice,
      payment_method: this.payment_method || 'Cash',

      products: this.total_Products.map((p) => ({
        product_id: p._id,
        name_product: p.name_product,
        img: p.img || 'no-img.jpg',
        price: p.price,
        qty: p.qtyAdded || 1,

        // FIX HERE
        discount: Math.min(Math.max(p.discount || 0, 0), 100),

        amount:
          p.price * (p.qtyAdded || 1) * (1 - Math.min(Math.max(p.discount || 0, 0), 100) / 100),
      })),
    };

    console.log('SENDING ORDER TO BACKEND:', order);

    return this.http.post('http://localhost:3000/api/order', order);
  }

  pay(method: string) {
    this.payment_method = method;
    this.showQRCode = method === 'QR Pay';
    this.showCash = method === 'Cash';
    this.step = 0;
  }

  back() {
    this.step = 1;
    this.choice = '';
  }

  trackById(index: number, item: any) {
    return item.id;
  }

  printQR() {
    if (!this.total_Products.length) return alert('No products to print!');

    this.submitOrder().subscribe({
      next: () => this.printReceipt('📱 QR Payment Receipt', '#2563eb'),
      error: (err) => {
        if (err.status === 400 && err.error?.message) {
          alert(err.error.message);
        } else {
          alert('Something went wrong!');
        }
      },
    });
  }

  printCash() {
    if (!this.total_Products.length) return alert('No products to print!');

    this.submitOrder().subscribe({
      next: () => this.printReceipt('💵 Cash Payment Receipt', '#16a34a'),
      error: (err) => {
        alert(err.error?.message || 'Order failed!');
      },
    });
  }

  private printReceipt(title: string, color: string) {
    const rows = this.total_Products
      .map(
        (p, i) => `
        <tr>
          <td>${i + 1}</td>
          <td>${p.name_product}</td>
          <td>${p.qtyAdded}</td>
          <td>${((p.price - (p.price * p.discount) / 100) * p.qtyAdded).toFixed(2)} USD</td>
        </tr>`
      )
      .join('');

    const w = window.open('', '', 'width=800,height=600');
    if (!w) return;

    w.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            h2 { text-align: center; color: ${color}; margin-bottom: 20px; }
            table { border-collapse: collapse; width: 100%; }
            th, td { border: 1px solid #ccc; padding: 8px; text-align: center; }
            th { background-color: #f4f4f4; }
            tr:nth-child(even) { background-color: #fafafa; }
            .summary { text-align: right; font-weight: bold; margin-top: 20px; }
          </style>
        </head>
        <body>
          <h2>${title}</h2>
          <table>
            <thead>
              <tr><th>ID</th><th>Product</th><th>Qty</th><th>Price</th></tr>
            </thead>
            <tbody>${rows}</tbody>
          </table>
          <div class="summary">
            <p>Total Quantity: ${this.getTotalQty()}</p>
            <p>Total Price: ${this.getGrandTotal().toFixed(2)} USD</p>
            <p>✅ Payment Received — Thank You!</p>
          </div>
        </body>
      </html>
    `);

    w.document.close();
    w.onload = () => {
      w.print();
      w.close();
      this.clearCart();
      location.reload();
    };
  }
}
