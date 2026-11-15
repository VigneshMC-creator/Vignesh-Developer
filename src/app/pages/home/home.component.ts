import { Component, DestroyRef, OnInit, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { interval } from 'rxjs';
import { SkillsMatrixComponent } from '../../shared/skills-matrix/skills-matrix.component';
import { RequestFlowLabComponent } from '../../shared/request-flow-lab/request-flow-lab.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, SkillsMatrixComponent, RequestFlowLabComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);

  readonly portraitSrc = 'assets/vignesh-profile-yellow.webp';
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
  private characterIndex = 0;
  private deleting = false;
  private pauseTicks = 0;

  readonly currentRole = signal('');

  ngOnInit(): void {
    // Type and erase one character at a time. The caret lives beside the text in the template.
    interval(85)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        const title = this.roleTitles[this.roleIndex];

        if (this.pauseTicks > 0) {
          this.pauseTicks--;
          return;
        }

        if (this.deleting) {
          this.characterIndex = Math.max(0, this.characterIndex - 1);
          this.currentRole.set(title.slice(0, this.characterIndex));

          if (this.characterIndex === 0) {
            this.deleting = false;
            this.roleIndex = (this.roleIndex + 1) % this.roleTitles.length;
            this.pauseTicks = 2;
          }
          return;
        }

        this.characterIndex = Math.min(title.length, this.characterIndex + 1);
        this.currentRole.set(title.slice(0, this.characterIndex));

        if (this.characterIndex === title.length) {
          this.deleting = true;
          this.pauseTicks = 16;
        }
      });
  }
}
