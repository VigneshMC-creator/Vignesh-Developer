import { Component, computed, signal } from '@angular/core';

interface PortfolioSkill {
  name: string;
  category: string;
  note: string;
  exploring?: boolean;
}

@Component({
  selector: 'app-skills-matrix',
  standalone: true,
  templateUrl: './skills-matrix.component.html',
  styleUrl: './skills-matrix.component.scss'
})
export class SkillsMatrixComponent {
  readonly categories = ['All', 'Backend', 'Data', 'Frontend', 'Cloud', 'Exploring'];

  readonly skills: PortfolioSkill[] = [
    { name: 'C#', category: 'Backend', note: 'Application development' },
    { name: '.NET / ASP.NET Core', category: 'Backend', note: 'Web APIs and services' },
    { name: 'REST APIs', category: 'Backend', note: 'Endpoint design and integration' },
    { name: 'Dependency Injection', category: 'Backend', note: 'Service composition' },
    { name: 'Async / Await', category: 'Backend', note: 'Asynchronous request handling' },
    { name: 'LINQ', category: 'Backend', note: 'Querying and transformations' },
    { name: 'Entity Framework Core', category: 'Data', note: 'ORM and change tracking' },
    { name: 'SQL Server', category: 'Data', note: 'Relational data and querying' },
    { name: 'Stored Procedures', category: 'Data', note: 'Database-side operations' },
    { name: 'DTOs & Mapping', category: 'Data', note: 'API and model transformation' },
    { name: 'Angular', category: 'Frontend', note: 'Standalone components and routing' },
    { name: 'TypeScript', category: 'Frontend', note: 'Typed application code' },
    { name: 'Reactive Forms', category: 'Frontend', note: 'Form state and validation' },
    { name: 'HTML / SCSS', category: 'Frontend', note: 'Responsive UI structure and styling' },
    { name: 'Microsoft Azure', category: 'Cloud', note: 'Cloud application services' },
    { name: 'Azure Blob Storage', category: 'Cloud', note: 'Object storage and integration' },
    { name: 'External API / XML Integration', category: 'Cloud', note: 'Request and response handling' },
    { name: 'MongoDB', category: 'Exploring', note: 'Document database', exploring: true },
    { name: 'AI Agents', category: 'Exploring', note: 'Agent-based application patterns', exploring: true },
    { name: 'Model Context Protocol (MCP)', category: 'Exploring', note: 'Tool and context integrations', exploring: true }
  ];

  readonly activeCategory = signal('All');
  readonly searchTerm = signal('');

  readonly filteredSkills = computed(() => {
    const category = this.activeCategory();
    const query = this.searchTerm().trim().toLowerCase();

    return this.skills.filter(skill => {
      const matchesCategory = category === 'All' || skill.category === category;
      const matchesQuery = !query ||
        skill.name.toLowerCase().includes(query) ||
        skill.note.toLowerCase().includes(query);

      return matchesCategory && matchesQuery;
    });
  });

  selectCategory(category: string): void {
    this.activeCategory.set(category);
  }

  onSearchInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.searchTerm.set(target.value);
    }
  }
}
