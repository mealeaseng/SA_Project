import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/api/cetecory'; // your API endpoint

  constructor(private http: HttpClient) {}

  // Fetch all categories
  getAllCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
