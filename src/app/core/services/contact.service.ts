import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ContactMessage } from '../../models/contact-message.model';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  get apiEnabled(): boolean {
    return environment.apiBaseUrl.trim().length > 0;
  }

  sendMessage(message: ContactMessage): Observable<void> {
    if (!this.apiEnabled) {
      throw new Error('Contact API is not configured.');
    }
    return this.http.post<void>(`${environment.apiBaseUrl}/contact`, message);
  }

  createMailtoLink(message: ContactMessage): string {
    const subject = `Portfolio enquiry from ${message.name}`;
    const body = [
      `Name: ${message.name}`,
      `Email: ${message.email}`,
      `Company / Organization: ${message.organization || 'Not provided'}`,
      '',
      message.message
    ].join('\n');
    return `mailto:Vigneshchowdary195@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
}
