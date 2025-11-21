export type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl: string;
  imageHint: string;
  width: number;
  height: number;
  category: 'clothing' | 'accessories' | 'shoes';
  gender: 'men' | 'women' | 'unisex';
  isTrending: boolean;
  details?: string;
  options?: {
    sizes?: string[];
    colors?: string[];
  }
};

export type Testimonial = {
  id: string;
  name: string;
  quote: string;
  avatar: string;
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type FaqItem = {
  question: string;
  answer: string;
};