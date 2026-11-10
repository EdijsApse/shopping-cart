# Shopping Cart

A simple e-commerce shopping cart application built with React and TypeScript. Users can browse products, add items to their cart, manage quantities, and proceed to checkout.

## Getting Started

Follow these steps to run the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (version 22 or later recommended)
- npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/EdijsApse/shopping-cart.git
   ```

2. Navigate to the project directory:

   ```bash
   cd shopping-cart
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local URL shown in your terminal (usually `http://localhost:5173`).

## Available Commands

| Command               | Description                                              |
| --------------------- | -------------------------------------------------------- |
| `npm run dev`         | Starts the development server.                           |
| `npm run build`       | Checks TypeScript and builds the app for production.     |
| `npm run preview`     | Previews the production build locally.                   |
| `npm run lint`        | Runs ESLint to check code quality.                       |
| `npm test`            | Runs unit tests in watch mode.                           |
| `npm run test:run`    | Runs unit tests once.                                    |
| `npm run test:e2e`    | Runs end-to-end tests with Playwright.                   |
| `npm run test:e2e:ui` | Opens the Playwright UI for running and debugging tests. |

### Running End-to-End Tests

Before running Playwright tests for the first time, install the Chromium browser:

```bash
npx playwright install chromium
```

Then run:

```bash
npm run test:e2e
```

## Technologies Used

### Core Technologies

- **React** – Builds the user interface using reusable components.
- **TypeScript** – Adds static typing to JavaScript.
- **Vite** – Development server and build tool.
- **Tailwind CSS** – Utility-first CSS framework for styling.

### State Management and Forms

- **Redux Toolkit** – Manages application state, including shopping cart data.
- **React Redux** – Connects React components to the Redux store.
- **React Router** – Handles application navigation and routing.
- **React Hook Form** – Manages form state and validation.
- **Zod** – Provides schema-based data validation.
- **Hookform Resolvers** – Integrates Zod validation with React Hook Form.

### Testing and Code Quality

- **Vitest** – Runs unit tests.
- **React Testing Library** – Tests React components from the user's perspective.
- **Testing Library User Event** – Simulates user interactions in tests.
- **Jest DOM** – Provides useful DOM matchers for tests.
- **Playwright** – Runs end-to-end browser tests.
- **ESLint** – Helps identify code issues and maintain consistent quality.

## Future Improvements

- [ ] **More E2E Tests** – Expand end-to-end test coverage for key user flows and shopping cart functionality.
- [ ] **Admin Panel** – Create an admin interface for managing products and other store data.
- [ ] **User Authentication** – Implement user registration, login, and authentication.
- [ ] **API Integration** – Replace temporary mock product data with real product data fetched from an API.
- [ ] **Product Sorting** – Add options to sort products by price, name, and other criteria.
