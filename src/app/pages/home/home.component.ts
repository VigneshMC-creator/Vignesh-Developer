import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { interval } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

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

  private roleIndex = 0;
  readonly currentRole = signal(this.roleTitles[0]);

  ngOnInit(): void {
    // Signals notify Angular directly whenever the displayed role changes.
    // takeUntilDestroyed automatically stops the interval when this page is left.
    interval(2600)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.roleIndex = (this.roleIndex + 1) % this.roleTitles.length;
        this.currentRole.set(this.roleTitles[this.roleIndex]);
      });
  }
}
