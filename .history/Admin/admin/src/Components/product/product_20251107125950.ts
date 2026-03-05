import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product-service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  standalone: true, // ✅ Must have this
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
        console.log('API Response:', response);
        this.product_categories = Array.isArray(response) ? response : response.data ?? [response];
      },

      error: (error) => console.error('Error fetching products:', error),
    });
  }
}
