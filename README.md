# Modulstav Landing Page

A modular house landing page built with React, TypeScript, and Framer Motion.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm start
```

The app will be available at [http://localhost:5173](http://localhost:5173).

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## Project Structure

```
.
├── index.html               # Root HTML entry point
├── modulstav-landing.tsx    # Main landing page component
├── styles.css               # Global styles
├── src/
│   └── main.tsx             # React app entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Sections

- **Hero** – Full-screen welcome section with animated headline and CTA button
- **Module Snap** – Interactive grid showcasing available house modules
- **Materials** – List of sustainable materials used in construction