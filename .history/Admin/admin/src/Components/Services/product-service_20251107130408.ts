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

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/product';

  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<ProductItem[]> {
    return this.http.get<ProductItem[]>(this.baseUrl);
  }
}
