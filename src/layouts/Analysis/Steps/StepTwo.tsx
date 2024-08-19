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

import { RefreshCcw, Sparkles } from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

// Esquema de validación con zod
const stepTwoSchema = z.object({
  problemDescription: z.string(),
  mainFeatures: z.string(),
  targetVariable: z.string(),
  numberOfFeatures: z.number(),
  datasetSize: z.number(),
  hasComplexData: z.boolean(),
});

const StepTwo: React.FC = () => {
  // 1. Define tu formulario.
  const form = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      problemDescription: undefined,
      mainFeatures: undefined,
      targetVariable: undefined,
      numberOfFeatures: undefined,
      datasetSize: undefined,
      hasComplexData: undefined,
    },
  });

  // 2. Define un manejador de envío.
  function onSubmit(values: z.infer<typeof stepTwoSchema>) {
    // Haz algo con los valores del formulario.
    // ✅ Esto será seguro en cuanto a tipos y validado.
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full flex flex-col gap-4'
      >
        <FormLabel className='block text-lg text-center'>
          {' '}
          Check that the information is correct:
        </FormLabel>
        <FormField
          control={form.control}
          name='problemDescription'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-md'>Problem description:</FormLabel>
              <FormControl>
                <Textarea
                  className='text-md resize-none h-32'
                  placeholder='Your dataset description here...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='mainFeatures'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-md'>Main features:</FormLabel>
              <FormControl>
                <Input
                  className='text-md'
                  placeholder='Your features here...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='targetVariable'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-md'>Target variable:</FormLabel>
              <FormControl>
                <Input
                  className='text-md'
                  placeholder='Your target variable here...'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='numberOfFeatures'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-md'>Number of features:</FormLabel>
              <FormControl>
                <Input className='text-md' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='datasetSize'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='text-md'>Dataset size:</FormLabel>
              <FormControl>
                <Input className='text-md' placeholder='' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='hasComplexData'
          render={({ field }) => (
            <FormItem className='flex items-center space-y-0 gap-2'>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel className='text-base font-light' >
                Some features handle complex data (text, images, audio,
                high-dimensinal data, etc.).
              </FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter>
          <Button type='button' variant='outline'>
            <RefreshCcw className='w-4 h-4 mr-2' />
            Cancel and retry
          </Button>
          <Button type='submit'>
            <Sparkles className='w-4 h-4 mr-2' />
            Search models
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default StepTwo;
