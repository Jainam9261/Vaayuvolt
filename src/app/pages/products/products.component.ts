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

/**
 * ProductsComponent
 * 
 * Products listing page with filters and grid layout.
 */
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

  // Get active image index for a product
  getActiveImage(productId: string): number {
    return this.activeImages.get(productId) || 0;
  }

  // Select image for a product
  selectImage(productId: string, index: number): void {
    this.activeImages.set(productId, index);
  }

  // Products Data
  products: Product[] = [
    {
      id: 'wind-1',
      name: 'Vertical Axis Wind Turbine',
      description: 'VaayuVolt is a portable, rooftop ready Vertical Axis Wind Turbine built for India\'s real wind conditions. It produces clean, steady electricity even in low or shifting winds. Designed for rooftops, silent and versatile, VaayuVolt supports hybrid systems, lowers energy costs, enhances reliability, and brings practical renewable power to homes, businesses, and remote sites.',
      image: '/assets/images/Product 1 img 2.jpeg',
      images: ['/assets/images/Product 1 img 2.jpeg', '/assets/images/Product 1 img 1.jpeg'],
      category: 'wind',
      specs: [
        'Rated Output Power: 100W - 5000W',
        'Output Voltage: 12-220V',
        'Start Wind Speed: 2m/s',
        'Rated Wind Speed: 10m/s',
        'Working Wind Speed: 1-25 m/s',
        'Safety Wind Speed: 50m/s',
        'Start Torque: <0.1nm',
        'Protection Grade: IP67',
        'Working Temperature: -40°C to +50°C',
        'Life Time: 20 Years',
        'Sound: <46Db'
      ],
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
      name: 'Solar And Wind Hybrid Street Light',
      description: 'Advanced hybrid street lighting solution combining solar and wind power for maximum reliability. Perfect for urban and rural areas, providing consistent illumination with renewable energy.',
      image: '/assets/images/Product 2 img 1.png',
      images: ['/assets/images/Product 2 img 1.png', '/assets/images/Product 2 img 2.png'],
      category: 'hybrid',
      specs: [
        'Hybrid Power Technology',
        'MPPT Based Controller',
        'Automatic Operation',
        'Weather Resistant',
        'Pole as per Requirement'
      ],
      models: [
        {
          name: '60W',
          details: '60W x No.2 LED Light | 100W Solar Panel | 100W Wind Turbine | Battery 54AH/12.8V | MPPT Based Controller'
        },
        {
          name: '100W',
          details: '100W x No.2 LED Light | 150W Solar Panel | 100W Wind Turbine | Battery 62AH/12.8V | MPPT Based Controller'
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
      specs: [
        'Permanent Magnet Generator',
        'Rated Generator Speed: 200 RPM',
        'Rated Wind Speed: 11-13 m/s',
        'Lead Acid Battery in Battery Box',
        'MPPT Based Hybrid Controller'
      ],
      models: [
        { name: '1 KW', details: '550W x No.1 Solar Module | 500W VAWT | Permanent Magnet Generator-1 (500W x 1)' },
        { name: '2 KW', details: '550W x No.2 Solar Module | 1KW VAWT | Permanent Magnet Generator-2 (500W x 2)' },
        { name: '3 KW', details: '550W x No.4 Solar Module | 1.5KW VAWT | Permanent Magnet Generator-3 (500W x 3)' },
        { name: '5 KW', details: '550W x No.6 Solar Module | 2KW VAWT | Permanent Magnet Generator-4 (500W x 4)' },
        { name: '10 KW', details: '550W x No.12 Solar Module | 4KW VAWT | Permanent Magnet Generator-8 (500W x 8)' }
      ]
    }
  ];
}
