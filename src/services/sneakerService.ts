
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
    inStock: true // Added inStock property
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
    inStock: false
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
    inStock: true
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
    inStock: true
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
    inStock: false
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
