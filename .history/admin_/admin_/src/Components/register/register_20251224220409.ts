import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrls: ['./register.css'],
})
export class Register {
  imagePreview: string | null = null;

  registerForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    phone: ['', Validators.required],
    image: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onImageSelect(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    this.registerForm.patchValue({ image: file });

    const reader = new FileReader();
    reader.onload = () => (this.imagePreview = reader.result as string);
    reader.readAsDataURL(file);
  }

  submit() {
    if (this.registerForm.invalid) return;

    const formData = new FormData();
    Object.entries(this.registerForm.value).forEach(([key, value]) => {
      formData.append(key, value as any);
    });

    console.log('REGISTER DATA', formData);
  }
}
