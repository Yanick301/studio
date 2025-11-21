import { ReactNode } from "react";

interface ShopPageLayoutProps {
    title: string;
    description: string;
    children: ReactNode;
}

export function ShopPageLayout({ title, description, children }: ShopPageLayoutProps) {
    return (
        <div className="container py-12 md:py-16">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold">{title}</h1>
                <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">{description}</p>
            </div>
            {children}
        </div>
    );
}
