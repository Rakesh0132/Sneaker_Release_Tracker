
import { Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import SneakerCard from "@/components/SneakerCard"
import type { Sneaker } from "@/services/sneakerService"

const Favorites = () => {
  // This would typically come from an API or context
  const favorites: Sneaker[] = [
    {
      id: "1",
      brand: "Nike",
      model: "Air Max 90",
      colorway: "Bred",
      retailPrice: 129.99,
      releaseDate: "2024-05-01",
      imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=airmax90",
      status: "upcoming",
      price: 129.99,
      inStock: true,
      description: "Classic Nike Air Max 90 in the iconic Bred colorway."
    },
    {
      id: "2",
      brand: "Jordan",
      model: "1 Retro High",
      colorway: "Chicago",
      retailPrice: 169.99,
      releaseDate: "2024-06-15",
      imageUrl: "https://api.dicebear.com/7.x/shapes/svg?seed=jordan1",
      status: "upcoming",
      price: 169.99,
      inStock: true,
      description: "The legendary Air Jordan 1 High in the Chicago colorway."
    }
  ]

  return (
    <div className="container max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="flex flex-row items-center space-y-0 gap-4">
          <Heart className="h-6 w-6" />
          <CardTitle>My Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {favorites.map((sneaker) => (
              <SneakerCard key={sneaker.id} sneaker={sneaker} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Favorites
