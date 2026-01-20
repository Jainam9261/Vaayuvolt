import { Component, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Responsive navigation bar component with sticky positioning and mobile menu
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
    const isOpen = !this.menuOpen();
    this.menuOpen.set(isOpen);
    this.updateBodyScroll(isOpen);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
    this.updateBodyScroll(false);
  }

  private updateBodyScroll(lock: boolean): void {
    if (typeof document !== 'undefined') {
      document.body.style.overflow = lock ? 'hidden' : '';
    }
  }

  navigateAndClose(): void {
    this.closeMenu();
  }

  toggleProductsDropdown(): void {
    // Toggles product dropdown based on device type
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
    // Resolve internal product IDs to DOM element IDs
    const productMap: { [key: string]: string } = {
      'wind-turbine': 'wind-1',
      'street-light': 'hybrid-2',
      'hybrid-turbine': 'hybrid-3'
    };
    const actualId = productMap[productId] || productId;
    // Perform navigation with fragment identifier
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



