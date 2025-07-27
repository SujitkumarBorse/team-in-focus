import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: true
})
export class HomeComponent implements OnInit {
  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Scroll to top when component loads (only in browser)
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  navigateToGallery(tab: string): void {
    // Navigate to gallery with query parameter for the active tab
    this.router.navigate(['/gallery'], { queryParams: { tab: tab } });
  }
}
