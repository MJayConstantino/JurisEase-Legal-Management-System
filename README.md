# Dianson Law Firm Legal Management System

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It is a legal case management system designed to streamline the operations of law firms.

## Features

- **Case Management**: Manage legal matters and cases efficiently.
- **Client Management**: Keep track of client information.
- **User Roles**: Assign attorneys and staff to cases.
- **Dynamic UI**: Built with modern UI components and Tailwind CSS.
- **Storybook Integration**: Test and document UI components in isolation.
- **Supabase Integration**: Backend powered by Supabase for authentication and database management.

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 18.x or higher recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MJayConstantino/dianson-law-firm-legal-management-system.git
   cd dianson-law-firm-legal-management-system
   ```

2. Install the dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. Create a `.env.local` file in the root of your project and add your Supabase environment variables:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   ```

### Running the Development Server

Start the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3007](http://localhost:3007) with your browser to see the application.

### Running Storybook

To run Storybook for frontend testing, use the following command:

```bash
npm run storybook
# or
yarn storybook
# or
pnpm storybook
# or
bun storybook
```

Open [http://localhost:6006](http://localhost:6006) with your browser to see the Storybook interface.

## Scripts

Here are some useful scripts you can use:

- `npm run dev`: Start the development server.
- `npm run build`: Build the application for production.
- `npm run start`: Start the production server.
- `npm run lint`: Run ESLint to check for code quality issues.
- `npm run storybook`: Start Storybook for UI component testing.
- `npm run test`: Run tests (if configured).

## Folder Structure

```plaintext
.
├── src/
│   ├── app/                # Next.js app directory
│   ├── components/         # Reusable UI components
│   ├── actions/            # API actions and utilities
│   ├── styles/             # Global styles
│   ├── types/              # TypeScript type definitions
│   ├── stories/            # Storybook stories
│   └── utils/              # Helper Functions and Supabase files
├── public/                 # Static assets
├── .env.local              # Environment variables
├── package.json            # Project dependencies and scripts
└── README.md               # Project documentation
```

## Learn More

To learn more about the tools and frameworks used in this project, check out the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Supabase Documentation](https://supabase.com/docs) - Learn about Supabase for backend services.
- [Storybook Documentation](https://storybook.js.org/docs/react/get-started/introduction) - Learn about Storybook for UI component testing.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs) - Learn about Tailwind CSS for styling.

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
