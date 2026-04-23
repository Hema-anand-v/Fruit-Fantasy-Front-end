# Fruit Fantasy App

Fruit Fantasy is a role-based React application for browsing, searching, and managing fruit products. The app supports user registration and login, protected navigation, cart and wishlist interactions, advanced fruit search, profile updates, and admin-focused fruit management workflows.

## Overview

This project is built with React, TypeScript, Vite, Material UI, React Router, React Hook Form, and Axios. It uses a local REST API hosted at `http://localhost:3000` for fruit and user data, and stores authentication state in `localStorage`.

## Key Features

- Role-based authentication with `user` and `admin` access paths
- Protected routes for home, profile, and fruit detail pages
- User registration flow with multi-step form validation
- Login flow backed by API-based user lookup
- Fruit catalog with basic text search
- Advanced fruit search by category and minimum price
- Wishlist management using reducer-driven global state
- Cart management with quantity updates, discounted pricing, and total calculation
- Fruit detail page with edit and delete actions
- Admin dashboard for adding and deleting fruit entries
- Snackbar feedback for successful and failed fruit operations
- Responsive header, navigation menu, and cart drawer

## User Flows

### Regular user

- Register a new account
- Log in and access the protected home screen
- Search fruits in basic mode
- Switch to advanced search mode
- Add fruits to cart
- Add or remove fruits from wishlist
- Update profile information

### Admin

- Log in with an admin role
- Access the admin dashboard
- Add new fruit items
- Edit fruit pricing, unit, and discount from the detail page
- Delete fruit entries

## Tech Stack

- React 19
- TypeScript
- Vite
- Material UI
- React Router DOM
- React Hook Form
- Axios
- ESLint
- Jest and Testing Library dependencies are present in the project

## Project Structure

```text
src/
  components/
    AddFruitForm/
    AdvancedSearchFruit/
    CartPanel/
    Footer/
    FruitCard/
    FruitDetail/
    FruitList/
    Header/
    SearchFruit/
  context/
    AuthContext.tsx
  hooks/
    useFetch.tsx
  pages/
    AdminDashboard/
    FruitManager/
    Login/
    NotFound/
    Register/
    UserProfile/
  reducers/
    cartReducer.ts
    rootReducer.ts
    wishlistReducer.ts
  routes/
    AppRoutes.tsx
    ProtectedRoute.tsx
  types/
    Fruit.ts
    User.ts
  utils/
    FilterFruits.ts
    calculateDiscountedPrice.ts
```

## Routing

The app currently defines the following main routes:

- `/` redirects to `/login`
- `/login` for user sign-in
- `/register` for user registration
- `/home` for the authenticated dashboard view
- `/profile` for profile updates
- `/fruits/:id` for fruit detail and edit actions
- `*` for the not-found page

## State Management

The app uses React Context and reducers for shared application state:

- `AuthContext` manages login state, role, login, and logout behavior
- `cartReducer` manages cart items and quantity changes
- `wishlistReducer` manages wishlist toggling and clearing
- `rootReducer` combines cart and wishlist state into a single shared store

Authentication state is persisted in `localStorage` through:

- `isLoggedIn`
- `role`
- `userId`

## API Requirements

The frontend expects a local API server at:

```text
http://localhost:3000
```

### Expected endpoints

- `GET /fruits`
- `GET /fruits/:id`
- `POST /fruits`
- `PUT /fruits/:id`
- `DELETE /fruits/:id`
- `GET /users?email=...&password=...`
- `POST /users`
- `PATCH /users/:id`

### Expected fruit shape

```ts
interface Fruit {
  id: number;
  name: string;
  image: string;
  price: number;
  discount?: number;
  unit: string;
  category?: string;
  benefits?: string[];
}
```

### Expected user shape

```ts
interface User {
  id?: number;
  fullName: string;
  email: string;
  phone: string;
  gender: string;
  address: string;
  state: string;
  dob: string;
  username: string;
  password: string;
  role: "admin" | "user";
}
```

## Assets

- Fruit images are served from `public/images/fruits/`
- The fruit detail and card views expect image filenames like `apple.jpg`, `banana.jpg`, and similar assets already available in that folder

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the local API

This project requires a backend or mock REST server running on port `3000`. If you are using `json-server`, make sure it exposes `fruits` and `users` collections that match the shapes above.

### 3. Start the frontend

```bash
npm run dev
```

### 4. Open the app

By default, Vite will serve the app locally, typically at:

```text
http://localhost:5173
```

## Available Scripts

- `npm run dev` starts the Vite development server
- `npm run build` runs TypeScript project build and creates a production bundle
- `npm run lint` runs ESLint
- `npm run preview` previews the production build locally

## Testing Notes

The repository includes component test files and Jest-related dependencies, but there is currently no `test` script defined in `package.json`.

## Current Implementation Notes

- Basic search filters the already-fetched fruit list by name
- Advanced search performs API-driven filtering by category and minimum price
- Cart totals in the app use discounted prices when displayed in the header/cart workflow
- Login and role persistence rely on browser `localStorage`
- The UI is built primarily with Material UI components and custom styling

## Improvement Opportunities

- Add an explicit `npm test` script and finalize the Jest configuration
- Move API base URLs into environment variables
- Add seed data documentation for local backend setup
- Persist cart and wishlist state across browser reloads
- Add unauthorized route handling for rejected role access
- Improve production readiness by removing development console logs

## Status

This README was written from the current codebase implementation and reflects the app as it exists in the repository today.
