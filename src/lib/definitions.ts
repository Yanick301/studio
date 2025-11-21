export type Product = {
  id: string;
  name: string; // This will be the translation key, e.g., "products.monarque_blazer.name"
  slug: string;
  description: string; // This will be the translation key
  price: number;
  imageUrl: string;
  imageHint: string;
  width: number;
  height: number;
  category: 'clothing' | 'accessories' | 'shoes';
  gender: 'men' | 'women' | 'unisex';
  isTrending: boolean;
  details?: string; // This will be the translation key
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
  question: string; // Translation key
  answer: string; // Translation key
};

export type Translations = {
  [key: string]: string | Translations;
};
