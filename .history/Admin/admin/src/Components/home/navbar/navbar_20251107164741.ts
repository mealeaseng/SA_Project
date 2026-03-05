import { NgClass, NgIf, NgFor } from '@angular/common';
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
  imports: [RouterOutlet, NgClass, NgIf, NgFor, RouterLink, FormsModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  sidebarOpen: boolean = false;
  searchQuery: string = '';
  selectedCategoryId: string = '';

  // Sample data for testing
  product_categories: ProductItem[] = [
    {
      _id: '68f0bb2b83138cbb61f55599',
      product_id: 'FOOD01',
      name_product: 'Ondo Mii',
      img: 'https://megastorecambodia.com/files/products/th/758_MEE_CHEAT_MJU_KHMER_65G.jpg',
      price: 1,
      qty: 20,
      stock: 25,
      dis: 'Kimrith ft Khemrak!',
      discount: 12,
      category: '68f0884c9054a30667eefa3a',
      amount: 8,
      __v: 0,
      date: '2025-11-07T05:54:40.756Z',
    },
    {
      _id: '68f0bb7783138cbb61f555a1',
      product_id: 'FOOD02',
      name_product: 'Pizza',
      img: 'https://eu.gozney.com/cdn/shop/files/Caprese_Pizza_Feng_Chen_leopardcrust_-_Large_f0796fcd-05f1-4c1e-9341-fb6012fe7907.png?v=1743691203&width=1500',
      price: 12,
      qty: 20,
      stock: 30,
      dis: 'Kimrith ft Khemrak!',
      discount: 12,
      category: '68f0884c9054a30667eefa3a',
      amount: 228,
      __v: 0,
      date: '2025-11-07T05:54:40.757Z',
    },
  ];

  categories: CategoryItem[] = [
    {
      _id: '68f0884c9054a30667eefa3a',
      product_id: '1',
      name_category: 'Food',
      thumbnail:
        'https://images.unsplash.com/photo-1512152272829-e3139592d56f?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZmFzdCUyMGZvb2R8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000',
      __v: 16,
      products: [],
    },
  ];

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

  // Add method to handle image errors
  onImageError(event: any) {
    event.target.src = 'assets/default-product.jpg';
  }
}
