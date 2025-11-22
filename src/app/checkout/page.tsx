'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Lock } from "lucide-react";
import { useCart } from '@/contexts/cart-context';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from '@/hooks/use-toast';

const checkoutSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet est requis." }),
  address: z.string().min(5, { message: "L'adresse est requise." }),
  city: z.string().min(2, { message: "La ville est requise." }),
  zip: z.string().min(3, { message: "Le code postal est requis." }),
  country: z.string().min(2, { message: "Le pays est requis." }),
  cardNumber: z.string().regex(/^(?:\d{4} ?){3}\d{4}$/, { message: "Numéro de carte invalide." }),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, { message: "Date MM/AA invalide." }),
  cvc: z.string().regex(/^\d{3,4}$/, { message: "CVC invalide." }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
    const { t } = useTranslation();
    const { cart } = useCart();
    
    const form = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            fullName: '',
            address: '',
            city: '',
            zip: '',
            country: '',
            cardNumber: '',
            expiryDate: '',
            cvc: '',
        },
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const onSubmit: SubmitHandler<CheckoutFormValues> = (data) => {
        console.log("Form data submitted:", data);
        toast({
            title: "Paiement réussi !",
            description: "Votre commande a été passée avec succès.",
        });
        // Here you would typically process the payment with Stripe/PayPal
    };

    return (
        <ShopPageLayout
            title={t('checkout_page.title')}
            description={t('checkout_page.description')}
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Shipping & Payment Form */}
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-semibold mb-4">{t('checkout_page.shipping_address')}</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem className="sm:col-span-2">
                                            <FormLabel>{t('checkout_page.full_name')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('checkout_page.full_name_placeholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({ field }) => (
                                        <FormItem className="sm:col-span-2">
                                            <FormLabel>{t('checkout_page.address')}</FormLabel>
                                            <FormControl>
                                                <Input placeholder={t('checkout_page.address_placeholder')} {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('checkout_page.city')}</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="zip"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('checkout_page.zip_code')}</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({ field }) => (
                                        <FormItem className="sm:col-span-2">
                                            <FormLabel>{t('checkout_page.country')}</FormLabel>
                                            <FormControl><Input {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4">{t('checkout_page.payment_details')}</h2>
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="cardNumber"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>{t('checkout_page.card_number')}</FormLabel>
                                            <FormControl><Input placeholder="0000 0000 0000 0000" {...field} /></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="expiryDate"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('checkout_page.expiry_date')}</FormLabel>
                                                <FormControl><Input placeholder="MM/AA" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cvc"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>{t('checkout_page.cvc')}</FormLabel>
                                                <FormControl><Input placeholder="CVC" {...field} /></FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm border h-fit sticky top-24">
                        <h2 className="text-2xl font-semibold mb-6">{t('checkout_page.order_summary')}</h2>
                        <div className="space-y-4 text-sm">
                            {cart.map((item) => (
                                <div key={item.id} className="flex justify-between">
                                    <span className="text-muted-foreground">{t(item.name)} x{item.quantity}</span>
                                    <span className="font-medium">{item.price.toFixed(2)} €</span>
                                </div>
                            ))}
                        </div>
                        <Separator className="my-6" />
                        <div className="space-y-4">
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t('checkout_page.subtotal')}</span>
                                <span className="font-medium">{subtotal.toFixed(2)} €</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">{t('checkout_page.shipping')}</span>
                                <span className="font-medium">{shipping > 0 ? `${shipping.toFixed(2)} €` : t('checkout_page.free')}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-lg font-bold">
                                <span>{t('checkout_page.total')}</span>
                                <span>{total.toFixed(2)} €</span>
                            </div>
                        </div>
                        <Button type="submit" className="w-full mt-8" size="lg">
                            <Lock className="mr-2 h-4 w-4" /> {t('checkout_page.pay_now')}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4 text-center">{t('checkout_page.secure_payment')}</p>
                    </div>
                </form>
            </Form>
        </ShopPageLayout>
    );
}
