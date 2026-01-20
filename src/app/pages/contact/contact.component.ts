import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { WhatsAppFabComponent } from '../../shared/components/whatsapp-fab/whatsapp-fab.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { CONTACT_INFO } from '../../core/constants/contact.constants';
import { ToastService } from '../../core/services/toast.service';
import { environment } from '../../../environments/environment';

// Contact page component for handling inquiries and quote requests
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TopbarComponent,
    NavbarComponent,
    FooterComponent,
    WhatsAppFabComponent,
    RevealOnScrollDirective,
    PageHeaderComponent
  ],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';
  formValidationError = false;
  formErrors: string[] = [];

  contactInfo = {
    phone: CONTACT_INFO.PHONE,
    email: CONTACT_INFO.EMAIL
  };

  constructor(
    private fb: FormBuilder,
    private toastService: ToastService
  ) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      message: ['', [Validators.required]],
      honeypot: [''] // Spam prevention
    });
  }

  // Handles contact form submission process
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

    // Validate honeypot field to block bots
    if (this.contactForm.value.honeypot) {
      return; // Bot detected, silently fail
    }

    // Send data to backend API avoiding preflight requests
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

          // Auto-hide success message after delay
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

  // Marks all form controls as touched to display validation errors
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  // Returns validation error message for a specific field
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

  // Enforces strict alphabetic input for name field
  onNameInput(event: any): void {
    const input = event.target as HTMLInputElement;
    // Replace anything that is NOT a letter or space
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
    this.contactForm.get('name')?.setValue(input.value);
  }

  // Enforces strict numeric input for phone field
  onPhoneInput(event: any): void {
    const input = event.target as HTMLInputElement;
    // Replace anything that is NOT a number
    input.value = input.value.replace(/[^0-9]/g, '');
    this.contactForm.get('phone')?.setValue(input.value);
  }
}


