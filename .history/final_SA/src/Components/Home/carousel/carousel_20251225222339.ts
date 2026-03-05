import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.html',
  styleUrls: ['./carousel.css'],
})
export class Carousel implements OnInit, OnDestroy {
  current = 0;
  intervalId: any;
  autoPlay = true;
  autoPlayInterval = 5000; // 5 seconds

  slides = [
    {
      image:
        'https://assets-us-01.kc-usercontent.com/9e9a95c0-1d15-00d5-e878-50f070203f13/0cff492c-5c80-4a29-8fb1-8b1d43aef52d/market-place-by-jasons-slider-1.jpg',
      alt: 'Modern convenience store interior',
    },
    {
      image:
        'https://media-na.propain-bikes.com/wp-content/uploads/sites/4/2021/07/18222508/PROPAIN-Rage-CF-MY22-Leogang-Ride-Practice-1501.jpg',
      alt: 'Fresh produce section',
    },
    {
      image:
        'https://image.made-in-china.com/2f0j00PSIhUfyMAsGF/Modern-Indoor-Children-Toys-Kids-Playground-Equipment-Market-Child-Space-Equipment-Indoor-Slides-Indoor.webp',
      alt: 'Well-stocked shelves',
    },
    {
      image:
        'https://media.gettyimages.com/id/1556119299/photo/empty-aisles-at-a-supermarket.jpg?s=612x612&w=gi&k=20&c=SDoABBa2t8q963dJudW9GOrZkcB2HOct7wfxNHhxVks=',
      alt: 'Store exterior at night',
    },
  ];

  ngOnInit(): void {
    this.startAutoPlay();
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  startAutoPlay(): void {
    if (this.autoPlay) {
      this.intervalId = setInterval(() => this.nextSlide(), this.autoPlayInterval);
    }
  }

  stopAutoPlay(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggleAutoPlay(): void {
    this.autoPlay = !this.autoPlay;
    if (this.autoPlay) {
      this.startAutoPlay();
    } else {
      this.stopAutoPlay();
    }
  }

  nextSlide(): void {
    this.current = (this.current + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.current = this.current === 0 ? this.slides.length - 1 : this.current - 1;
  }

  goToSlide(index: number): void {
    this.current = index;
    // Reset autoplay timer when manually changing slides
    if (this.autoPlay) {
      this.stopAutoPlay();
      this.startAutoPlay();
    }
  }

  scrollToProducts(): void {
    // Scroll to products section
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // Optional: Pause autoplay on hover for better UX
  onMouseEnter(): void {
    this.stopAutoPlay();
  }

  onMouseLeave(): void {
    if (this.autoPlay) {
      this.startAutoPlay();
    }
  }

  // Keyboard navigation
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft') {
      this.prevSlide();
    } else if (event.key === 'ArrowRight') {
      this.nextSlide();
    } else if (event.key === ' ') {
      this.toggleAutoPlay();
    }
  }
}
