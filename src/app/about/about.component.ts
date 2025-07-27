import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
  standalone: true
})
export class AboutComponent implements OnInit {

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Method to handle CTA button clicks
  onGetStartedClick(): void {
    // Navigate to contact page or services page
    this.router.navigate(['/contact']);
  }

  onLearnMoreClick(): void {
    // Navigate to services page
    this.router.navigate(['/services']);
  }

  ngOnInit(): void {
    // Scroll to top when component loads (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}
