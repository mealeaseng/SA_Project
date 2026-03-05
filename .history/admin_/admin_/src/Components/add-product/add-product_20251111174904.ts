import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { CategoryService } from '../Services/cetecory';

@Component({
  selector: 'app-post-category',
  standalone: true,
  imports: [FormsModule, CommonModule, NgFor],
  templateUrl: './add-product.html',
})
export class AddProduct {
  categoryName: string = '';
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  categories: any[] = [];

  constructor(private categoryService: CategoryService) {}

  // ✅ Handle file input and preview
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    // limit file size
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

  // ✅ Submit category
  onSubmit() {
    if (!this.categoryName.trim()) {
      alert('⚠️ Please enter a category name!');
      return;
    }

    const formData = new FormData();
    formData.append('name_category', this.categoryName);
    if (this.selectedFile) {
      formData.append('thumbnail', this.selectedFile);
    }

    this.categoryService.addCategory(formData).subscribe({
      next: (res) => {
        console.log('✅ Category created:', res);
        alert('🎉 Category created successfully!');
        this.categoryName = '';
        this.selectedFile = null;
        this.previewUrl = null;
      },
      error: (err) => {
        console.error('❌ Error posting category:', err);
        alert('❌ Failed to create category.');
      },
    });
  }

  // ngOnInit() {
  //   this.Getapi();
  // }

  // Getapi() {
  //   this.categoryService.getAllCategories().subscribe({
  //     next: (data) => {
  //       this.categories = data;
  //     },
  //   });
  // }

  // Getapi() {
  //   this.categoryService.getAllCategories().subscribe({
  //     next: (data) => {
  //       // Handle data depending on API response shape
  //       this.categories = data.categories || data; // if backend returns { categories: [...] }
  //     },
  //     error: (err) => {
  //       console.error('❌ Failed to fetch categories:', err);
  //     },
  //   });
  // }

  PostProduct(categoryId: string) {
    alert(`Post Product clicked for category: ${categoryId}`);
  }
}
