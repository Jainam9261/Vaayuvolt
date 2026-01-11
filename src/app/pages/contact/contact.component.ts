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

/**
 * ContactComponent
 * 
 * Contact page with reactive form for inquiries and quote requests.
 */
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

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9]*$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      honeypot: [''] // Spam prevention
    });
  }

  onSubmit(): void {
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

    // Check honeypot
    if (this.contactForm.value.honeypot) {
      return; // Bot detected, silently fail
    }

    // Prepare mailto link
    const { name, email, phone, message } = this.contactForm.value;

    const subject = 'New Contact Form Inquiry';

    // Build email body with proper line breaks
    const bodyLines = [
      '=================================',
      'CONTACT FORM SUBMISSION',
      '=================================',
      '',
      `Full Name: ${name}`,
      `Email: ${email}`,
      `Mobile Number: ${phone}`,
      '',
      'MESSAGE:',
      '---',
      message || 'No message provided',
      '',
      '=================================',
    ];

    const body = bodyLines.join('%0D%0A');

    const mailtoLink = `mailto:${CONTACT_INFO.EMAIL}?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    this.submitSuccess = true;
    this.contactForm.reset();

    // Reset success message after 5 seconds
    setTimeout(() => {
      this.submitSuccess = false;
    }, 5000);
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

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
      if (field.errors['minlength']) {
        return `Message must be at least ${field.errors['minlength'].requiredLength} characters`;
      }
    }
    return '';
  }

  onNameInput(event: any): void {
    const input = event.target as HTMLInputElement;
    // Replace anything that is NOT a letter or space
    input.value = input.value.replace(/[^a-zA-Z\s]/g, '');
    this.contactForm.get('name')?.setValue(input.value);
  }

  onPhoneInput(event: any): void {
    const input = event.target as HTMLInputElement;
    // Replace anything that is NOT a number
    input.value = input.value.replace(/[^0-9]/g, '');
    this.contactForm.get('phone')?.setValue(input.value);
  }
}


