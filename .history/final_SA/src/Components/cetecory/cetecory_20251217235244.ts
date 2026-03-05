import { NgClass, NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TrenProduct } from '../tren-product/tren-product';

@Component({
  selector: 'app-cetecory',
  imports: [NgFor, RouterLink, TrenProduct, NgIf],
  templateUrl: './cetecory.html',
  styleUrls: ['./cetecory.css'],
})
export class Cetecory implements OnInit {
  categories: any[] = [];
  error: string | null = null;
  loading: boolean = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<{ categories: any[] }>('http://localhost:3000/api/cetecory').subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to fetch categories/products', err);
        this.error = 'Failed to load categories. Please try again later.';
        this.loading = false;
      },
    });
  }
}
