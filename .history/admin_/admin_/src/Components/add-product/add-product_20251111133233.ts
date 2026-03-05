import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.html',
})
export class AddProduct {
  categoryName: string = '';
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient) {}

  // ✅ Handle file input and preview
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // limit to 1MB
    if (file.size > 1000000) {
      alert('⚠️ File is too large. Please upload an image under 1MB.');
      this.selectedFile = null;
      this.previewUrl = null;
      return;
    }

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('name_category', this.categoryName);
    if (this.selectedFile) formData.append('thumbnail', this.selectedFile);

    this.http.post('http://localhost:3000/api/cetecory', formData).subscribe({
      next: (res) => console.log('✅ Category created!', res),
      error: (err) => console.error('❌ Error posting category:', err),
    });
  }
}
