import { Component } from '@angular/core';
import { CategoryService } from '../Services/cetecory';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'],
})
export class AddProduct {
  category = { name_category: '' };
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private categoryService: CategoryService) {}

  // ✅ Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];

    if (!file) return;

    // ✅ Limit file size to 1MB
    if (file.size > 1000000) {
      alert('⚠️ File is too large! Using default image instead.');
      this.previewUrl = 'assets/default-category.jpg'; // fallback local image
      this.selectedFile = null; // no file to upload
      return;
    }

    this.selectedFile = file;

    // ✅ Generate preview
    const reader = new FileReader();
    reader.onload = () => {
      this.previewUrl = reader.result;
    };
    reader.onerror = () => {
      console.error('Error reading file. Showing default image.');
      this.previewUrl = 'assets/default-category.jpg';
    };
    reader.readAsDataURL(file);
  }

  // ✅ Submit data
  onSubmit() {
    if (!this.category.name_category) {
      alert('⚠️ Please enter a category name!');
      return;
    }

    const formData = new FormData();
    formData.append('name_category', this.category.name_category);

    // ✅ If file is selected, append it — otherwise append default placeholder
    if (this.selectedFile) {
      formData.append('thumbnail', this.selectedFile);
    } else {
      // attach a default image placeholder path (if backend handles defaults)
      formData.append('thumbnail', '');
    }

    this.categoryService.addCategory(formData).subscribe({
      next: () => {
        alert('✅ Category added successfully!');
        this.category = { name_category: '' };
        this.selectedFile = null;
        this.previewUrl = null;
      },
      error: (err) => {
        console.error('❌ Upload failed:', err);
        alert('❌ Failed to add category!');
      },
    });
  }
}
