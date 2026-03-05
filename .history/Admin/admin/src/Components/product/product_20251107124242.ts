import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product-service';

@Component({
  selector: 'app-product',
  templateUrl: './product.html',
  styleUrls: ['./product.css'], // ✅ should be "styleUrls" (plural)
})
export class Product implements OnInit {
  product_categories: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProductCategories();
  }

  loadProductCategories() {
    this.productService
      .getAllProducts()
      .then((response: any) => {
        this.product_categories = response.data;
      })
      .catch((error: any) => {
        console.error('Error fetching product categories:', error);
      });
  }
}
