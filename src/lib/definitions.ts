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
  category: 'clothing' | 'accessories';
  gender: 'men' | 'women' | 'unisex';
  isTrending: boolean;
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
