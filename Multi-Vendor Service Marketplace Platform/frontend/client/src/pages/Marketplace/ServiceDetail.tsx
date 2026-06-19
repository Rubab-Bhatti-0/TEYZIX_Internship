import { useState, useEffect } from 'react';
import { useRoute, useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Calendar, ArrowLeft } from 'lucide-react';
import { serviceService, projectService } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ServiceDetail() {
  const [match, params] = useRoute('/service/:id');
  const [, navigate] = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    if (!match || !params?.id) return;

    const fetchService = async () => {
      try {
        const response = await serviceService.getServiceById(params.id);
        setService(response.data.data || response.data);
      } catch (error) {
        toast.error('Failed to load service');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [match, params?.id]);

  const handleBookService = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a service');
      navigate('/login');
      return;
    }

    if (user?.role !== 'user') {
      toast.error('Only customers can book services');
      return;
    }

    setBooking(true);
    try {
      await projectService.createProject({
        serviceId: service._id || service.id,
        providerId: service.provider?._id || service.providerId,
      });
      toast.success('Service booked successfully!');
      navigate('/customer-dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to book service');
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-foreground/70">Loading service details...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-foreground/70 mb-4">Service not found</p>
        <Button onClick={() => navigate('/services')}>Back to Services</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/services')}
          className="flex items-center gap-2 text-primary hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Services
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Service Image */}
            {service.image && (
              <div className="w-full h-96 bg-muted rounded-lg overflow-hidden mb-6">
                <img
                  src={service.image}
                  alt={service.Title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Service Info */}
            <Card className="mb-6">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <CardTitle className="text-3xl mb-2">{service.Title}</CardTitle>
                    <Badge className="mb-4">{service.Category}</Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary mb-2">
                      ${service.Price}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{service.rating || 4.5}</span>
                      <span className="text-foreground/60">
                        ({service.reviews || 0} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-foreground/70 leading-relaxed">
                    {service.Description}
                  </p>
                </div>

                {service.DeliveryTime && (
                  <div className="flex items-center gap-2 text-foreground/70">
                    <Calendar className="w-5 h-5" />
                    <span>Delivery: {service.DeliveryTime} days</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Provider Info */}
            {service.provider && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the Provider</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold">{service.provider.name}</h4>
                    {service.provider.location && (
                      <div className="flex items-center gap-2 text-foreground/70 mt-1">
                        <MapPin className="w-4 h-4" />
                        {service.provider.location}
                      </div>
                    )}
                  </div>
                  {service.provider.bio && (
                    <p className="text-foreground/70">{service.provider.bio}</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Booking */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Book This Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Service Price</span>
                    <span className="font-medium">${service.Price}</span>
                  </div>
                  <div className="border-t border-border pt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${service.Price}</span>
                  </div>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={handleBookService}
                  disabled={booking || user?.role === 'provider'}
                >
                  {booking ? 'Booking...' : 'Book Now'}
                </Button>

                {!isAuthenticated && (
                  <p className="text-sm text-foreground/70 text-center">
                    <button
                      onClick={() => navigate('/login')}
                      className="text-primary hover:underline"
                    >
                      Login
                    </button>
                    {' '}to book this service
                  </p>
                )}

                {user?.role === 'provider' && (
                  <p className="text-sm text-amber-600 text-center">
                    Providers cannot book services
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
