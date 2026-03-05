import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../Services/userservice';
import { CategoryService } from '../Services/cetecory';
import { ProductService } from '../Services/product-service';

declare const Chart: any;

@Component({
  selector: 'app-home',
  template: `
    <div style="display: flex; flex-wrap: wrap; gap: 50px;">
      <div style="width: 600px; height: 400px;">
        <canvas #userChartCanvas></canvas>
      </div>
      <div style="width: 600px; height: 400px;">
        <canvas #productChartCanvas></canvas>
      </div>
      <div style="width: 400px; height: 400px;">
        <canvas #countChartCanvas></canvas>
      </div>
    </div>
  `,
})
export class Hommepage implements AfterViewInit {
  @ViewChild('userChartCanvas') userChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('productChartCanvas') productChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('countChartCanvas') countChartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngAfterViewInit(): void {
    this.loadUserChart();
    this.loadProductsPerCategoryChart();
    this.loadTotalCountsChart();
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

      users.forEach((u) => {
        const month = new Date(u.date).toLocaleString('default', { month: 'short' });
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
            { label: 'Users per Month', data: values, backgroundColor: '#3b82f6', borderRadius: 6 },
          ],
        },
        options: { responsive: true, maintainAspectRatio: false },
      });
    });
  }

  // Chart 2: Products per Category
  loadProductsPerCategoryChart(): void {
    this.categoryService.getAllCategories().subscribe((categories) => {
      const categoryLabels = categories.map((c) => c.name);

      this.productService.getAllProducts().subscribe((products) => {
        const productCounts = categoryLabels.map(
          (label) => products.filter((p) => p.category === label).length
        );

        const ctx = this.productChartCanvas.nativeElement.getContext('2d');
        if (!ctx) return;

        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: categoryLabels,
            datasets: [
              {
                label: 'Products per Category',
                data: productCounts,
                backgroundColor: '#f97316',
                borderRadius: 6,
              },
            ],
          },
          options: { responsive: true, maintainAspectRatio: false },
        });
      });
    });
  }

  // Chart 3: Total Counts
  loadTotalCountsChart(): void {
    this.userService.getAllUsers().subscribe((users) => {
      const userCount = users.length;

      this.categoryService.getAllCategories().subscribe((categories) => {
        const categoryCount = categories.length;

        this.productService.getAllProducts().subscribe((products) => {
          const productCount = products.length;

          const ctx = this.countChartCanvas.nativeElement.getContext('2d');
          if (!ctx) return;

          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Users', 'Categories', 'Products'],
              datasets: [
                {
                  label: 'Total Counts',
                  data: [userCount, categoryCount, productCount],
                  backgroundColor: ['#3b82f6', '#f97316', '#10b981'],
                  borderRadius: 6,
                },
              ],
            },
            options: { responsive: true, maintainAspectRatio: false },
          });
        });
      });
    });
  }
}
