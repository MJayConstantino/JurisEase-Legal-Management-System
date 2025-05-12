# Dianson Law Firm Legal Management System

A comprehensive legal case management system built with Next.js, Supabase, and modern UI components to streamline law firm operations.

![Next.js](https://img.shields.io/badge/Next.js-15.2.1-black)
![Supabase](https://img.shields.io/badge/Supabase-latest-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)

## Features

- **Case Management**: Organize and track legal matters efficiently
- **Client Management**: Maintain comprehensive client records
- **Document Management**: Store and organize case-related documents
- **Staff Management**: Assign attorneys and support staff to cases
- **User Roles & Permissions**: Control access based on user roles
- **Modern UI**: Built with Radix UI components and Tailwind CSS
- **Comprehensive Testing**: Frontend, backend, and E2E tests with Jest and Cypress
- **Component Documentation**: Storybook integration for UI component testing and documentation

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [Testing](#testing)
  - [Jest Tests](#jest-tests)
  - [Cypress Tests](#cypress-tests)
- [Storybook](#storybook)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Folder Structure](#folder-structure)
- [Pull Request Process](#pull-request-process)
- [Linting](#linting)

## Prerequisites

Ensure you have the following installed and set up before proceeding:

- [**Node.js**](https://nodejs.org/) (v18.x or higher) and one of the following package managers for JavaScript dependency management:
  - [npm](https://www.npmjs.com/)
  - [yarn](https://yarnpkg.com/)
  - [pnpm](https://pnpm.io/)
  - [bun](https://bun.sh/)
- [**Git**](https://git-scm.com/) for cloning the repository.
- [**Deno**](https://deno.land/) (for specific scripts)
- [**Postman**](https://www.postman.com/) for testing API endpoints and Deno functions.
- [**Docker**](https://www.docker.com/) (Docker Desktop or CLI) to build and deploy the Deno function containers into Supabase Edge Functions.

> **Note:** You do _not_ need to install Deno locally. Docker will handle running your Deno-based functions when deployed to Supabase.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/MJayConstantino/dianson-law-firm-legal-management-system.git
cd dianson-law-firm-legal-management-system
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

## Environment Setup

The project uses different environment files for different environments:

1. Create the following environment files in the root directory:

### `.env` (For dev and e2e testing)

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Application Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3007
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

### `.env.test` (Testing)

```env
# Supabase Test Configuration
NEXT_PUBLIC_SUPABASE_URL=your_test_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_test_supabase_anon_key

# Application Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3007
POSTMAN_URL=your_postman_url
```

### `.env.production` (Production)

```env
# Supabase Production Configuration
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_supabase_anon_key

# Application Configuration
NEXT_PUBLIC_SITE_URL=https://your-production-domain.com
POSTMAN_URL=your_postman_url
```

> **Note**: These environment files are loaded based on the NODE_ENV value set in your scripts. You can use `cross-env` to set this value when running scripts.

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

This will start the development server at [http://localhost:3007](http://localhost:3007).

### Production Mode

Build the application:

```bash
npm run build
# or
yarn build
# or
pnpm build
# or
bun build
```

Start the production server:

```bash
npm run start
# or
yarn start
# or
pnpm start
# or
bun start
```

The production server will run at [http://localhost:3009](http://localhost:3009).

## Testing

### Jest Tests

The project uses Jest for both frontend and backend testing:

```bash
# Run all tests
npm test

# Run frontend tests only
npm run test:frontend

# Run backend tests only
npm run test:backend

# Run tests in watch mode
npm run test:watch
```

### Cypress Tests

For end-to-end testing, the project uses Cypress:

#### Installing Cypress

Cypress should be installed as a dev dependency, but if you need to install it separately:

```bash
npm install cypress --save-dev
```

#### Running Cypress Tests

```bash
# Open Cypress Test Runner
npm run cypress:open
```

This will open the Cypress Test Runner, where you can select and run specific tests.

#### Writing Cypress Tests

Cypress tests are located in the `cypress` directory. You can create new test files with the `.cy.ts` extension.

Example:

```typescript
// cypress/e2e/login.cy.ts
describe("Login Page", () => {
  it("should allow users to login", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("test@example.com");
    cy.get("input[name=password]").type("password123");
    cy.get("button[type=submit]").click();
    cy.url().should("include", "/dashboard");
  });
});
```

#### Cypress Configuration

Cypress configuration is stored in `cypress.config.ts`. You can modify this file to customize Cypress behavior.

```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3007",
    supportFile: "cypress/support/e2e.ts",
  },
  viewportWidth: 1280,
  viewportHeight: 720,
});
```

## Storybook

Storybook is used for UI component development and testing:

```bash
# Start Storybook
npm run storybook
# or
yarn storybook
```

This will start Storybook at [http://localhost:6006](http://localhost:6006).

### Building Storybook

```bash
npm run build-storybook
# or
yarn build-storybook
```

This will generate a static Storybook build in the `storybook-static` directory.

## Project Structure

The project follows a standard Next.js structure with some additional directories:

```
.
├── src/
│   ├── app/                # Next.js app directory (routes and pages)
│   ├── components/         # Reusable UI components
│   │   ├── ui/             # Basic UI components (buttons, inputs, etc.)
│   │   └── [feature]/      # Feature-specific components
│   ├── actions/            # Server actions and API utilities
│   ├── actions-handlers/   # Action handlers for server actions
│   ├── lib/                # Shared libraries and utilities
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   ├── stories/            # Storybook stories (add your stories in this folder)
│   ├── utils/              # Helper functions
│   │   └── supabase/       # Supabase and server configurations
│   └── validation/         # Zod validation schemas
├── public/                 # Static assets
├── supabase/               # Contains edge functions using deno (api endpoint tests)
│   └── functions/          # API endpoint tests
├── tests/                  # Test files
│   ├── frontend/           # Frontend tests
│   ├── backend/            # Backend tests
│   └── newman/             # API tests
├── cypress/                # Cypress tests
│   ├── e2e/                # End-to-end tests
│   ├── fixtures/           # Test fixtures
│   └── support/            # Support files
├── .github/                # GitHub workflows and PR templates
├── .env                    # Development environment variables
├── .env.test               # Test environment variables
├── .env.production         # Production environment variables
└── ...config files
```

### SUPABASE FUNCTIONS COMMAND (CLI - use npx if no CLI installed npx supabase)

```bash
MAKE NEW EDGE FUNCTION:
supabase functions new <function name>

DEPLOY FUNCTION
supabase functions deploy <name>
supabase functions deploy user-crud-actions --project-ref <PROJECT-REF>

SET ENV
supabase secrets --env-file ./supabase/functions/ env file path

SET PASSWORD:
supabase link --project-ref <PROJECT-REF> -p password

```

## Deployment

### Build for Production

```bash
npm run build
# or
yarn build
```

### Start Production Server

```bash
npm run start
# or
yarn start
```

## Folder Structure

```
.
├── src/
│   ├── app/                         # Next.js app directory
│   │   ├── (dashboard)/             # Dashboard routes (protected)
│   │   │   └── matters/             # Matter management routes
│   │   │       └──[matterId]        # Dynamic Route for a specific matter
│   │   │   ├── tasks/               # Task management routes
│   │   │   ├── billings/            # Billings management routes
│   │   │   ├── error.tsx            # Error page
│   │   │   └── layout.tsx           # Dashboard layout
│   │   ├── (auth)/                  # Authentication routes
│   │   │   ├── login/               # Login page
│   │   │   └── signup/              # Signup Page
│   │   ├── (user)/                  # User page routes
│   │   │   └──[matterId]            # Dynamic Route for a specific user
│   │   ├── error/                   # Error route
│   │   ├── global.css               # Global themes
│   │   ├── page.tsx                 # Landing page
│   │   └── layout.tsx               # Root layout
│   ├── components/                  # Reusable UI components
│   │   ├── ui/                      # UI components from Radix
│   │   ├── auth/                    # Auth-specific components
│   │   ├── billings/                # Biiling-specific components
│   │   ├── dashboard/               # Dashboard-specific components
│   │   ├── header/                  # Header-specific components
│   │   ├── homepage/                # Landing Page-specific components
│   │   ├── matters/                 # Matter-specific components
│   │   ├── sidebar/                 # Sidebar-specific components
│   │   └── tasks/                   # Task-specific layout
│   ├── actions/                     # Server actions
│   │   ├── billing.ts               # Authentication and user actions
│   │   ├── globalSearch.ts          # Global Search actions
│   │   ├── matters.ts               # Matter actions
│   │   ├── routing.ts               # Routing actions
│   │   ├── sample.ts                # Just a sample file
│   │   ├── tasks.ts                 # Tasks actions
│   │   ├── userProfile.ts           # User Profile actions
│   │   └── users.tsx                # User actions
│   ├── actions-handlers/            # Action handlers
│   │   ├── billing.ts               # Authentication and user actions
│   │   ├── matters.ts               # Matter action handlers
│   │   ├── tasks.ts                 # Tasks action handlers
│   │   ├── userProfile.ts           # User Profile action handlers
│   │   └── users.tsx                # User action handlers
│   ├── lib/                         # Shared libraries
│   │   ├── supabase.ts              # Supabase client configuration
│   │   ├── utils.ts                 # Utility functions
│   │   └── constants.ts             # Constant values
│   ├── stories/                     # Storybook stories
│   ├── styles/                      # Global styles
│   ├── types/                       # TypeScript type definitions
│   ├── utils/                       # Utility functions
│   │   └── supabase/                # Supabase and server configurations
|   └── validation/                  # Zod validation schemas
├── public/                          # Static assets
├── supabase/                        # Contains edge functions using deno (api endpoint tests)
│   └── functions/                   # API endpoint tests
├── tests/                           # Test files
│   ├── frontend/                    # Frontend tests
│   ├── backend/                     # Backend tests
│   └── newman/                      # API tests
├── cypress/                         # Cypress tests
├── .storybook/                      # Storybook configuration
├── .github/                         # GitHub workflows and PR templates
├── .env                             # Local environment variables
├── .env.test                        # Test environment variables
├── .env.production                  # Production environment variables
└── ...config files
```

### Pull Request Process

1. Ensure your code follows the project's coding standards and passes all tests
2. Make sure to fill out all sections of the PR template in the `.github` folder
3. Update the README.md or documentation with details of changes if applicable
4. Your PR will be reviewed by maintainers, who may request changes
5. Once approved, your PR will be merged

### Linting

The project uses ESLint for code quality checks. Run linting before creating a PR:

```bash
npm run lint
# or
yarn lint
```

If there are linting errors, fix them before submitting your PR. You can also use the `--fix` flag to automatically fix some issues:

```bash
npm run lint -- --fix
# or
yarn lint --fix
```
