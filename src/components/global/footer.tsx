import { Logo } from '@/components/global/logo';
import { Github, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col gap-4 md:col-span-2 lg:col-span-1">
            <Logo />
            <p className="text-sm text-muted-foreground">Elegante Mode für Kenner.</p>
            <div className="flex gap-4 mt-2">
              <Link href="#" aria-label="Twitter"><Twitter className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /></Link>
              <Link href="#" aria-label="Facebook"><Facebook className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="w-5 h-5 text-muted-foreground hover:text-foreground transition-colors" /></Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-3">
              <li><Link href="/women" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Damen</Link></li>
              <li><Link href="/men" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Herren</Link></li>
              <li><Link href="/clothing" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Kleidung</Link></li>
              <li><Link href="/accessories" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Accessoires</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Hilfe</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Kontakt</Link></li>
              <li><Link href="/account/orders" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Bestellverfolgung</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Rücksendungen</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">FAQ</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Rechtliches</h3>
            <ul className="space-y-3">
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Nutzungsbedingungen</Link></li>
              <li><Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Datenschutzrichtlinie</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} EZENTIALS. Alle Rechte vorbehalten.</p>
        </div>
      </div>
    </footer>
  );
}
