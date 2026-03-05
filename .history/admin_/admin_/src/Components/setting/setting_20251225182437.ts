import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthApiService } from '../Services/ath';
import { Auth } from '../../app/Components/Auth/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, FormsModule],
  templateUrl: './setting.html',
})
export class Setting implements OnInit {
  profileForm!: FormGroup;
  imagePreview: string | null = null;
  adminId!: string;

  // 🔐 Popup state
  showConfirm = false;
  confirmPassword = '';

  constructor(private fb: FormBuilder, private api: AuthApiService, private auth: Auth) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phone: [''],
      profile_img: [null],
    });
  }

  ngOnInit(): void {
    const token = localStorage.getItem('auth_token');
    if (!token) return;

    this.api.getAdmins(token).subscribe((admins) => {
      const admin = admins[0];
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
    });
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files?.[0]) return;

    const file = input.files[0];
    this.profileForm.patchValue({ profile_img: file });

    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  // 🔓 Open popup
  openConfirm() {
    this.showConfirm = true;
    this.confirmPassword = '';
  }

  closeConfirm() {
    this.showConfirm = false;
  }

  // 🔐 CONFIRM & SUBMIT
  confirmAndSubmit() {
    if (!this.confirmPassword) {
      alert('Please enter your password');
      return;
    }

    // (OPTIONAL) Verify password via backend here

    this.showConfirm = false;
    this.submit();
  }

  submit() {
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
