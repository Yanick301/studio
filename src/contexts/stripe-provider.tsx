'use client';

import { ReactNode } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface StripeProviderProps {
  children: ReactNode;
}

export const StripeProvider = ({ children }: StripeProviderProps) => {
  const options = {
    // Vous pouvez passer un client_secret si vous créez un PaymentIntent
    // avant le rendu de la page de paiement.
    // clientSecret: 'pi_...',
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#4B0082', // Indigo
        colorBackground: '#ffffff',
        colorText: '#30313d',
        colorDanger: '#df1b41',
        fontFamily: 'PT Sans, sans-serif',
        spacingUnit: '4px',
        borderRadius: '4px',
      },
    }
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
};
