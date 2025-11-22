'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { type Product, type Favorite } from '@/lib/definitions';
import { Button } from '@/components/ui/button';
import { Heart, ShoppingCart, CheckCircle, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useTranslation } from '@/hooks/use-translation';
import { useCart } from '@/contexts/cart-context';
import { useToast } from '@/hooks/use-toast';
import { useUser, useFirestore, useMemoFirebase, setDocumentNonBlocking, deleteDocumentNonBlocking } from '@/firebase';
import { collection, query, where, getDocs, doc } from 'firebase/firestore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t } = useTranslation();
  const productName = t(product.name);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const { user } = useUser();
  const firestore = useFirestore();

  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [isFavoriteLoading, setIsFavoriteLoading] = useState(true);

  const favoritesCollectionRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, `users/${user.uid}/favorites`);
  }, [firestore, user]);

  useEffect(() => {
    if (!user || !firestore || !product || !favoritesCollectionRef) {
        setIsFavoriteLoading(false);
        return;
    }

    const checkFavoriteStatus = async () => {
        setIsFavoriteLoading(true);
        const q = query(favoritesCollectionRef, where("productId", "==", product.id));
        
        try {
            const querySnapshot = await getDocs(q);
            if (!querySnapshot.empty) {
                const favDoc = querySnapshot.docs[0];
                setIsFavorite(true);
                setFavoriteId(favDoc.id);
            } else {
                setIsFavorite(false);
                setFavoriteId(null);
            }
        } catch (error) {
            console.error("Error checking favorite status:", error);
        } finally {
            setIsFavoriteLoading(false);
        }
    };

    checkFavoriteStatus();
  }, [user, firestore, product, favoritesCollectionRef]);


  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, {
      size: product.options?.sizes?.[0] || null,
      color: product.options?.colors?.[0] || null
    });
    toast({
      title: "Article ajouté au panier",
      description: `${productName} a été ajouté à votre panier.`,
    });
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user || !product || !favoritesCollectionRef) {
      toast({
        variant: "destructive",
        title: "Veuillez vous connecter",
        description: "Vous devez être connecté pour gérer vos favoris.",
      });
      return;
    }

    setIsFavoriteLoading(true);

    if (isFavorite && favoriteId) {
      const docRef = doc(favoritesCollectionRef, favoriteId);
      deleteDocumentNonBlocking(docRef);
      setIsFavorite(false);
      setFavoriteId(null);
      toast({
        title: t('product_page.toast.favorite_removed_title'),
        description: `${productName} ${t('product_page.toast.favorite_removed_desc')}`,
      });
    } else {
      const newFavId = doc(favoritesCollectionRef).id;
      const newFav: Favorite = {
        id: newFavId,
        userId: user.uid,
        productId: product.id,
        addedDate: new Date().toISOString(),
      };
      
      const newDocRef = doc(favoritesCollectionRef, newFavId);
      setDocumentNonBlocking(newDocRef, newFav, {});
      
      setIsFavorite(true);
      setFavoriteId(newFavId);
      
      toast({
        title: t('product_page.toast.favorite_added_title'),
        description: `${productName} ${t('product_page.toast.favorite_added_desc')}`,
      });
    }
     // A short delay to allow the UI to feel responsive before re-checking from DB
    setTimeout(() => setIsFavoriteLoading(false), 500);
  };

  return (
    <Card className="w-full max-w-sm group rounded-lg overflow-hidden border-none shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/products/${product.slug}`} className="block overflow-hidden aspect-[3/4]">
        <Image
          src={product.imageUrl}
          alt={productName}
          width={product.width}
          height={product.height}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-105"
          data-ai-hint={product.imageHint}
        />
      </Link>
      <div className="p-4 bg-card">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-medium text-foreground truncate" title={productName}>{productName}</h3>
        </Link>
        <p className="text-lg font-bold text-primary mt-1">{product.price.toFixed(2)} €</p>
        <div className="mt-4 flex gap-2">
          <Button size="sm" className="w-full" onClick={handleAddToCart} disabled={product.stock === 0}>
            {product.stock > 0 ? (
                <>
                <ShoppingCart className="mr-2 h-4 w-4" /> {t('product_card.add')}
                </>
            ) : t('product_page.out_of_stock')}
          </Button>
          <Button variant="outline" size="icon" aria-label={t('product_card.add_to_favorites')} onClick={handleFavoriteClick} disabled={isFavoriteLoading}>
            {isFavoriteLoading ? (
                <Loader2 className="h-4 w-4 animate-spin"/>
            ) : isFavorite ? (
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            ) : (
                <Heart className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
