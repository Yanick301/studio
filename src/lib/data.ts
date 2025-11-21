import type { Product, Testimonial } from './definitions';
import data from './placeholder-images.json';

export const products: Product[] = data.placeholderImages;

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Lena S.",
    quote: "Außergewöhnliche Qualität und ein unvergleichlicher Stil. EZENTIALS ist meine erste Anlaufstelle für Luxusmode geworden.",
    avatar: "https://i.pravatar.cc/150?u=lena"
  },
  {
    id: "2",
    name: "Felix K.",
    quote: "Endlich ein Shop, der männliche Eleganz versteht. Die Schnitte sind perfekt und die Materialien sehr angenehm.",
    avatar: "https://i.pravatar.cc/150?u=felix"
  },
  {
    id: "3",
    name: "Hannah W.",
    quote: "Ich habe ein Kleid für eine Gala bestellt und eine Flut von Komplimenten erhalten. Auch der Kundenservice ist sehr reaktionsschnell.",
    avatar: "https://i.pravatar.cc/150?u=hannah"
  }
];
