import { Component } from '@angular/core';
import { CategoryService } from '../Services/cetecory';

@Component({
  selector: 'app-add-product',
  imports: [],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  category = { name: '', description: '' };

  constructor(private categoryService: CategoryService) {}

  onSubmit() {
    this.categoryService.addCategory(this.category).subscribe(() => {
      alert('✅ Category added successfully!');
      this.category = { name: '', description: '' };
    });
  }
}
