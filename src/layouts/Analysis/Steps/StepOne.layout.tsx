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

import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import { useEffect } from 'react';
import { tryingExampleService } from '@/services/tryingExampleService';
import { AiStarsIcon } from '@/icons/AiStarsIcon';

// Esquema de validación con zod
const stepOneSchema = z.object({
  datasetDescription: z.string(),
});

const StepOne: React.FC = () => {
  const subscription$ = tryingExampleService.getSubject();

  // 1. Define tu formulario.
  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      datasetDescription: '',
    },
  });

  useEffect(() => {
    const subscription = subscription$.subscribe((data) => {
      // No es necesario especificar el tipo aquí, ya que está tipado correctamente en SubjectManager
      form.setValue('datasetDescription', data);
    });

    return () => subscription.unsubscribe(); // Limpia la suscripción cuando el componente se desmonte
  }, [subscription$, form]);

  // 2. Define un manejador de envío.
  function onSubmit(values: z.infer<typeof stepOneSchema>) {
    // Haz algo con los valores del formulario.
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full max-w-[700px]'
      >
        <FormField
          control={form.control}
          name='datasetDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Make a simple description of your dataset and target variable:
              </FormLabel>
              <FormControl>
                <Textarea
                  className='resize-none h-52'
                  placeholder='Your dataset description here...'
                  spellCheck={false}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className='mt-4'>
          <Button type='submit'>
            <AiStarsIcon className='mr-1.5 h-[18px] w-[18px]' />
            Let's go
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default StepOne;
