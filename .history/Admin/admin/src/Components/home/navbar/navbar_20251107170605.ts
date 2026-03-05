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
    // Load all products when component initializes
    this.loadAllProducts();
  }

  clearSearch() {
    this.searchQuery = '';
    this.onSearchChange();
  }

  onSearchChange() {
    const term = this.searchQuery.trim();

    // If no search term, just show all products
    if (!term) {
      this.loadAllProducts();
      return;
    }

    // Otherwise, perform the search
    this.searchProductsByName(term);
  }

  searchProductsByName(searchTerm: string) {
    this.isLoading = true;

    this.productService.searchProducts(searchTerm).subscribe({
      next: (response: any) => {
        console.log('Search Response:', response);

        if (Array.isArray(response)) {
          this.product_categories = response;
        } else if (response?.products && Array.isArray(response.products)) {
          this.product_categories = response.products;
        } else if (response?.data && Array.isArray(response.data)) {
          this.product_categories = response.data;
        } else {
          // Fallback: if nothing found, don’t erase — just leave all products visible
          console.warn('No products found from search, keeping old list');
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error searching products:', error);
        // Also fallback to the existing list instead of clearing
        this.isLoading = false;
      },
    });
  }
}
