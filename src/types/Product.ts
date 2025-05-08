
export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  artisan: string;
  featured: boolean;
  isEcoFriendly?: boolean;
}

export interface PriceRange {
  label: string;
  min: number;
  max: number;
}
