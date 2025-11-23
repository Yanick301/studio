'use client';

import { Logo } from '@/components/global/logo';
import { Github, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { Separator } from '@/components/ui/separator';

const SnapchatIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    fill="currentColor"
  >
    <title>Snapchat</title>
    <path d="M11.975 1.132c-3.23.01-5.862 2.64-5.871 5.871-.009 2.84 2.015 5.213 4.782 5.753a6.205 6.205 0 0 1-1.398 1.763c-1.286.99-2.909.82-4.043-.368-1.134-1.189-1.29-2.812-.3-4.098a.526.526 0 0 1 .893-.162c.28.32.243.8-.08.995a2.622 2.622 0 0 0 .153 3.486c.74.759 1.83.915 2.724.385a.526.526 0 0 1 .68.058 7.237 7.237 0 0 0 2.215 1.235c-1.895 1.52-4.14 2.705-4.14 5.31 0 2.295 1.868 4.149 4.163 4.149 2.295 0 4.163-1.854 4.163-4.149 0-2.62-2.22-3.79-4.116-5.31a.526.526 0 0 1-.162-.64c.1-.25.39-.37.64-.26a7.234 7.234 0 0 0 3.824-3.163c2.476-.73 4.163-3.08 4.163-5.87C17.828 3.772 15.196 1.123 11.975 1.132zm.019 1.053c2.67.01 4.82 2.16 4.829 4.829.01 2.67-2.15 4.829-4.82 4.829-2.67-.01-4.82-2.16-4.829-4.829-.01-2.67 2.15-4.83 4.82-4.829z" />
  </svg>
);


export function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: 'Twitter', href: '#', icon: Twitter },
    { name: 'Facebook', href: '#', icon: Facebook },
    { name: 'Instagram', href: '#', icon: Instagram },
    { name: 'Snapchat', href: 'https://snapchat.com/t/qez0Z1z0', icon: SnapchatIcon },
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
            {socialLinks.map((social) => {
              const Icon = social.icon;
              return (
                <Link key={social.name} href={social.href} aria-label={social.name}>
                  <Icon className="h-5 w-5 text-muted-foreground transition-colors hover:text-foreground" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
