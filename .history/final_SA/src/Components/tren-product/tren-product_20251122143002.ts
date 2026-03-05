import { CommonModule, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tren-product',
  imports: [NgFor, CommonModule],
  templateUrl: './tren-product.html',
  styleUrls: ['./tren-product.css'],
})
export class TrenProduct {
  trendingProducts: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<any>('http://localhost:3000/api/product/trend').subscribe({
      next: (res) => {
        // Normalize response to always be an array
        if (Array.isArray(res)) {
          this.trendingProducts = res;
        } else if (res && Array.isArray(res.products)) {
          this.trendingProducts = res.products;
        } else if (res && Array.isArray(res.data)) {
          this.trendingProducts = res.data;
        } else {
          this.trendingProducts = []; // fallback to empty
        }

        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch trending products', err);
        this.error = 'Failed to fetch trending products';
        this.loading = false;
        this.trendingProducts = [];
      },
    });
  }
}
