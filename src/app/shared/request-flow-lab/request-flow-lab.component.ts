import { Component, computed, signal } from '@angular/core';

interface RequestStage {
  name: string;
  layer: string;
  title: string;
  detail: string;
  responsibility: string;
  code: string;
}

@Component({
  selector: 'app-request-flow-lab',
  standalone: true,
  templateUrl: './request-flow-lab.component.html',
  styleUrl: './request-flow-lab.component.scss'
})
export class RequestFlowLabComponent {
  readonly stages: RequestStage[] = [
    {
      name: 'HTTP Request',
      layer: 'CLIENT → API',
      title: 'Start with a clear contract.',
      detail: 'A client sends an HTTP request with a route, method, headers and payload. The API contract defines what the endpoint accepts and what it returns.',
      responsibility: 'Keep the request shape explicit and predictable.',
      code: 'POST /api/employees\nContent-Type: application/json\n\n{\n  "name": "Alex Morgan",\n  "department": "Engineering"\n}'
    },
    {
      name: 'Controller',
      layer: 'PRESENTATION LAYER',
      title: 'Translate HTTP into an application action.',
      detail: 'The controller binds the incoming request, applies endpoint-level behavior and delegates the use case to an application service. It should not become the home for database or business logic.',
      responsibility: 'Handle HTTP concerns and return the appropriate result.',
      code: '[HttpPost]\npublic async Task<IActionResult> Create(\n    CreateEmployeeRequest request,\n    CancellationToken ct)\n{\n    var result = await employeeService.CreateAsync(request, ct);\n    return CreatedAtAction(nameof(GetById),\n        new { id = result.Id }, result);\n}'
    },
    {
      name: 'Validation & Mapping',
      layer: 'BOUNDARY CHECKS',
      title: 'Validate before changing data.',
      detail: 'Validate required fields and business constraints, then map the request DTO into the application model. Keep input contracts separate from persistence entities.',
      responsibility: 'Reject invalid input early and keep model boundaries clear.',
      code: 'if (string.IsNullOrWhiteSpace(request.Name))\n{\n    return Result.Invalid("Name is required.");\n}\n\nvar employee = mapper.Map<Employee>(request);'
    },
    {
      name: 'Service Layer',
      layer: 'APPLICATION LOGIC',
      title: 'Keep the use case in one place.',
      detail: 'The service coordinates the operation, applies application rules and calls the required abstractions. It keeps the controller small and makes the use case easier to test.',
      responsibility: 'Coordinate the workflow without coupling it to HTTP.',
      code: 'public async Task<EmployeeDto> CreateAsync(\n    CreateEmployeeRequest request, CancellationToken ct)\n{\n    var employee = mapper.Map<Employee>(request);\n    await employeeRepository.AddAsync(employee, ct);\n    return mapper.Map<EmployeeDto>(employee);\n}'
    },
    {
      name: 'Data Access',
      layer: 'PERSISTENCE',
      title: 'Persist through the data layer.',
      detail: 'The repository or DbContext performs the database operation. EF Core tracks entity changes and SaveChangesAsync commits them to the database.',
      responsibility: 'Keep persistence concerns inside the data-access boundary.',
      code: 'dbContext.Employees.Add(employee);\nawait dbContext.SaveChangesAsync(ct);'
    },
    {
      name: 'HTTP Response',
      layer: 'API RESPONSE',
      title: 'Return a useful, consistent result.',
      detail: 'Map the outcome to an appropriate HTTP status and response DTO. Error paths should be consistent too, so clients can handle validation, authorization and server failures predictably.',
      responsibility: 'Make success and failure responses easy to consume.',
      code: 'return CreatedAtAction(\n    nameof(GetById),\n    new { id = employee.Id },\n    responseDto);\n\n// Example: 201 Created'
    }
  ];

  readonly activeIndex = signal(0);
  readonly activeStage = computed(() => this.stages[this.activeIndex()]);

  selectStage(index: number): void {
    if (index >= 0 && index < this.stages.length) {
      this.activeIndex.set(index);
    }
  }
}
