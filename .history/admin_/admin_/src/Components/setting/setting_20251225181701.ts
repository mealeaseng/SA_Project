import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthApiService } from '../Services/ath';
import { Auth } from '../../app/Components/Auth/auth';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './setting.html',
})
export class Setting implements OnInit {
  profileForm!: FormGroup;
  imagePreview: string | null = null;
  adminId!: string;

  constructor(private fb: FormBuilder, private api: AuthApiService, private auth: Auth) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''], // optional
      phone: [''],
      profile_img: [null],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    this.api.getAdmins(token).subscribe({
      next: (admins) => {
        const admin = admins[0]; // current admin
        this.adminId = admin._id;

        this.profileForm.patchValue({
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
        });

        if (admin.profile_img) {
          this.imagePreview = admin.profile_img.startsWith('http')
            ? admin.profile_img
            : 'http://localhost:3000' + admin.profile_img;
        }
      },
      error: (err) => console.error('❌ Load admin failed:', err),
    });
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    this.profileForm.patchValue({ profile_img: file });

    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.password === '') {
      alert('');
    }
    if (this.profileForm.invalid) return;

    const token = localStorage.getItem('auth_token');
    if (!token) return;

    const formData = new FormData();

    Object.entries(this.profileForm.getRawValue()).forEach(([key, value]) => {
      if (!value) return;
      if (key === 'password' && value === '') return;

      formData.append(key, value instanceof File ? value : String(value));
    });

    this.api.updateAdmin(this.adminId, formData, token).subscribe({
      next: () => alert('✅ Profile updated successfully'),
      error: (err) => alert(err.error?.message || '❌ Failed to update profile'),
    });
  }
}
