import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { projectService } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { BookOpen, Star, Calendar } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewingRequest, setReviewingRequest] = useState<any>(null);
  const [reviewData, setReviewData] = useState({ rating: 5, comment: '' });

  // Fetch customer requests
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await projectService.getMyRequests();
        setRequests(response.data.data || response.data || []);
      } catch (error) {
        toast.error('Failed to load your requests');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const handleSubmitReview = async () => {
    if (!reviewingRequest) return;

    try {
      await projectService.addReview(reviewingRequest._id || reviewingRequest.id, {
        rating: reviewData.rating,
        comment: reviewData.comment,
      });

      setRequests((prev) =>
        prev.map((r) =>
          r._id === reviewingRequest._id || r.id === reviewingRequest.id
            ? { ...r, reviewed: true }
            : r
        )
      );

      setReviewingRequest(null);
      setReviewData({ rating: 5, comment: '' });
      toast.success('Review submitted successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to submit review');
    }
  };

  const activeRequests = requests.filter((r) => r.status !== 'completed' && r.status !== 'rejected');
  const completedRequests = requests.filter((r) => r.status === 'completed');

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
          <p className="text-foreground/70">Welcome back, {user?.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Total Bookings</p>
                  <p className="text-2xl font-bold">{requests.length}</p>
                </div>
                <BookOpen className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Active</p>
                  <p className="text-2xl font-bold">{activeRequests.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground/70 mb-1">Completed</p>
                  <p className="text-2xl font-bold">{completedRequests.length}</p>
                </div>
                <Star className="w-8 h-8 text-primary opacity-20" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="active" className="space-y-6">
          <TabsList>
            <TabsTrigger value="active">Active Bookings</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          {/* Active Bookings Tab */}
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Service Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-foreground/70">Loading bookings...</p>
                ) : activeRequests.length === 0 ? (
                  <p className="text-foreground/70 text-center py-8">No active bookings</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Service</TableHead>
                          <TableHead>Provider</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Booked Date</TableHead>
                          <TableHead>Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {activeRequests.map((request) => (
                          <TableRow key={request._id || request.id}>
                            <TableCell>{request.service?.Title || 'Unknown'}</TableCell>
                            <TableCell>{request.provider?.name || 'Unknown'}</TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  request.status === 'accepted'
                                    ? 'default'
                                    : request.status === 'pending'
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {request.status}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {new Date(request.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button size="sm" variant="outline">
                                Contact Provider
                              </Button>
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

          {/* Completed Tab */}
          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Services</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-foreground/70">Loading completed services...</p>
                ) : completedRequests.length === 0 ? (
                  <p className="text-foreground/70 text-center py-8">No completed services yet</p>
                ) : (
                  <div className="space-y-4">
                    {completedRequests.map((request) => (
                      <Card key={request._id || request.id}>
                        <CardContent className="pt-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h4 className="font-semibold">{request.service?.Title}</h4>
                              <p className="text-sm text-foreground/70">
                                by {request.provider?.name}
                              </p>
                            </div>
                            <Badge>Completed</Badge>
                          </div>

                          {request.reviewed ? (
                            <div className="bg-muted p-3 rounded-lg">
                              <div className="flex items-center gap-1 mb-2">
                                {[...Array(request.review?.rating || 0)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                              </div>
                              <p className="text-sm text-foreground/70">
                                {request.review?.comment}
                              </p>
                            </div>
                          ) : (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button
                                  size="sm"
                                  onClick={() => setReviewingRequest(request)}
                                >
                                  Leave Review
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Leave a Review</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div>
                                    <Label htmlFor="rating">Rating</Label>
                                    <select
                                      id="rating"
                                      value={reviewData.rating}
                                      onChange={(e) =>
                                        setReviewData((prev) => ({
                                          ...prev,
                                          rating: parseInt(e.target.value),
                                        }))
                                      }
                                      className="w-full px-3 py-2 border border-border rounded-md"
                                    >
                                      <option value="1">1 - Poor</option>
                                      <option value="2">2 - Fair</option>
                                      <option value="3">3 - Good</option>
                                      <option value="4">4 - Very Good</option>
                                      <option value="5">5 - Excellent</option>
                                    </select>
                                  </div>
                                  <div>
                                    <Label htmlFor="comment">Comment</Label>
                                    <Textarea
                                      id="comment"
                                      placeholder="Share your experience..."
                                      value={reviewData.comment}
                                      onChange={(e) =>
                                        setReviewData((prev) => ({
                                          ...prev,
                                          comment: e.target.value,
                                        }))
                                      }
                                      rows={4}
                                    />
                                  </div>
                                  <Button
                                    onClick={handleSubmitReview}
                                    className="w-full"
                                  >
                                    Submit Review
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>My Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-foreground/70">Name</Label>
                  <p className="font-medium">{user?.name}</p>
                </div>
                <div>
                  <Label className="text-foreground/70">Email</Label>
                  <p className="font-medium">{user?.email}</p>
                </div>
                <div>
                  <Label className="text-foreground/70">Account Type</Label>
                  <Badge className="mt-2">{user?.role}</Badge>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
