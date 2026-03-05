import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product-service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true, // ✅ REQUIRED for imports
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class Product implements OnInit {
  product_categories: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        // ✅ if your API returns plain array, not "data"
        this.product_categories = response.data ?? response;
        console.log('Products:', this.product_categories); // <-- Debug here
      },
      error: (error) => console.error('Error fetching products:', error),
    });
  }
}
