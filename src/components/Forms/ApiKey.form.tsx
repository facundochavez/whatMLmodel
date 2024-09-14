'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

// Esquema de validación con zod
const apiKeySchema = z.object({
  apiKey: z.string().min(1, {
    message: 'API key is required.',
  }),
});

const ApiKeyForm: React.FC = () => {
  const [showAPIkey, setShowAPIkey] = useState(false);

  // Definir el formulario
  const form = useForm<z.infer<typeof apiKeySchema>>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      apiKey: '',
    },
  });

  // Función de manejo del submit
  function handleAPIkey(values: z.infer<typeof apiKeySchema>) {
    // Mostrar el valor de la API key en la consola
    /* console.log('API Key:', values.apiKey); */
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleAPIkey)}
        className='flex flex-col gap-2 w-full'
      >
        <FormField
          control={form.control}
          name='apiKey'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <>
                  <Input
                    type={showAPIkey ? 'text' : 'password'}
                    placeholder='•••••'
                    className='pr-10'
                    {...field}
                  />
                  <Button
                    variant='link'
                    className='absolute right-0 top-6'
                    size='icon'
                    type='button'
                    onClick={() => setShowAPIkey(!showAPIkey)}
                  >
                    {showAPIkey ? (
                      <EyeOff className='h-5 w-5' />
                    ) : (
                      <Eye className='h-5 w-5' />
                    )}
                  </Button>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className='pt-2'>
          <DialogClose asChild>
            <Button variant='outline' type='button'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='submit'>Save</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ApiKeyForm;
