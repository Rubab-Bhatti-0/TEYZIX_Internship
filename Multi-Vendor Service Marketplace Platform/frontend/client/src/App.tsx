import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RoleSelect from "./pages/Auth/RoleSelect";
import Services from "./pages/Marketplace/Services";
import ServiceDetail from "./pages/Marketplace/ServiceDetail";
import CustomerDashboard from "./pages/Dashboard/CustomerDashboard";
import ProviderDashboard from "./pages/Dashboard/ProviderDashboard";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

function Router() {
  return (
    <Switch>
      {/* Public Routes */}
      <Route path={"/"} component={Home} />
     <Route path={"/login"} component={Login} />
      <Route path={"/register"} component={Register} />
      <Route path={"/role-select"} component={RoleSelect} />
      <Route path={"/services"} component={Services} />
      <Route path={"/service/:id"} component={ServiceDetail} />

      {/* Protected Routes - Customer */}
      <Route path={"/customer-dashboard"}>
        <ProtectedRoute requiredRole="user">
          <CustomerDashboard />
        </ProtectedRoute>
      </Route>

      {/* Protected Routes - Provider */}
      <Route path={"/provider-dashboard"}>
        <ProtectedRoute requiredRole="provider">
          <ProviderDashboard />
        </ProtectedRoute>
      </Route>

      {/* Protected Routes - Admin */}
      <Route path={"/admin-dashboard"}>
        <ProtectedRoute requiredRole="admin">
          <AdminDashboard />
        </ProtectedRoute>
      </Route>

      {/* Fallback */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <div className="flex flex-col min-h-screen">
              <Header />
              <main className="flex-1">
                <Router />
              </main>
              <Footer />
            </div>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
