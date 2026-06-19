import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';
import { useLocation } from 'wouter';

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  rating?: number;
  reviews?: number;
  provider?: {
    name: string;
    location?: string;
  };
  image?: string;
}

export default function ServiceCard({
  id,
  title,
  description,
  price,
  category,
  rating = 4.5,
  reviews = 0,
  provider,
  image,
}: ServiceCardProps) {
  const [, navigate] = useLocation();

  return (
    <Card
      className="cursor-pointer hover:shadow-md transition-shadow h-full"
      onClick={() => navigate(`/service/${id}`)}
    >
      {image && (
        <div className="w-full h-40 bg-muted overflow-hidden rounded-t-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-base line-clamp-2">{title}</h3>
            <p className="text-sm text-foreground/60 line-clamp-2 mt-1">
              {description}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {provider && (
          <div className="flex items-center gap-2 text-sm text-foreground/70">
            <span className="font-medium">{provider.name}</span>
            {provider.location && (
              <>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {provider.location}
                </div>
              </>
            )}
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
            {reviews > 0 && (
              <span className="text-sm text-foreground/60">({reviews})</span>
            )}
          </div>
          <div className="text-lg font-bold text-primary">
            ${price}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
