
import { Home, User, ShoppingCart, Heart } from "lucide-react"
import { Link } from "react-router-dom"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNav() {
  return (
    <NavigationMenu className="max-w-none w-full justify-start px-6 py-3 border-b">
      <NavigationMenuList className="gap-6">
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Home className="mr-2 h-4 w-4" />
              Home
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/profile">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <User className="mr-2 h-4 w-4" />
              Profile
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/orders">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              Orders
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link to="/favorites">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              <Heart className="mr-2 h-4 w-4" />
              Favorites
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  )
}
