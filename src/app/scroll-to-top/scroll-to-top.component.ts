import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scroll-to-top',
  imports: [CommonModule],
  templateUrl: './scroll-to-top.component.html',
  styleUrl: './scroll-to-top.component.scss',
  standalone: true
})
export class ScrollToTopComponent implements OnInit, OnDestroy {
  showScrollButton = false;
  private scrollListener: (() => void) | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.scrollListener = () => {
        this.showScrollButton = window.scrollY > 300;
      };
      window.addEventListener('scroll', this.scrollListener);
    }
  }

  ngOnDestroy(): void {
    if (this.scrollListener && typeof window !== 'undefined') {
      window.removeEventListener('scroll', this.scrollListener);
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
} 