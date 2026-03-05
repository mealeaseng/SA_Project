import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';

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
  imports: [RouterOutlet, NgClass, RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  sidebarOpen: boolean = false;
  searchQuery: string = '';
  selectedCategoryId: string = '';

  // These properties should be in the product component, not here
  // For now, I'll add them here for the search to work, but they should be moved to the product component
  product_categories: ProductItem[] = [];
  categories: CategoryItem[] = [];
  isLoading: boolean = false;

  clearSearch() {
    this.searchQuery = '';
    // You can also trigger search update if needed
    this.onSearchChange();
  }

  onSearchChange() {
    // This will trigger filtering when search term changes
  }

  // Update the filteredProducts getter to use searchQuery
  get filteredProducts(): ProductItem[] {
    let products = this.product_categories;

    // Filter by category if selected
    if (this.selectedCategoryId) {
      products = products.filter((product) => product.category === this.selectedCategoryId);
    }

    // Filter by search query
    if (this.searchQuery) {
      const term = this.searchQuery.toLowerCase();
      products = products.filter(
        (product) =>
          product.name_product.toLowerCase().includes(term) ||
          product.dis.toLowerCase().includes(term) ||
          product.product_id.toLowerCase().includes(term)
      );
    }

    return products;
  }

  // Add this method for category name
  getSelectedCategoryName(): string {
    if (this.selectedCategoryId) {
      const category = this.categories.find((c) => c._id === this.selectedCategoryId);
      return category ? category.name_category : 'Products';
    }
    return 'All Products';
  }

  // Add method to handle image errors
  onImageError(event: any) {
    event.target.src = 'assets/default-product.jpg';
  }
}
