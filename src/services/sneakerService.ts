
// Simulate fetching sneaker data from an API
// In a real-world scenario, you would replace this with actual API calls

export interface Sneaker {
  id: string;
  brand: string;
  model: string;
  colorway: string;
  releaseDate: string;
  retailPrice: number;
  imageUrl: string;
  status: 'upcoming' | 'released' | 'restocked';
  price: number; // Adding the missing price property
  inStock: boolean; // Adding the missing inStock property
  description?: string; // Optional description for details view
}

// Sample data - in a real app, this would come from an API
const mockSneakers: Sneaker[] = [
  {
    id: '1',
    brand: 'Nike',
    model: 'Air Jordan 1 High',
    colorway: 'Chicago',
    releaseDate: '2025-05-10T09:00:00Z',
    retailPrice: 180,
    price: 180, // Added price property
    imageUrl: 'https://images.unsplash.com/photo-1600269452121-4f2416e55c28?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1065&q=80',
    status: 'upcoming',
    inStock: true, // Added inStock property
    description: 'The Air Jordan 1 High "Chicago" is a timeless classic that returns with the original color blocking and premium materials. This iconic silhouette features a white leather base with red overlays and black Swoosh.'
  },
  {
    id: '2',
    brand: 'Adidas',
    model: 'Yeezy Boost 350 V2',
    colorway: 'Zebra',
    releaseDate: '2025-05-15T10:00:00Z',
    retailPrice: 220,
    price: 220,
    imageUrl: 'https://images.unsplash.com/photo-1618898909019-010e4e234c55?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    status: 'upcoming',
    inStock: false,
    description: 'The Yeezy Boost 350 V2 "Zebra" features Primeknit upper with a zebra-like pattern, a BOOST midsole for comfort, and the signature "SPLY-350" text along the lateral side.'
  },
  {
    id: '3',
    brand: 'New Balance',
    model: '550',
    colorway: 'White Green',
    releaseDate: '2025-04-28T08:00:00Z',
    retailPrice: 120,
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1539185441755-769473a23570?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    status: 'upcoming',
    inStock: true,
    description: 'The New Balance 550 "White Green" is a retro basketball sneaker featuring a white leather upper with green accents, perforated panels, and a comfortable EVA midsole.'
  },
  {
    id: '4',
    brand: 'Nike',
    model: 'Dunk Low',
    colorway: 'Panda',
    releaseDate: '2025-05-05T10:00:00Z',
    retailPrice: 110,
    price: 110,
    imageUrl: 'https://images.unsplash.com/photo-1605348532760-6753d2c43329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    status: 'upcoming',
    inStock: true,
    description: 'The Nike Dunk Low "Panda" features a clean black and white color scheme with a leather upper, padded collar for comfort, and a rubber outsole for traction.'
  },
  {
    id: '5',
    brand: 'Jordan',
    model: 'Air Jordan 4',
    colorway: 'Bred',
    releaseDate: '2025-06-01T09:00:00Z',
    retailPrice: 210,
    price: 210,
    imageUrl: 'https://images.unsplash.com/photo-1513188732907-5f732b831ca8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    status: 'upcoming',
    inStock: false,
    description: 'The Air Jordan 4 "Bred" is an iconic colorway featuring a black nubuck upper with red accents, visible Air unit in the heel, and the classic plastic wing eyelets and heel tab.'
  },
  {
    id: '6',
    brand: 'Nike',
    model: 'Air Max 90',
    colorway: 'Infrared',
    releaseDate: '2025-05-20T08:00:00Z',
    retailPrice: 140,
    price: 140,
    imageUrl: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80',
    status: 'upcoming',
    inStock: true,
    description: 'The Nike Air Max 90 "Infrared" is a timeless classic featuring a mix of mesh and leather with the iconic infrared accents and visible Max Air cushioning in the heel.'
  },
  {
    id: '7',
    brand: 'Puma',
    model: 'Suede Classic',
    colorway: 'Black White',
    releaseDate: '2025-04-30T10:00:00Z',
    retailPrice: 80,
    price: 80,
    imageUrl: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
    status: 'upcoming',
    inStock: true,
    description: 'The Puma Suede Classic in "Black White" features a plush suede upper, signature Formstrip branding, and a rubber outsole for traction and durability.'
  },
  {
    id: '8',
    brand: 'Adidas',
    model: 'Forum Low',
    colorway: 'Cloud White',
    releaseDate: '2025-05-25T09:00:00Z',
    retailPrice: 100,
    price: 100,
    imageUrl: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=712&q=80',
    status: 'upcoming',
    inStock: false,
    description: 'The Adidas Forum Low "Cloud White" is a classic basketball silhouette featuring a leather upper, adjustable ankle strap, and Three Stripes branding on the sides.'
  },
  {
    id: '9',
    brand: 'Converse',
    model: 'Chuck Taylor All Star',
    colorway: 'Red',
    releaseDate: '2025-05-02T08:00:00Z',
    retailPrice: 65,
    price: 65,
    imageUrl: 'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=721&q=80',
    status: 'upcoming',
    inStock: true,
    description: 'The Converse Chuck Taylor All Star in "Red" is an iconic sneaker featuring a canvas upper, rubber toe cap, and signature patch on the ankle.'
  },
  {
    id: '10',
    brand: 'Vans',
    model: 'Old Skool',
    colorway: 'Black White',
    releaseDate: '2025-05-08T10:00:00Z',
    retailPrice: 70,
    price: 70,
    imageUrl: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=698&q=80',
    status: 'upcoming',
    inStock: true,
    description: 'The Vans Old Skool in "Black White" features a durable suede and canvas upper, signature side stripe, and a vulcanized rubber outsole with the classic waffle pattern.'
  }
];

export function getSneakers(): Promise<Sneaker[]> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      resolve(mockSneakers);
    }, 500);
  });
}

export function getSneakerById(id: string): Promise<Sneaker | undefined> {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const sneaker = mockSneakers.find(s => s.id === id);
      resolve(sneaker);
    }, 300);
  });
}

export function formatReleaseDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  }).format(date);
}

export function getRelativeTime(dateString: string): string {
  const now = new Date();
  const releaseDate = new Date(dateString);
  const diffTime = releaseDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return 'Released';
  } else if (diffDays === 0) {
    return 'Today';
  } else if (diffDays === 1) {
    return 'Tomorrow';
  } else {
    return `In ${diffDays} days`;
  }
}
