import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // ======================
  // ADMIN (PUBLIC)
  // ======================

  // ✅ REGISTER FIRST ADMIN (NO TOKEN)
  registerAdmin(data: FormData): Observable<any> {
    return this.http.post(`${this.API_URL}/admin/register`, data);
  }

  // ✅ ADMIN LOGIN
  adminLogin(payload: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.API_URL}/admin/login`, payload);
  }

  // ======================
  // ADMIN (PROTECTED)
  // ======================

  getAdmins(token: string): Observable<any> {
    return this.http.get(`${this.API_URL}/admin`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  createAdmin(data: any, token: string): Observable<any> {
    return this.http.post(`${this.API_URL}/admin`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  updateAdmin(id: string, data: any, token: string): Observable<any> {
    return this.http.put(`${this.API_URL}/admin/${id}`, data, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  deleteAdmin(id: string, token: string): Observable<any> {
    return this.http.delete(`${this.API_URL}/admin/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
