import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { WhatsAppFabComponent } from '../../shared/components/whatsapp-fab/whatsapp-fab.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';

// About Us page component showcasing company story and mission
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RevealOnScrollDirective,
    TopbarComponent,
    NavbarComponent,
    FooterComponent,
    WhatsAppFabComponent,
    PageHeaderComponent
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  features = [
    {
      icon: '🇮🇳',
      title: 'Engineered for India',
      description: 'Engineered specifically for India’s low and variable wind conditions.'
    },
    {
      icon: '🌙',
      title: '24/7 Power',
      description: 'Generates clean electricity day and night, unlike solar-only systems.'
    },
    {
      icon: '🛡️',
      title: 'Superior Durability',
      description: 'The blade material has superior strength and long-term durability.'
    },
    {
      icon: '🏙️',
      title: 'Compact Design',
      description: 'Compact and portable design ideal for rooftops and limited spaces.'
    },
    {
      icon: '🤫',
      title: 'Silent Operation',
      description: 'Quiet, low-vibration operation suitable for residential and commercial areas.'
    },
    {
      icon: '🌪️',
      title: 'Turbulence Ready',
      description: 'Performs reliably in turbulent, multi-directional wind flows.'
    },
    {
      icon: '🔋',
      title: 'Hybrid Ready',
      description: 'Hybrid-ready for seamless integration with solar and battery systems.'
    },
    {
      icon: '🔧',
      title: 'Low Maintenance',
      description: 'Designed for minimal maintenance and long service life.'
    },
    {
      icon: '⚡',
      title: 'Real Output',
      description: 'Focused on real, usable energy output—not inflated ratings.'
    },
    {
      icon: '⚙️',
      title: 'Expertise Backed',
      description: 'Made in India, backed by mechanical engineering expertise.'
    },
    {
      icon: '🛠️',
      title: 'Hassle-free Install',
      description: 'Hassle-free installation with online and field-based evaluation.'
    },
    {
      icon: '🚚',
      title: 'Pan-India Service',
      description: 'Extensive all-India logistics and after-sales service.'
    }
  ];

  sectorsText = "We serve a wide range of sectors including residential homes, commercial buildings, telecom and remote sites, agriculture and rural areas, hybrid solar–wind projects, and small industries and institutions, delivering reliable and sustainable energy solutions across all applications.";
}

