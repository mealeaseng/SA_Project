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
      image: 'https://i.pinimg.com/1200x/34/eb/75/34eb75d5d66fc39656f322ac93bc2206.jpg',
      alt: 'Modern convenience store interior',
    },
    {
      image: 'https://i.pinimg.com/736x/65/3c/24/653c24878fc90171f02029138207dd50.jpg',
      alt: 'Fresh produce section',
    },
    {
      image: 'https://i.pinimg.com/1200x/53/4e/12/534e125e5a0f94ba2ea3bf7716985d38.jpg',
      alt: 'Well-stocked shelves',
    },
    {
      image: 'https://i.pinimg.com/1200x/5f/39/f2/5f39f213a8e28cd93cc2e9891fe5346c.jpg',
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
