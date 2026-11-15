import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly portraitSrc = 'assets/vignesh-portrait.webp';
  readonly roleTitles = [
    '.NET Core',
    'Azure',
    'SQL Server',
    'MongoDB',
    'Angular',
    'AI Agents',
    'MCP Servers'
  ];

  roleIndex = 0;
  roleVisible = true;
  private roleInterval: number | null = null;
  private roleTimeout: number | null = null;

  ngOnInit(): void {
    if (typeof window === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    this.roleInterval = window.setInterval(() => {
      this.roleVisible = false;

      this.roleTimeout = window.setTimeout(() => {
        this.roleIndex = (this.roleIndex + 1) % this.roleTitles.length;
        this.roleVisible = true;
      }, 180);
    }, 2800);
  }

  ngOnDestroy(): void {
    if (this.roleInterval !== null) {
      window.clearInterval(this.roleInterval);
    }
    if (this.roleTimeout !== null) {
      window.clearTimeout(this.roleTimeout);
    }
  }
}
