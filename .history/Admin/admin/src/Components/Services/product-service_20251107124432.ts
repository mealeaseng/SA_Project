import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/api/product'; // your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all products
  getAllProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
