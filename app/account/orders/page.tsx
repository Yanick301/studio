'use client';

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';
import { Order, OrderItem } from '@/lib/definitions';
import { Skeleton } from "@/components/ui/skeleton";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Image from "next/image";

function OrderItemDetails({ userId, orderId }: { userId: string, orderId: string }) {
    const { t } = useTranslation();
    const firestore = useFirestore();

    const itemsCollectionRef = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, `users/${userId}/orders/${orderId}/orderItems`);
    }, [firestore, userId, orderId]);

    const { data: items, isLoading } = useCollection<OrderItem>(itemsCollectionRef);

    if (isLoading) return <div className="p-4"><Skeleton className="h-12 w-full" /></div>;

    return (
        <div className="space-y-4 p-4 bg-muted/50 rounded-b-lg">
            {items?.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                    <Image src={item.imageUrl} alt={t(item.name)} width={60} height={80} className="rounded-md object-cover"/>
                    <div>
                        <p className="font-semibold">{t(item.name)}</p>
                        <p className="text-sm text-muted-foreground">
                            {t('orders_page.quantity')}: {item.quantity} - {item.price.toFixed(2)} €
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default function OrdersPage() {
    const { t } = useTranslation();
    const { user } = useUser();
    const firestore = useFirestore();

    const ordersCollectionRef = useMemoFirebase(() => {
        if (!user || !firestore) return null;
        return collection(firestore, `users/${user.uid}/orders`);
    }, [user, firestore]);

    const q = useMemoFirebase(() => {
        if (!ordersCollectionRef) return null;
        return query(ordersCollectionRef, orderBy('orderDate', 'desc'));
    }, [ordersCollectionRef]);

    const { data: orders, isLoading } = useCollection<Order>(q);

    return (
        <Card>
            <CardHeader>
                <CardTitle>{t('orders_page.title')}</CardTitle>
                <CardDescription>{t('orders_page.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-4">
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                        <Skeleton className="h-16 w-full" />
                    </div>
                ) : !orders || orders.length === 0 ? (
                    <p className="text-muted-foreground">{t('orders_page.no_orders')}</p>
                ) : (
                    <Accordion type="single" collapsible className="w-full">
                        {orders.map(order => (
                            <AccordionItem key={order.id} value={order.id}>
                                <AccordionTrigger>
                                    <div className="flex justify-between w-full pr-4">
                                        <div className="text-left">
                                            <p className="font-semibold">{t('orders_page.order_id')} #{order.id.substring(0, 7)}</p>
                                            <p className="text-sm text-muted-foreground">{new Date(order.orderDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="font-bold">{order.totalAmount.toFixed(2)} €</p>
                                            <p className="text-sm text-muted-foreground capitalize">{order.status}</p>
                                        </div>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent>
                                    {user && <OrderItemDetails userId={user.uid} orderId={order.id} />}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                )}
            </CardContent>
        </Card>
    );
}
