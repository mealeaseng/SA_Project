import { Component, AfterViewInit } from '@angular/core';

declare const AOS: any; // Tell TypeScript about AOS

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class App implements AfterViewInit {
  ngAfterViewInit() {
    AOS.init({
      duration: 1200,
      once: false,
      mirror: true,
      easing: 'ease-in-out',
    });
  }
}
