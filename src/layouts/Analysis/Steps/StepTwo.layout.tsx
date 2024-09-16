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

import { CircleHelp, RefreshCcw } from 'lucide-react';
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
                    className='resize-none h-24'
                    placeholder='Your problem description here...'
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
                  <Input placeholder='Your features here...' {...field} />
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
                    <Input className=' pr-20' type='number' {...field} />
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
                    <Input className='pr-14' type='number' {...field} />
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
  );
};

export default StepTwo;
