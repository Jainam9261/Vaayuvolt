import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgOptimizedImage } from '@angular/common';

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string; // Main image or thumbnail
  images?: string[]; // Multiple images for gallery
  category: string;
  specs: string[];
  models?: any[];
}

/**
 * ProductCardComponent
 * 
 * Reusable product card component for displaying products in grid/list views.
 */
@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!: Product;
  @Output() viewProduct = new EventEmitter<Product>();

  onViewClick(): void {
    this.viewProduct.emit(this.product);
  }
}



