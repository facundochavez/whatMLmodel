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
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, ArrowLeft, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCarouselContext } from '@/context/carousel.context';
import { Skeleton } from '@/components/ui/skeleton';
import { useEffect } from 'react';

const FormSchema = z.object({
  bio: z.string().min(50, {
    message: 'Descrition must be at least 50 characters.',
  }),
});

const InfoSlide = () => {
  const { selectedSlide, goToSlide, isLoading } = useCarouselContext();

  const form = useForm({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data) => {
    goToSlide(3);
  };

  useEffect(() => {
    form.setValue(
      'problem_description',
      'Based on the features of Titanic passengers (such as sex, age and socio-economic class), I want to build a model to determine which types of people were more likely to survive.'
    );
    form.setValue('features', 'Sex, Age, Pclass, Fare, SibSp, Parch, Survival');
    form.setValue('target_variable', 'Probability of survival');
  }, [isLoading]);

  return (
    <section
      className={`min-w-[calc(100%/3)] flex flex-col items-center duration-700 ease-out`}
      style={{ opacity: selectedSlide === 2 ? 1 : 0 }}
    >
      <div className='w-full flex flex-col max-w-[700px]'>
        <h2 className='text-xl text-center font-semibold sm:text-3xl md:text-2xl py-10 md:py-[55px]'>
          Check that the information is correct
        </h2>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex flex-col gap-4'
          >
            <FormField
              className='w-full'
              control={form.control}
              name='problem_description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-md'>
                    Problem description:
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      className='text-md resize-none h-32'
                      placeholder='Your description here...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              className='w-full'
              control={form.control}
              name='features'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-md'>Features:</FormLabel>
                  <FormControl>
                    <Input
                      className='text-md resize-none'
                      placeholder='Your features here...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              className='w-full'
              control={form.control}
              name='target_variable'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-md'>Target variable:</FormLabel>
                  <FormControl>
                    <Input
                      className='text-md resize-none'
                      placeholder='Your target variable here...'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <footer className='flex justify-between mt-2 gap-3'>
              <Button
                variant='secondary'
                className='w-fit'
                onClick={() => {
                  goToSlide(1);
                }}
              >
                <ArrowLeft size={20} className='mr-2' /> Back
              </Button>
              <Button
                type='submit'
                className='w-fit'
                disabled={isLoading}
                onClick={() => {
                  goToSlide(3);
                }}
              >
                {isLoading ? (
                  <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                ) : (
                  <Sparkles className='w-4 h-4 mr-2' />
                )}
                Search
              </Button>
            </footer>
          </form>
        </Form>
      </div>
    </section>
  );
};

export default InfoSlide;
