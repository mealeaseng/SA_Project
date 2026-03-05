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
  @ViewChild('categoryChartCanvas') categoryChartCanvas!: ElementRef<HTMLCanvasElement>;
  @ViewChild('productChartCanvas') productChartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private productService: ProductService
  ) {}

  ngAfterViewInit(): void {
    this.loadProductChart();
  }

  loadProductChart(): void {
    this.productService.getAllProducts().subscribe((products) => {
      const count = products.length;
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
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: { display: true, text: 'Products Count', font: { size: 16 } },
            legend: { display: false },
          },
          scales: { y: { beginAtZero: true } },
        },
      });
    });
  }
}
