import type { Product, Testimonial } from './definitions';
import data from './placeholder-images.json';

export const products: Product[] = data.placeholderImages;

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Chloé L.",
    quote: "Une qualité exceptionnelle et un style incomparable. Éclat Boutique est devenue ma référence pour la mode de luxe.",
    avatar: "https://i.pravatar.cc/150?u=chloe"
  },
  {
    id: "2",
    name: "Alexandre M.",
    quote: "Enfin une boutique qui comprend l'élégance masculine. Les coupes sont parfaites et les matières très agréables.",
    avatar: "https://i.pravatar.cc/150?u=alexandre"
  },
  {
    id: "3",
    name: "Sophie D.",
    quote: "J'ai commandé une robe pour un gala et j'ai reçu une pluie de compliments. Le service client est également très réactif.",
    avatar: "https://i.pravatar.cc/150?u=sophie"
  }
];
