// Centralized interface definitions used across the application

// Interface definitions for Google Sheets API payload
export interface GoogleSheetsPayload {
    fullName: string;
    email: string;
    mobile: string;
    message: string;
    secret: string;
}

// Interface definitions for contact form data structure
export interface ContactFormData {
    name: string;
    company?: string;
    email: string;
    phone: string;
    message: string;
    attachments?: File[];
    honeypot?: string; // Spam prevention
}

// Interface definitions for API response structure
export interface ContactResponse {
    success: boolean;
    message: string;
}

// Interface definitions for toast notification structure
export interface Toast {
    id: number;
    type: 'success' | 'error' | 'info';
    message: string;
    duration?: number;
}

// Interface definitions for product structure
export interface Product {
    id: number;
    name: string;
    description?: string;
    image: string;
    images?: string[];
    features?: string[];
    specifications?: { [key: string]: string };
}

// Interface definitions for FAQ structure
export interface FAQ {
    id: number;
    question: string;
    answer: string;
}

// Interface definitions for contact information structure
export interface ContactInfo {
    email: string;
    phone: string;
    address?: string;
}

// Interface definitions for social media links structure
export interface SocialLinks {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
    twitter?: string;
}
