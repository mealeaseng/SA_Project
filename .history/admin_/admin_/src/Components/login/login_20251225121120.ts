import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
  loginForm;

  constructor(
    private fb: FormBuilder,
    private api: AuthApiService,
    private auth: Auth,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  submit() {
    if (this.loginForm.invalid) return;

    this.api.adminLogin(this.loginForm.value).subscribe({
      next: (res) => {
        // ✅ SAVE TOKEN
        this.auth.login(res.token);

        // ✅ GO TO DASHBOARD (or any protected route)
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        alert(err.error?.message || 'Login failed');
      },
    });
  }
}
