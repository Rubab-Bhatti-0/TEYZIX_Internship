# TEYZIX Multi-Vendor Service Marketplace Platform

A full-stack web application for a multi-vendor service marketplace where customers can request services and providers can offer their services.

## Project Structure

```
Multi-Vendor Service Marketplace Platform/
├── backend/          # Express.js backend API
│   ├── src/
│   │   ├── app.js
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   └── db/
│   ├── server.js
│   └── package.json
└── frontend/         # React + Vite frontend
    └── vite-project/
        ├── src/
        ├── package.json
        └── vite.config.js
```

## Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance like MongoDB Atlas)

## Installation & Setup

### 1. Backend Setup

Navigate to the backend directory:

```bash
cd "Multi-Vendor Service Marketplace Platform/backend"
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the backend directory with the following variables:

```env
PORT=3000
MONGODB_URL=mongodb://localhost:27017/teyzix_marketplace
JWT_SECRET_KEY=your_secret_jwt_key_here
```

**Note:** Replace `MONGODB_URL` with your MongoDB connection string if using MongoDB Atlas or a different host.

### 2. Frontend Setup

Navigate to the frontend directory:

```bash
cd "../frontend/vite-project"
```

Install dependencies:

```bash
npm install
```

## Running the Application

### Start the Backend Server

From the backend directory:

```bash
npm run dev
```

The backend API will start on `http://localhost:3000`

**API Endpoints:**
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/service/service` - Create a new service (Provider only)
- `GET /api/service/service` - Get all services
- `PUT /api/service/service/:id` - Update a service (Provider only)
- `DELETE /api/service/service/:id` - Delete a service (Provider only)
- `POST /api/project/project` - Create a new project request
- `PUT /api/project/:id/status` - Update project status
- `PUT /api/project/:id/review` - Add review/feedback to project
- `GET /api/project/myRequests` - Get user's project requests
- `GET /api/project/provider` - Get provider's project requests
- `GET /api/project/admin/stats` - Get admin statistics

### Start the Frontend Development Server

From the frontend directory:

```bash
npm run dev
```

The frontend will start on `http://localhost:5173`

## Key Fixes Applied

### Backend Issues Fixed:
1. ✅ **Route Mounting** - Fixed incorrect route paths in `app.js` (changed `./api/` to `/api/`)
2. ✅ **Auth Middleware** - Fixed header access (`req.headers.authorization` instead of `req.headers('authorization')`)
3. ✅ **Token Assignment** - Fixed middleware to assign decoded token instead of raw token
4. ✅ **Control Flow** - Fixed middleware control flow (added proper `next()` calls)
5. ✅ **Auth Controller** - Added token to response, fixed login query logic
6. ✅ **Service Controller** - Fixed invalid syntax in `createService`, corrected status codes
7. ✅ **Service Routes** - Fixed router initialization (`express.Router()` instead of `express.router`)
8. ✅ **Project Controller** - Fixed spread operator syntax, added async/await, corrected field names
9. ✅ **Project Routes** - Fixed controller reference (`project` instead of `ctrl`)
10. ✅ **Models** - Fixed all schema definitions (changed `=` to `:` in schema fields, fixed timestamps syntax)
11. ✅ **Service Provider Model** - Fixed schema syntax and export variable name

## User Roles

The platform supports three user roles:

- **user** - Customer who can request services
- **provider** - Service provider who can create and manage services
- **admin** - Administrator with access to platform statistics

## Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Backend server port | `3000` |
| `MONGODB_URL` | MongoDB connection string | `mongodb://localhost:27017/teyzix_marketplace` |
| `JWT_SECRET_KEY` | Secret key for JWT token signing | `your_secret_key_here` |

## Building for Production

### Backend:
```bash
# No build step required for Express backend
# Just ensure all dependencies are installed
npm install --production
```

### Frontend:
```bash
npm run build
```

The built files will be in the `dist/` directory.

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running on your machine or update `MONGODB_URL` with your MongoDB Atlas connection string
- Check that the connection string is correct in `.env`

### Port Already in Use
- Change the `PORT` variable in `.env` to an available port
- Or kill the process using the port: `lsof -i :3000` (macOS/Linux) or `netstat -ano | findstr :3000` (Windows)

### Module Not Found Errors
- Ensure all dependencies are installed: `npm install`
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## API Testing

You can test the API using tools like:
- **Postman** - https://www.postman.com/
- **Insomnia** - https://insomnia.rest/
- **Thunder Client** - VS Code extension

## License

ISC
