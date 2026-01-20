import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Floating action button for quick WhatsApp contact access
@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './whatsapp-fab.component.html',
  styleUrl: './whatsapp-fab.component.scss'
})
export class WhatsAppFabComponent {
  whatsappNumber = '918490051250'; // Country code + number (no plus sign)
  whatsappUrl = `https://wa.me/${this.whatsappNumber}`;
  tooltipText = 'Message us on WhatsApp';

  openWhatsApp(): void {
    window.open(this.whatsappUrl, '_blank', 'noopener,noreferrer');
  }
}

