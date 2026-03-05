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

  // ✅ Start with empty array — this triggers "No products found" by default
  product_categories: ProductItem[] = [];
  categories: CategoryItem[] = [];
  isLoading: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    // ✅ Initialize with empty array — shows "No products found" by default
    // No need to load immediately — user must search or select category
    this.product_categories = [];
  }

  clearSearch() {
    this.searchQuery = '';
    this.onSearchChange();
  }

  onSearchChange() {
    if (this.searchQuery.trim()) {
      this.searchProductsByName(this.searchQuery);
    } else {
      // When search is cleared, show "No products found" until user searches again
      this.product_categories = [];
      this.isLoading = false;
    }
  }

  // Method to search products by name
  searchProductsByName(searchTerm: string) {
    if (searchTerm.trim()) {
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
            this.product_categories = []; // ✅ Explicitly empty if API returns unexpected format
          }
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error searching products:', error);
          this.product_categories = []; // ✅ Show "No products" on error
          this.isLoading = false;
        },
      });
    } else {
      // Prevent accidental load if search term is empty after trimming
      this.product_categories = [];
    }
  }

  // Update the filteredProducts getter — now it's just a passthrough
  // since we're managing product_categories directly via API calls
  get filteredProducts(): ProductItem[] {
    return this.product_categories;
  }

  // Add method to handle image errors
  onImageError(event: any) {
    event.target.src = 'assets/default-product.jpg';
  }
}
