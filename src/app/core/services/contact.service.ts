import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactFormData, ContactResponse, GoogleSheetsPayload } from '../models/common.models';

// Service for managing contact form submissions
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) { }

  // Submits form data to Google Sheets via backend API
  submitForm(formData: ContactFormData): Observable<any> {
    // Map form data to backend format
    const payload: GoogleSheetsPayload = {
      fullName: formData.name,
      email: formData.email,
      mobile: formData.phone,
      message: formData.message,
      secret: environment.contactSecret
    };

    return this.http.post(environment.contactApiUrl, payload);
  }

  // Backward compatibility wrapper for submitting quotes
  sendQuote(data: ContactFormData): Observable<any> {
    return this.submitForm(data);
  }
}