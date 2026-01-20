import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TopbarComponent } from '../../shared/components/topbar/topbar.component';
import { NavbarComponent } from '../../shared/components/navbar/navbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { WhatsAppFabComponent } from '../../shared/components/whatsapp-fab/whatsapp-fab.component';
import { PageHeaderComponent } from '../../shared/components/page-header/page-header.component';
import { RevealOnScrollDirective } from '../../shared/directives/reveal-on-scroll.directive';

// Blog page component serving as a placeholder for future content
@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    TopbarComponent,
    NavbarComponent,
    FooterComponent,
    WhatsAppFabComponent,
    PageHeaderComponent,
    RevealOnScrollDirective
  ],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {
}
