import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * NavbarComponent
 * 
 * Main navigation bar with logo, menu links, and Get a Quote button.
 * Sticky on scroll, responsive with hamburger menu for mobile.
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  menuOpen = signal(false);
  isScrolled = signal(false);
  productsDropdownOpen = signal(false);

  navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About Us' },
    { path: '/products', label: 'Products', hasDropdown: true },
    { path: '/why-choose-us', label: 'Why Choose Us' },
    { path: '/blog', label: 'Blog' },
    { path: '/faqs', label: 'FAQs' },
    { path: '/contact', label: 'Contact Us' }
  ];

  productDropdownItems = [
    { id: 'wind-turbine', label: 'Vertical Axis Wind Turbine', path: '/products' },
    { id: 'street-light', label: 'Solar & Wind Hybrid Street Light', path: '/products' },
    { id: 'hybrid-turbine', label: 'Solar & Wind Hybrid Turbine', path: '/products' }
  ];

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    this.isScrolled.set(window.scrollY > 20);
  }

  toggleMenu(): void {
    this.menuOpen.update(value => !value);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  navigateAndClose(): void {
    this.closeMenu();
  }

  toggleProductsDropdown(): void {
    // On mobile, toggle on click; on desktop, handled by hover
    if (window.innerWidth <= 1024) {
      this.productsDropdownOpen.update(value => !value);
    }
  }

  closeProductsDropdown(): void {
    this.productsDropdownOpen.set(false);
  }

  navigateToProduct(productId: string): void {
    this.closeProductsDropdown();
    this.closeMenu();
    // Map product IDs to actual product IDs on the page
    const productMap: { [key: string]: string } = {
      'wind-turbine': 'wind-1',
      'street-light': 'hybrid-2',
      'hybrid-turbine': 'hybrid-3'
    };
    const actualId = productMap[productId] || productId;
    // Navigate to products page with hash
    window.location.href = `/products#${actualId}`;
  }

  onMouseEnter(): void {
    if (window.innerWidth > 1024) {
      this.productsDropdownOpen.set(true);
    }
  }

  onMouseLeave(): void {
    if (window.innerWidth > 1024) {
      this.productsDropdownOpen.set(false);
    }
  }
}



