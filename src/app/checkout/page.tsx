'use client';

import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShopPageLayout } from "@/components/products/shop-page-layout";
import { useTranslation } from "@/hooks/use-translation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Lock, Loader2 } from "lucide-react";
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
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { StripeCardElementOptions } from '@stripe/stripe-js';
import { useRouter } from 'next/navigation';

const shippingSchema = z.object({
  fullName: z.string().min(2, { message: "Le nom complet est requis." }),
  address: z.string().min(5, { message: "L'adresse est requise." }),
  city: z.string().min(2, { message: "La ville est requise." }),
  zip: z.string().min(3, { message: "Le code postal est requis." }),
  country: z.string().min(2, { message: "Le pays est requis." }),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

const cardElementOptions: StripeCardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
};


export default function CheckoutPage() {
    const { t } = useTranslation();
    const { cart, clearCart } = useCart();
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const form = useForm<ShippingFormValues>({
        resolver: zodResolver(shippingSchema),
        defaultValues: {
            fullName: '',
            address: '',
            city: '',
            zip: '',
            country: 'France', // Valeur par défaut
        },
    });

    const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0;
    const total = subtotal + shipping;

    const onSubmit: SubmitHandler<ShippingFormValues> = async (data) => {
        if (!stripe || !elements || cart.length === 0) {
          return;
        }

        setIsProcessing(true);
        setErrorMessage(null);

        const cardElement = elements.getElement(CardElement);
        if (!cardElement) {
             setIsProcessing(false);
             setErrorMessage("L'élément de carte n'a pas été trouvé. Veuillez rafraîchir la page.");
             return;
        }
        
        // 1. Créer le PaymentMethod
        const { error: paymentMethodError, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
            billing_details: {
                name: data.fullName,
                address: {
                    line1: data.address,
                    city: data.city,
                    postal_code: data.zip,
                    country: data.country,
                }
            },
        });

        if (paymentMethodError) {
            setErrorMessage(paymentMethodError.message || "Une erreur est survenue lors de la création du moyen de paiement.");
            setIsProcessing(false);
            return;
        }

        // 2. Appeler l'API backend pour créer et confirmer le PaymentIntent
        try {
            const response = await fetch('/api/create-payment-intent', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    items: cart.map(item => ({ id: item.id, quantity: item.quantity })),
                }),
            });

            const paymentResult = await response.json();

            if (paymentResult.error) {
                setErrorMessage(paymentResult.error);
                setIsProcessing(false);
                return;
            } 
            
            // 3. Gérer les actions supplémentaires (ex: 3D Secure)
            if (paymentResult.requiresAction) {
                 toast({
                    title: "Authentification requise",
                    description: "Veuillez suivre les instructions de votre banque pour finaliser le paiement.",
                });
                 const { error: errorAction } = await stripe.handleNextAction(paymentResult.clientSecret);
                 if (errorAction) {
                    setErrorMessage(errorAction.message || "Une erreur d'authentification est survenue.");
                    setIsProcessing(false);
                    return;
                 }
            }
            
            // 4. Paiement réussi
            if (paymentResult.success) {
                toast({
                    title: "Paiement réussi !",
                    description: "Votre commande a été passée avec succès.",
                });
                
                clearCart();
                // Rediriger vers une page de confirmation
                // router.push('/confirmation-commande'); 
            }

        } catch (error) {
            console.error("Erreur lors de l'appel à l'API de paiement:", error);
            setErrorMessage("Une erreur réseau est survenue. Veuillez réessayer.");
        } finally {
            setIsProcessing(false);
        }
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
                                                <Input placeholder={t('checkout_page.full_name_placeholder')} {...field} required/>
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
                                                <Input placeholder={t('checkout_page.address_placeholder')} {...field} required/>
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
                                            <FormControl><Input {...field} required/></FormControl>
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
                                            <FormControl><Input {...field} required/></FormControl>
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
                                            <FormControl><Input {...field} required/></FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-4">{t('checkout_page.payment_details')}</h2>
                            <div className="p-4 border rounded-md bg-muted/20">
                               <CardElement options={cardElementOptions} />
                            </div>
                             {errorMessage && <p className="text-sm text-destructive mt-2">{errorMessage}</p>}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-card p-6 md:p-8 rounded-lg shadow-sm border h-fit sticky top-24">
                        <h2 className="text-2xl font-semibold mb-6">{t('checkout_page.order_summary')}</h2>
                        <div className="space-y-4 text-sm">
                            {cart.map((item) => (
                                <div key={item.cartItemId} className="flex justify-between">
                                    <span className="text-muted-foreground">{t(item.name)} x{item.quantity}</span>
                                    <span className="font-medium">{(item.price * item.quantity).toFixed(2)} €</span>
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
                        <Button type="submit" className="w-full mt-8" size="lg" disabled={!stripe || isProcessing || cart.length === 0}>
                            {isProcessing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Lock className="mr-2 h-4 w-4" />}
                            {isProcessing ? 'Traitement...' : `${t('checkout_page.pay_now')} ${total.toFixed(2)} €`}
                        </Button>
                        <p className="text-xs text-muted-foreground mt-4 text-center">{t('checkout_page.secure_payment')}</p>
                    </div>
                </form>
            </Form>
        </ShopPageLayout>
    );
}
