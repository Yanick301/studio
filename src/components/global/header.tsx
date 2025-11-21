import Link from 'next/link';
import { Logo } from '@/components/global/logo';
import { UserNav } from '@/components/global/user-nav';
import { Button } from '@/components/ui/button';
import { Heart, Menu, Search, ShoppingCart } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { href: '/women', label: 'Femme' },
  { href: '/men', label: 'Homme' },
  { href: '/clothing', label: 'Vêtements' },
  { href: '/accessories', label: 'Accessoires' },
  { href: '/recommendations', label: 'Styliste AI' },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden lg:flex">
          <Logo />
        </div>
        
        <div className="lg:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="p-4">
                <Logo />
              </div>
              <nav className="flex flex-col gap-4 mt-8 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-2 py-1 text-lg font-medium text-foreground hover:text-accent"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
        
        <div className="flex lg:hidden flex-1 justify-center">
             <Logo />
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium lg:flex flex-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-accent font-semibold"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end space-x-1 md:space-x-2">
          <Button variant="ghost" size="icon" aria-label="Search">
            <Search className="h-5 w-5" />
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Favorites">
            <Link href="/account/favorites">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="ghost" size="icon" aria-label="Shopping Cart">
             <Link href="/cart">
                <ShoppingCart className="h-5 w-5" />
             </Link>
          </Button>
          <div className="w-px h-6 bg-border mx-2 hidden sm:block"></div>
          <UserNav />
        </div>
      </div>
    </header>
  );
}
