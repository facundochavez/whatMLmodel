'use client';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LoginForm from '@/components/Forms/Login.form';
import RegisterForm from '@/components/Forms/Register.form';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import { DialogClose } from '@/components/ui/dialog';
import { useGlobalContext } from '@/context/global.context';

const AuthDialogContent: React.FC = () => {
  const { isRegistering, setIsRegistering } = useGlobalContext();

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Get Started</DialogTitle>
        <DialogDescription>
          Please log in or register to access the AI features.
        </DialogDescription>
      </DialogHeader>
      <DialogClose asChild>
        <Button className='w-full gap-2' variant='secondary'>
          <Image
            src='/icons/icon-google.svg'
            alt='Google Icon'
            width={20}
            height={20}
          />
          Continue with Google
        </Button>
      </DialogClose>
      <div className='flex items-center gap-4 -mb-4'>
        <Separator className='flex-grow w-0'></Separator>
        <span className='block text-sm text-center text-muted-foreground'>
          Or
        </span>
        <Separator className='flex-grow w-0'></Separator>
      </div>

      <Tabs defaultValue='login' value={isRegistering ? 'register' : 'login'}>
        <TabsList className='flex justify-start rounded-none p-0 h-fit border-b-2 bg-transparent mb-5'>
          <TabsTrigger value='login' onClick={() => setIsRegistering(false)}>
            Log In
          </TabsTrigger>
          <TabsTrigger value='register' onClick={() => setIsRegistering(true)}>
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value='login'
          tabIndex={-1}
          className='flex flex-col gap-4 mt-0'
        >
          <LoginForm />
        </TabsContent>
        <TabsContent
          value='register'
          tabIndex={-1}
          className='flex flex-col gap-4 mt-0'
        >
          <RegisterForm />
        </TabsContent>
      </Tabs>
    </DialogContent>
  );
};

export default AuthDialogContent;
