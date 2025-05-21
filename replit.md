# Habit Hero - Architecture Overview and Development Guide

## Overview

Habit Hero is a web application designed to help users track their daily habits, visualize progress, and earn achievements for consistent behavior. The application is built on a modern tech stack with a React frontend, Express backend, and Drizzle ORM for database operations.

The app features a user-friendly dashboard, detailed habit tracking, progress visualizations, and an achievement system to gamify habit formation. It follows a client-server architecture with a RESTful API design pattern.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The frontend is built with React and uses a combination of modern libraries and patterns:

1. **UI Framework**: Built using Shadcn UI components (based on Radix UI primitives) for a consistent, accessible design system
2. **State Management**: Combines React Context (`HabitContext`) for application state with React Query for server state management
3. **Routing**: Uses the lightweight Wouter library for client-side routing
4. **Styling**: Tailwind CSS for styling with a custom design system defined in the tailwind config
5. **Animation**: Framer Motion for smooth UI animations and transitions

### Backend Architecture

The backend is built with Express.js:

1. **Server Framework**: Express.js for handling HTTP requests and API routes
2. **API Design**: RESTful API design with clearly defined endpoints
3. **Database Layer**: Abstracted through a storage interface that can be implemented for different database solutions

### Data Layer

1. **ORM**: Uses Drizzle ORM for database schema definition and operations
2. **Schema**: Database schema defined in shared/schema.ts
3. **Data Access**: Storage abstraction layer that allows switching between database implementations
4. **Current Implementation**: Currently using in-memory storage (MemStorage) but designed to be replaced with Postgres

### Authentication

The application is prepared for authentication with user schema defined but not yet fully implemented. The system includes:

1. **User Schema**: Basic user table with username/password fields
2. **Session Storage**: Files set up for Postgres-based session storage (connect-pg-simple)

## Key Components

### Frontend Components

1. **Layout**: 
   - `AppLayout`: Main application layout with navigation and sidebar
   - Responsive design for mobile and desktop

2. **Pages**:
   - `Dashboard`: Main overview with habit summaries and progress indicators
   - `Habits`: CRUD operations for habits
   - `Progress`: Visualization of habit completion over time
   - `Achievements`: Gamification element showing unlocked achievements
   - `Settings`: User preferences and account management

3. **Shared Components**:
   - UI components from Shadcn UI library
   - Custom components like `HabitCheckbox`, `StreakIndicator`
   - Context providers for global state

### Backend Components

1. **API Routes**: To be defined in server/routes.ts
2. **Storage Layer**: Interface defined in server/storage.ts
3. **Database Models**: Defined in shared/schema.ts

## Data Flow

1. **User Interaction Flow**:
   - User interacts with UI components
   - Client-side state is updated via context hooks
   - API calls are made using React Query when needed
   - Responses update context state
   - UI reacts to state changes

2. **Data Persistence Flow**:
   - Client sends API requests to server
   - Server routes requests to appropriate handlers
   - Storage layer performs database operations
   - Results are returned to client

3. **Authentication Flow**:
   - Not yet fully implemented but infrastructure is in place

## External Dependencies

### Frontend Dependencies
- React for UI rendering
- Tailwind CSS for styling
- Shadcn UI (built on Radix UI) for component library
- Framer Motion for animations
- React Query for server-state management
- Wouter for routing

### Backend Dependencies
- Express.js for server and API
- Drizzle ORM for database operations
- Neon Database connector (@neondatabase/serverless)
- Connect-pg-simple for session management

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Build Process**:
   - `npm run build`: Builds both client and server
   - Client: Vite bundles React into static assets
   - Server: esbuild bundles TypeScript server for production

2. **Production Running**:
   - `npm run start`: Runs the built server which serves the API and static assets

3. **Database**:
   - Configured to use a PostgreSQL database (when fully implemented)
   - Uses environment variables for database configuration

4. **Environment Variables**:
   - `DATABASE_URL`: PostgreSQL connection string
   - `NODE_ENV`: Environment mode

## Development Workflow

1. **Local Development**:
   - `npm run dev`: Start development server
   - Vite provides hot module replacement for client
   - Server automatically reloads on changes

2. **Database Updates**:
   - `npm run db:push`: Apply schema changes to database
   - Schema is defined in shared/schema.ts

3. **Type Checking**:
   - `npm run check`: Run TypeScript type checking

## Next Development Steps

1. Implement proper database integration with Postgres
2. Complete authentication and session management
3. Implement API routes for habit CRUD operations
4. Connect frontend to backend API endpoints
5. Implement data visualization for progress tracking
6. Develop achievement system logic