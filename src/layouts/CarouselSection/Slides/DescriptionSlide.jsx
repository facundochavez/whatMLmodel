import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useCarouselContext } from '@/context/carousel.context';
import tryExamplesData from '@/data/try-examples.data.json';

const FormSchema = z.object({
  bio: z.string().min(50, {
    message: 'Descrition must be at least 50 characters.',
  }),
});

const DescriptionSlide = () => {
  const { selectedSlide, setSelectedSlide, goToSlide, isLoading } =
    useCarouselContext();

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data) => {
    setSelectedSlide(2);
  };

  const handleDescriptionValue = (value) => {
    form.setValue('dataset_description', value);
  };

  return (
    <section
      className={`min-w-[calc(100%/3)] flex flex-col items-center duration-700 ease-out`}
      style={{ opacity: selectedSlide === 1 ? 1 : 0 }}
    >
      <div className='w-full flex flex-col max-w-[700px] '>
        <header className='w-full flex flex-col items-center py-10 md:py-20'>
          <h2 className='text-2xl text-center text-[hsl(var(--muted-foreground))] font-semibold sm:text-3xl md:text-4xl'>
            Use IA to find the machine learning model that best fits your data
          </h2>
          <div className='w-full flex gap-2 items-center flex-wrap justify-center mt-6'>
            <p className='text-[13px]'>Try with:</p>
            {tryExamplesData.map((example) => (
              <Badge
                key={example.id}
                onClick={() => handleDescriptionValue(example.value)}
                variant='secondary'
                className='cursor-pointer'
              >
                {`"${example.name}..."`}
              </Badge>
            ))}
          </div>
        </header>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              className='w-full'
              control={form.control}
              name='dataset_description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-md'>
                    Make a simple description of your dataset and target
                    variable:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className='text-md resize-none h-40'
                      placeholder='Your description here...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type='submit'
              className='w-fit self-end'
              disabled={isLoading}
              onClick={() => {
                goToSlide(2);
              }}
            >
              {isLoading ? (
                <Loader2 className='w-4 h-4 mr-2 animate-spin' />
              ) : (
                <Sparkles className='w-4 h-4 mr-2' />
              )}{' '}
              Let's go
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default DescriptionSlide;
