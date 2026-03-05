import { Component } from '@angular/core';
import { CategoryService } from '../Services/cetecory';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [FormsModule],
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
