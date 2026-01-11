import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'about',
    loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
  },
  {
    path: 'why-choose-us',
    loadComponent: () => import('./pages/why-choose-us/why-choose-us.component').then(m => m.WhyChooseUsComponent)
  },
  {
    path: 'faqs',
    loadComponent: () => import('./pages/faqs/faqs.component').then(m => m.FAQsComponent)
  },
  {
    path: 'blog',
    loadComponent: () => import('./pages/blog/blog.component').then(m => m.BlogComponent)
  },
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  }
];
