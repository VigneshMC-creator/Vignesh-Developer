import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactService } from '../../core/services/contact.service';
import { ContactMessage } from '../../models/contact-message.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactService = inject(ContactService);


  readonly form = this.formBuilder.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(100)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(254)]],
    organization: ['', [Validators.maxLength(120)]],
    message: ['', [Validators.required, Validators.maxLength(5000)]]
  });

  sending = false;
  statusMessage = '';

  get contactApiNote(): string {
    return this.contactService.apiEnabled
      ? 'Your message will be sent securely through the configured contact API.'
      : 'Your email application will open with the message prepared. Nothing is stored on this website.';
  }

  onSubmit(): void {
    this.statusMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload: ContactMessage = this.form.getRawValue();

    if (!this.contactService.apiEnabled) {
      this.statusMessage = 'Opening your email application with the message prepared…';
      window.location.href = this.contactService.createMailtoLink(payload);
      return;
    }

    this.sending = true;
    this.contactService.sendMessage(payload).subscribe({
      next: () => {
        this.sending = false;
        this.statusMessage = 'Your message was sent successfully.';
        this.form.reset();
      },
      error: () => {
        this.sending = false;
        this.statusMessage = 'The contact API could not be reached. Please email me directly.';
      }
    });
  }
}
