import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MockEmployeeApiService } from './mock-employee-api.service';
import type { ApiEndpoint, ApiMethod, ApiResponse } from './mock-employee-api.models';

@Component({
  selector: 'app-request-flow-lab',
  standalone: true,
  templateUrl: './request-flow-lab.component.html',
  styleUrl: './request-flow-lab.component.scss'
})
export class RequestFlowLabComponent {
  private readonly mockApi = inject(MockEmployeeApiService);

  readonly endpoints: ApiEndpoint[] = [
    {
      id: 'list',
      method: 'GET',
      path: '/api/employees',
      summary: 'Get all employees',
      description: 'Returns the current employee collection with a 200 OK response.',
      sampleBody: ''
    },
    {
      id: 'get-one',
      method: 'GET',
      path: '/api/employees/1',
      summary: 'Get employee by ID',
      description: 'Looks up one employee by route identifier. Change the ID in the route field to try another record.',
      sampleBody: ''
    },
    {
      id: 'create',
      method: 'POST',
      path: '/api/employees',
      summary: 'Create an employee',
      description: 'Validates the JSON payload, creates an employee and returns 201 Created.',
      sampleBody: '{\n  "name": "Sam Taylor",\n  "email": "sam.taylor@example.com",\n  "department": "Platform"\n}'
    },
    {
      id: 'update',
      method: 'PUT',
      path: '/api/employees/2',
      summary: 'Update an employee',
      description: 'Updates the selected employee. The request body can contain one or more editable fields.',
      sampleBody: '{\n  "name": "Jordan Lee",\n  "email": "jordan.lee@example.com",\n  "department": "Cloud Engineering"\n}'
    },
    {
      id: 'delete',
      method: 'DELETE',
      path: '/api/employees/2',
      summary: 'Delete an employee',
      description: 'Removes the employee selected in the route and returns 204 No Content.',
      sampleBody: ''
    }
  ];

  readonly activeEndpointId = signal('list');
  readonly activeEndpoint = computed(
    () => this.endpoints.find(endpoint => endpoint.id === this.activeEndpointId()) ?? this.endpoints[0]
  );
  readonly requestPath = signal('/api/employees');
  readonly requestBody = signal('');
  readonly response = signal<ApiResponse | null>(null);
  readonly isBodyRequired = computed(
    () => this.activeEndpoint().method === 'POST' || this.activeEndpoint().method === 'PUT'
  );
  readonly formattedResponse = computed(() => {
    const body = this.response()?.body;
    return body === null || body === undefined ? '' : JSON.stringify(body, null, 2);
  });

  selectEndpoint(endpoint: ApiEndpoint): void {
    this.activeEndpointId.set(endpoint.id);
    this.requestPath.set(endpoint.path);
    this.requestBody.set(endpoint.sampleBody);
    this.response.set(null);
  }

  onPathInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      this.requestPath.set(target.value);
      this.response.set(null);
    }
  }

  onBodyInput(event: Event): void {
    const target = event.target;
    if (target instanceof HTMLTextAreaElement) {
      this.requestBody.set(target.value);
      this.response.set(null);
    }
  }

  sendRequest(): void {
    this.response.set(
      this.mockApi.execute(this.activeEndpoint().method, this.requestPath(), this.requestBody())
    );
  }

  resetDemo(): void {
    this.mockApi.reset();
    this.activeEndpointId.set('list');
    this.requestPath.set('/api/employees');
    this.requestBody.set('');
    this.response.set(null);
  }
}
