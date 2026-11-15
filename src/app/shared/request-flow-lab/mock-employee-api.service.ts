import { Injectable } from '@angular/core';
import type { ApiMethod, ApiResponse, MockEmployee } from './mock-employee-api.models';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

@Injectable({ providedIn: 'root' })
export class MockEmployeeApiService {
  private readonly initialEmployees: MockEmployee[] = [
    { id: 1, name: 'Alex Morgan', email: 'alex.morgan@example.com', department: 'Engineering' },
    { id: 2, name: 'Jordan Lee', email: 'jordan.lee@example.com', department: 'Design' }
  ];

  private employees: MockEmployee[] = this.cloneInitialData();
  private nextId = 3;

  execute(method: ApiMethod, rawPath: string, rawBody: string): ApiResponse {
    const path = this.normalizePath(rawPath);
    if (method === 'GET') return this.get(path);
    if (method === 'POST') return this.create(path, rawBody);
    if (method === 'PUT') return this.update(path, rawBody);
    return this.delete(path);
  }

  reset(): void {
    this.employees = this.cloneInitialData();
    this.nextId = 3;
  }

  private get(path: string): ApiResponse {
    if (path === '/api/employees') return this.json(200, 'OK', this.employees);

    const id = this.getEmployeeId(path);
    if (id === null) return this.notFound('Route not found. Try /api/employees or /api/employees/{id}.');

    const employee = this.employees.find(item => item.id === id);
    return employee ? this.json(200, 'OK', employee) : this.notFound(`Employee with ID ${id} was not found.`);
  }

  private create(path: string, rawBody: string): ApiResponse {
    if (path !== '/api/employees') return this.notFound('POST is available at /api/employees.');

    const payload = this.parseBody(rawBody);
    if (!payload) return this.badRequest('Request body must be a JSON object.');

    const validationError = this.validateEmployee(payload);
    if (validationError) return this.badRequest(validationError);

    const employee: MockEmployee = {
      id: this.nextId++,
      name: (payload['name'] as string).trim(),
      email: (payload['email'] as string).trim(),
      department: (payload['department'] as string).trim()
    };
    this.employees = [...this.employees, employee];
    return this.json(201, 'Created', employee);
  }

  private update(path: string, rawBody: string): ApiResponse {
    const id = this.getEmployeeId(path);
    if (id === null) return this.notFound('PUT requires an employee route such as /api/employees/2.');

    const index = this.employees.findIndex(item => item.id === id);
    if (index < 0) return this.notFound(`Employee with ID ${id} was not found.`);

    const payload = this.parseBody(rawBody);
    if (!payload) return this.badRequest('Request body must be a JSON object.');

    const allowedFields = ['name', 'email', 'department'];
    const suppliedFields = Object.keys(payload).filter(key => allowedFields.includes(key));
    if (suppliedFields.length === 0) return this.badRequest('Provide at least one field: name, email or department.');
    if ('name' in payload && !isNonEmptyString(payload['name'])) return this.badRequest('Name must be a non-empty string.');
    if ('email' in payload && (!isNonEmptyString(payload['email']) || !isValidEmail(payload['email']))) {
      return this.badRequest('Provide a valid email address.');
    }
    if ('department' in payload && !isNonEmptyString(payload['department'])) {
      return this.badRequest('Department must be a non-empty string.');
    }

    const current = this.employees[index];
    const updated: MockEmployee = {
      ...current,
      ...(typeof payload['name'] === 'string' ? { name: payload['name'].trim() } : {}),
      ...(typeof payload['email'] === 'string' ? { email: payload['email'].trim() } : {}),
      ...(typeof payload['department'] === 'string' ? { department: payload['department'].trim() } : {})
    };
    this.employees = this.employees.map(item => item.id === id ? updated : item);
    return this.json(200, 'OK', updated);
  }

  private delete(path: string): ApiResponse {
    const id = this.getEmployeeId(path);
    if (id === null) return this.notFound('DELETE requires an employee route such as /api/employees/2.');

    const exists = this.employees.some(item => item.id === id);
    if (!exists) return this.notFound(`Employee with ID ${id} was not found.`);

    this.employees = this.employees.filter(item => item.id !== id);
    return { status: 204, statusText: 'No Content', body: null, contentType: 'none' };
  }

  private parseBody(rawBody: string): Record<string, unknown> | null {
    try {
      const parsed: unknown = JSON.parse(rawBody);
      return isRecord(parsed) ? parsed : null;
    } catch {
      return null;
    }
  }

  private validateEmployee(payload: Record<string, unknown>): string | null {
    if (!isNonEmptyString(payload['name'])) return 'Name is required and must be a non-empty string.';
    if (!isNonEmptyString(payload['email'])) return 'Email is required.';
    if (!isValidEmail(payload['email'] as string)) return 'Provide a valid email address.';
    if (!isNonEmptyString(payload['department'])) return 'Department is required.';
    return null;
  }

  private getEmployeeId(path: string): number | null {
    const match = /^\/api\/employees\/(\d+)$/.exec(path);
    return match ? Number(match[1]) : null;
  }

  private normalizePath(path: string): string {
    const trimmed = path.trim();
    if (!trimmed.startsWith('/')) return `/${trimmed}`;
    return trimmed.length > 1 ? trimmed.replace(/\/+$/, '') : trimmed;
  }

  private json(status: number, statusText: string, body: unknown): ApiResponse {
    return { status, statusText, body, contentType: 'application/json' };
  }

  private badRequest(message: string): ApiResponse {
    return this.json(400, 'Bad Request', {
      type: 'https://httpstatuses.com/400',
      title: 'Request validation failed',
      status: 400,
      errors: [message]
    });
  }

  private notFound(message: string): ApiResponse {
    return this.json(404, 'Not Found', {
      type: 'https://httpstatuses.com/404',
      title: 'Resource not found',
      status: 404,
      detail: message
    });
  }

  private cloneInitialData(): MockEmployee[] {
    return this.initialEmployees.map(employee => ({ ...employee }));
  }
}
