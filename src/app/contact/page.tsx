'use client';

import { useTranslation } from '@/hooks/use-translation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Phone } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  email: z.string().email('Email invalide'),
  message: z.string().min(10, 'Le message doit contenir au moins 10 caractères'),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function ContactPage() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = (data: ContactFormValues) => {
    // In a real app, you would send this data to a server/API
    console.log('Contact form submitted:', data);
    toast({
      title: t('contact_page.toast_success_title'),
      description: t('contact_page.toast_success_desc'),
    });
    form.reset();
  };

  return (
    <div className="container py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold">{t('contact_page.title')}</h1>
          <p className="mt-3 max-w-2xl mx-auto text-muted-foreground">{t('contact_page.description')}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
             <Card>
                <CardHeader>
                    <CardTitle>{t('contact_page.form_title')}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('contact_page.name_label')}</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('contact_page.email_label')}</FormLabel>
                                        <FormControl>
                                            <Input type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{t('contact_page.message_label')}</FormLabel>
                                        <FormControl>
                                            <Textarea rows={5} {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">{t('contact_page.send_button')}</Button>
                        </form>
                    </Form>
                </CardContent>
             </Card>
          </div>
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold">Nos Coordonnées</h3>
            <div className="flex items-center gap-4">
              <Mail className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <a href="mailto:service@ezentials.com" className="text-muted-foreground hover:text-primary">service@ezentials.com</a>
              </div>
            </div>
             <div className="flex items-center gap-4">
              <Phone className="h-6 w-6 text-primary" />
              <div>
                <h4 className="font-semibold">Téléphone</h4>
                <p className="text-muted-foreground">+33 1 23 45 67 89</p>
              </div>
            </div>
             <div className="pt-4 border-t">
                <h4 className="font-semibold mb-2">Horaires d'ouverture</h4>
                <p className="text-muted-foreground">Lundi - Vendredi: 9h00 - 18h00</p>
                <p className="text-muted-foreground">Samedi: 10h00 - 17h00</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
