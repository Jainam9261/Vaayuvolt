import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CONTACT_INFO, SOCIAL_LINKS } from '../../../core/constants/contact.constants';

// Main application footer component displaying links and contact info
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

  quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products' },
    { path: '/why-choose-us', label: 'Why Choose Us' },
    { path: '/faqs', label: 'FAQs' },
    { path: '/contact', label: 'Contact Us' }
  ];

  socialLinks = [
    {
      name: 'Instagram',
      url: SOCIAL_LINKS.INSTAGRAM,
      icon: 'instagram'
    },
    {
      name: 'Facebook',
      url: SOCIAL_LINKS.FACEBOOK,
      icon: 'facebook'
    },
    {
      name: 'LinkedIn',
      url: SOCIAL_LINKS.LINKEDIN,
      icon: 'linkedin'
    }
  ];

  contactInfo = {
    phone: CONTACT_INFO.PHONE,
    email: CONTACT_INFO.EMAIL,
    address: CONTACT_INFO.ADDRESS
  };

  get phoneUrl(): string {
    return `tel:${this.contactInfo.phone.replace(/\s/g, '')}`;
  }

  get emailUrl(): string {
    return `mailto:${this.contactInfo.email}`;
  }

  get addressUrl(): string {
    // Returns Google Maps search URL for the address
    const encodedAddress = encodeURIComponent(this.contactInfo.address);
    return `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
  }
}


