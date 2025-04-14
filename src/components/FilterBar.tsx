
import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onFilterClick: () => void;
}

export default function FilterBar({ searchQuery, setSearchQuery, onFilterClick }: FilterBarProps) {
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
      <Button variant="outline" size="icon" onClick={onFilterClick}>
        <SlidersHorizontal className="h-4 w-4" />
      </Button>
    </div>
  );
}
