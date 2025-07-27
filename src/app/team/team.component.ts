import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-team',
  imports: [],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  standalone: true
})
export class TeamComponent implements OnInit {

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
}
