import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-services',
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
  standalone: true
})
export class ServicesComponent implements OnInit {

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Scroll to top when component loads (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Method to handle CTA buttons
  handleCTA(action: string) {
    switch(action) {
      case 'contact':
        // Navigate to contact page
        this.router.navigate(['/contact']);
        break;
      case 'portfolio':
        // Navigate to gallery page (only in browser)
        if (isPlatformBrowser(this.platformId)) {
          window.location.href = '/gallery';
        }
        break;
      default:
        break;
    }
  }
}
