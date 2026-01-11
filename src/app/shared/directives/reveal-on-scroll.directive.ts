import { Directive, ElementRef, Input, AfterViewInit, OnDestroy } from '@angular/core';

/**
 * RevealOnScrollDirective
 * 
 * Adds animation classes when element becomes visible in viewport.
 * Uses IntersectionObserver for performance.
 * 
 * Usage:
 *   <div revealOnScroll="fade-up">Content</div>
 *   <div revealOnScroll="fade-left" [revealDelay]="100">Content</div>
 */
@Directive({
  selector: '[revealOnScroll]',
  standalone: true
})
export class RevealOnScrollDirective implements AfterViewInit, OnDestroy {
  @Input() revealOnScroll: 'fade-up' | 'fade-left' | 'fade-right' = 'fade-up';
  @Input() revealDelay: number = 0;
  @Input() revealThreshold: number = 0.15;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    // Check if IntersectionObserver is available (browser environment)
    if (typeof IntersectionObserver === 'undefined') {
      // SSR or browser doesn't support it - just show the element immediately
      const element = this.el.nativeElement;
      element.classList.add('reveal');
      element.classList.add(this.revealOnScroll);
      element.classList.add('is-visible');
      return;
    }

    // Add base reveal class
    const element = this.el.nativeElement;
    element.classList.add('reveal');
    element.classList.add(this.revealOnScroll);

    // Create IntersectionObserver
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
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}



