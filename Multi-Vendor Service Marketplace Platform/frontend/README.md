# ServiceHub - Multi-Vendor Service Marketplace Frontend

A clean, minimalistic React frontend for a multi-vendor service marketplace platform. Users can browse services, book providers, manage bookings, and service providers can manage their offerings.

## Features

### Public Features
- **Service Browsing**: Browse all available services with filtering by category and price
- **Service Search**: Full-text search across service titles and descriptions
- **Service Details**: View detailed information about individual services including provider info
- **Authentication**: User registration and login with role-based access control

### Customer Features
- **Dashboard**: View all bookings and service history
- **Service Booking**: Request services from providers
- **Reviews & Ratings**: Leave reviews and ratings for completed services
- **Booking Management**: Track active and completed service requests

### Provider Features
- **Service Management**: Create, edit, and delete services
- **Request Management**: Accept or reject incoming service requests
- **Dashboard**: View all service requests and manage provider profile
- **Analytics**: Track completed services and customer interactions

### Admin Features
- **Platform Analytics**: View overall platform statistics
- **Service Moderation**: Monitor all services on the platform
- **User Management**: View and manage platform users
- **Request Tracking**: Monitor all service requests across the platform

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS 4** - Utility-first CSS framework
- **shadcn/ui** - Pre-built accessible components
- **Wouter** - Lightweight client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form state management
- **Zod** - Schema validation

## Project Structure

```
client/
├── src/
│   ├── pages/              # Page-level components
│   │   ├── Home.tsx
│   │   ├── Auth/
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── RoleSelect.tsx
│   │   ├── Marketplace/
│   │   │   ├── Services.tsx
│   │   │   └── ServiceDetail.tsx
│   │   ├── Dashboard/
│   │   │   ├── CustomerDashboard.tsx
│   │   │   ├── ProviderDashboard.tsx
│   │   │   └── AdminDashboard.tsx
│   │   └── NotFound.tsx
│   ├── components/         # Reusable components
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── ServiceCard.tsx
│   │   ├── ProtectedRoute.tsx
│   │   └── ErrorBoundary.tsx
│   ├── contexts/          # React contexts
│   │   ├── AuthContext.tsx
│   │   └── ThemeContext.tsx
│   ├── hooks/             # Custom hooks
│   │   ├── useApi.ts
│   │   └── useMobile.tsx
│   ├── lib/               # Utilities
│   │   ├── api.ts         # API client
│   │   └── utils.ts
│   ├── App.tsx            # Main app component
│   └── index.css          # Global styles
└── index.html
```

## Getting Started

### Prerequisites
- Node.js 18+ and npm/pnpm
- Backend API running (see backend setup)

### Installation

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local

# Update VITE_API_URL in .env.local if backend is not on localhost:5000
```

### Development

```bash
# Start dev server
pnpm dev

# Open http://localhost:3000 in your browser
```

### Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Environment Variables

Create a `.env.local` file in the project root:

```env
# API Configuration
VITE_API_URL=http://localhost:5000/api

# Analytics (optional)
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=
```

## API Integration

The frontend communicates with the backend API at the configured `VITE_API_URL`. All API calls are made through the `api` client in `lib/api.ts` with automatic token management.

### Authentication Flow

1. User registers or logs in
2. Backend returns JWT token
3. Token is stored in localStorage
4. Token is automatically included in all subsequent requests
5. On 401 response, user is redirected to login

### API Endpoints Used

**Authentication**
- `POST /auth/register` - Create new account
- `POST /auth/login` - Login user
- `POST /auth/logout` - Logout user

**Services**
- `GET /service` - Get all services
- `GET /service/:id` - Get service details
- `POST /service` - Create service (provider only)
- `PUT /service/:id` - Update service (provider only)
- `DELETE /service/:id` - Delete service (provider only)

**Projects/Requests**
- `POST /project` - Create service request
- `GET /project/myRequests` - Get customer requests
- `GET /project/provider` - Get provider requests
- `PUT /project/:id/status` - Update request status
- `PUT /project/:id/review` - Add review
- `GET /project/admin/stats` - Get admin statistics

## Design Philosophy

The frontend follows a **minimalistic and clean** design approach:

- **Clarity First**: Every element serves a purpose. No unnecessary decorations.
- **Generous Whitespace**: Ample spacing between sections for better readability.
- **Neutral Palette**: Grays and whites with primary accent colors for CTAs.
- **Responsive Design**: Mobile-first approach with proper breakpoints.
- **Subtle Interactions**: Smooth transitions and hover effects without being distracting.
- **Accessibility**: Semantic HTML, ARIA labels, and keyboard navigation support.

## Authentication & Authorization

The application uses role-based access control with three roles:

- **User (Customer)**: Can browse services and make bookings
- **Provider**: Can create and manage services, accept/reject requests
- **Admin**: Can view platform analytics and manage content

Protected routes automatically redirect unauthenticated users to login and check role permissions.

## State Management

- **Authentication**: Managed via `AuthContext` with localStorage persistence
- **Theme**: Managed via `ThemeContext` (light/dark mode)
- **Local State**: Component-level state for forms and UI interactions
- **API Data**: Fetched on-demand with custom `useApi` hook

## Performance Optimization

- Code splitting with React.lazy() for route-based pages
- Memoization of expensive components
- Optimized re-renders with proper dependency arrays
- Lazy loading of images in service listings
- Minimal bundle size through tree-shaking

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Troubleshooting

### API Connection Issues
- Verify backend is running on the configured URL
- Check `VITE_API_URL` in `.env.local`
- Check browser console for CORS errors

### Authentication Issues
- Clear localStorage and try logging in again
- Check if backend is returning tokens correctly
- Verify JWT token format in API responses

### Build Issues
- Clear `node_modules` and reinstall: `pnpm install`
- Clear Vite cache: `rm -rf dist .vite`
- Rebuild: `pnpm build`

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT

## Support

For issues or questions, please refer to the backend repository or contact the development team.
