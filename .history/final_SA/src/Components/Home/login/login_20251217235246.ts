import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  usernameInput = '';
  emailInput = '';
  Pss = '';
  ComPss = '';
  phone_num = '';
  addressUser = '';

  showUsernameError = false;
  showPhoneError = false;
  showEmailError = false;
  showPasswordError = false;
  showConfirmError = false;
  showAddress = false;

  constructor(private router: Router, private http: HttpClient) {}

  sumAdd() {
    // Reset errors
    this.showUsernameError = false;
    this.showPhoneError = false;
    this.showEmailError = false;
    this.showPasswordError = false;
    this.showConfirmError = false;
    this.showAddress = false;

    // Validate fields
    if (this.usernameInput.trim() === '') this.showUsernameError = true;
    const phonePattern = /^[0-9]{9}$/;
    if (!phonePattern.test(this.phone_num.trim())) this.showPhoneError = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (this.emailInput.trim() === '' || !emailPattern.test(this.emailInput))
      this.showEmailError = true;
    if (this.Pss.trim() === '') this.showPasswordError = true;
    if (this.ComPss.trim() === '' || this.Pss !== this.ComPss) this.showConfirmError = true;
    if (this.addressUser.trim() === '') this.showAddress = true;

    // Only proceed if all fields are valid
    if (
      !this.showUsernameError &&
      !this.showPhoneError &&
      !this.showEmailError &&
      !this.showPasswordError &&
      !this.showConfirmError &&
      !this.showAddress
    ) {
      const userData = {
        profile_img: '',
        name_user: this.usernameInput,
        phone_number: this.phone_num,
        email: this.emailInput,
        password: this.Pss,
        address: this.addressUser,
      };

      // POST to backend
      this.http.post('http://localhost:3000/api/login', userData).subscribe({
        next: (res: any) => {
          if (!res.user) {
            alert('User data missing from backend!');
            return;
          }

          // Save user data in localStorage
          localStorage.setItem('userId', res.user._id);
          localStorage.setItem('user', res.user.name_user);
          localStorage.setItem('phone_number', res.user.phone_number);
          localStorage.setItem('emailInput', res.user.email);
          localStorage.setItem('password', res.user.password);
          localStorage.setItem('address', res.user.address);
          localStorage.setItem('isLoggedIn', 'true');

          window.dispatchEvent(new Event('storage')); // notify Navbar

          alert('Registration successful!');
          this.router.navigate(['/home']); // navigate AFTER backend confirms
        },
        error: (err) => {
          if (err.status === 409) {
            alert(err.error.message); // Email already exists
          } else {
            console.error(err);
            alert('Something went wrong. Please try again.');
          }
        },
      });
    }
  }
}
