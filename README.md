# FootTrackr App

This project is a calorie tracking application, designed to help users monitor their daily food intake, track macronutrients, and achieve their health and fitness goals.

## Features

- **Food Logging:** Users can easily log their meals by searching for food items or manually entering nutritional information.
- **Macronutrient Tracking:** The app tracks macronutrients (carbohydrates, proteins, and fats) to provide a comprehensive overview of the user's diet.
- **Progress Tracking:** Users can visualize their progress through charts and graphs, monitoring their calorie intake and macronutrient distribution over time.
- **User Authentication:** Secure user accounts with authentication to personalize the experience and save progress.
- **Data Visualization:** Charts and graphs to represent calorie and macro intake.
- **Responsive Design:** Works seamlessly on various devices.
- **Internationalization (i18n):** Supports multiple languages for wider accessibility.

## Technologies Used

This project leverages a modern tech stack for optimal performance and maintainability:

- **Frontend:**

  - **React:** A JavaScript library for building user interfaces.
  - **TypeScript:** A superset of JavaScript that adds static typing.
  - **Vite:** A fast build tool and development server.
  - **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
  - **Radix UI:** Unstyled, accessible UI components.
  - **React Hook Form:** For form management and validation.
  - **Zod:** Schema declaration and validation library.
  - **Jotai:** Primitive and flexible state management for React.
  - **React Router Dom v7:** For client-side routing.
  - **Recharts:** A composable charting library built on React components.
  - **Lucide React:** Beautifully simple, pixel-perfect icons.
  - **i18next:** Internationalization framework.
  - **Day.js and Date-fns:** For date manipulation and formatting.
  - **@dicebear/collection & @dicebear/core:** For generating user avatars.
  - **@tanstack/react-query:** Powerful asynchronous state management.
  - **cmdk:** Fast, composable, unstyled command menu for React.

- **Backend & Database:**

  - **Supabase:** An open-source Firebase alternative providing a Postgres database, authentication, and other backend services.

- **Other Tools:**
  - **Husky:** Git hooks for enforcing code quality.
  - **Prettier:** Code formatter for consistent code style.
  - **ESLint:** Linter for identifying and fixing code issues.
  - **Class Variance Authority and clsx:** For managing class names efficiently.
  - **@hookform/resolvers:** For integrating Zod with React Hook Form.
  - **qs:** For query string parsing and stringifying.
  - **@uidotdev/usehooks:** Collection of useful React hooks.
  - **tailwindcss-animate:** Adds animation utilities to Tailwind CSS.

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/tsamkharadze/FoodTrackr
    ```

2.  Navigate to the project directory:

    ```bash
    cd FoodTrackr
    ```

3.  Install dependencies:

    ```bash
    npm install
    ```

4.  Start the development server:

    ```bash
    npm run dev
    ```

## Scripts

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the production-ready application.
- `npm run preview`: Starts a local server to preview the production build.
- `npm run lint`: Runs ESLint for linting.
- `npm run prettier`: Runs Prettier for code formatting.
- `npm run ts-check`: Runs TypeScript type checking.
- `npm run update-types`: Generates Supabase types.
