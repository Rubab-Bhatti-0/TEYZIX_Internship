import { Button } from '@/components/ui/button';
import { useLocation } from 'wouter';
import { ArrowRight, Briefcase, Users, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function Home() {
  const [, navigate] = useLocation();
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-background to-muted">
        <div className="container">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Connect with Expert Service Providers
            </h1>
            <p className="text-lg text-foreground/70 mb-8">
              Find, book, and manage services from trusted professionals. Whether you need home repairs, consulting, or specialized services, we've got you covered.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate('/services')}
                className="gap-2"
              >
                Browse Services
                <ArrowRight className="w-4 h-4" />
              </Button>
              {!isAuthenticated ? (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
              ) : user?.role === 'provider' ? (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/provider-dashboard')}
                >
                  Go to Dashboard
                </Button>
              ) : (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/customer-dashboard')}
                >
                  My Bookings
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container">
          <h2 className="text-3xl font-bold mb-12 text-center">Why Choose ServiceHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Vetted Professionals</h3>
              <p className="text-foreground/70">
                All service providers are verified and reviewed by our community.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Easy Booking</h3>
              <p className="text-foreground/70">
                Browse services, compare prices, and book in just a few clicks.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg border border-border hover:border-primary/50 transition-colors">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-2">Grow Your Business</h3>
              <p className="text-foreground/70">
                For providers: reach more customers and grow your service business.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-foreground/70 mb-8 max-w-xl mx-auto">
            Join thousands of customers and providers already using ServiceHub.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated && (
              <>
                <Button
                  size="lg"
                  onClick={() => navigate('/register')}
                >
                  Sign Up as Customer
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/register')}
                >
                  Become a Provider
                </Button>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
