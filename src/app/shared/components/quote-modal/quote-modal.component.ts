import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService, ContactFormData } from '../../../core/services/contact.service';

/**
 * QuoteModalComponent
 * 
 * Modal component for quick quote requests.
 * Can be used standalone or embedded in other components.
 */
@Component({
  selector: 'app-quote-modal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './quote-modal.component.html',
  styleUrl: './quote-modal.component.scss'
})
export class QuoteModalComponent {
  @Input() isOpen = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() quoteSubmitted = new EventEmitter<void>();

  quoteForm: FormGroup;
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(
    private fb: FormBuilder,
    private contactService: ContactService
  ) {
    this.quoteForm = this.fb.group({
      name: ['', [Validators.required]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s()-]+$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]],
      honeypot: [''] // Spam prevention
    });
  }

  close(): void {
    this.isOpen = false;
    this.closeModal.emit();
    this.resetForm();
  }

  onSubmit(): void {
    if (this.quoteForm.invalid || this.isSubmitting) {
      this.markFormGroupTouched(this.quoteForm);
      return;
    }

    // Check honeypot
    if (this.quoteForm.value.honeypot) {
      return; // Bot detected, silently fail
    }

    this.isSubmitting = true;
    this.submitError = '';

    const formData: ContactFormData = {
      name: this.quoteForm.value.name,
      company: this.quoteForm.value.company,
      email: this.quoteForm.value.email,
      phone: this.quoteForm.value.phone,
      message: this.quoteForm.value.message
    };

    this.contactService.sendQuote(formData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.submitSuccess = true;
        this.quoteSubmitted.emit();
        
        // Reset form after 3 seconds
        setTimeout(() => {
          this.resetForm();
          this.close();
        }, 3000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitError = 'An error occurred. Please try again later.';
        console.error('Quote submission error:', error);
      }
    });
  }

  private resetForm(): void {
    this.quoteForm.reset();
    this.submitSuccess = false;
    this.submitError = '';
    this.isSubmitting = false;
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.keys(formGroup.controls).forEach(key => {
      const control = formGroup.get(key);
      control?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.quoteForm.get(fieldName);
    if (field?.hasError('required') && field?.touched) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    if (field?.hasError('email') && field?.touched) {
      return 'Please enter a valid email address';
    }
    if (field?.hasError('pattern') && field?.touched) {
      return 'Please enter a valid phone number';
    }
    if (field?.hasError('minlength') && field?.touched) {
      return `Message must be at least ${field.errors?.['minlength'].requiredLength} characters`;
    }
    return '';
  }
}



