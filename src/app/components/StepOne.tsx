'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

import { Textarea } from '@/components/ui/textarea';
import { DialogFooter } from '@/components/ui/dialog';
import { useEffect, useState } from 'react';
import { sampleDescriptionsService } from '@/services/sampleDescriptionsService';
import { AiStarsIcon } from '@/icons/AiStarsIcon';
import { LoaderCircle } from 'lucide-react';
import { useCurrentAnalysisStore } from '@/store/currentAnalysis.store';
import generateRandomUUID from '@/utils/generateRandomUUID';
import { useRouter } from 'next/navigation';
import sleep from '@/utils/sleep';
import { useGlobalStore } from '@/store/global.store';

const stepOneSchema = z.object({
  datasetDescription: z.string().min(50, 'Description must be at least 50 characters long.'),
});

const StepOne: React.FC = () => {
  const router = useRouter();
  const [isAiGeneratingInfo, setIsAiGeneratingInfo] = useState(false);
  const setCurrentAnalysis = useCurrentAnalysisStore((state) => state.setCurrentAnalysis);
  const userGeminiApiKey = useGlobalStore((state) => state.userGeminiApiKey);
  const setGeminiErrorOccurred = useGlobalStore((state) => state.setGeminiErrorOccurred);
  const setShowApiKeyDialog = useGlobalStore((state) => state.setShowApiKeyDialog);
  const availableFreeAnalyses = useGlobalStore((state) => state.availableFreeAnalyses);

  const form = useForm<z.infer<typeof stepOneSchema>>({
    resolver: zodResolver(stepOneSchema),
    defaultValues: {
      datasetDescription: '',
    },
  });

  useEffect(() => {
    const subscription = sampleDescriptionsService.getSubject().subscribe((data) => {
      form.setValue('datasetDescription', data);
    });
    return () => subscription.unsubscribe();
  }, [form]);

  const onSubmit = async (values: z.infer<typeof stepOneSchema>) => {
    if (availableFreeAnalyses <= 0 && !userGeminiApiKey) {
      setShowApiKeyDialog(true);
      return;
    }

    try {
      setIsAiGeneratingInfo(true);

      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'info',
          datasetDescription: values.datasetDescription,
          userGeminiApiKey: userGeminiApiKey,
        }),
      });

      if (!response.ok) {
        setGeminiErrorOccurred(true);
        setShowApiKeyDialog(true);
        throw new Error('API error');
      }

      const data = await response.json();

      const newAnalysis = {
        id: generateRandomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        isFavorite: false,
        title: data.title,
        alias: data.alias,
        userDatasetDescription: data.userDatasetDescription,
        language: data.language,
        info: data.info,
      };

      setCurrentAnalysis(newAnalysis);

      const main = document.querySelector('main');
      if (!main) return;
      main.classList.add('page-transition');

      await sleep(300);
      router.push('/analysis');
    } catch (error) {
      setGeminiErrorOccurred(true);
      setShowApiKeyDialog(true);
      console.error('Error generating analysis info:', error);
    } finally {
      setIsAiGeneratingInfo(false);
    }
  };

  return (
    <section className="w-full max-w-[700px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="datasetDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="duration-300 delay-75">Make a simple description of your dataset and target variable:</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none h-44 sm:h-44"
                    placeholder="Your dataset description here..."
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
          <DialogFooter className="mt-4">
            <Button type="submit" disabled={isAiGeneratingInfo}>
              {isAiGeneratingInfo ? (
                <>
                  <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
                  Generating info
                </>
              ) : (
                <>
                  <AiStarsIcon className="mr-1.5 h-[18px] w-[18px]" />
                  Let&apos;s go
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </section>
  );
};

export default StepOne;
