import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { projectService, serviceService } from '@/lib/api';
import { toast } from 'sonner';
import { Users, TrendingUp, DollarSign, Briefcase } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, servicesRes] = await Promise.all([
          projectService.getAdminStats(),
          serviceService.getAllServices(),
        ]);

        setStats(statsRes.data.data || statsRes.data);
        setServices(servicesRes.data.data || servicesRes.data || []);
      } catch (error) {
        toast.error('Failed to load admin data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-foreground/70">Platform management and analytics</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Total Users</p>
                  <p className="text-2xl font-bold">{stats?.totalUsers || 0}</p>
                </div>
                <Users className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

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
                  <p className="text-sm text-foreground/70 mb-1">Total Requests</p>
                  <p className="text-2xl font-bold">{stats?.totalRequests || 0}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Completed</p>
                  <p className="text-2xl font-bold">{stats?.completedRequests || 0}</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="services" className="space-y-6">
          <TabsList>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Services Tab */}
          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>All Services</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-foreground/70">Loading services...</p>
                ) : services.length === 0 ? (
                  <p className="text-foreground/70 text-center py-8">No services found</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Title</TableHead>
                          <TableHead>Category</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {services.map((service) => (
                          <TableRow key={service._id || service.id}>
                            <TableCell className="font-medium">
                              {service.Title}
                            </TableCell>
                            <TableCell>{service.Category}</TableCell>
                            <TableCell>${service.Price}</TableCell>
                            <TableCell>
                              {service.provider?.name || 'Unknown'}
                            </TableCell>
                            <TableCell>
                              <Badge>Active</Badge>
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

          {/* Analytics Tab */}
          <TabsContent value="analytics">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Platform Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Total Users</span>
                    <span className="font-semibold">{stats?.totalUsers || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Total Services</span>
                    <span className="font-semibold">{services.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Total Requests</span>
                    <span className="font-semibold">{stats?.totalRequests || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Completed Requests</span>
                    <span className="font-semibold">{stats?.completedRequests || 0}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Request Status Distribution</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Pending</span>
                    <span className="font-semibold">{stats?.pendingRequests || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Accepted</span>
                    <span className="font-semibold">{stats?.acceptedRequests || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Completed</span>
                    <span className="font-semibold">{stats?.completedRequests || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/70">Rejected</span>
                    <span className="font-semibold">{stats?.rejectedRequests || 0}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
