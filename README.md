# Voranat W Labs — Personal Blog

A full-featured blog platform built with React and Vite, supporting public article browsing, user authentication, social interactions, and a dedicated admin panel for content management.

---

## Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
  - [Building for Production](#building-for-production)
- [Application Routes](#application-routes)
- [Admin Panel](#admin-panel)
- [Backend](#backend)
- [Deployment](#deployment)

---

## About the Project

Voranat W Labs is a modern, responsive personal blog application where readers can browse articles by category, read full posts with Markdown-rendered content, like articles, leave comments, and share posts on social media. An admin panel allows authorized users to manage articles and categories through a dedicated, protected interface.

---

## Features

### Public / Reader

- **Home page** — Hero section with featured author bio, article list, and category filter
- **Article browsing** — Paginated article cards with "Load More" support and keyword search
- **Category filtering** — Filter articles by topic from a dynamic category list
- **Full article view** — Markdown-rendered content, cover image, author card, publish date
- **Likes** — Authenticated users can like articles (one like per user per post)
- **Comments** — Authenticated users can post comments; all readers can view them
- **Social sharing** — Share articles to Facebook, LinkedIn, and X (Twitter), or copy the link

### Authentication (Members)

- Email and password sign-up and login
- JWT access token stored in `localStorage`, auto-validated on page load
- Profile editing with optional avatar upload
- Password reset

### Admin Panel

- Separate login flow for admin accounts
- **Articles** — Create, edit, and delete blog posts (with cover image upload and Markdown body)
- **Categories** — Create, edit, and delete post categories
- **Admin profile** — Update display name, avatar, and password
- Route-level guard (`AdminGuard`) redirects unauthenticated admin requests to the admin login page

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [React 19](https://react.dev) + [Vite 7](https://vite.dev) |
| Routing | [React Router 7](https://reactrouter.com) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| HTTP client | [Axios](https://axios-http.com) |
| UI primitives | [Radix UI](https://www.radix-ui.com) (Alert Dialog, Slot) |
| Icons | [Lucide React](https://lucide.dev), [React Icons](https://react-icons.github.io/react-icons/) |
| Social icons | [React Social Icons](https://www.npmjs.com/package/react-social-icons) |
| Markdown | [React Markdown](https://github.com/remarkjs/react-markdown) |
| Toasts | [Sonner](https://sonner.emilkowal.ski) |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) |
| Linting | ESLint 9 with `eslint-plugin-react-hooks` |
| Deployment | [Vercel](https://vercel.com) |

---

## Project Structure

```
src/
├── api/               # Axios API clients
│   ├── auth.js        # Authentication & user profile endpoints
│   ├── blogPost.js    # Public post, likes, and comments endpoints
│   └── admin.js       # Admin post and category management endpoints
├── assets/            # Static images and SVGs
├── components/        # Reusable UI components
│   ├── ui/            # Base-level components (buttons, dialogs, toasts)
│   ├── AdminLayout.jsx
│   ├── ArticleSection.jsx
│   ├── BlogCard.jsx
│   ├── CategoryFilter.jsx
│   ├── HeroSection.jsx
│   ├── NavBar.jsx
│   ├── PostContent.jsx
│   └── ...
├── contexts/
│   └── AuthContext.jsx  # Global auth state (user, token, logout)
├── hooks/
│   └── useForm.js       # Reusable form state and validation hook
├── pages/             # Route-level page components
│   ├── admin/         # Admin panel pages
│   ├── HomePage.jsx
│   ├── ViewPostPage.jsx
│   ├── LoginPage.jsx
│   ├── SignUpPage.jsx
│   ├── ProfilePage.jsx
│   ├── ResetPasswordPage.jsx
│   └── NotFoundPage.jsx
├── utils/
│   └── validation.js  # Shared form validation utilities
├── App.jsx            # Root router and providers
└── main.jsx           # Application entry point
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher
- A running backend API (see [Backend](#backend))

### Installation

```bash
git clone <repository-url>
cd voranat-w-labs
npm install
```

### Environment Variables

Create a `.env` file in the project root (do **not** commit this file):

```env
VITE_API_BASE_URL=https://your-backend-api-url.com
```

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL for all backend REST API calls |

> All `VITE_` prefixed variables are exposed to the browser bundle by Vite. Never store secrets (private keys, credentials) in these variables.

### Running Locally

```bash
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Building for Production

```bash
npm run build
```

The optimised output is placed in the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

## Application Routes

| Path | Description | Auth required |
|---|---|---|
| `/` | Home page — article feed and hero section | No |
| `/post/view/:postId` | Full article view with comments and likes | No (read); Yes (interact) |
| `/auth/signup` | Member registration | No |
| `/auth/login` | Member login | No |
| `/auth/reset-password` | Member password reset | Yes (member token) |
| `/member/profile` | Member profile management | Yes (member token) |
| `/admin/auth/login` | Admin login | No |
| `/admin/articles` | Admin article list | Yes (admin token) |
| `/admin/articles/create` | Create a new article | Yes (admin token) |
| `/admin/articles/edit/:postId` | Edit an existing article | Yes (admin token) |
| `/admin/categories` | Admin category list | Yes (admin token) |
| `/admin/categories/create` | Create a new category | Yes (admin token) |
| `/admin/categories/edit/:categoryId` | Edit an existing category | Yes (admin token) |
| `/admin/profile` | Admin profile management | Yes (admin token) |
| `/admin/auth/reset-password` | Admin password reset | Yes (admin token) |
| `*` | 404 Not Found page | — |

---

## Admin Panel

The admin section is protected by `AdminGuard`. Any unauthenticated request to an `/admin/*` route is redirected to `/admin/auth/login`. Admin credentials are separate from member accounts and validated against a distinct API endpoint (`/auth/get-admin`).

---

## Backend

This frontend connects to a separate backend repository built with Node.js and Express. Make sure the backend server is running before starting the frontend.

- **Repo:** [node-js-express-building-personal-blog](https://github.com/Vora-W/node-js-express-building-personal-blog)
- **Stack:** Node.js + Express 5, PostgreSQL, Supabase (Auth & Storage)
- **Default port:** `4000`

Refer to the backend repository's README for setup instructions, environment variables, and API documentation.

---

## Deployment

This project is configured for deployment on **Vercel** using `vercel.json`. The rewrite rule redirects all routes to `index.html`, enabling client-side routing.

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

To deploy:

1. Push the repository to GitHub (or GitLab / Bitbucket).
2. Import the project on [vercel.com](https://vercel.com).
3. Set the `VITE_API_BASE_URL` environment variable in the Vercel project settings.
4. Vercel will automatically run `npm run build` and serve the `dist/` output.
