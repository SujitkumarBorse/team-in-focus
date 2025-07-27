import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ScrollToTopComponent } from './scroll-to-top/scroll-to-top.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, HeaderComponent, ScrollToTopComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'teamInFocus';

  constructor() {
    // Component initialization
  }
}
