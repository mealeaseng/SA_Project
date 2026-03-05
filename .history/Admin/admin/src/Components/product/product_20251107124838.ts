import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product-service';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-product',
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './product.html',
  styleUrls: ['./product.css'], // ✅ should be "styleUrls" (plural)
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
        this.product_categories = response.data;
      },
      error: (error) => console.error('Error fetching products:', error),
    });
  }
}
