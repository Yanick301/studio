'use client';

import { Logo } from '@/components/global/logo';
import { Github, Twitter, Facebook, Instagram } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/use-translation';
import { Separator } from '@/components/ui/separator';

const SnapchatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 4.1c-5.9 0-8.9 5.8-8.9 9.9 0 4.1 3 9.9 8.9 9.9s8.9-5.8 8.9-9.9c0-4.1-3-9.9-8.9-9.9zm0 14.9c-2.8 0-5-2.2-5-5s2.2-5 5-5 5 2.2 5 5-2.2 5-5 5zm-4.3-5.3c.2-.2.5-.3.8-.3s.6.1.8.3c.2.2.3.5.3.8s-.1.6-.3.8c-.2.2-.5.3-.8.3s-.6-.1-.8-.3c-.2-.2-.3-.5-.3-.8s.1-.6.3-.8z" />
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
