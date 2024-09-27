'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
import { CircleHelp } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { CollapsibleBox } from '../CollapsibleBox/CollapsibleBox';
import { useGlobalContext } from '@/context/global.context';
import { Textarea } from '../ui/textarea';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { useAnalyzesContext } from '@/context/analyzes.context';

// Esquema de validación con zod
const stepTwoSchema = z.object({
  problemDescription: z.string(),
  mainFeatures: z.string(),
  targetVariable: z.string(),
  numberOfFeatures: z.number(),
  datasetSize: z.number(),
  hasComplexData: z.boolean(),
});

interface StepTwoFormProps extends React.PropsWithChildren {
  isFormCollapsed: boolean;
  isFormBlocked: boolean;
  isUserEditingInfo: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

const StepTwoForm: React.FC<StepTwoFormProps> = ({
  isFormCollapsed,
  isFormBlocked,
  isUserEditingInfo,
  onCollapseChange,
  children,
}) => {
  const { currentAnalysis } = useAnalyzesContext();
  const [showTooltip, setShowTooltip] = useState(false);
  const [formLabel, setLabel] = useState('');

  useEffect(() => {
    const handleFormLabel = () => {
      if (!currentAnalysis?.recommendations) {
        setLabel('Check the information and correct it before moving forward:');
      } else if (isUserEditingInfo) {
        setLabel('Edit the information to get new recommendations:');
      } else {
        setLabel('');
      }
    };

    handleFormLabel();
  }, [currentAnalysis, isUserEditingInfo]);

  // 1. Define tu formulario.
  const form = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      problemDescription: currentAnalysis?.info?.problemDescription,
      mainFeatures: currentAnalysis?.info?.mainFeatures,
      targetVariable: currentAnalysis?.info?.targetVariable,
      hasComplexData: currentAnalysis?.info?.hasComplexData,
      numberOfFeatures: currentAnalysis?.info?.numberOfFeatures,
      datasetSize: currentAnalysis?.info?.datasetSize,
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
        <CollapsibleBox
          arrowButton
          isButtonHighlighted={
            currentAnalysis?.recommendations && isUserEditingInfo
          }
          blocked={isFormBlocked}
          externalIsCollapsed={isFormCollapsed}
          onCollapseChange={onCollapseChange}
        >
          <div
            className={`w-full flex flex-col gap-4 border rounded-md px-[5%] py-8 bg-muted/30 ${
              currentAnalysis?.recommendations &&
              isUserEditingInfo &&
              'border-2 border-foreground group'
            } ${!isUserEditingInfo && 'select-none pointer-events-none'}`}
          >
            {formLabel && (
              <FormLabel className='block text-lg text-center self-center mb-2'>
                {formLabel}
              </FormLabel>
            )}
            <FormField
              control={form.control}
              name='problemDescription'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem description:</FormLabel>
                  <FormControl>
                    <Textarea
                      className='h-36 sm:h-28 resize-none'
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
                          <TooltipContent className='text-center text-muted-foreground max-w-[min(280px,80vw)]'>
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
        </CollapsibleBox>
        {children}
      </form>
    </Form>
  );
};

export default StepTwoForm;
