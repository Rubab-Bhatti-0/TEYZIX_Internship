import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { projectService, serviceService } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Briefcase, CheckCircle, Clock, Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [newService, setNewService] = useState({
    Title: '',
    Description: '',
    Category: '',
    Price: '',
    Location: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [requestsRes, servicesRes] = await Promise.all([
          projectService.getProviderRequests(),
          serviceService.getAllServices(),
        ]);
        
        setRequests(requestsRes.data.data || requestsRes.data || []);
        
        // Filter services for this provider if necessary
        const allServices = servicesRes.data.data || servicesRes.data || [];
        setServices(allServices.filter((s: any) => s.provider === user?._id || s.provider?._id === user?._id));
      } catch (error) {
        toast.error('Failed to load dashboard data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user?._id]);

  const handleStatusUpdate = async (id: string, status: string) => {
    try {
      await projectService.updateStatus(id, status);
      setRequests((prev) =>
        prev.map((r) => (r._id === id || r.id === id ? { ...r, status } : r))
      );
      toast.success(`Booking ${status} successfully`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  const handleCreateService = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await serviceService.createService({
        ...newService,
        Price: Number(newService.Price),
      });
      setServices((prev) => [...prev, response.data.data || response.data]);
      setIsCreatingService(false);
      setNewService({ Title: '', Description: '', Category: '', Price: '', Location: '' });
      toast.success('Service created successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create service');
    }
  };

  const pendingRequests = requests.filter((r) => r.status === 'pending');
  const activeRequests = requests.filter((r) => r.status === 'accepted');

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Provider Dashboard</h1>
            <p className="text-foreground/70">Manage your services and bookings, {user?.name}</p>
          </div>
          <Dialog open={isCreatingService} onOpenChange={setIsCreatingService}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add New Service
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Service</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleCreateService} className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Service Title</Label>
                  <Input
                    id="title"
                    value={newService.Title}
                    onChange={(e) => setNewService({ ...newService, Title: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={newService.Category}
                    onChange={(e) => setNewService({ ...newService, Category: e.target.value })}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={newService.Price}
                      onChange={(e) => setNewService({ ...newService, Price: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={newService.Location}
                      onChange={(e) => setNewService({ ...newService, Location: e.target.value })}
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newService.Description}
                    onChange={(e) => setNewService({ ...newService, Description: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">Create Service</Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Total Services</p>
                  <p className="text-2xl font-bold">{services.length}</p>
                </div>
                <Briefcase className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Pending Requests</p>
                  <p className="text-2xl font-bold">{pendingRequests.length}</p>
                </div>
                <Clock className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Active Projects</p>
                  <p className="text-2xl font-bold">{activeRequests.length}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="requests" className="space-y-6">
          <TabsList>
            <TabsTrigger value="requests">Bookings</TabsTrigger>
            <TabsTrigger value="services">My Services</TabsTrigger>
          </TabsList>

          <TabsContent value="requests">
            <Card>
              <CardHeader>
                <CardTitle>Service Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-center py-8">Loading...</p>
                ) : requests.length === 0 ? (
                  <p className="text-center py-8 text-foreground/70">No bookings yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Customer</TableHead>
                          <TableHead>Service</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {requests.map((request) => (
                          <TableRow key={request._id || request.id}>
                            <TableCell>{request.user?.name}</TableCell>
                            <TableCell>{request.service?.Title}</TableCell>
                            <TableCell>
                              <Badge variant={request.status === 'pending' ? 'secondary' : 'default'}>
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell>
                              {request.status === 'pending' && (
                                <div className="flex gap-2">
                                  <Button size="sm" onClick={() => handleStatusUpdate(request._id, 'accepted')}>
                                    Accept
                                  </Button>
                                  <Button size="sm" variant="destructive" onClick={() => handleStatusUpdate(request._id, 'rejected')}>
                                    Reject
                                  </Button>
                                </div>
                              )}
                              {request.status === 'accepted' && (
                                <Button size="sm" onClick={() => handleStatusUpdate(request._id, 'completed')}>
                                  Mark Complete
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service._id || service.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl">{service.Title}</CardTitle>
                      <Badge>{service.Category}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{service.Description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">${service.Price}</span>
                      <span className="text-sm text-foreground/60">{service.Location}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
