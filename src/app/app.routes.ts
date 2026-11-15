import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, title: 'Vignesh Madhav Kumar | Full Stack .NET Developer' },
  { path: 'contact', component: ContactComponent, title: 'Contact Vignesh | Full Stack .NET Developer' },
  { path: '**', redirectTo: '' }
];
