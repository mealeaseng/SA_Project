import { Component, OnInit } from '@angular/core';
import { ProductService } from '../Services/product-service';
import { CategoryService } from '../Services/cetecory';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ProductItem {
  _id: string;
  product_id: string;
  name_product: string;
  img: string;
  price: number;
  qty: number;
  stock: number;
  dis: string;
  discount: number;
  category: string;
  amount: number;
  __v: number;
  date: string;
}

interface CategoryItem {
  _id: string;
  name_category: string;
  thumbnail: string;
  products?: ProductItem[]; // ✅ optional now
  __v: number;
}

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './product.html',
  styleUrls: ['./product.css'],
})
export class Product implements OnInit {
  // Lists
  product_categories: ProductItem[] = [];
  categories: CategoryItem[] = [];
  listcetecory: CategoryItem[] = [];

  // States
  selectedCategoryId = '';
  isLoading = false;
  topup = false;

  // Edit modal data
  editedCategory: any = {
    _id: '',
    name_category: '',
    thumbnail: '',
  };
  previewUrl: string | ArrayBuffer | null = null;

  constructor(private productService: ProductService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
    this.GetAllCategories();
  }

  // ✅ Load all categories (used for list view)
  GetAllCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (data: any) => {
        this.listcetecory = data.categories || data;
      },
      error: (err) => console.error('❌ Failed to load all categories:', err),
    });
  }

  // ✅ Load categories (for filter dropdown)
  loadCategories() {
    this.categoryService.getAllCategories().subscribe({
      next: (response: any) => {
        if (Array.isArray(response)) {
          this.categories = response;
        } else if (response?.categories) {
          this.categories = response.categories;
        } else if (response?.data) {
          this.categories = response.data;
        } else {
          this.categories = [];
        }
      },
      error: (error: any) => {
        console.error('❌ Error fetching categories:', error);
        this.categories = [];
      },
    });
  }

  // ✅ Load all products
  loadProducts() {
    this.isLoading = true;
    this.productService.getAllProducts().subscribe({
      next: (response: any) => {
        let allProducts: ProductItem[] = [];
        if (Array.isArray(response)) {
          allProducts = response;
        } else if (response?.products) {
          allProducts = response.products;
        } else if (response?.data) {
          allProducts = response.data;
        }

        this.product_categories = allProducts;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error('❌ Error fetching products:', error);
        this.product_categories = [];
        this.isLoading = false;
      },
    });
  }

  // ✅ Filter products by category
  loadProductsByCategory(categoryId: string) {
    if (categoryId) {
      this.isLoading = true;
      this.productService.getAllProducts().subscribe({
        next: (response: any) => {
          let allProducts: ProductItem[] = [];
          if (Array.isArray(response)) {
            allProducts = response;
          } else if (response?.products) {
            allProducts = response.products;
          } else if (response?.data) {
            allProducts = response.data;
          }

          this.product_categories = allProducts.filter(
            (product) => product.category === categoryId
          );
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error('❌ Error fetching products:', error);
          this.product_categories = [];
          this.isLoading = false;
        },
      });
    } else {
      this.loadProducts(); // show all
    }
  }

  onCategoryChange(event: any) {
    this.selectedCategoryId = event.target.value;
    this.loadProductsByCategory(this.selectedCategoryId);
  }

  // ✅ Image fallback
  onImageError(event: any) {
    event.target.src = 'assets/default-product.jpg';
  }

  // ✅ Get category name for heading
  getSelectedCategoryName(): string {
    if (this.selectedCategoryId) {
      const category = this.categories.find((c) => c._id === this.selectedCategoryId);
      return category ? category.name_category : 'Products';
    }
    return 'All Products';
  }

  // ✅ Edit Category Modal
  editCategory(id: string) {
    const category = this.listcetecory.find((c) => c._id === id);
    if (category) {
      this.editedCategory = { ...category };
      this.previewUrl = category.thumbnail;
      this.topup = true;
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.editedCategory.thumbnail = file;
      const reader = new FileReader();
      reader.onload = (e) => (this.previewUrl = e.target?.result || null);
      reader.readAsDataURL(file);
    }
  }

  // ✅ Save edited category
  saveCategory() {
    if (!this.editedCategory._id) return;

    const formData = new FormData();
    formData.append('name_category', this.editedCategory.name_category);
    if (this.editedCategory.thumbnail instanceof File) {
      formData.append('thumbnail', this.editedCategory.thumbnail);
    }

    this.categoryService.updateCategory(this.editedCategory._id, formData).subscribe({
      next: () => {
        alert('✅ Category updated successfully!');
        this.GetAllCategories();
        this.topup = false;
      },
      error: (err) => console.error('❌ Failed to update category:', err),
    });
  }

  // ✅ Delete category
  removeCategory(id: string) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.categoryService.deleteCategory(id).subscribe({
        next: () => {
          this.listcetecory = this.listcetecory.filter((c) => c._id !== id);
          alert('✅ Category deleted successfully!');
        },
        error: (err) => console.error('❌ Failed to delete category:', err),
      });
    }
  }

  // ✅ Delete product
  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.product_categories = this.product_categories.filter((p) => p._id !== id);
          alert('✅ Product deleted successfully!');
        },
        error: (err) => console.error('❌ Failed to delete product:', err),
      });
    }
  }

  // ✅ Edit product placeholder (can open another modal later)
  editProduct(id: string) {
    alert('✏️ Edit product feature will be implemented soon for product ID: ' + id);
    this.topup = true;
  }
}
