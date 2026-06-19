import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [, navigate] = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    if (user.role === 'provider') return '/provider-dashboard';
    if (user.role === 'admin') return '/admin-dashboard';
    return '/customer-dashboard';
  };

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => {
            navigate('/');
            setMobileMenuOpen(false);
          }}
          className="text-xl font-bold text-primary hover:opacity-80 transition-opacity"
        >
          ServiceHub
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <button
            onClick={() => navigate('/services')}
            className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
          >
            Services
          </button>
          {isAuthenticated && (
            <button
              onClick={() => navigate(getDashboardLink())}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              Dashboard
            </button>
          )}
        </nav>

        {/* Desktop Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <span className="text-sm text-foreground/70">
                {user?.name} ({user?.role})
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button
                size="sm"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container py-4 flex flex-col gap-3">
            <button
              onClick={() => {
                navigate('/services');
                setMobileMenuOpen(false);
              }}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors text-left py-2"
            >
              Services
            </button>
            {isAuthenticated && (
              <button
                onClick={() => {
                  navigate(getDashboardLink());
                  setMobileMenuOpen(false);
                }}
                className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors text-left py-2 flex items-center gap-2"
              >
                <LayoutDashboard className="w-4 h-4" />
                Dashboard
              </button>
            )}
            <div className="flex flex-col gap-2 pt-2 border-t border-border">
              {isAuthenticated ? (
                <>
                  <div className="text-sm text-foreground/70 py-2">
                    {user?.name} ({user?.role})
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="w-full justify-start gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigate('/login');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      navigate('/register');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full"
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
