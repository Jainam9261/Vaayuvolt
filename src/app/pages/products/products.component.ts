import { Component, signal, computed, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { ProductCardComponent, Product } from '../../shared/components/product-card/product-card.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { WhatsAppFabComponent } from '../../shared/components/whatsapp-fab/whatsapp-fab.component';
import { QuoteModalComponent } from '../../shared/components/quote-modal/quote-modal.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { ModelCardComponent } from '../../shared/components/model-card/model-card.component';

// Products listing page component with filtering and details
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    RevealOnScrollDirective,
    TopbarComponent,
    NavbarComponent,
    NavbarComponent,
    FooterComponent,
    WhatsAppFabComponent,
    WhatsAppFabComponent,
    PageHeaderComponent,
    ModelCardComponent
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, AfterViewInit {
  // Track active image index for each product
  activeImages = new Map<string, number>();

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Initialize active image index for all products
    this.products.forEach(product => {
      this.activeImages.set(product.id, 0);
    });

    // Check for hash in URL and scroll to it
    this.route.fragment.subscribe(fragment => {
      // scroll is handled in AfterViewInit or purely by browser native behavior if ID matches
    });
  }

  ngAfterViewInit(): void {
    // Scroll to product if hash is present
    setTimeout(() => {
      const fragment = this.route.snapshot.fragment;
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }, 300);
  }

  // Gets the index of the currently active image for a product
  getActiveImage(productId: string): number {
    return this.activeImages.get(productId) || 0;
  }

  // Updates the active image index for a product
  selectImage(productId: string, index: number): void {
    this.activeImages.set(productId, index);
  }

  // List of available products
  products: Product[] = [
    {
      id: 'wind-1',
      name: 'Vertical Axis Wind Turbine',
      description: 'VaayuVolt is a portable, rooftop ready Vertical Axis Wind Turbine built for India\'s real wind conditions. It produces clean, steady electricity even in low or shifting winds. Designed for rooftops, silent and versatile, VaayuVolt supports hybrid systems, lowers energy costs, enhances reliability, and brings practical renewable power to homes, businesses, and remote sites.',
      image: '/assets/images/Product 1 img 2.jpeg',
      images: ['/assets/images/Product 1 img 2.jpeg', '/assets/images/Product 1 img 1.jpeg'],
      category: 'wind',
      specsHeading: 'Model Performance',
      specs: [
        'Rated output power: 100W - 5000W',
        'Output voltage: 12-220V',
        'Start wind speed: 2m/s',
        'Rated wind speed: 10m/s',
        'Working wind speed: 1-25 m/s',
        'Safety wind speed: 50m/s',
        'Start torque: <0.1nm',
        'Protection grade: IP67',
        'Working temperature: -40°C to +50°C',
        'Life time: 20 Years',
        'Sound: <46Db'
      ],
      modelsHeading: 'Model Available',
      models: [
        { name: '0.1 kW' },
        { name: '0.2 kW' },
        { name: '0.3 kW' },
        { name: '0.5 kW' },
        { name: '1 kW' },
        { name: '2 kW' },
        { name: '3 kW' },
        { name: '5 kW' }
      ]
    },
    {
      id: 'hybrid-2',
      name: 'SOLAR AND WIND HYBRID STREET LIGHT',
      description: 'Advanced hybrid street lighting solution combining solar and wind power for maximum reliability. Perfect for urban and rural areas, providing consistent illumination with renewable energy.',
      image: '/assets/images/Product 2 img 1.png',
      images: ['/assets/images/Product 2 img 1.png', '/assets/images/Product 2 img 2.png'],
      category: 'hybrid',
      specs: [],
      modelsHeading: 'MODEL AVAILABLE',
      models: [
        {
          name: '60W SOLAR AND WIND HYBRID STREET LIGHT',
          specs: [
            '60W x No.2 LED light',
            '100W solar panel',
            '100W wind turbine',
            'Battery – 54Ah/12.8V',
            'MPPT based controller',
            'Pole as per requirement'
          ]
        },
        {
          name: '100W SOLAR AND WIND HYBRID STREET LIGHT',
          specs: [
            '100W x No.2 LED light',
            '150W solar panel',
            '100W wind turbine',
            'Battery – 62Ah/12.8V',
            'MPPT based controller',
            'Pole as per requirement'
          ]
        }
      ]
    },
    {
      id: 'hybrid-3',
      name: 'Solar & Wind Hybrid Turbine',
      description: 'Complete hybrid energy generation system suited for various scales of operation. Combines high-efficiency solar modules with vertical axis wind turbines for maximum power generation and reliability.',
      image: '/assets/images/Product 3 img 1.png',
      images: ['/assets/images/Product 3 img 1.png'], // Single image
      category: 'hybrid',
      specs: [],
      modelsHeading: 'MODEL AVAILABLE',
      models: [
        {
          name: '1 KW SOLAR & WIND HYBRID TURBINE',
          specs: [
            '550 W x No.1 solar module',
            '500W VAWT',
            'Lead acid battery in battery box',
            'MPPT based hybrid controller',
            'Permanent magnet generator -1 (500W x 1)',
            'Rated generator speed - 200 RPM',
            'Rated wind speed 11-13 m/s'
          ]
        },
        {
          name: '2 KW SOLAR & WIND HYBRID TURBINE',
          specs: [
            '550 W x No.2 solar module',
            '1kW VAWT',
            'Lead acid battery in battery box',
            'MPPT based hybrid controller',
            'Permanent magnet generator -2 (500W x 2)',
            'Rated generator speed - 200 RPM',
            'Rated wind speed 11-13 m/s'
          ]
        },
        {
          name: '3 KW SOLAR & WIND HYBRID TURBINE',
          specs: [
            '550 W x No.4 solar module',
            '1.5kW VAWT',
            'Lead acid battery in battery box',
            'MPPT based hybrid controller',
            'Permanent magnet generator -3 (500W x 3)',
            'Rated generator speed - 200 RPM',
            'Rated wind speed 11-13 m/s'
          ]
        },
        {
          name: '5 KW SOLAR & WIND HYBRID TURBINE',
          specs: [
            '550 W x No.6 solar module',
            '2kW VAWT',
            'Lead acid battery in battery box',
            'MPPT based hybrid controller',
            'Permanent magnet generator -4 (500W x 4)',
            'Rated generator speed - 200 RPM',
            'Rated wind speed 11-13 m/s'
          ]
        },
        {
          name: '10 KW SOLAR & WIND HYBRID TURBINE',
          specs: [
            '550 W x No.12 solar module',
            '4kW VAWT',
            'Lead acid battery in battery box',
            'MPPT based hybrid controller',
            'Permanent magnet generator -8 (500W x 8)',
            'Rated generator speed - 200 RPM',
            'Rated wind speed 11-13 m/s'
          ]
        }
      ]
    }
  ];
}
