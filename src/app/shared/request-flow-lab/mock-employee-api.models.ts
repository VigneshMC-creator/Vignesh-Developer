export type ApiMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface ApiEndpoint {
  id: string;
  method: ApiMethod;
  path: string;
  summary: string;
  description: string;
  sampleBody: string;
}

export interface MockEmployee {
  id: number;
  name: string;
  email: string;
  department: string;
}

export interface ApiResponse {
  status: number;
  statusText: string;
  body: unknown | null;
  contentType: 'application/json' | 'none';
}
