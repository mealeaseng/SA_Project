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

  // Handle file selection
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Image preview
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Submit data
  onSubmit() {
    if (!this.selectedFile) {
      alert('⚠️ Please upload a thumbnail image!');
      return;
    }

    const formData = new FormData();
    formData.append('name_category', this.category.name_category);
    formData.append('thumbnail', this.selectedFile);

    this.categoryService.addCategory(formData).subscribe(() => {
      alert('✅ Category added successfully!');
      this.category = { name_category: '' };
      this.selectedFile = null;
      this.previewUrl = null;
    });
  }
}
