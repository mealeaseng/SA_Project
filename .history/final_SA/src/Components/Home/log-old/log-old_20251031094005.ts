import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './login-old.html',
  styleUrls: ['./login.css'],
})
export class Login {
  usernameInput = '';
  Pss = '';

  showUsernameError = false;
  showPasswordError = false;

  constructor(private router: Router, private http: HttpClient) {}

  loginUser() {
    // Reset errors
    this.showUsernameError = false;
    this.showPasswordError = false;

    // Validate input
    if (this.usernameInput.trim() === '') this.showUsernameError = true;
    if (this.Pss.trim() === '') this.showPasswordError = true;

    if (this.showUsernameError || this.showPasswordError) return;

    // Send login request
    const loginData = {
      username: this.usernameInput,
      password: this.Pss,
    };

    this.http.post('http://localhost:3000/api/login', loginData).subscribe({
      next: (res: any) => {
        if (!res.user) {
          alert('Invalid username or password.');
          return;
        }

        // Save user session
        localStorage.setItem('userId', res.user._id);
        localStorage.setItem('user', res.user.name_user);
        localStorage.setItem('phone_number', res.user.phone_number);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('address', res.user.address);
        localStorage.setItem('isLoggedIn', 'true');

        window.dispatchEvent(new Event('storage')); // Notify Navbar

        alert('Login successful!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          alert('Invalid credentials. Please check your username or password.');
        } else {
          alert('Something went wrong. Please try again.');
        }
      },
    });
  }
}
