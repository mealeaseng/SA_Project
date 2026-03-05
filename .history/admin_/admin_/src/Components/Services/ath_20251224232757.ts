import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // ======================
  // ADMIN ONLY
  // ======================

  // ADMIN LOGIN
  adminLogin(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/admin/login`, payload);
  }

  // GET ADMINS
  getAdmins(token: string): Observable<any> {
    return this.http.get(`${this.API_URL}/admin`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  // CREATE ADMIN
  createAdmin(data: any, token: string): Observable<any> {
    return this.http.post(`${this.API_URL}/admin`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  // UPDATE ADMIN
  updateAdmin(id: string, data: any, token: string): Observable<any> {
    return this.http.put(`${this.API_URL}/admin/${id}`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  // DELETE ADMIN
  deleteAdmin(id: string, token: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
