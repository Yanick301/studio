'use client';

import { Logo } from '@/components/global/logo';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { Separator } from '@/components/ui/separator';


export function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: 'Instagram', href: 'https://www.instagram.com/ezcentials_?igsh=MWQ2aTR6OWgyYnpvag%3D&utm_source=qr', image: '/homepage/inta.png' },
    { name: 'Snapchat', href: 'https://snapchat.com/t/qez0Z1z0', image: '/homepage/snap.png' },
  ];

  return (
    <footer className="border-t bg-card text-card-foreground">
      <div className="container py-12 md:py-16">
        <div className="flex flex-col items-center text-center">
          <Logo />
          <p className="mt-4 max-w-md text-muted-foreground">{t('footer.tagline')}</p>
        </div>

        <div className="my-12 grid grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:text-left">
          <div>
            <h3 className="font-semibold">{t('footer.shop')}</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/women" className="text-sm text-muted-foreground hover:text-foreground">{t('nav.women')}</Link></li>
              <li><Link href="/men" className="text-sm text-muted-foreground hover:text-foreground">{t('nav.men')}</Link></li>
              <li><Link href="/clothing" className="text-sm text-muted-foreground hover:text-foreground">{t('nav.clothing')}</Link></li>
              <li><Link href="/accessories" className="text-sm text-muted-foreground hover:text-foreground">{t('nav.accessories')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">{t('footer.help')}</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.contact')}</Link></li>
              <li><Link href="/account/orders" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.order_tracking')}</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.returns')}</Link></li>
              <li><Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.faq')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">{t('footer.legal')}</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.terms')}</Link></li>
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>

        <Separator />

        <div className="mt-8 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} EZENTIALS. {t('footer.rights_reserved')}
          </p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
                <Link key={social.name} href={social.href} aria-label={social.name}>
                    <div className="relative h-5 w-5">
                        <Image 
                            src={social.image} 
                            alt={`${social.name} logo`}
                            fill
                            className="object-contain transition-opacity hover:opacity-80"
                        />
                    </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
