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

import { Sparkles } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';

// Esquema de validación con zod
const stepOneSchema = z.object({
  datasetDescription: z.string(),
});

const StepOne: React.FC = () => {
  // 1. Define tu formulario.
  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      datasetDescription: '',
    },
  });

  // 2. Define un manejador de envío.
  function onSubmit(values: z.infer<typeof stepOneSchema>) {
    // Haz algo con los valores del formulario.
    // ✅ Esto será seguro en cuanto a tipos y validado.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name='datasetDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-md'>
                Make a simple description of your dataset and target variable:
              </FormLabel>
              <FormControl>
                <Textarea
                  className='text-md resize-none h-52'
                  placeholder='Your dataset description here...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className='pt-2'>
          <Button type='submit'>
            <Sparkles className='w-4 h-4 mr-2' />
            Let's go
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default StepOne;
