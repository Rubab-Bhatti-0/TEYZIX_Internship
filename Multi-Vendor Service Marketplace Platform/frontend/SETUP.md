# Frontend Setup Guide

## Prerequisites

- Node.js 18.0 or higher
- npm or pnpm package manager
- Backend API running (see backend setup instructions)

## Installation Steps

### 1. Install Dependencies

```bash
cd marketplace-frontend
pnpm install
```

Or with npm:
```bash
npm install
```

### 2. Configure Environment Variables

The frontend needs to know where the backend API is located. Create a `.env.local` file in the project root:

```bash
# Copy the example file
cp .env.example .env.local
```

Edit `.env.local` and update the API URL if your backend is not running on `http://localhost:5000`:

```env
# Backend API URL (adjust if backend is on different host/port)
VITE_API_URL=http://localhost:5000/api

# Optional: Analytics configuration
VITE_ANALYTICS_ENDPOINT=
VITE_ANALYTICS_WEBSITE_ID=
```

### 3. Start Development Server

```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## Backend Connection

The frontend expects the backend API to be running and accessible at the URL specified in `VITE_API_URL`.

### Default Backend URLs

- **Local Development**: `http://localhost:5000/api`
- **Production**: Update `VITE_API_URL` accordingly

### Testing the Connection

1. Open browser DevTools (F12)
2. Go to Network tab
3. Try logging in or browsing services
4. Check if API requests are successful (status 200-299)
5. If you see CORS errors, verify backend CORS configuration

## Available Scripts

```bash
# Start development server with hot reload
pnpm dev

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Type check
pnpm check

# Format code
pnpm format
```

## Project Structure

```
client/
├── src/
│   ├── pages/          # Page components
│   ├── components/     # Reusable components
│   ├── contexts/       # React contexts
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities and API client
│   ├── App.tsx         # Main app component
│   └── index.css       # Global styles
├── public/             # Static files
└── index.html          # HTML template
```

## Key Files

- **`client/src/lib/api.ts`** - API client configuration and endpoints
- **`client/src/contexts/AuthContext.tsx`** - Authentication state management
- **`client/src/App.tsx`** - Main app routes and layout
- **`client/index.html`** - HTML entry point

## Development Workflow

### Adding a New Page

1. Create a new file in `client/src/pages/`
2. Add the route in `client/src/App.tsx`
3. Import necessary components and hooks
4. Use `useAuth()` for authentication state
5. Use `useApi()` for API calls

Example:
```tsx
import { useAuth } from '@/contexts/AuthContext';
import { useApi } from '@/hooks/useApi';

export default function MyPage() {
  const { user } = useAuth();
  const { data, loading, error } = useApi(() => apiService.getData(), []);

  return (
    <div>
      {loading ? <p>Loading...</p> : <p>{data}</p>}
    </div>
  );
}
```

### Making API Calls

Use the pre-configured API client in `lib/api.ts`:

```tsx
import { serviceService } from '@/lib/api';

// In a component
const response = await serviceService.getAllServices();
```

### Authentication

Access user info and auth methods:

```tsx
import { useAuth } from '@/contexts/AuthContext';

const { user, isAuthenticated, login, logout } = useAuth();
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Use a different port
pnpm dev -- --port 3001
```

### API Connection Errors

1. Check backend is running: `curl http://localhost:5000/api/service`
2. Verify `VITE_API_URL` in `.env.local`
3. Check browser console for CORS errors
4. Ensure backend has CORS enabled for frontend origin

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear build artifacts
rm -rf dist .vite

# Rebuild
pnpm build
```

### TypeScript Errors

```bash
# Type check
pnpm check

# Fix common issues
pnpm format
```

## Production Build

### Build the Application

```bash
pnpm build
```

This creates an optimized production build in the `dist/` directory.

### Deploy

The `dist/` folder contains static files that can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service
- Your own server with a web server (nginx, Apache, etc.)

### Environment Variables for Production

Update `VITE_API_URL` to point to your production backend:

```env
VITE_API_URL=https://api.yourdomain.com/api
```

## Performance Tips

1. **Lazy Load Routes**: Pages are already code-split by Wouter
2. **Optimize Images**: Use appropriately sized images
3. **Monitor Bundle Size**: `pnpm build` shows bundle analysis
4. **Cache API Responses**: Implement caching in API hooks if needed
5. **Use React DevTools**: Profile components for performance issues

## Browser DevTools

### React DevTools Extension

Install the React DevTools browser extension to:
- Inspect component hierarchy
- View props and state
- Profile performance

### Network Tab

Monitor API calls:
1. Open DevTools (F12)
2. Go to Network tab
3. Filter by XHR/Fetch
4. Check request/response details

## Getting Help

1. Check the main README.md for feature documentation
2. Review ARCHITECTURE.md for system design
3. Check browser console for error messages
4. Verify backend is running and accessible
5. Check network tab for API errors

## Next Steps

1. Ensure backend is running
2. Start the development server: `pnpm dev`
3. Open http://localhost:3000 in your browser
4. Test authentication (register/login)
5. Browse services and test features
