import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product-service';
import { NgFor, NgIf } from '@angular/common';

interface ProductItem {
  _id: string;
  product_id: string;
  name_product: string;
  img: string;
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
      next: (response: ProductItem[]) => {
        console.log('API Response:', response);
        this.product_categories = response;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
