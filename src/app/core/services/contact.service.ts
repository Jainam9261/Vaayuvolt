import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactFormData {
  name: string;
  company?: string;
  email: string;
  phone: string;
  message: string;
  attachments?: File[];
  honeypot?: string; // Spam prevention
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

/**
 * ContactService
 * 
 * Handles contact form submissions and quote requests.
 */
@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = '/api/contact'; // Placeholder endpoint

  constructor(private http: HttpClient) {}

  /**
   * Send contact/quote form data
   */
  sendQuote(data: ContactFormData): Observable<ContactResponse> {
    // In a real application, this would POST to the backend API
    // For now, we'll simulate a successful response
    return new Observable(observer => {
      setTimeout(() => {
        observer.next({
          success: true,
          message: 'Thank you for your inquiry! We will get back to you soon.'
        });
        observer.complete();
      }, 1000);
    });
    
    // Uncomment when backend is ready:
    // const formData = new FormData();
    // Object.keys(data).forEach(key => {
    //   if (data[key as keyof ContactFormData] !== undefined) {
    //     formData.append(key, data[key as keyof ContactFormData] as string | Blob);
    //   }
    // });
    // return this.http.post<ContactResponse>(this.apiUrl, formData);
  }
}



