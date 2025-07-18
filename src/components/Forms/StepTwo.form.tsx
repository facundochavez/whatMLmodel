'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CircleHelp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CollapsibleBox } from '../CollapsibleBox';
import { Textarea } from '../ui/textarea';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCurrentAnalysisStore } from '@/store/currentAnalysis.store';

// Esquema de validación con Zod
const stepTwoSchema = z.object({
  problemDescription: z.string().min(100, 'Must be at least 100 characters'),
  mainFeatures: z.string().min(1, 'This field is required'),
  targetVariable: z.string().min(1, 'This field is required'),
  columns: z.coerce.number().positive('Must be a positive number'),
  rows: z.coerce.number().positive('Must be a positive number'),
  needsDimensionalityReduction: z.enum(['Yes', 'No']),
});

interface StepTwoFormProps extends React.PropsWithChildren {
  isFormCollapsed: boolean;
  isFormBlocked: boolean;
  isUserEditingInfo: boolean;
  onCollapseChange: (collapsed: boolean) => void;
}

const StepTwoForm: React.FC<StepTwoFormProps> = ({ isFormCollapsed, isFormBlocked, isUserEditingInfo, onCollapseChange, children }) => {
  const currentAnalysis = useCurrentAnalysisStore((state) => state.currentAnalysis);
  const [showProblemTooltip, setShowProblemTooltip] = useState(false);
  const [showComplexDataTooltip, setShowComplexDataTooltip] = useState(false);
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

  const form = useForm<z.infer<typeof stepTwoSchema>>({
    resolver: zodResolver(stepTwoSchema),
    defaultValues: {
      problemDescription: currentAnalysis?.info?.problemDescription || '',
      mainFeatures: currentAnalysis?.info?.mainFeatures || '',
      targetVariable: currentAnalysis?.info?.targetVariable || '',
      columns: currentAnalysis?.info?.columns || 0,
      rows: currentAnalysis?.info?.rows || 0,
      needsDimensionalityReduction: currentAnalysis?.info?.needsDimensionalityReduction ? 'Yes' : 'No',
    },
  });

  function onSubmit(values: z.infer<typeof stepTwoSchema>) {
    const payload = {
      ...values,
      needsDimensionalityReduction: values.needsDimensionalityReduction === 'Yes',
    };

    console.log(payload);
    // o enviar a backend, etc.
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-[700px]">
        <CollapsibleBox
          arrowButton
          isButtonHighlighted={currentAnalysis?.recommendations && isUserEditingInfo}
          blocked={isFormBlocked}
          externalIsCollapsed={isFormCollapsed}
          onCollapseChange={onCollapseChange}
        >
          <div
            className={`w-full flex flex-col gap-4 border rounded-md px-[5%] pt-6 pb-8 bg-muted/30 ${
              currentAnalysis?.recommendations && isUserEditingInfo && 'border-2 border-foreground group'
            } ${!isUserEditingInfo && 'select-none pointer-events-none'}`}
          >
            {formLabel && <FormLabel className="block text-lg text-center self-center mb-2">{formLabel}</FormLabel>}

            <FormField
              control={form.control}
              name="problemDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Problem description and special specs:
                    <TooltipProvider delayDuration={0}>
                      <Tooltip open={showProblemTooltip}>
                        <TooltipTrigger
                          asChild
                          className="text-muted-foreground inline-block -translate-y-0.5"
                          onMouseEnter={() => setShowProblemTooltip(true)}
                          onMouseLeave={() => setShowProblemTooltip(false)}
                        >
                          <CircleHelp className="inline w-4 h-4 ml-1 mt-0.5" />
                        </TooltipTrigger>
                        <TooltipContent className="text-muted-foreground max-w-[min(280px,80vw)] mx-8">
                          <p>You can provide any specific details about your dataset in this field.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>{' '}
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className="h-44 sm:h-28 resize-none"
                      placeholder="Your problem description here..."
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
              name="mainFeatures"
              render={({ field }) => (
                <FormItem className="grow">
                  <FormLabel>Main features:</FormLabel>
                  <FormControl>
                    <Input placeholder="Your features here..." maxLength={100} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetVariable"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Target variable:</FormLabel>
                  <FormControl>
                    <Input placeholder="Your target variable here..." maxLength={35} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-4 sm:flex-row">
              <FormField
                control={form.control}
                name="columns"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel>Number of features:</FormLabel>
                    <FormControl>
                      <Input className="pr-20" type="number" min={1} inputMode="numeric" pattern="[0-9]*" {...field} />
                    </FormControl>
                    <FormDescription className="absolute top-8 right-4">columns</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rows"
                render={({ field }) => (
                  <FormItem className="w-full relative">
                    <FormLabel>Dataset size:</FormLabel>
                    <FormControl>
                      <Input className="pr-14" type="number" min={1} inputMode="numeric" pattern="[0-9]*" {...field} />
                    </FormControl>
                    <FormDescription className="absolute top-8 right-4">rows</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="needsDimensionalityReduction"
                render={({ field }) => (
                  <FormItem className="w-full min-w-[35%] md:min-w-[unset]">
                    <FormLabel>
                      Dimens. Reduction:{' '}
                      <TooltipProvider delayDuration={0}>
                        <Tooltip open={showComplexDataTooltip}>
                          <TooltipTrigger
                            asChild
                            className="text-muted-foreground inline-block -translate-y-0.5"
                            onMouseEnter={() => setShowComplexDataTooltip(true)}
                            onMouseLeave={() => setShowComplexDataTooltip(false)}
                          >
                            <CircleHelp className="inline w-4 h-4 ml-1 mt-0.5" />
                          </TooltipTrigger>
                          <TooltipContent className="text-muted-foreground max-w-[min(260px,80vw)] sm:mr-[10vw] lg:mr-[8rem]">
                            <p>
                              Dataset will require Dimensionality Reduction, either because it has too many noisy features or because it involves
                              complex data such as long texts, images, videos, etc.
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </FormLabel>

                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-background rounded-lg border">
                        <SelectItem value="No">No</SelectItem>
                        <SelectItem value="Yes">Yes</SelectItem>
                      </SelectContent>
                      <FormMessage />
                    </Select>
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
