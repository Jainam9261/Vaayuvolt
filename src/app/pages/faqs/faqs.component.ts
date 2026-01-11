import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { WhatsAppFabComponent } from '../../shared/components/whatsapp-fab/whatsapp-fab.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

/**
 * FAQsComponent
 * 
 * FAQs page with updated questions about VaayuVolt.
 */
@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TopbarComponent,
    NavbarComponent,
    FooterComponent,
    WhatsAppFabComponent,
    RevealOnScrollDirective,
    PageHeaderComponent
  ],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss'
})
export class FAQsComponent {
  openFaqId = signal<number | null>(null);

  faqs: FAQ[] = [
    {
      id: 1,
      question: 'What is VaayuVolt?',
      answer: 'Vaayuvolt is a compact Vertical Axis Wind Turbine (VAWT) designed for rooftops and urban locations. It generates clean electricity from wind, even at low wind speeds, and works day & night, unlike solar-only systems.'
    },
    {
      id: 2,
      question: 'At what minimum wind speed does Vaayuvolt start generating power?',
      answer: 'Vaayuvolt is engineered to start rotating at wind speeds as low as 2–2.5 m/s. Actual usable power generation improves as wind speed increases, which makes it suitable for Indian city and semi-urban conditions. Vaayuvolt generates perfect power when wind speed is as per rated speed of model.'
    },
    {
      id: 3,
      question: 'Does Vaayuvolt work in low-wind areas?',
      answer: 'Yes. Vaayuvolt is specifically designed for low and variable wind regions, where traditional horizontal turbines fail. Its vertical-axis design captures wind from all directions, making it effective on rooftops and built-up areas.'
    },
    {
      id: 4,
      question: 'How much electricity can Vaayuvolt generate?',
      answer: `Power output depends on:
• Average wind speed
• Turbine model (100W / 300W / 500W etc.)
• Installation height and surroundings
In suitable conditions, Vaayuvolt can significantly reduce electricity bills and, when combined with solar, help achieve near-zero electricity cost.`
    },
    {
      id: 5,
      question: 'Can Vaayuvolt make my electricity bill zero?',
      answer: `Vaayuvolt can reduce or eliminate electricity bills when:
• Installed at a wind-feasible site
• Sized correctly as per load
• Used in hybrid systems (wind + solar + battery)
Final results depend on consumption and site conditions.`
    },
    {
      id: 6,
      question: 'Does Vaayuvolt work at night?',
      answer: 'Yes ✅ That is one of its biggest advantages. Vaayuvolt generates electricity day and night as long as wind is available, complementing solar power perfectly.'
    },
    {
      id: 7,
      question: 'Is Vaayuvolt noisy?',
      answer: `No. Vaayuvolt is designed for silent operation, making it suitable for:
• Residential rooftops
• Apartments
• Commercial buildings
There is no vibration or disturbing noise under normal operation.`
    },
    {
      id: 8,
      question: 'Is Vaayuvolt safe for rooftops?',
      answer: `Yes. Vaayuvolt has:
• Low rotational speed
• Balanced vertical rotor
• Compact and lightweight structure
It is safe for concrete rooftops when installed by our recommended guidelines.`
    },
    {
      id: 9,
      question: 'Can Vaayuvolt work with solar panels?',
      answer: `Absolutely. Vaayuvolt is hybrid-ready and works seamlessly with:
• Solar panels
• Batteries
• Charge controllers
• Inverters
This ensures continuous power generation even when sunlight is unavailable.`
    },
    {
      id: 10,
      question: 'Is Vaayuvolt on-grid or off-grid?',
      answer: `Vaayuvolt supports:
• Off-grid systems (battery-based)
• Hybrid systems (solar + wind)
• Controlled grid-support applications (as per site feasibility and regulations)`
    },
    {
      id: 11,
      question: 'What maintenance is required?',
      answer: `Vaayuvolt is designed for low maintenance:
• Periodic inspection
• Bearing and fastener checks
No fuel, no frequent servicing, and long operational life.`
    },
    {
      id: 12,
      question: 'What materials are used in Vaayuvolt?',
      answer: 'Vaayuvolt uses high-strength, corrosion-resistant materials suitable for long-term outdoor use in Indian weather conditions, ensuring durability and reliability.'
    },
    {
      id: 13,
      question: 'How long does installation take?',
      answer: `Typical installation time is 1–3 days, including:
• Site assessment
• Mounting
• Electrical connection
Actual time depends on site conditions.`
    },
    {
      id: 14,
      question: 'Where can Vaayuvolt be installed?',
      answer: `Vaayuvolt is suitable for:
• Homes & villas
• Apartments
• Factories & warehouses
• Commercial buildings
• Institutions & campuses
• Street lighting & highways`
    },
    {
      id: 15,
      question: 'Does Vaayuvolt work during monsoon and storms?',
      answer: 'Yes. Vaayuvolt is designed to handle Indian weather conditions, including monsoon winds. Safety features and controlled RPM help protect the system during high wind events.'
    },
    {
      id: 16,
      question: 'How do I know if my location is suitable?',
      answer: `We provide online and offline site assessment based on:
• Wind availability
• Rooftop height
• Surroundings
• Power requirement
This ensures correct sizing and performance expectations.`
    },
    {
      id: 17,
      question: 'Is Vaayuvolt Made in India?',
      answer: 'Yes 🇮🇳 Vaayuvolt is a Made in India innovation, designed and developed for Indian conditions with a focus on practical performance.'
    }
  ];

  toggleFaq(id: number): void {
    if (this.openFaqId() === id) {
      this.openFaqId.set(null);
    } else {
      this.openFaqId.set(id);
    }
  }

  isFaqOpen(id: number): boolean {
    return this.openFaqId() === id;
  }
}
