import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { MainNav } from "./components/MainNav"
import Index from "./pages/Index"
import NotFound from "./pages/NotFound"
import SneakerDetails from "./pages/SneakerDetails"
import Profile from "./pages/Profile"
import Orders from "./pages/Orders"
import Favorites from "./pages/Favorites"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <MainNav />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/sneaker/:id" element={<SneakerDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </QueryClientProvider>
)

export default App
