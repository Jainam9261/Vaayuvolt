import { Component, CUSTOM_ELEMENTS_SCHEMA, OnInit, AfterViewInit, ElementRef, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { register } from 'swiper/element/bundle';

// Register Swiper web component
register();

/**
 * HeroCarouselComponent
 * 
 * Premium hero carousel that displays images in their original 3:2 aspect ratio (1536×1024).
 * - Images are fully visible, never cropped or stretched
 * - Centered container with max-width for large screens
 * - Smooth scale-in animation on load
 * - Auto-advance every 3 seconds
 * - Fully responsive across all devices
 * - Premium styling with border-radius and subtle shadows
 * Uses SwiperJS for carousel functionality.
 */
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
      image: '/assets/images/carousal1.png'
    },
    {
      image: '/assets/images/carousal2.png'
    },
    {
      image: '/assets/images/carousal3.png'
    },
    {
      image: '/assets/images/carousal4.png'
    }
  ];

  ngOnInit(): void {
    // Make visible immediately for instant display
    this.isVisible = true;

    // Preload all images for smooth carousel transitions
    if (isPlatformBrowser(this.platformId)) {
      this.slides.forEach((slide, index) => {
        const img = new Image();
        img.src = slide.image;
        img.onload = () => {
          this.imageLoaded[index] = true;
        };
        // If image is already cached, mark as loaded
        if (img.complete) {
          this.imageLoaded[index] = true;
        }
      });
    }
  }

  ngAfterViewInit(): void {
    // Ensure visibility is set
    this.isVisible = true;

    // Trigger animation when element enters viewport (for smooth entrance)
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
          // Also trigger immediately if already in viewport
          if (element.getBoundingClientRect().top < window.innerHeight) {
            this.isVisible = true;
          }
        }
      }, 100);
    }
  }

  onImageLoad(event: Event): void {
    const img = event.target as HTMLImageElement;

    // Find the index of the loaded image by checking src
    const slideIndex = this.slides.findIndex((slide) => {
      const imgSrc = img.src;
      const slidePath = slide.image;
      const fileName = slidePath.split('/').pop() || '';
      // Check if image src contains the slide path
      return imgSrc.includes(fileName);
    });

    // Mark this specific image as loaded
    if (slideIndex >= 0) {
      this.imageLoaded[slideIndex] = true;
    } else {
      // Fallback: try to find by checking all slides
      this.slides.forEach((slide, idx) => {
        if (img.src.includes(slide.image.split('/').pop() || '')) {
          this.imageLoaded[idx] = true;
        }
      });
    }
  }

  onImageError(_event: Event, index: number): void {
    // Silently handle image load errors to prevent stuck loading state
    // In production, you might want to log this or show a fallback image
    this.imageLoaded[index] = true;
  }
}


