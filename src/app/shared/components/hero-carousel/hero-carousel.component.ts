import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { register } from 'swiper/element/bundle';

// Register Swiper web component
register();

// Premium hero carousel component with optimized images and animations
@Component({
  selector: 'app-hero-carousel',
  standalone: true,
  imports: [CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './hero-carousel.component.html',
  styleUrl: './hero-carousel.component.scss'
})
export class HeroCarouselComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);
  private elementRef = inject(ElementRef);

  isVisible = false;
  imageLoaded: { [key: number]: boolean } = {};

  slides = [
    {
      image: 'assets/images/hero_slide_1.png',
    },
    {
      image: 'assets/images/hero_slide_2.png',
    },
    {
      image: 'assets/images/hero_slide_3.png',
    },
    {
      image: 'assets/images/hero_slide_4.png',
    }
  ];

  ngOnInit(): void {
    // Initialize component and set visibility
    this.isVisible = true;

    // Preload carousel images for smoother transitions
    if (isPlatformBrowser(this.platformId)) {
      this.slides.forEach((slide, index) => {
        const img = new Image();
        img.src = slide.image;
        img.onload = () => {
          this.imageLoaded[index] = true;
        };
        // Mark image as loaded if already in cache
        if (img.complete) {
          this.imageLoaded[index] = true;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    // Ensure component visibility after view initialization
    this.isVisible = true;

    // Setup intersection observer for entry animations
    if (isPlatformBrowser(this.platformId)) {
      // Use setTimeout to ensure DOM is fully ready
      setTimeout(() => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                this.isVisible = true;
                observer.disconnect();
              }
            });
          },
          {
            threshold: 0.01,
            rootMargin: '100px'
          }
        );

        const element = this.elementRef.nativeElement.querySelector('.hero-carousel-wrapper');
        if (element) {
          observer.observe(element);
          // Check if element is already within viewport
          if (element.getBoundingClientRect().top < window.innerHeight) {
            this.isVisible = true;
          }
        }
      }, 100);
    }
  }

  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;

    // Match loaded image with slide to update loading state
    const slideIndex = this.slides.findIndex((slide) => {
      const imgSrc = img.src;
      const slidePath = slide.image;
      const fileName = slidePath.split('/').pop() || '';
      // Verify if image source matches slide path
      return imgSrc.includes(fileName);
    });

    // Update loading state for specific slide
    if (slideIndex >= 0) {
      this.imageLoaded[slideIndex] = true;
    } else {
      // Fallback search for matching slide
      this.slides.forEach((slide, idx) => {
        if (img.src.includes(slide.image.split('/').pop() || '')) {
          this.imageLoaded[idx] = true;
        }
      });
    }
  }

  onImageError(_event: Event, index: number): void {
    // Handle image load errors gracefully
    this.imageLoaded[index] = true;
  }
}


