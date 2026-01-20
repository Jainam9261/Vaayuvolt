import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// Directive to trigger animations when elements scroll into view
@Directive({
  selector: '[revealOnScroll]',
  standalone: true
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  @Input() revealOnScroll: 'fade-up' | 'fade-left' | 'fade-right' = 'fade-up';
  @Input() revealDelay: number = 0;
  @Input() revealThreshold: number = 0.15;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>, @Inject(PLATFORM_ID) private platformId: Object) { }

  ngAfterViewInit(): void {
    // Check for browser environment and IntersectionObserver support
    if (isPlatformBrowser(this.platformId) && typeof IntersectionObserver !== 'undefined') {
      // Initialize element with base animation classes
      const element = this.el.nativeElement;
      element.classList.add('reveal');
      element.classList.add(this.revealOnScroll);

      // Setup IntersectionObserver to detect visibility
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              // Apply delay if specified
              setTimeout(() => {
                element.classList.add('is-visible');
                // Unobserve after animation triggers
                this.observer?.unobserve(element);
              }, this.revealDelay);
            }
          });
        },
        {
          threshold: this.revealThreshold,
          rootMargin: '0px 0px -50px 0px' // Trigger slightly before element is fully visible
        }
      );

      // Start observing
      this.observer.observe(element);
    } else {
      // Fallback for SSR: show immediately
      const element = this.el.nativeElement;
      element.classList.add('reveal');
      element.classList.add(this.revealOnScroll);
      element.classList.add('is-visible');
    }
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}



