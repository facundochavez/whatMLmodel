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
import { useEffect, useState } from 'react';
import { sampleDescriptionsService } from '@/services/sampleDescriptionsService';
import { AiStarsIcon } from '@/icons/AiStarsIcon';
import { TransitionLink } from '@/components/TransitionLink';
import { LoaderCircle } from 'lucide-react';
import { useAnalysesContext } from '@/context/analyses.context';
import generateRandomUUID from '@/utils/generateRandomUUID';

// Esquema de validación con zod
const stepOneSchema = z.object({
  userDatasetDescription: z.string(),
});

const StepOne: React.FC = () => {
  const [isAiGeneratingInfo, setIsAiGeneratingInfo] = useState<boolean>(false);
  const { setCurrentAnalysis, auxiliarAnalysis } = useAnalysesContext();
  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      userDatasetDescription: '',
    },
  });

  // SIMULACIÓN DE AI (MODIFICAR LUEGO)
  const handleGenerateInfo = () => {
    setIsAiGeneratingInfo(true);
    setCurrentAnalysis({
      id: generateRandomUUID(),
      createdAt: String(new Date()),
      isFavorite: false,
      title: auxiliarAnalysis.title,
      alias: auxiliarAnalysis.alias,
      userDatasetDescription: auxiliarAnalysis.userDatasetDescription,
      language: auxiliarAnalysis.language,
      info: auxiliarAnalysis.info,
    });
  };
  
  // TRYEXAMPLES SERVICE
  const sampleDescriptionSubscription$ = sampleDescriptionsService.getSubject();
  useEffect(() => {
    const sampleDescriptionSubscription = sampleDescriptionSubscription$.subscribe((data) => {
      form.setValue('userDatasetDescription', data);
    });

    return () => sampleDescriptionSubscription.unsubscribe();
  }, [sampleDescriptionSubscription$, form]);

  function onSubmit(values: z.infer<typeof stepOneSchema>) {
    // Manejar el envío del formulario
  }

  return (
    <section className='w-full max-w-[700px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full'>
          <FormField
            control={form.control}
            name='userDatasetDescription'
            render={({ field }) => (
              <FormItem>
                <FormLabel className='duration-300 delay-75'>
                  Make a simple description of your dataset and target variable:
                </FormLabel>
                <FormControl>
                  <Textarea
                    className='resize-none h-44 sm:h-44'
                    placeholder='Your dataset description here...'
                    spellCheck={false}
                    maxLength={300}
                    currentLength={form.watch('userDatasetDescription').length || 0}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <TransitionLink href='/analysis' sleepTime={1500}>
            <DialogFooter className='mt-4'>
              <Button
                type='submit'
                disabled={isAiGeneratingInfo}
                onClick={handleGenerateInfo}
              >
                {isAiGeneratingInfo ? (
                  <>
                    <LoaderCircle className='h-4 w-4 mr-2 animate-spin' />
                    Generating info
                  </>
                ) : (
                  <>
                    <AiStarsIcon className='mr-1.5 h-[18px] w-[18px]' />
                    Let&apos;s go
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
