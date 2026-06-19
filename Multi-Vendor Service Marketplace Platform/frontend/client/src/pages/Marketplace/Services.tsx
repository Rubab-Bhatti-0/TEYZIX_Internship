import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import ServiceCard from '@/components/ServiceCard';
import { serviceService } from '@/lib/api';
import { toast } from 'sonner';
import { Search, Filter } from 'lucide-react';

export default function Services() {
  const [services, setServices] = useState<any[]>([]);
  const [filteredServices, setFilteredServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('newest');

  // Fetch services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await serviceService.getAllServices();
        const data = Array.isArray(response.data) ? response.data : response.data.data || [];
        setServices(data);
        setFilteredServices(data);
      } catch (error) {
        toast.error('Failed to load services');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = services;

    // Search filter
    if (searchTerm) {
      result = result.filter(
        (service) =>
          service.Title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.Description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (category !== 'all') {
      result = result.filter((service) => service.Category === category);
    }

    // Price filter
    result = result.filter(
      (service) => service.Price >= priceRange[0] && service.Price <= priceRange[1]
    );

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.Price - b.Price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.Price - a.Price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    setFilteredServices(result);
  }, [services, searchTerm, category, priceRange, sortBy]);

  // Get unique categories
  const categories = ['all'];
  const categorySet = new Set(services.map((s) => s.Category).filter(Boolean));
  categorySet.forEach((cat) => categories.push(cat));

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Services</h1>
          <p className="text-foreground/70">Find the perfect service for your needs</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <h2 className="font-semibold mb-4 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </h2>

              {/* Search */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="search" className="text-sm mb-2 block">
                    Search
                  </Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground/50" />
                    <Input
                      id="search"
                      placeholder="Search services..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                {/* Category */}
                <div>
                  <Label htmlFor="category" className="text-sm mb-2 block">
                    Category
                  </Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat || 'all'}>
                          {cat === 'all' ? 'All Categories' : cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range */}
                <div>
                  <Label className="text-sm mb-2 block">
                    Price Range: ${priceRange[0]} - ${priceRange[1]}
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    min={0}
                    max={1000}
                    step={50}
                    className="w-full"
                  />
                </div>

                {/* Sort */}
                <div>
                  <Label htmlFor="sort" className="text-sm mb-2 block">
                    Sort By
                  </Label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger id="sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="price-low">Price: Low to High</SelectItem>
                      <SelectItem value="price-high">Price: High to Low</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    setSearchTerm('');
                    setCategory('all');
                    setPriceRange([0, 1000]);
                    setSortBy('newest');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </Card>
          </div>

          {/* Services Grid */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-foreground/70">Loading services...</p>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="flex items-center justify-center py-12">
                <p className="text-foreground/70">No services found</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-foreground/70 mb-4">
                  Showing {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredServices.map((service) => (
                    <ServiceCard
                      key={service._id || service.id}
                      id={service._id || service.id}
                      title={service.Title || 'Untitled Service'}
                      description={service.Description || 'No description'}
                      price={service.Price || 0}
                      category={service.Category || 'Other'}
                      rating={service.rating || 4.5}
                      reviews={service.reviews || 0}
                      provider={{
                        name: service.provider?.name || 'Unknown Provider',
                        location: service.provider?.location,
                      }}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
