import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product-service';
import { CategoryService } from '../Services/cetecory';
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

interface CategoryItem {
  _id: string;
  product_id: string;
  name_category: string;
  thumbnail: string;
  __v: number;
  products: ProductItem[];
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
  categories: CategoryItem[] = [];
  selectedCategoryId: string = '';
  isLoading: boolean = false;

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        console.log('Categories Response:', response);

        if (Array.isArray(response)) {
          this.categories = response;
        } else if (response && response.categories && Array.isArray(response.categories)) {
          this.categories = response.categories;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.categories = response.data;
        } else {
          this.categories = [];
        }
      },
      error: (error: any) => {
        console.error('Error fetching categories:', error);
        this.categories = [];
      },
    });
  }

  loadProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        console.log('Products Response:', response);

        if (Array.isArray(response)) {
          this.product_categories = response;
        } else if (response && response.products && Array.isArray(response.products)) {
          this.product_categories = response.products;
        } else if (response && response.data && Array.isArray(response.data)) {
          this.product_categories = response.data;
        } else {
          this.product_categories = [];
        }
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('Error fetching products:', error);
        this.product_categories = [];
        this.isLoading = false;
      },
    });
  }

  loadProductsByCategory(categoryId: string) {
    if (categoryId) {
      this.isLoading = true;
      // Get the specific category and its products
      this.categoryService.getCategoryById(categoryId).subscribe({
        next: (category: CategoryItem) => {
          this.product_categories = category.products || [];
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('Error fetching category products:', error);
          this.product_categories = [];
          this.isLoading = false;
        },
      });
    } else {
      this.loadProducts(); // Load all products if no category selected
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategoryId = event.target.value;
    this.loadProductsByCategory(this.selectedCategoryId);
  }

  // Method to handle image errors
  onImageError(event: any) {
    event.target.src = 'assets/default-product.jpg';
  }
}
