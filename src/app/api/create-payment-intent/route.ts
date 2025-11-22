'use server';

import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/lib/definitions';
import { products as allProducts } from '@/lib/data';

// Initialisez Stripe avec votre clé secrète
// Assurez-vous que la variable d'environnement STRIPE_SECRET_KEY est définie
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Définir le type pour les articles du panier attendus du frontend
type CartItemPayload = {
  id: string;
  quantity: number;
};

// Fonction pour calculer le montant total de la commande de manière sécurisée côté serveur
const calculateOrderAmount = (items: CartItemPayload[]): number => {
  let total = 0;
  items.forEach(item => {
    const product = allProducts.find((p: Product) => p.id === item.id);
    if (product) {
      total += product.price * item.quantity;
    }
  });
  // Stripe attend le montant en centimes (entier)
  return Math.round(total * 100);
};

export async function POST(req: NextRequest) {
  try {
    const { items, paymentMethodId } = await req.json();

    if (!items || !paymentMethodId) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
    }

    const amount = calculateOrderAmount(items);

    if (amount <= 0) {
        return NextResponse.json({ error: 'Le montant de la commande doit être supérieur à zéro.' }, { status: 400 });
    }

    // Créez un PaymentIntent avec le montant et la devise
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'eur',
      payment_method: paymentMethodId,
      confirm: true, // Confirme le paiement immédiatement
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never', // Important pour les applications monopages
      },
    });

    // Gérez les différents statuts du PaymentIntent
    if (paymentIntent.status === 'succeeded') {
      // Le paiement a réussi
      return NextResponse.json({ success: true, clientSecret: paymentIntent.client_secret });
    } else if (paymentIntent.status === 'requires_action' || paymentIntent.status === 'requires_confirmation') {
       // Si une authentification supplémentaire (3D Secure) est nécessaire
       // Le clientSecret est utilisé côté client pour appeler `stripe.handleNextAction`
       return NextResponse.json({
        requiresAction: true,
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      // Le paiement a échoué pour une autre raison
      return NextResponse.json({ error: 'Le paiement a échoué.' }, { status: 500 });
    }

  } catch (error: any) {
    console.error('Erreur Stripe:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
