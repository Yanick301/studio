'use client';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useTranslation } from "@/hooks/use-translation";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, ShoppingCart } from "lucide-react";


export function CartSheet() {
  const { cart, isCartSheetOpen, setCartSheetOpen, removeFromCart, updateQuantity } = useCart();
  const { t } = useTranslation();

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <Sheet open={isCartSheetOpen} onOpenChange={setCartSheetOpen}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>{t('cart_page.title')} ({cart.length})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cart.length > 0 ? (
          <>
            <div className="flex-1 overflow-y-auto px-6">
                <div className="flex flex-col gap-6 my-6">
                    {cart.map(item => {
                        const productName = t(item.name);
                        return (
                            <div key={item.cartItemId} className="flex gap-4 items-start">
                                <Image 
                                    src={item.imageUrl}
                                    alt={productName}
                                    width={64}
                                    height={80}
                                    className="rounded-md object-cover w-16 h-20"
                                />
                                <div className="flex-grow flex flex-col gap-1">
                                    <Link href={`/products/${item.slug}`} className="font-semibold hover:underline text-sm" onClick={() => setCartSheetOpen(false)}>{productName}</Link>
                                    <p className="text-xs text-muted-foreground">
                                        {item.options?.selectedSize && `${t('product_page.size')}: ${item.options.selectedSize}`}
                                        {item.options?.selectedSize && item.options?.selectedColor && ' / '}
                                        {item.options?.selectedColor && `${t('product_page.color')}: `}
                                        {item.options?.selectedColor && <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: item.options.selectedColor }}></span>}
                                    </p>
                                     <p className="font-bold text-primary text-base mt-1">{(item.price * item.quantity).toFixed(2)} €</p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)} disabled={item.quantity <= 1}>
                                            <Minus className="h-3 w-3" />
                                        </Button>
                                        <span className="font-bold w-5 text-center text-sm">{item.quantity}</span>
                                        <Button variant="outline" size="icon" className="h-6 w-6" onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>
                                            <Plus className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>
                                <Button variant="ghost" size="icon" className="ml-auto" onClick={() => removeFromCart(item.cartItemId)}>
                                    <X className="h-4 w-4 text-muted-foreground" />
                                </Button>
                            </div>
                        )
                    })}
                </div>
            </div>
             <SheetFooter className="p-6 pt-0 border-t bg-background">
                <div className="w-full space-y-4">
                    <div className="flex justify-between text-base font-semibold">
                        <p>{t('checkout_page.subtotal')}</p>
                        <p>{subtotal.toFixed(2)} €</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{t('cart_sheet.shipping_notice')}</p>
                    <div className="flex flex-col gap-2">
                        <Button asChild size="lg" className="w-full" onClick={() => setCartSheetOpen(false)}>
                            <Link href="/cart">{t('cart_sheet.view_cart')}</Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="w-full" onClick={() => setCartSheetOpen(false)}>
                            <Link href="/">{t('cart_sheet.continue_shopping')}</Link>
                        </Button>
                    </div>
                </div>
            </SheetFooter>
          </>
        ) : (
            <div className="flex h-full flex-col items-center justify-center space-y-4">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" strokeWidth={1} />
                <h3 className="text-xl font-semibold">{t('cart_page.empty_message')}</h3>
                <Button onClick={() => setCartSheetOpen(false)}>
                    {t('cart_page.continue_shopping')}
                </Button>
            </div>
        )}
      </SheetContent>
    </Sheet>
  )
}
