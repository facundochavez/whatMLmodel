'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { DialogClose, DialogFooter } from '@/components/ui/dialog';
import { Eye, EyeOff, LoaderCircle } from 'lucide-react';
import { useState } from 'react';
import { useGlobalStore } from '@/store/global.store';
import { toast } from 'sonner';

const apiKeySchema = z.object({
  apiKey: z.string().min(1, {
    message: 'API key is required.',
  }),
});

const ApiKeyForm: React.FC = () => {
  const [showAPIkey, setShowAPIkey] = useState(false);
  const [isCheckingApiKey, setIsCheckingApiKey] = useState(false);
  const userGeminiApiKey = useGlobalStore((state) => state.userGeminiApiKey);
  const setUserGeminiApiKey = useGlobalStore((state) => state.setUserGeminiApiKey);
  const setShowApiKeyDialog = useGlobalStore((state) => state.setShowApiKeyDialog);

  const form = useForm<z.infer<typeof apiKeySchema>>({
    resolver: zodResolver(apiKeySchema),
    defaultValues: {
      apiKey: userGeminiApiKey || '',
    },
  });

  const onSubmit = async (values: z.infer<typeof apiKeySchema>) => {
    try {
      setIsCheckingApiKey(true);
      const response = await fetch('/api/gemini', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'apiKeyCheck',
          userGeminiApiKey: values.apiKey,
        }),
      });

      if (!response.ok) throw new Error('Invalid API key');

      const result = await response.json();
      if (result.valid) {
        setUserGeminiApiKey(values.apiKey);
        setShowApiKeyDialog(false);
        toast(<span className='text-center text-base'>API key saved successfully!</span>);
      } else {
        console.log('Invalid API key');
      }
    } catch (error) {
      console.log('API key validation error:', error);
      toast(<span className='text-center text-base'>Invalid API key</span>);
    } finally {
      setIsCheckingApiKey(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-2 w-full">
        <FormField
          control={form.control}
          name="apiKey"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel>API Key</FormLabel>
              <FormControl>
                <>
                  <Input type={showAPIkey ? 'text' : 'password'} placeholder="•••••" className="pr-10" {...field} />
                  <Button variant="link" className="absolute right-0 top-6" size="icon" type="button" onClick={() => setShowAPIkey(!showAPIkey)}>
                    {showAPIkey ? <EyeOff className="h-5 w-5" strokeWidth={1.8} /> : <Eye className="h-5 w-5" strokeWidth={1.8} />}
                  </Button>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogFooter className="pt-2">
          <DialogClose asChild>
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </DialogClose>
          {isCheckingApiKey ? (
            <Button type="button" disabled className="flex items-center">
              <LoaderCircle className="h-4 w-4 mr-2 animate-spin" />
              Checking
            </Button>
          ) : (
            <Button type="submit">Save</Button>
          )}
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ApiKeyForm;
