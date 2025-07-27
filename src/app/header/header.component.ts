import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent implements OnInit {
  title = "Team InFocus"

  constructor() {
    // Component initialized
  }

  ngOnInit(): void {
    // Component initialized
  }
}
