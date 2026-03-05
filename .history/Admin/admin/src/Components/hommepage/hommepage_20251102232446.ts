import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../Services/userservice';
import { ProductService } from '../Services/product-service';
import { CategoryService } from '../Services/cetecory';
declare const Chart: any;

@Component({
  selector: 'app-home',
  template: `
    <div style="display: flex; gap: 50px; flex-wrap: wrap;">
      <div style="width: 600px; height: 400px;">
        <canvas #userChartCanvas></canvas>
      </div>
      <div style="width: 400px; height: 400px;">
        <canvas #countChartCanvas></canvas>
      </div>
    </div>
  `,
})
export class Hommepage implements AfterViewInit {
  @ViewChild('userChartCanvas') userChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('countChartCanvas') countChartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngAfterViewInit(): void {
    this.loadUserChart();
    this.loadCountsChartCeceory();
  }

  // Chart 1: Users per Month
  loadUserChart(): void {
    this.userService.getAllUsers().subscribe((users) => {
      const monthCounts: Record<string, number> = {};
      const monthOrder = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];

      users.forEach((user) => {
        const month = new Date(user.date).toLocaleString('default', { month: 'short' });
        monthCounts[month] = (monthCounts[month] || 0) + 1;
      });

      const labels = monthOrder;
      const values = monthOrder.map((m) => monthCounts[m] || 0);

      const ctx = this.userChartCanvas.nativeElement.getContext('2d');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels,
          datasets: [
            {
              label: 'Users per Month',
              data: values,
              backgroundColor: '#3b82f6',
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: 'User Registrations by Month', font: { size: 18 } },
            legend: { display: true },
          },
          scales: { y: { beginAtZero: true } },
        },
      });
    });
  }

  // Chart 2: Category & Product Counts
  loadCountsChartCeceory(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      const categoryCount = categories.length;

      this.productService.getAllProducts().subscribe((products) => {
        const productCount = products.length;

        const ctx = this.countChartCanvas.nativeElement.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Categories', 'Products'],
            datasets: [
              {
                label: 'Total Counts',
                data: [categoryCount, productCount],
                backgroundColor: ['#f97316', '#10b981'],
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: { display: true, text: 'Categories & Products Counts', font: { size: 16 } },
              legend: { display: false },
            },
            scales: { y: { beginAtZero: true } },
          },
        });
      });
    });
  }
  loadCountsChartProduct(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      const categoryCount = categories.length;

      this.productService.getAllProducts().subscribe((products) => {
        const productCount = products.length;

        const ctx = this.countChartCanvas.nativeElement.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Categories', 'Products'],
            datasets: [
              {
                label: 'Total Counts',
                data: [categoryCount, productCount],
                backgroundColor: ['#f97316', '#10b981'],
                borderRadius: 6,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              title: { display: true, text: 'Categories & Products Counts', font: { size: 16 } },
              legend: { display: false },
            },
            scales: { y: { beginAtZero: true } },
          },
        });
      });
    });
  }
}
