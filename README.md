# Vignesh Madhav Kumar Edara

**Full Stack .NET Developer**

A standalone Angular portfolio built with reusable components, Angular Router, Reactive Forms, SCSS, Angular signals and injectable services.

## Portfolio

- **Website:** https://vigneshmc-creator.github.io/portfolio/#overview
- **Contact:** https://vigneshmc-creator.github.io/portfolio/contact
- **GitHub:** https://github.com/VigneshMC-creator
- **LinkedIn:** https://www.linkedin.com/in/vignesh-madhav-kumar-edara-124a4320a/
- **Email:** Vigneshchowdary195@gmail.com

## Technology

- Angular 22.2.6 and TypeScript 6
- Standalone components and Angular Router
- Reactive Forms and HttpClient
- SCSS design tokens for light and dark themes
- Angular signals and RxJS
- Searchable skill matrix and interactive Swagger-inspired ASP.NET Core API playground
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

## Architecture and interactions

- The home route composes the hero, project showcase, skill matrix and API request-flow lab as standalone Angular components.
- The role line uses an Angular signal updated by an RxJS interval.
- The skill matrix filters skills by category and search term.
- The API playground provides an interactive Swagger-inspired endpoint explorer for GET, POST, PUT and DELETE employee routes. It uses an in-browser mock service, editable paths and JSON bodies, and displays realistic HTTP status and response payloads without sending network requests.
- The contact page uses a service layer; its mailto fallback can be replaced by a backend API later.

## GitHub Pages deployment

The workflow at `.github/workflows/deploy-pages.yml` builds Angular and publishes the browser output. In repository **Settings → Pages → Build and deployment → Source**, select **GitHub Actions**. Pushes to the `Master` branch trigger deployment.

The site uses the repository subpath `/portfolio/`. A 404 fallback is included for direct navigation to the `/contact` route.

## Selected work

- **Employee Management** — public Angular learning project: https://github.com/VigneshMC-creator/Employee-Management
- **TicketBook API** — private .NET Web API project; source code is not public.
- **API and data-layer development** — professional experience across ASP.NET Core endpoints, controller-to-service flows, DTO mapping, repository operations, SQL persistence and external API integrations; source code is private.

---

© Vignesh Madhav Kumar Edara
