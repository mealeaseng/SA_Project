import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

// ✅ Tell TypeScript that `Chart` exists globally
declare const Chart: any;

@Component({
  selector: 'app-home',
  template: `
    <p>homepage works!</p>
    <div style="width: 600px; height: 400px;">
      <canvas #chartCanvas></canvas>
    </div>
  `,
  styles: [],
})
export class Homepage implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  ngAfterViewInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [
            {
              label: 'Users',
              data: [12, 19, 3, 5],
              backgroundColor: '#3b82f6',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: 'Monthly Active Users',
            },
          },
        },
      });
    }
  }
}
