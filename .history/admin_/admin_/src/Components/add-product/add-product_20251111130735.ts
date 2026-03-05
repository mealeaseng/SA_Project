import { Component } from '@angular/core';

@Component({
  selector: 'app-add-product',
  imports: [],
  templateUrl: './add-product.html',
  styleUrl: './add-product.css',
})
export class AddProduct {
  categoryName: string = '';
  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    alert('Product added successfully!');
  }
}
