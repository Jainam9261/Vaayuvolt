import { Component, signal, OnInit, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { HeroCarouselComponent } from '../../shared/components/hero-carousel/hero-carousel.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { WhatsAppFabComponent } from '../../shared/components/whatsapp-fab/whatsapp-fab.component';
import { ProductCardComponent, Product } from '../../shared/components/product-card/product-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { CONTACT_INFO } from '../../core/constants/contact.constants';
import { ToastService } from '../../core/services/toast.service';
import { environment } from '../../../environments/environment';

// Home page component acting as the main landing page
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    TopbarComponent,
    NavbarComponent,
    HeroCarouselComponent,
    FooterComponent,
    WhatsAppFabComponent,
    RevealOnScrollDirective
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  formValidationError = false;
  formErrors: string[] = [];

  constructor(
    private fb: FormBuilder,
    @Inject(PLATFORM_ID) private platformId: Object,
    private toastService: ToastService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      message: ['', [Validators.required]],
      honeypot: ['']
    });
  }
  features = [
    {
      icon: '🌱',
      title: 'Sustainable Solutions',
      description: 'Committed to providing eco-friendly energy solutions that reduce carbon footprint and promote environmental sustainability.'
    },
    {
      icon: '⚡',
      title: 'Innovation',
      description: 'Leading the industry with cutting-edge technology and best practices in renewable energy systems.'
    },
    {
      icon: '🤝',
      title: 'Trusted Partnership',
      description: 'Building long-term relationships with our clients through reliability, excellence, and exceptional service.'
    },
    {
      icon: '🏆',
      title: 'Quality Assurance',
      description: 'Rigorous quality standards ensure the highest performance, durability, and customer satisfaction.'
    }
  ];

  // Featured products displayed on the home page
  featuredProducts = [
    {
      id: 1,
      name: 'Vertical Axis Wind Turbine',
      image: '/assets/images/Product 1 img 2.jpeg' // Using the main image of Product 1
    },
    {
      id: 2,
      name: 'Solar & Wind Hybrid Street Light',
      image: '/assets/images/Product 2 img 1.png'
    },
    {
      id: 3,
      name: 'Solar & Wind Hybrid Turbine',
      image: '/assets/images/Product 3 img 1.png'
    }
  ];

  // Carousel data and configuration

  whyChooseUsFeatures = [
    {
      icon: '🇮🇳',
      title: 'Engineered for India',
      description: 'Engineered specifically for India’s low and variable wind conditions.'
    },
    {
      icon: '🌙',
      title: '24/7 Power',
      description: 'Generates clean electricity day and night, unlike solar-only systems.'
    },
    {
      icon: '🛡️',
      title: 'Superior Durability',
      description: 'The blade material has superior strength and long-term durability.'
    },
    {
      icon: '🏙️',
      title: 'Compact Design',
      description: 'Compact and portable design ideal for rooftops and limited spaces.'
    },
    {
      icon: '🤫',
      title: 'Silent Operation',
      description: 'Quiet, low-vibration operation suitable for residential and commercial areas.'
    },
    {
      icon: '🌪️',
      title: 'Turbulence Ready',
      description: 'Performs reliably in turbulent, multi-directional wind flows.'
    },
    {
      icon: '🔋',
      title: 'Hybrid Ready',
      description: 'Hybrid-ready for seamless integration with solar and battery systems.'
    },
    {
      icon: '🔧',
      title: 'Low Maintenance',
      description: 'Designed for minimal maintenance and long service life.'
    },
    {
      icon: '⚡',
      title: 'Real Output',
      description: 'Focused on real, usable energy output—not inflated ratings.'
    },
    {
      icon: '⚙️',
      title: 'Expertise Backed',
      description: 'Made in India, backed by mechanical engineering expertise.'
    },
    {
      icon: '🛠️',
      title: 'Hassle-free Install',
      description: 'Hassle-free installation with online and field-based evaluation.'
    },
    {
      icon: '🚚',
      title: 'Pan-India Service',
      description: 'Extensive all-India logistics and after-sales service.'
    }
  ];

  currentSlideIndex = 0;
  itemsPerSlide = 3;
  private autoSlideInterval: any;
  isBrowser = false;

  ngOnInit() {
    if (this.isBrowser) {
      this.startAutoSlide();
    }
  }

  ngOnDestroy() {
    this.stopAutoSlide();
  }

  // Computes visible features for sliding carousel effect
  get visibleFeatures() {
    // Return a slice based on current index. Wrap around logic is handled in prev/next
    // But for a simple carousel, we can just slice.
    // To handle wrap-around visuals simply, we might need a more complex carousel,
    // but a sliding window is good for now.

    // Create a circular list for infinite-like feel
    const features = [...this.whyChooseUsFeatures, ...this.whyChooseUsFeatures];
    return features.slice(this.currentSlideIndex, this.currentSlideIndex + this.itemsPerSlide);
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.whyChooseUsFeatures.length;
    this.resetAutoSlide();
  }

  prevSlide() {
    this.currentSlideIndex = (this.currentSlideIndex - 1 + this.whyChooseUsFeatures.length) % this.whyChooseUsFeatures.length;
    this.resetAutoSlide();
  }

  startAutoSlide() {
    this.stopAutoSlide();
    this.autoSlideInterval = setInterval(() => {
      this.currentSlideIndex = (this.currentSlideIndex + 1) % this.whyChooseUsFeatures.length;
    }, 3000);
  }

  stopAutoSlide() {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  resetAutoSlide() {
    this.stopAutoSlide();
    this.startAutoSlide();
  }

  openFaqId = signal<number | null>(null);

  homeFaqs = [
    {
      id: 1,
      question: 'Does Vaayuvolt work in low-wind areas?',
      answer: 'Yes. Vaayuvolt is specifically designed for low and variable wind regions, where traditional horizontal turbines fail. Its vertical-axis design captures wind from all directions, making it effective on rooftops and built-up areas.'
    },
    {
      id: 2,
      question: 'Can Vaayuvolt make my electricity bill zero?',
      answer: `Vaayuvolt can reduce or eliminate electricity bills when:
• Installed at a wind-feasible site
• Sized correctly as per load
• Used in hybrid systems (wind + solar + battery)
Final results depend on consumption and site conditions.`
    },
    {
      id: 3,
      question: 'Can Vaayuvolt work with solar panels?',
      answer: `Absolutely. Vaayuvolt is hybrid-ready and works seamlessly with:
• Solar panels
• Batteries
• Charge controllers
• Inverters
This ensures continuous power generation even when sunlight is unavailable.`
    },
    {
      id: 4,
      question: 'How do I know if my location is suitable?',
      answer: `We provide online and offline site assessment based on:
• Wind availability
• Rooftop height
• Surroundings
• Power requirement
This ensures correct sizing and performance expectations.`
    }
  ];

  toggleFaq(id: number): void {
    if (this.openFaqId() === id) {
      this.openFaqId.set(null);
    } else {
      this.openFaqId.set(id);
    }
  }

  isFaqOpen(id: number): boolean {
    return this.openFaqId() === id;
  }


  // Handles contact form submission
  onSubmit(event?: Event): void {
    // Prevent default form submission
    if (event) {
      event.preventDefault();
    }

    // Reset validation errors
    this.formValidationError = false;
    this.formErrors = [];
    this.submitError = '';

    if (this.contactForm.invalid || this.isSubmitting) {
      this.markFormGroupTouched(this.contactForm);

      // Collect all validation errors
      this.formValidationError = true;
      Object.keys(this.contactForm.controls).forEach(key => {
        const control = this.contactForm.get(key);
        if (control?.invalid && control?.touched && key !== 'honeypot') {
          const error = this.getFieldError(key);
          if (error) this.formErrors.push(error);
        }
      });

      return;
    }

    if (this.contactForm.value.honeypot) {
      return;
    }

    // Submit to Google Sheets using URLSearchParams (avoids preflight)
    this.isSubmitting = true;

    const body = new URLSearchParams();
    body.set('fullName', this.contactForm.value.name);
    body.set('email', this.contactForm.value.email.toLowerCase());
    body.set('mobile', this.contactForm.value.phone);
    body.set('message', this.contactForm.value.message);
    body.set('secret', environment.contactSecret);

    fetch(environment.contactApiUrl, {
      method: 'POST',
      body: body
    })
      .then(res => res.json())
      .then(res => {
        this.isSubmitting = false;
        if (res.status === 'success') {
          this.submitSuccess = true;
          this.toastService.success('Thank you for reaching out. We have received your message and will be in touch soon.');
          this.contactForm.reset();

          // Reset success message after 5 seconds
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        } else {
          this.submitError = 'Submission failed. Please try again.';
          this.toastService.error('We were unable to send your message at this time. Please try again shortly.');
        }
      })
      .catch(() => {
        this.isSubmitting = false;
        this.submitError = 'Network error. Please try again later.';
        this.toastService.error('We were unable to send your message at this time. Please try again shortly.');
      });
  }

  // Marks all form fields as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Retrieves validation errors for a field
  getFieldError(fieldName: string): string {
    const field = this.contactForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) {
        return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
      }
      if (field.errors['email']) {
        return 'Please enter a valid email address';
      }
      if (field.errors['pattern']) {
        if (fieldName === 'name') return 'Name must contain only alphabets';
        if (fieldName === 'phone') return 'Phone must contain only numbers';
      }
    }
    return '';
  }
  // Enforces alphabetic input for name
  onNameInput(event: any): void {
    const input = event.target as HTMLInputElement;
    // Replace anything that is NOT a letter or space
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
    this.contactForm.get('name')?.setValue(input.value);
  }

  // Enforces numeric input for phone
  onPhoneInput(event: any): void {
    const input = event.target as HTMLInputElement;
    // Replace anything that is NOT a number
    input.value = input.value.replace(/[^0-9]/g, '');
    this.contactForm.get('phone')?.setValue(input.value);
  }
}



