import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../Services/ath';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-register.html',
})
export class Register {
  adminForm!: FormGroup;

  constructor(private fb: FormBuilder, private api: AuthApiService, private router: Router) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
    });
  }

  submit() {
    if (this.adminForm.invalid) return;

    const token = localStorage.getItem('admin_token'); // set on admin login
    if (!token) {
      alert('Unauthorized. Please login as admin.');
      return;
    }

    this.api.createAdmin(this.adminForm.value, token).subscribe({
      next: () => {
        alert('Admin account created successfully');
        this.router.navigate(['/admin']); // or admin list page
      },
      error: (err) => {
        alert(err.error?.message || 'Create admin failed');
      },
    });
  }
}
