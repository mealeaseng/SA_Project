import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserService } from '../Services/userservice';

declare const Chart: any;

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
    this.loadUserData();
  }

  // ✅ Get users from API via UserService
  loadUserData(): void {
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        const monthCounts: Record<string, number> = {};

        users.forEach((user) => {
          const month = new Date(user.date).toLocaleString('default', { month: 'short' });
          monthCounts[month] = (monthCounts[month] || 0) + 1;
        });

        const labels = Object.keys(monthCounts);
        const values = Object.values(monthCounts);

        this.renderChart(labels, values);
      },
      error: (err) => console.error('Error fetching user data:', err),
    });
  }

  renderChart(labels: string[], values: number[]): void {
    const ctx = this.chartCanvas.nativeElement.getContext('2d');
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
          title: {
            display: true,
            text: 'User Registrations by Month',
            font: { size: 18 },
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
