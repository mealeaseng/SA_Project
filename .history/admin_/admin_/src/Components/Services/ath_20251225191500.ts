import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private API_URL = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  adminLogin(data: { email: string; password: string }) {
    return this.http.post(`${this.API_URL}/admin/login`, data);
  }

  getCurrentAdmin(token: string) {
    return this.http.get(`${this.API_URL}/admin/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  verifyAdminPassword(password: string) {
    return this.http.post(
      `${this.API_URL}/admin/verify-password`,
      { password },
      { headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` } }
    );
  }

  updateProfile(data: FormData) {
    return this.http.put(`${this.API_URL}/admin/me`, data, {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` },
    });
  }
}
