'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { set, useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { DialogClose, DialogFooter, DialogTrigger } from '@/components/ui/dialog';
import { Eye, EyeOff } from 'lucide-react';
import { useGlobalStore } from '@/store/global.store';

// Esquema de validación con zod
const loginSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address.',
  }),
  password: z.string(),
});

const LoginForm: React.FC = () => {
  const setShowResetPasswordDialog = useGlobalStore((state) => state.setShowResetPasswordDialog);
  const [showPassword, setShowPassword] = useState(false);

  // 1. Define tu formulario.
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  // 2. Define un manejador de envío.
  function onSubmit(values: z.infer<typeof loginSchema>) {
    // Haz algo con los valores del formulario.
    // ✅ Esto será seguro en cuanto a tipos y validado.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <>
                  <Input type={showPassword ? 'text' : 'password'} placeholder="••••••••" className="pr-10" {...field} />
                  <Button variant="link" className="absolute right-0 top-6" size="icon" type="button" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-5 w-5" strokeWidth={1.8} /> : <Eye className="h-5 w-5" strokeWidth={1.8} />}
                  </Button>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogClose asChild>
          <Button onClick={() => setShowResetPasswordDialog(true)} type="button" variant="link" size="sm" className="self-end px-1">
            Forgot password?
          </Button>
        </DialogClose>

        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit">Log in</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default LoginForm;
