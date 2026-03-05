import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../Services/userservice';
import { ProductService } from '../Services/product-service';
import { CategoryService } from '../Services/cetecory';
declare const Chart: any;

@Component({
  selector: 'app-home',
  template: `
    <div class="min-h-screen bg-gray-50 p-8">
      <h2 class="text-3xl font-bold text-gray-800 mb-8 text-center">📊 Admin Dashboard</h2>

      <!-- Summary Cards -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div
          class="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition"
        >
          <div class="text-blue-600 text-4xl font-bold">{{ totalUsers }}</div>
          <div class="text-gray-500 mt-1 text-sm uppercase tracking-wider">Users</div>
        </div>

        <div
          class="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition"
        >
          <div class="text-orange-500 text-4xl font-bold">{{ totalCategories }}</div>
          <div class="text-gray-500 mt-1 text-sm uppercase tracking-wider">Categories</div>
        </div>

        <div
          class="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-lg transition"
        >
          <div class="text-emerald-500 text-4xl font-bold">{{ totalProducts }}</div>
          <div class="text-gray-500 mt-1 text-sm uppercase tracking-wider">Products</div>
        </div>
      </div>

      <!-- Charts Section -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div class="bg-white p-5 rounded-xl shadow-md">
          <h3 class="text-gray-700 font-semibold mb-3 text-center">User Registrations by Month</h3>
          <canvas #userChartCanvas class="w-full h-80"></canvas>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-md">
          <h3 class="text-gray-700 font-semibold mb-3 text-center">Categories Overview</h3>
          <canvas #categoryChartCanvas class="w-full h-80"></canvas>
        </div>

        <div class="bg-white p-5 rounded-xl shadow-md">
          <h3 class="text-gray-700 font-semibold mb-3 text-center">Products Overview</h3>
          <canvas #productChartCanvas class="w-full h-80"></canvas>
        </div>
      </div>
    </div>
  `,
})
export class Hommepage implements AfterViewInit {
  @ViewChild('userChartCanvas', { static: false }) userChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('categoryChartCanvas', { static: false })
  categoryChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('productChartCanvas', { static: false })
  productChartCanvas!: ElementRef<HTMLCanvasElement>;

  totalUsers = 0;
  totalCategories = 0;
  totalProducts = 0;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngAfterViewInit(): void {
    this.loadUserChart();
    this.loadCategoryChart();
    this.loadProductChart();
  }

  loadUserChart(): void {
    this.userService.getAllUsers().subscribe((users) => {
      this.totalUsers = users.length;
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
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Users per Month',
              data: values,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59,130,246,0.2)',
              borderWidth: 3,
              tension: 0.3,
              fill: true,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      });
    });
  }

  loadCategoryChart(): void {
    this.categoryService.getAllCategories().subscribe((response: any) => {
      const count = response.categories.length;
      this.totalCategories = count;
      const ctx = this.categoryChartCanvas.nativeElement.getContext('2d');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Categories'],
          datasets: [
            {
              data: [count],
              backgroundColor: ['#f97316'],
              borderWidth: 0,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
        },
      });
    });
  }

  loadProductChart(): void {
    this.productService.getAllProducts().subscribe((response: any) => {
      const count = response.products.length;
      this.totalProducts = count;
      const ctx = this.productChartCanvas.nativeElement.getContext('2d');
      if (!ctx) return;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Products'],
          datasets: [
            {
              label: 'Total Products',
              data: [count],
              backgroundColor: ['#10b981'],
              borderRadius: 8,
            },
          ],
        },
        options: {
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true } },
        },
      });
    });
  }
}
