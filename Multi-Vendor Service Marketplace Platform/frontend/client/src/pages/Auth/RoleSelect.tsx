import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users } from 'lucide-react';

export default function RoleSelect() {
  const [, navigate] = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Choose Your Role</h1>
          <p className="text-foreground/70">
            Select how you want to use ServiceHub
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Customer Card */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/70">
                Browse and book services from professional providers.
              </p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>✓ Browse services by category</li>
                <li>✓ Book and manage appointments</li>
                <li>✓ Leave reviews and ratings</li>
                <li>✓ Track service history</li>
              </ul>
              <Button
                className="w-full"
                onClick={() => navigate('/register')}
              >
                Continue as Customer
              </Button>
            </CardContent>
          </Card>

          {/* Provider Card */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Service Provider</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-foreground/70">
                Offer your services and grow your business.
              </p>
              <ul className="space-y-2 text-sm text-foreground/70">
                <li>✓ Create and manage services</li>
                <li>✓ Receive service requests</li>
                <li>✓ Build your reputation</li>
                <li>✓ Track earnings</li>
              </ul>
              <Button
                className="w-full"
                onClick={() => navigate('/register')}
              >
                Continue as Provider
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mt-8">
          <p className="text-foreground/70">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/login')}
              className="text-primary hover:underline font-medium"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
