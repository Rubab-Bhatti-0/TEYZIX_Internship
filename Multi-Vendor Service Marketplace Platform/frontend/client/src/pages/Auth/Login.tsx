import { useState } from 'react';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { authService } from '@/lib/api';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const [, navigate] = useLocation();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await authService.login(formData);
      
      // Extract token and user from response
      const token = response.data.token || response.data.data?.token;
      const user = response.data.user || response.data.data?.user;

      if (token && user) {
        login(user, token);
        toast.success('Logged in successfully!');
        
        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/admin-dashboard');
        } else if (user.role === 'provider') {
          navigate('/provider-dashboard');
        } else {
          navigate('/');
        }
      } else {
        toast.error('Invalid response from server');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <p className="text-sm text-foreground/70 mt-2">
            Welcome back to ServiceHub
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-foreground/70">Don't have an account? </span>
            <button
              onClick={() => navigate('/register')}
              className="text-primary hover:underline font-medium"
            >
              Register here
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
