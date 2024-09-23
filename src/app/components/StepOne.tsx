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
import { useGlobalContext } from '@/context/global.context';
import Link from 'next/link';
import { TransitionLink } from '@/components/TransitionLink/TransitionLink';
import { LoaderCircle } from 'lucide-react';

// Esquema de validación con zod
const stepOneSchema = z.object({
  datasetDescription: z.string(),
});

const StepOne: React.FC = () => {
  const { isGeneratingInfo } = useGlobalContext();
  const subscription$ = tryingExampleService.getSubject();
  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      datasetDescription: '',
    },
  });

  useEffect(() => {
    const subscription = subscription$.subscribe((data) => {
      form.setValue('datasetDescription', data);
    });

    return () => subscription.unsubscribe();
  }, [subscription$, form]);

  function onSubmit(values: z.infer<typeof stepOneSchema>) {
    // Manejar el envío del formulario
  }

  return (
    <section className='w-full max-w-[700px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
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
                    className='resize-none h-60 sm:h-44'
                    placeholder='Your dataset description here...'
                    spellCheck={false}
                    maxLength={300}
                    currentLength={form.watch('datasetDescription').length || 0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TransitionLink href='/analysis' sleepTime={1500}>
            <DialogFooter className='mt-4'>
              <Button type='submit' disabled={isGeneratingInfo}>
                {isGeneratingInfo ? (
                  <>
                    <LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
                    Generating info
                  </>
                ) : (
                  <>
                    <AiStarsIcon className='mr-1.5 h-[18px] w-[18px]' />
                    Let's go
                  </>
                )}
              </Button>
            </DialogFooter>
          </TransitionLink>
        </form>
      </Form>
    </section>
  );
};

export default StepOne;
