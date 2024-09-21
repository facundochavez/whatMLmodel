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

import { ArrowLeft, CircleHelp, RefreshCcw } from 'lucide-react';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useState } from 'react';
import { AiStarsIcon } from '@/icons/AiStarsIcon';
import { useGlobalContext } from '@/context/global.context';
import useTextReveal from '@/hooks/useTextReveal';
import Link from 'next/link';

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
  const { currentAnalysis, setSelectedStep } = useGlobalContext();
  const [showTooltip, setShowTooltip] = useState(false);

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
  }

  return (
    <div className='w-full flex flex-col items-center gap-6'>
      <header className='w-full flex items-center justify-center max-w-[1050px] relative px-14'>
        <Link href='/'>
          <Button
            variant='outline'
            size='icon'
            className='absolute left-0 opacity-0 animate-fade-in [animation-fill-mode:forwards]'
            style={{ animationDelay: '1s' }}
          >
            <ArrowLeft className='h-5 w-5' />
          </Button>
        </Link>
        {useTextReveal(currentAnalysis.title)}
      </header>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full max-w-[700px]'
        >
          <div className='w-full flex flex-col gap-4 border rounded-md px-[5%] py-8 bg-muted/30'>
            <FormLabel className='block text-lg text-center self-center mb-4'>
              {' '}
              Check the information and correct it before moving forward:
            </FormLabel>
            <FormField
              control={form.control}
              name='problemDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem description:</FormLabel>
                  <FormControl>
                    <Textarea
                      className='resize-y h-36 min-h-36 sm:h-28 sm:min-h-28 max-h-60'
                      placeholder='Your problem description here...'
                      maxLength={300}
                      currentLength={field.value?.length || 0}
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
                <FormItem className='grow'>
                  <FormLabel>Main features:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your features here...'
                      maxLength={100}
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
                <FormItem className='w-full '>
                  <FormLabel>Target variable:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Your target variable here...'
                      maxLength={35}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-col gap-4 sm:flex-row'>
              <FormField
                control={form.control}
                name='hasComplexData'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel className='flex items-center'>
                      Complex data:{' '}
                      <TooltipProvider delayDuration={0}>
                        <Tooltip open={showTooltip}>
                          <TooltipTrigger
                            asChild
                            className='text-muted-foreground'
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          >
                            <CircleHelp className='inline w-4 h-4 ml-1 mt-0.5' />
                          </TooltipTrigger>
                          <TooltipContent
                            className='text-muted-foreground max-w-[min(370px,80vw)]'
                            onMouseEnter={() => setShowTooltip(true)}
                            onMouseLeave={() => setShowTooltip(false)}
                          >
                            <p>
                              Some features handle complex data as long texts,
                              images, videos, high-dimensional data, etc.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>{' '}
                    </FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value ? 'Yes' : 'No'}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Select an option' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value='No'>No</SelectItem>
                        <SelectItem value='Yes'>Yes</SelectItem>
                      </SelectContent>

                      <FormMessage />
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='numberOfFeatures'
                render={({ field }) => (
                  <FormItem className='w-full relative'>
                    <FormLabel>Number of features:</FormLabel>
                    <FormControl>
                      <Input
                        className='pr-20'
                        type='number'
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className='absolute top-8 right-4'>
                      columns
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='datasetSize'
                render={({ field }) => (
                  <FormItem className='w-full relative'>
                    <FormLabel className='relative'>Dataset size:</FormLabel>
                    <FormControl className='relative'>
                      <Input
                        className='pr-14'
                        type='number'
                        min={1}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className='absolute top-8 right-4'>
                      rows
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <DialogFooter className='mt-4'>
            <Button type='button' variant='outline'>
              <RefreshCcw className='w-4 h-4 mr-2' />
              Cancel and retry
            </Button>
            <Button type='submit'>
              <AiStarsIcon className='mr-1.5 h-[18px] w-[18px]' />
              Get models
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
};

export default StepTwo;
