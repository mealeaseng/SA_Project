import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-old-acc',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './old-acc.html',
  styleUrls: ['./old-acc.css'],
})
export class OldAcc {
  usernameInput = '';
  Pss = '';

  showUsernameError = false;
  showPasswordError = false;

  constructor(private router: Router, private http: HttpClient) {}

  loginUser() {
    // Reset validation states
    this.showUsernameError = false;
    this.showPasswordError = false;

    // Simple validation
    if (this.usernameInput.trim() === '') this.showUsernameError = true;
    if (this.Pss.trim() === '') this.showPasswordError = true;
    if (this.showUsernameError || this.showPasswordError) return;

    const loginData = {
      username: this.usernameInput,
      password: this.Pss,
    };

    this.http.post('http://localhost:3000/api/checkLogin', loginData).subscribe({
      next: (res: any) => {
        if (!res.user) {
          alert('Invalid username or password.');
          return;
        }

        // Save session
        localStorage.setItem('userId', res.user._id);
        localStorage.setItem('user', res.user.name_user);
        localStorage.setItem('phone_number', res.user.phone_number);
        localStorage.setItem('email', res.user.email);
        localStorage.setItem('address', res.user.address);
        localStorage.setItem('isLoggedIn', 'true');

        window.dispatchEvent(new Event('storage'));
        alert('Login successful!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error(err);
        if (err.status === 401) {
          alert('Invalid credentials. Please check your username or password.');
        } else if (err.status === 404) {
          alert('User not found.');
        } else {
          alert('Server error. Please try again later.');
        }
      },
    });
  }
}
