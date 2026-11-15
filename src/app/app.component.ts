import { Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {
  readonly themeService = inject(ThemeService);
  mobileMenuOpen = false;
  readonly currentYear = new Date().getFullYear();

  @ViewChild('devCursor', { static: true })
  private devCursor?: ElementRef<HTMLDivElement>;

  ngOnInit(): void {
    if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      document.body.classList.add('dev-pointer');
    }
  }

  ngOnDestroy(): void {
    document.body.classList.remove('dev-pointer');
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  toggleNavigation(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  @HostListener('document:pointermove', ['$event'])
  onPointerMove(event: PointerEvent): void {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    const cursor = this.devCursor?.nativeElement;
    if (!cursor) return;

    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
    cursor.classList.add('is-visible');

    const target = event.target as HTMLElement | null;
    cursor.classList.toggle('is-active', Boolean(target?.closest('a, button, .project-card')));
    cursor.classList.toggle('is-hidden', Boolean(target?.closest('input, textarea')));
  }

  @HostListener('document:pointerleave')
  onPointerLeave(): void {
    this.devCursor?.nativeElement.classList.remove('is-visible');
  }
}
