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
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      phone: ['', Validators.required],
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

    this.api.createAdmin(this.registerForm.value, token).subscribe({
      next: () => {
        alert('Admin created successfully');
      },
      error: (err) => {
        alert(err.error?.message || 'Create admin failed');
      },
    });
  }
}
