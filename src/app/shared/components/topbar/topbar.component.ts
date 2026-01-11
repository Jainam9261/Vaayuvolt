import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * TopbarComponent
 * 
 * Top information bar displaying contact info (phone, email, location).
 * Appears above the main navbar.
 */
@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  phone = '+91 8490051250';
  email = 'info@vaayuvolt.com';

  get phoneUrl(): string {
    return `tel:${this.phone.replace(/\s/g, '')}`;
  }

  get emailUrl(): string {
    return `mailto:${this.email}`;
  }
}


