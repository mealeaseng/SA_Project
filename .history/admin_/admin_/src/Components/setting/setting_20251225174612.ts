import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-setting',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './setting.html',
  styleUrls: ['./setting.css'],
})
export class Setting {
  profileForm!: FormGroup;
  imagePreview: string | null = null;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      phone: [''],
      profile_img: [null],
    });
  }

  onImageSelect(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files[0]) return;

    const file = input.files[0];
    this.profileForm.patchValue({ profile_img: file });

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.profileForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.profileForm.getRawValue()).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value instanceof File ? value : String(value));
      }
    });

    console.log('✅ Settings data:', Object.fromEntries(formData));
    // TODO: call update profile API here
  }
}
