
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { getSneakers, Sneaker } from "@/services/sneakerService";
import SneakerCard from "@/components/SneakerCard";
import FilterBar from "@/components/FilterBar";
import { CalendarDays, Clock } from "lucide-react";

const Index = () => {
  const [sneakers, setSneakers] = useState<Sneaker[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    brands: [] as string[],
    priceRange: "all",
    releaseWindow: "all",
    inStockOnly: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    const fetchSneakers = async () => {
      try {
        const data = await getSneakers();
        setSneakers(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch sneaker releases");
        setLoading(false);
        toast({
          title: "Error",
          description: "Failed to fetch sneaker releases. Please try again later.",
          variant: "destructive",
        });
      }
    };

    fetchSneakers();
  }, [toast]);

  // Get unique brands from sneakers
  const availableBrands = [...new Set(sneakers.map(sneaker => sneaker.brand))];

  const applyFilters = (sneaker: Sneaker) => {
    // Brand filter
    if (filters.brands.length > 0 && !filters.brands.includes(sneaker.brand)) {
      return false;
    }

    // Price filter
    if (filters.priceRange !== "all") {
      const price = sneaker.price;
      if (
        (filters.priceRange === "under-100" && price >= 100) ||
        (filters.priceRange === "100-200" && (price < 100 || price > 200)) ||
        (filters.priceRange === "200-300" && (price < 200 || price > 300)) ||
        (filters.priceRange === "over-300" && price <= 300)
      ) {
        return false;
      }
    }

    // Release date filter
    if (filters.releaseWindow !== "all") {
      const releaseDate = new Date(sneaker.releaseDate);
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);

      const weekFromNow = new Date(today);
      weekFromNow.setDate(weekFromNow.getDate() + 7);

      const monthFromNow = new Date(today);
      monthFromNow.setMonth(monthFromNow.getMonth() + 1);

      const nextMonth = new Date(today);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      const twoMonthsFromNow = new Date(today);
      twoMonthsFromNow.setMonth(twoMonthsFromNow.getMonth() + 2);

      if (
        (filters.releaseWindow === "today" && 
          !(releaseDate.toDateString() === today.toDateString())) ||
        (filters.releaseWindow === "this-week" && 
          !(releaseDate >= today && releaseDate <= weekFromNow)) ||
        (filters.releaseWindow === "this-month" && 
          !(releaseDate >= today && releaseDate <= monthFromNow)) ||
        (filters.releaseWindow === "next-month" && 
          !(releaseDate >= nextMonth && releaseDate <= twoMonthsFromNow))
      ) {
        return false;
      }
    }

    // In stock filter
    if (filters.inStockOnly && !sneaker.inStock) {
      return false;
    }

    return true;
  };

  const filteredSneakers = sneakers
    .filter(
      (sneaker) =>
        (searchQuery === "" ||
          sneaker.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sneaker.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sneaker.colorway.toLowerCase().includes(searchQuery.toLowerCase())) &&
        applyFilters(sneaker)
    );

  const handleFilterClick = () => {
    // This function is still used for the button click, though most functionality
    // is now handled directly in the FilterBar component
    toast({
      title: "Filters Applied",
      description: "Your filter settings have been applied.",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-lg text-muted-foreground">Loading sneaker releases...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="bg-red-100 text-red-700 p-4 rounded-lg">
            <p className="text-lg font-medium">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl md:text-4xl font-bold">Sneaker Release Tracker</h1>
          <p className="mt-2 text-primary-foreground/80">Stay updated on the hottest upcoming sneaker drops</p>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <FilterBar 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            onFilterClick={handleFilterClick}
            filters={filters}
            setFilters={setFilters}
            availableBrands={availableBrands}
          />
        </div>

        {filteredSneakers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">No sneakers found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold">Upcoming Releases</h2>
              <span className="text-sm text-muted-foreground ml-2">
                ({filteredSneakers.length} {filteredSneakers.length === 1 ? 'item' : 'items'})
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSneakers.map((sneaker) => (
                <SneakerCard key={sneaker.id} sneaker={sneaker} />
              ))}
            </div>
          </>
        )}
      </main>
      
      <footer className="bg-muted mt-auto py-6">
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

export default Index;
