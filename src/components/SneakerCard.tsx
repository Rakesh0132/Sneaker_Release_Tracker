
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, BellRing } from "lucide-react";
import { useState } from "react";
import { toast } from "@/components/ui/sonner";
import { Sneaker, formatReleaseDate, getRelativeTime } from "@/services/sneakerService";
import { cn } from "@/lib/utils";

interface SneakerCardProps {
  sneaker: Sneaker;
}

export default function SneakerCard({ sneaker }: SneakerCardProps) {
  const [notificationEnabled, setNotificationEnabled] = useState(false);

  const toggleNotification = () => {
    setNotificationEnabled(!notificationEnabled);
    
    if (!notificationEnabled) {
      toast.success(`You'll be notified about the ${sneaker.brand} ${sneaker.model} release`, {
        description: "We'll send a reminder before the drop",
      });
    } else {
      toast.info(`Notification disabled for ${sneaker.brand} ${sneaker.model}`);
    }
  };

  const relativeTime = getRelativeTime(sneaker.releaseDate);
  
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={sneaker.imageUrl} 
          alt={`${sneaker.brand} ${sneaker.model}`}
          className="w-full h-full object-cover object-center transition-transform hover:scale-105"
        />
        <div className={cn(
          "absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium",
          relativeTime === "Today" ? "bg-orange-500 text-white" : 
          relativeTime === "Tomorrow" ? "bg-yellow-500 text-white" : 
          "bg-blue-500 text-white"
        )}>
          {relativeTime}
        </div>
      </div>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-xl">{sneaker.model}</CardTitle>
        <CardDescription>{sneaker.brand} • {sneaker.colorway}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-muted-foreground">Release Date:</p>
            <p className="font-medium">{formatReleaseDate(sneaker.releaseDate)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Price:</p>
            <p className="font-medium">${sneaker.retailPrice}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button variant="outline" onClick={toggleNotification}>
          {notificationEnabled ? (
            <>
              <BellRing className="mr-2 h-4 w-4" />
              Notify Me
            </>
          ) : (
            <>
              <Bell className="mr-2 h-4 w-4" />
              Notify Me
            </>
          )}
        </Button>
        <Button>View Details</Button>
      </CardFooter>
    </Card>
  );
}
