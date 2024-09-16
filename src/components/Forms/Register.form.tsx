'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Eye, EyeOff } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

// Esquema de validación con zod
const registerSchema = z
  .object({
    email: z.string().email({
      message: 'Please enter a valid email address.',
    }),
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[a-z]/, {
        message: 'Password must include at least one lowercase letter.',
      })
      .regex(/[A-Z]/, {
        message: 'Password must include at least one uppercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must include at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must include at least one special character.',
      }),
    confirmPassword: z.string().min(8, {
      message: 'Please confirm your password.',
    }),
    termsAndConditions: z.boolean().refine((checked) => checked, {
      message: 'You must agree to the terms and conditions.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match.',
  });

const RegisterForm: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // 1. Define tu formulario.
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      termsAndConditions: false,
    },
  });

  // 2. Define un manejador de envío.
  function onSubmit(values: z.infer<typeof registerSchema>) {
    // Haz algo con los valores del formulario.
    // ✅ Esto será seguro en cuanto a tipos y validado.
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='flex flex-col gap-2'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type='email' placeholder='you@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder='•••••'
                    className='pr-10'
                    {...field}
                  />
                  <Button
                    variant='link'
                    className='absolute right-0 top-6'
                    size='icon'
                    type='button'
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className='h-5 w-5' strokeWidth={1.8} />
                    ) : (
                      <Eye className='h-5 w-5' strokeWidth={1.8} />
                    )}
                  </Button>
                </>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmPassword'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='•••••'
                    className='pr-10'
                    {...field}
                  />
                  <Button
                    variant='link'
                    className='absolute right-0 top-6'
                    size='icon'
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-5 w-5' strokeWidth={1.8} />
                    ) : (
                      <Eye className='h-5 w-5' strokeWidth={1.8} />
                    )}
                  </Button>
                </>
              </FormControl>
              <FormMessage />
              <FormDescription>
                Must be at least 8 characters and include a mix of uppercase,
                lowercase, numbers, and special characters.
              </FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='termsAndConditions'
          render={({ field }) => (
            <FormItem className='flex items-center space-y-0 gap-2'>
              <FormControl>
                <Checkbox></Checkbox>
              </FormControl>
              <FormLabel className='text-base text-muted-foreground'>
                I agree to the{' '}
                <a href='#' className='underline hover:text-foreground'>
                  Terms and Conditions.
                </a>
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <DialogClose asChild>
            <Button variant='outline' type='button'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='submit'>Register</Button>
          </DialogClose>

          {/*  <Button variant='outline' type='button'>
            Cancel
          </Button>

          <Button type='submit'>Register</Button> */}
        </DialogFooter>
      </form>
    </Form>
  );
};

export default RegisterForm;
