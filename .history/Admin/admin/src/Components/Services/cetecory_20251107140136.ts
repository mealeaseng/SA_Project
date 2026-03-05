import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface CategoryItem {
  _id: string;
  name: string;
  // Add other properties based on your API response
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private baseUrl = 'http://localhost:3000/api/category'; // Fixed typo: cetecory -> category

  constructor(private http: HttpClient) {}

  // Fetch all categories
  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.baseUrl);
  }
}
