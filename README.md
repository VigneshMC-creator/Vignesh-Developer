# Vignesh Madhav Kumar Edara

**Full Stack .NET Developer**

The portfolio is a standalone Angular application. It uses Angular standalone components, Angular Router, Reactive Forms, SCSS and injectable services so API integrations can be added without rewriting the UI.

## Portfolio

- **Website:** https://vigneshmc-creator.github.io/Vignesh-Developer/#overview
- **Contact:** https://vigneshmc-creator.github.io/Vignesh-Developer/contact
- **GitHub:** https://github.com/VigneshMC-creator
- **LinkedIn:** https://www.linkedin.com/in/vignesh-madhav-kumar-edara-124a4320a/
- **Email:** Vigneshchowdary195@gmail.com

## Technology

- Angular 22.2.6 and TypeScript 6
- Standalone components and Angular Router
- Reactive Forms and HttpClient
- SCSS and CSS custom properties
- Angular signals for light/dark theme
- GitHub Actions deployment to GitHub Pages

## Local development

Requirements: Node.js 24.15 or newer.

```bash
npm install
npm start
```

Open the local URL printed by Angular CLI.

## Production build

```bash
npm run build:github-pages
```

The browser output is generated under `dist/vignesh-portfolio/browser`.

## Future API integration

The contact page uses Angular Reactive Forms. At present, it opens the visitor's email application with a prefilled message; it does not pretend a server has received the message.

To connect a backend later:

1. Set `apiBaseUrl` in `src/environments/environment.ts`.
2. Implement the matching `POST /contact` endpoint in your backend.
3. The existing `ContactService.sendMessage()` uses Angular `HttpClient`. Connect the API response and validation rules there.

The service layer keeps HTTP logic out of page components.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` builds Angular and publishes the browser output. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions** once. After that, pushes to the `Master` branch trigger deployment.

The site uses the repository subpath `/Vignesh-Developer/`. A 404 fallback is included for direct navigation to the `/contact` route.

## Selected work

- **Employee Management** — public Angular learning project: https://github.com/VigneshMC-creator/Employee-Management
- **TicketBook API** — private .NET Web API project; source code is not public.
- **API and data-layer development** — professional experience across ASP.NET Core endpoints, controller-to-service flows, DTO mapping, repository operations, SQL persistence and external API integrations; source code is private.

---

© Vignesh Madhav Kumar Edara
