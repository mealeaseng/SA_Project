import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

import { ProductService } from '../../Services/product-service';

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
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterOutlet, NgClass, NgIf, RouterLink, NgFor, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar implements OnInit {
  sidebarOpen: boolean = false;
  searchQuery: string = '';
  selectedCategoryId: string = '';

  product_categories: ProductItem[] = [];
  categories: CategoryItem[] = [];
  isLoading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // ✅ Start with empty array — no products shown until search
    this.product_categories = [];
  }

  clearSearch() {
    this.searchQuery = '';
    // ✅ When cleared, show no products (empty array)
    this.product_categories = [];
  }

  onSearchChange() {
    // ✅ Only search if there's a valid search term
    if (this.searchQuery.trim()) {
      this.searchProductsByName(this.searchQuery.trim());
    } else {
      // ✅ If search is empty, show no products
      this.product_categories = [];
      this.isLoading = false;
    }
  }

  // Method to search products by name
  searchProductsByName(searchTerm: string) {
    // ✅ Only proceed if search term exists and isn't just whitespace
    if (searchTerm && searchTerm.trim()) {
      this.isLoading = true;
      this.productService.searchProducts(searchTerm).subscribe({
        next: (response: any) => {
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
        error: (error) => {
          console.error('Error searching products:', error);
          this.product_categories = [];
          this.isLoading = false;
        },
      });
    } else {
      // ✅ If search term is invalid, show no products
      this.product_categories = [];
      this.isLoading = false;
    }
  }

  // ✅ Simplified getter — no additional filtering needed
  get filteredProducts(): ProductItem[] {
    return this.product_categories;
  }

  // Add method to handle image errors
  onImageError(event: any) {
    event.target.src = 'assets/default-product.jpg';
  }
}
