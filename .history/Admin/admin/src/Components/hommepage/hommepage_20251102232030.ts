import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../Services/userservice';
import { CategoryService } from '../Services/cetecory';
import { ProductService } from '../Services/product-service';

declare const Chart: any;

@Component({
  selector: 'app-home',
  template: `<div style="width: 600px; height: 400px;"><canvas #chartCanvas></canvas></div>`,
})
export class Hommepage implements AfterViewInit {
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngAfterViewInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Fetch all users, categories, and products
    this.userService.getAllUsers().subscribe((users) => {
      const userCount = users.length;

      this.categoryService.getAllCategories().subscribe((categories) => {
        const categoryCount = categories.length;

        this.productService.getAllProducts().subscribe((products) => {
          const productCount = products.length;

          // Render chart with all counts
          this.renderChart(userCount, categoryCount, productCount);
        });
      });
    });
  }

  renderChart(userCount: number, categoryCount: number, productCount: number): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (!ctx) return;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Users', 'Categories', 'Products'],
        datasets: [
          {
            label: 'Counts',
            data: [userCount, categoryCount, productCount],
            backgroundColor: ['#3b82f6', '#f97316', '#10b981'],
            borderRadius: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: { display: true, text: 'Dashboard Counts', font: { size: 18 } },
          legend: { display: false },
        },
        scales: { y: { beginAtZero: true } },
      },
    });
  }
}
