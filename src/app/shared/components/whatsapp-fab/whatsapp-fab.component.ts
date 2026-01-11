import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * WhatsAppFabComponent
 * 
 * Floating action button for quick WhatsApp contact.
 * Sticky bottom-right, opens WhatsApp in new tab.
 */
@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-fab.component.html',
  styleUrl: './whatsapp-fab.component.scss'
})
export class WhatsAppFabComponent {
  whatsappNumber = '918490051250'; // Format: country code + number without + (use +91 8490051250 → 918490051250)
  whatsappUrl = `https://wa.me/${this.whatsappNumber}`;
  tooltipText = 'Message us on WhatsApp';

  openWhatsApp(): void {
    window.open(this.whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}

