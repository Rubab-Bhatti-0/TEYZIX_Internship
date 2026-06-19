# Multi-Vendor Service Marketplace - Frontend Architecture

## Project Overview

A clean, minimalistic React frontend for a multi-vendor service marketplace platform. The application supports three user roles: **Customers** (browse and book services), **Service Providers** (list and manage services), and **Admins** (platform management).

## Design Philosophy

**Minimalistic & Clean**: The interface prioritizes clarity, usability, and performance. Every visual element serves a purpose. The design uses:
- Neutral color palette (grays, whites, with accent colors for CTAs)
- Generous whitespace and clear typography hierarchy
- Subtle interactions and smooth transitions
- Responsive mobile-first layout

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first styling
- **shadcn/ui** - Pre-built accessible components
- **Wouter** - Lightweight client-side routing
- **Axios** - HTTP client for API calls
- **Zod** - Schema validation
- **React Hook Form** - Form state management

## Project Structure

```
client/
├── src/
│   ├── pages/              # Page-level components
│   │   ├── Home.tsx        # Landing page
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── RoleSelect.tsx
│   │   ├── Marketplace/
│   │   │   ├── Services.tsx         # Service listings
│   │   │   ├── ServiceDetail.tsx    # Single service view
│   │   │   └── Search.tsx           # Search & filter
│   │   ├── Dashboard/
│   │   │   ├── CustomerDashboard.tsx
│   │   │   ├── ProviderDashboard.tsx
│   │   │   └── AdminDashboard.tsx
│   │   └── NotFound.tsx
│   ├── components/         # Reusable components
│   │   ├── ui/            # shadcn/ui components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Footer.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ProviderCard.tsx
│   │   └── ErrorBoundary.tsx
│   ├── contexts/          # React contexts
│   │   ├── ThemeContext.tsx
│   │   └── AuthContext.tsx
│   ├── hooks/             # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   └── useMobile.tsx
│   ├── lib/               # Utilities
│   │   ├── api.ts         # API client setup
│   │   ├── utils.ts       # Helper functions
│   │   └── constants.ts
│   ├── App.tsx            # Routes & layout
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── public/                # Static assets (minimal)
└── index.html
```

## API Integration

**Base URL**: `http://localhost:5000/api` (configurable via env)

### Authentication Endpoints
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

### Service Endpoints
- `GET /service` - Get all services
- `POST /service` - Create service (provider only)
- `PUT /service/:id` - Update service (provider only)
- `DELETE /service/:id` - Delete service (provider only)

### Project/Request Endpoints
- `POST /project` - Create service request
- `PUT /project/:id/status` - Update request status
- `PUT /project/:id/review` - Add review
- `GET /project/myRequests` - Get customer requests
- `GET /project/provider` - Get provider requests
- `GET /project/admin/stats` - Admin statistics

## Authentication Flow

1. User registers with email, password, and role selection
2. Backend returns JWT token (stored in localStorage)
3. Token included in Authorization header for protected routes
4. Middleware verifies token and role before allowing access
5. Logout clears token from storage

## Page Structure

### Public Pages
- **Home** - Landing page with marketplace overview
- **Services** - Browse all services with filtering
- **Service Detail** - View single service, provider info, reviews
- **Login/Register** - Authentication pages

### Protected Pages (Customers)
- **Customer Dashboard** - View bookings, history, reviews
- **My Bookings** - Active and past service requests
- **Profile** - Edit customer information

### Protected Pages (Providers)
- **Provider Dashboard** - Manage services and requests
- **My Services** - Create, edit, delete services
- **Service Requests** - View and manage customer requests
- **Earnings** - Track revenue and statistics

### Protected Pages (Admins)
- **Admin Dashboard** - Platform statistics and management
- **Users** - Manage user accounts
- **Services** - Moderate services
- **Reports** - View platform analytics

## Component Hierarchy

```
App
├── Header (Navigation, Auth Status)
├── Router
│   ├── Home
│   ├── Auth Pages
│   │   ├── Login
│   │   ├── Register
│   │   └── RoleSelect
│   ├── Marketplace Pages
│   │   ├── Services (ServiceCard x N)
│   │   └── ServiceDetail
│   └── Dashboard Pages
│       ├── CustomerDashboard
│       ├── ProviderDashboard
│       └── AdminDashboard
└── Footer
```

## State Management

- **Authentication**: AuthContext (user, token, login, logout)
- **Theme**: ThemeContext (dark/light mode)
- **Local State**: Component-level with useState for forms and UI state
- **API Data**: Fetched on-demand with custom useApi hook

## Styling Approach

- **Tailwind CSS** for layout and spacing
- **CSS variables** in `index.css` for theming
- **shadcn/ui** for consistent component styling
- **Minimal custom CSS** - leverage Tailwind utilities

## Key Features

1. **Role-Based Access Control** - Different UI for customers, providers, admins
2. **Service Browsing** - Filter by category, price, rating
3. **Service Management** - Providers can create and manage services
4. **Booking System** - Customers request services, providers accept/reject
5. **Reviews & Ratings** - Customers can review completed services
6. **Search & Filter** - Find services by keyword, category, price range
7. **Responsive Design** - Mobile, tablet, and desktop layouts
8. **Error Handling** - Graceful error messages and fallbacks

## Development Workflow

1. Create pages in `src/pages/`
2. Extract reusable components to `src/components/`
3. Use custom hooks for API calls and state logic
4. Style with Tailwind utilities and shadcn/ui components
5. Test authentication and role-based access
6. Deploy with `pnpm build`

## Performance Considerations

- Lazy load pages with React.lazy() for code splitting
- Memoize expensive components with React.memo
- Optimize images with proper sizing
- Cache API responses where appropriate
- Minimize bundle size by using tree-shaking

## Accessibility

- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Focus management in modals and dialogs
- Color contrast compliance (WCAG AA)
