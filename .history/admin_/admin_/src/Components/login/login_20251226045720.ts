import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../Services/ath';
import { Auth } from '../../app/Components/Auth/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  loginForm!: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }>;

  constructor(
    private fb: FormBuilder,
    private api: AuthApiService,
    private auth: Auth,
    private router: Router
  ) {
    // ✅ NON-NULLABLE FORM (NO TS2345 ERROR)
    this.loginForm = this.fb.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    this.api.adminLogin(this.loginForm.value).subscribe({
      next: (res) => {
        // 🔑 SAVE TOKEN
        localStorage.setItem('auth_token', res.token);

        this.router.navigate(['/setting']);
      },
    });
  }
}
