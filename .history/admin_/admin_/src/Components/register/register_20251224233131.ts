import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '../Services/ath';

@Component({
  selector: 'app-admin-create',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './admin-create.html',
})
export class Register {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private api: AuthApiService, private router: Router) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const token = localStorage.getItem('admin_token');
    if (!token) {
      alert('Unauthorized');
      return;
    }

    this.api.createAdmin(this.form.value, token).subscribe({
      next: () => {
        alert('Admin created');
        this.router.navigate(['/admin']);
      },
      error: (err) => {
        alert(err.error?.message || 'Create admin failed');
      },
    });
  }
}
