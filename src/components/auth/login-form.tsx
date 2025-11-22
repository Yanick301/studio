'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth, initiateEmailSignIn, initiateGoogleSignIn } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from '@/firebase';
import { useTranslation } from '@/hooks/use-translation';
import { sendPasswordResetEmail } from 'firebase/auth';

const loginSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(1, { message: "Le mot de passe est requis." }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormValues) => {
    setIsLoading(true);
    setError(null);
    initiateEmailSignIn(auth, data.email, data.password);
  };
  
  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError(null);
    initiateGoogleSignIn(auth);
  };

  const handlePasswordReset = async () => {
    const email = getValues("email");
    if (!email) {
      toast({
        variant: "destructive",
        title: t('login_form.password_reset_error_title'),
        description: t('login_form.password_reset_error_desc'),
      });
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      toast({
        title: t('login_form.password_reset_success_title'),
        description: t('login_form.password_reset_success_desc'),
      });
    } catch (error: any) {
      console.error("Password reset error:", error);
      toast({
        variant: "destructive",
        title: t('login_form.password_reset_error_title'),
        description: error.message,
      });
    }
  };

  if (user && !isUserLoading) {
    router.push('/account/profile');
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">{t('login_form.title')}</CardTitle>
        <CardDescription>
          {t('login_form.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
            <Button variant="outline" className="w-full" onClick={handleGoogleSignIn} disabled={isLoading || isUserLoading}>
                <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 126 23.4 172.9 61.9l-72.2 72.2C322 108.8 286.6 96 248 96c-88.8 0-160.1 71.1-160.1 160s71.3 160 160.1 160c94.4 0 150.3-63.3 154.9-121.2H248v-85.3h236.1c2.3 12.7 3.9 26.9 3.9 41.4z"></path></svg>
                {t('login_form.google_signin')}
            </Button>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground">{t('login_form.or_continue_with')}</span>
                </div>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertTitle>{t('login_form.error_title')}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" {...register('email')} />
                {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">{t('login_form.password')}</Label>
                  <button type="button" onClick={handlePasswordReset} className="ml-auto inline-block text-sm underline">
                    {t('login_form.forgot_password')}
                  </button>
                </div>
                <Input id="password" type="password" {...register('password')} />
                {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || isUserLoading}>
                  {(isLoading || isUserLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {t('login_form.submit_button')}
              </Button>
            </form>
        </div>
      </CardContent>
      <CardFooter>
          <div className="text-center text-sm w-full">
            {t('login_form.no_account')}{" "}
            <Link href="/signup" className="underline font-semibold">
              {t('login_form.signup_link')}
            </Link>
          </div>
      </CardFooter>
    </Card>
  )
}
