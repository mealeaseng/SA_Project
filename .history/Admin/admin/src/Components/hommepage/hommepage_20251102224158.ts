import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  template: `
    <div style="width: 600px; height: 400px;">
      <canvas #chartCanvas></canvas>
    </div>
  `,
})
export class Hommepage implements AfterViewInit {
  @ViewChild('chartCanvas', { static: true }) chartCanvas!: ElementRef<HTMLCanvasElement>;

  constructor(private userService: UserService) {}

  ngAfterViewInit(): void {
    Chart.register(...registerables);
    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        // 🧮 Count how many users were created per month
        const monthCounts: Record<string, number> = {};

        users.forEach((user) => {
          const date = new Date(user.date);
          const month = date.toLocaleString('default', { month: 'short' }); // e.g. "Jan"
          monthCounts[month] = (monthCounts[month] || 0) + 1;
        });

        const labels = Object.keys(monthCounts);
        const values = Object.values(monthCounts);

        this.renderChart(labels, values);
      },
      error: (err) => console.error('Error fetching users', err),
    });
  }

  renderChart(labels: string[], values: number[]): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'User Registrations',
              data: values,
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
              text: 'Users Registered Per Month',
            },
            legend: { display: true },
          },
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }
}
