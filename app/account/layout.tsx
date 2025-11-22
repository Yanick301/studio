'use client';

import { ReactNode, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Heart, Package, User, ShieldAlert } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

export default function AccountLayout({ children }: { children: ReactNode }) {
    const { t } = useTranslation();
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    
    const accountNavLinks = [
        { href: '/account/profile', label: t('account_layout.profile'), icon: User },
        { href: '/account/orders', label: t('account_layout.orders'), icon: Package },
        { href: '/account/favorites', label: t('account_layout.favorites'), icon: Heart },
    ];

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [isUserLoading, user, router]);

    if (isUserLoading) {
        return <div className="container py-12 md:py-16 text-center">Chargement...</div>;
    }
    
    if (user && !user.emailVerified) {
        return (
             <div className="container py-12 md:py-16 max-w-2xl mx-auto">
                <Alert variant="destructive">
                    <ShieldAlert className="h-4 w-4" />
                    <AlertTitle>{t('account_layout.verification_required_title')}</AlertTitle>
                    <AlertDescription>
                        {t('account_layout.verification_required_desc')}
                    </AlertDescription>
                </Alert>
             </div>
        )
    }

    return (
        <div className="container py-12 md:py-16">
            <div className="grid md:grid-cols-[240px_1fr] gap-8 lg:gap-12">
                <aside className="md:sticky top-24 h-fit">
                    <h2 className="text-2xl font-bold mb-4">{t('account_layout.title')}</h2>
                    <nav className="flex flex-col gap-2">
                        {accountNavLinks.map(link => {
                            const Icon = link.icon;
                            return (
                                <Link key={link.href} href={link.href}>
                                    <Button variant="ghost" className="w-full justify-start gap-2">
                                        <Icon className="h-4 w-4 text-muted-foreground" />
                                        {link.label}
                                    </Button>
                                </Link>
                            )
                        })}
                    </nav>
                </aside>
                <main>{children}</main>
            </div>
        </div>
    );
}
