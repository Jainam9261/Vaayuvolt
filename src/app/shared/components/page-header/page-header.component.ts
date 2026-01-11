import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Breadcrumb {
    label: string;
    url?: string;
}

@Component({
    selector: 'app-page-header',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './page-header.component.html',
    styleUrl: './page-header.component.scss'
})
export class PageHeaderComponent {
    @Input() title: string = '';
    @Input() breadcrumbs: Breadcrumb[] = [];
    @Input() bgImage: string = '/assets/backgrounds/page-header-bg.jpg'; // Default background
}
