'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useGlobalContext } from '@/context/global.context';

// Esquema de validación con zod
const resetPasswordSchema = z.object({
  email: z.string().min(1, {
    message: 'Email is required.',
  }),
});

const ResetPasswordDialogContent: React.FC = () => {
  const { isUserLoggedIn, userEmail } = useGlobalContext();

  // Definir el formulario
  const form = useForm<z.infer<typeof resetPasswordSchema>>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: isUserLoggedIn ? userEmail : '',
    },
  });

  // Función de manejo del submit
  function handleAPIkey(values: z.infer<typeof resetPasswordSchema>) {
    // Mostrar el valor de la API key en la consola
    /* console.log('API Key:', values.apiKey); */
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Reset password</DialogTitle>
        <DialogDescription>
          {isUserLoggedIn
            ? `Press the button below and we will send you a link to reset your password to ${userEmail}.`
            : 'Enter your email address and we will send you a link to reset your password.'}
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleAPIkey)} className="flex flex-col gap-2 w-full">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <>
                      <Input type="email" placeholder="your_email@example.com" className="pr-10" disabled={isUserLoggedIn} {...field} />
                    </>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="pt-2">
              <DialogClose asChild>
                <Button variant="outline" type="button">
                  Cancel
                </Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit">Send email</Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogFooter>
    </DialogContent>
  );
};

export default ResetPasswordDialogContent;
