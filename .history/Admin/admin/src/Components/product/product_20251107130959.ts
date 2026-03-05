import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product-service';
import { NgFor, NgIf } from '@angular/common';

interface ProductItem {
  _id: string;
  product_id: string;
  name_product: string;
  img: string; // This is the correct property name
  price: number;
  qty: number;
  stock: number;
  dis: string;
  discount: number;
  category: string;
  amount: number;
  __v: number;
  date: string;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class Product implements OnInit {
  product_categories: ProductItem[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        console.log('API Response:', response);

        // Handle different response formats
        if (Array.isArray(response)) {
          this.product_categories = response;
        } else if (response && typeof response === 'object') {
          // If response has a products array (common API format)
          if (response.products && Array.isArray(response.products)) {
            this.product_categories = response.products;
          } else if (response.data && Array.isArray(response.data)) {
            this.product_categories = response.data;
          } else {
            // If it's a single object, wrap in array
            this.product_categories = [response];
          }
        } else {
          this.product_categories = [];
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.product_categories = [];
      },
    });
  }

  // Method to handle image errors
  onImageError(event: any) {
    event.target.src = 'assets/default-product.jpg'; // Update path as needed
  }
}
