
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterClick: () => void;
  filters: {
    brands: string[];
    priceRange: string;
    releaseWindow: string;
    inStockOnly: boolean;
  };
  setFilters: (filters: {
    brands: string[];
    priceRange: string;
    releaseWindow: string;
    inStockOnly: boolean;
  }) => void;
  availableBrands: string[];
}

export default function FilterBar({ 
  searchQuery, 
  setSearchQuery, 
  filters, 
  setFilters, 
  availableBrands 
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const activeFiltersCount = 
    (filters.brands.length > 0 ? 1 : 0) + 
    (filters.priceRange !== "all" ? 1 : 0) + 
    (filters.releaseWindow !== "all" ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0);

  const handleBrandToggle = (brand: string) => {
    if (filters.brands.includes(brand)) {
      setFilters({
        ...filters,
        brands: filters.brands.filter(b => b !== brand)
      });
    } else {
      setFilters({
        ...filters,
        brands: [...filters.brands, brand]
      });
    }
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: "all",
      releaseWindow: "all",
      inStockOnly: false
    });
  };

  return (
    <div className="flex items-center space-x-2 w-full">
      <div className="relative flex-1">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search brands, models..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="relative">
            <SlidersHorizontal className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Filter Options</h3>
              {activeFiltersCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-xs" 
                  onClick={clearFilters}
                >
                  <X className="h-3 w-3 mr-1" /> Clear all
                </Button>
              )}
            </div>
            
            <div>
              <Label className="text-sm font-medium mb-2 block">Brands</Label>
              <div className="grid grid-cols-2 gap-2">
                {availableBrands.map((brand) => (
                  <div className="flex items-center space-x-2" key={brand}>
                    <Checkbox 
                      id={`brand-${brand}`} 
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                    />
                    <Label 
                      htmlFor={`brand-${brand}`}
                      className="text-sm cursor-pointer"
                    >
                      {brand}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="price-range" className="text-sm font-medium mb-2 block">Price Range</Label>
              <Select 
                value={filters.priceRange} 
                onValueChange={(value) => setFilters({...filters, priceRange: value})}
              >
                <SelectTrigger id="price-range">
                  <SelectValue placeholder="Select price range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Prices</SelectItem>
                  <SelectItem value="under-100">Under $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200-300">$200 - $300</SelectItem>
                  <SelectItem value="over-300">Over $300</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="release-window" className="text-sm font-medium mb-2 block">Release Window</Label>
              <Select 
                value={filters.releaseWindow} 
                onValueChange={(value) => setFilters({...filters, releaseWindow: value})}
              >
                <SelectTrigger id="release-window">
                  <SelectValue placeholder="Select release window" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Releases</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="this-month">This Month</SelectItem>
                  <SelectItem value="next-month">Next Month</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="in-stock"
                checked={filters.inStockOnly}
                onCheckedChange={(checked) => setFilters({...filters, inStockOnly: checked})}
              />
              <Label htmlFor="in-stock" className="text-sm cursor-pointer">In Stock Only</Label>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
