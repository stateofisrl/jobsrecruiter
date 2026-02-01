# RecruiterAlert

## Overview

RecruiterAlert is a job alert management platform for recruiters. Users can create, manage, and configure job alerts with keywords, locations, and notification frequencies. The application features a landing page for unauthenticated users and a protected dashboard for managing alerts and recruiter profiles.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with protected route patterns
- **State Management**: TanStack React Query for server state and caching
- **UI Components**: Shadcn/ui component library with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Forms**: React Hook Form with Zod validation via @hookform/resolvers

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ESM modules
- **API Pattern**: RESTful endpoints defined in shared routes with Zod schema validation
- **Build**: esbuild for server bundling, Vite for client bundling

### Data Storage
- **Database**: PostgreSQL with Drizzle ORM
- **Schema Location**: `shared/schema.ts` for shared types between client and server
- **Migrations**: Drizzle Kit with `db:push` command for schema synchronization

### Authentication
- **Provider**: Replit Auth via OpenID Connect
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Session Management**: Express-session with secure cookie configuration
- **Protected Routes**: Middleware-based authentication checks on API endpoints

### Key Design Patterns
- **Shared Types**: Schema definitions in `shared/` directory used by both client and server
- **Type-safe API**: Zod schemas define request/response types with runtime validation
- **Component Architecture**: Reusable UI components in `client/src/components/ui/`
- **Custom Hooks**: Data fetching logic encapsulated in hooks (`use-alerts`, `use-auth`, `use-recruiter`)

## External Dependencies

### Database
- PostgreSQL database (required via `DATABASE_URL` environment variable)
- Drizzle ORM for database operations and migrations

### Authentication
- Replit Auth OIDC provider (`ISSUER_URL` defaults to `https://replit.com/oidc`)
- Requires `REPL_ID` and `SESSION_SECRET` environment variables

### Third-Party Libraries
- **UI**: Radix UI primitives, Lucide icons, class-variance-authority
- **Forms**: React Hook Form, Zod validation
- **Data**: TanStack React Query for API state management
- **Date Handling**: date-fns for date formatting