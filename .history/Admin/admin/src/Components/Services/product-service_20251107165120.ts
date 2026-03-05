import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/product';

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }

  // Fetch products by category
  getProductsByCategory(categoryId: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/category/${categoryId}`);
  }

  // Search products by name
  searchProducts(searchTerm: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search?q=${encodeURIComponent(searchTerm)}`);
  }

  // Alternative search method
  getProductsByName(name: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/search?name=${encodeURIComponent(name)}`);
  }
}
