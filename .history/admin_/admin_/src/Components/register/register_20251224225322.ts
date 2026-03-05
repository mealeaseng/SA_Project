import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthApiService } from '../Services/ath';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  registerForm!: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder, private api: AuthApiService, private router: Router) {
    this.registerForm = this.fb.group({
      name_user: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone_number: ['', Validators.required],
      address: ['', Validators.required],
      profile_img: [null],
    });
  }

  // IMAGE PREVIEW
  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    this.registerForm.patchValue({ profile_img: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  // SUBMIT REGISTER
  submit() {
    if (this.registerForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.registerForm.value).forEach(([key, value]) => {
      if (value !== null) {
        formData.append(key, value as any);
      }
    });

    this.api.register(formData).subscribe({
      next: () => {
        alert('Register successful');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert(err.error?.message || 'Register failed');
      },
    });
  }
}
