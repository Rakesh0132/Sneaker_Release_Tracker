
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Clock, Calendar, DollarSign, Tag, Check, X } from "lucide-react";
import { getSneakerById, formatReleaseDate, Sneaker } from "@/services/sneakerService";
import { useToast } from "@/hooks/use-toast";

const SneakerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [sneaker, setSneaker] = useState<Sneaker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchSneakerDetails = async () => {
      if (!id) return;
      
      try {
        const data = await getSneakerById(id);
        if (data) {
          setSneaker(data);
        } else {
          setError("Sneaker not found");
          toast({
            title: "Error",
            description: "The requested sneaker could not be found.",
            variant: "destructive",
          });
        }
      } catch (err) {
        setError("Failed to fetch sneaker details");
        toast({
          title: "Error",
          description: "Failed to fetch sneaker details. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchSneakerDetails();
  }, [id, toast]);

  const handleNotifyClick = () => {
    toast({
      title: "Notification Set",
      description: `You'll be notified when the ${sneaker?.brand} ${sneaker?.model} drops.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading sneaker details...</p>
        </div>
      </div>
    );
  }

  if (error || !sneaker) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="text-primary flex items-center gap-1 mb-6 hover:underline">
            <ArrowLeft className="w-4 h-4" />
            Back to all sneakers
          </Link>
          
          <div className="bg-red-100 text-red-700 p-6 rounded-lg text-center">
            <p className="text-xl font-medium">{error || "Sneaker not found"}</p>
            <Button
              onClick={() => window.location.reload()}
              className="mt-4"
              variant="destructive"
            >
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/" className="text-primary flex items-center gap-1 mb-6 hover:underline">
          <ArrowLeft className="w-4 h-4" />
          Back to all sneakers
        </Link>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="relative overflow-hidden rounded-lg">
            <img
              src={sneaker.imageUrl}
              alt={`${sneaker.brand} ${sneaker.model}`}
              className="w-full h-auto object-cover aspect-square"
            />
            <Badge 
              className="absolute top-4 right-4" 
              variant={sneaker.inStock ? "success" : "destructive"}
            >
              {sneaker.inStock ? "In Stock" : "Out of Stock"}
            </Badge>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold">{sneaker.model}</h1>
              <p className="text-xl text-muted-foreground">{sneaker.brand}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{sneaker.colorway}</Badge>
                <Badge variant="outline" className="bg-primary/10">{sneaker.status}</Badge>
              </div>
            </div>
            
            <Card>
              <CardContent className="p-4 space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Release Date</p>
                    <p className="font-medium">{formatReleaseDate(sneaker.releaseDate)}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <DollarSign className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium">${sneaker.price}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Style</p>
                    <p className="font-medium">{sneaker.colorway}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {sneaker.inStock ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <X className="h-5 w-5 text-red-500" />
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <p className="font-medium">{sneaker.inStock ? "Available" : "Not Available"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-muted-foreground leading-relaxed">
                {sneaker.description || "No description available."}
              </p>
            </div>
            
            <div className="flex gap-4 pt-4">
              <Button onClick={handleNotifyClick} className="flex-1">
                Notify Me
              </Button>
              <Button variant="outline" className="flex-1">
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="bg-muted mt-20 py-6">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Clock className="h-4 w-4" />
            <p className="text-sm">Last updated: April 14, 2025</p>
          </div>
          <p className="text-sm text-muted-foreground">© 2025 Sneaker Release Tracker. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SneakerDetails;
