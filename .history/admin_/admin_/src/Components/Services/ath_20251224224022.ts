import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private USER_TOKEN_KEY = 'user_token';
  private ADMIN_TOKEN_KEY = 'admin_token';

  // ======================
  // USER AUTH
  // ======================

  setUserToken(token: string) {
    localStorage.setItem(this.USER_TOKEN_KEY, token);
  }

  getUserToken(): string | null {
    return localStorage.getItem(this.USER_TOKEN_KEY);
  }

  isUserLoggedIn(): boolean {
    return !!this.getUserToken();
  }

  logoutUser() {
    localStorage.removeItem(this.USER_TOKEN_KEY);
  }

  // ======================
  // ADMIN AUTH
  // ======================

  setAdminToken(token: string) {
    localStorage.setItem(this.ADMIN_TOKEN_KEY, token);
  }

  getAdminToken(): string | null {
    return localStorage.getItem(this.ADMIN_TOKEN_KEY);
  }

  isAdminLoggedIn(): boolean {
    return !!this.getAdminToken();
  }

  logoutAdmin() {
    localStorage.removeItem(this.ADMIN_TOKEN_KEY);
  }

  // ======================
  // GLOBAL LOGOUT
  // ======================

  logoutAll() {
    this.logoutUser();
    this.logoutAdmin();
  }
}
