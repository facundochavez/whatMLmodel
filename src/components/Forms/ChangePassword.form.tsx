import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';
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
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { Dialog, DialogClose, DialogFooter } from '@/components/ui/dialog';
import { DialogTrigger } from '@radix-ui/react-dialog';
import ResetPasswordDialogContent from '../DialogContents/ResetPassword.dialogContent';
import { useGlobalContext } from '@/context/global.context';

// Esquema de validación con Zod
const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: 'The current password must have at least 8 characters.',
    }),
    newPassword: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters.' })
      .regex(/[a-z]/, {
        message: 'Password must include at least one lowercase letter.',
      })
      .regex(/[A-Z]/, {
        message: 'Password must include at least one uppercase letter.',
      })
      .regex(/[0-9]/, { message: 'Password must include at least one number.' })
      .regex(/[^a-zA-Z0-9]/, {
        message: 'Password must include at least one special character.',
      }),
    confirmNewPassword: z.string().min(8, {
      message: 'Please confirm your password.',
    }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

const ChangePasswordForm: React.FC = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { setShowResetPasswordDialog } = useGlobalContext();

  const form = useForm<z.infer<typeof changePasswordSchema>>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    },
  });

  function handlePasswordChange(values: z.infer<typeof changePasswordSchema>) {
    /* console.log('Password changed:', values); */
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handlePasswordChange)}
        className='flex flex-col gap-4'
      >
        <FormField
          control={form.control}
          name='currentPassword'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Current Password</FormLabel>
              <FormControl>
                <>
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    placeholder='•••••'
                    className='pr-10'
                    {...field}
                  />
                  <Button
                    variant='link'
                    className='absolute right-0 top-6'
                    size='icon'
                    type='button'
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className='h-5 w-5' strokeWidth={1.8} />
                    ) : (
                      <Eye className='h-5 w-5' strokeWidth={1.8} />
                    )}
                  </Button>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

          <DialogClose asChild>
            <Button
              onClick={() => setShowResetPasswordDialog(true)}
              type='button'
              variant='link'
              size='sm'
              className='self-end px-1 -my-3'
            >
              Forgot password?
            </Button>
          </DialogClose>

        <FormField
          control={form.control}
          name='newPassword'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <>
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder='•••••'
                    className='pr-10'
                    {...field}
                  />
                  <Button
                    variant='link'
                    className='absolute right-0 top-6'
                    size='icon'
                    type='button'
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className='h-5 w-5' strokeWidth={1.8} />
                    ) : (
                      <Eye className='h-5 w-5' strokeWidth={1.8} />
                    )}
                  </Button>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='confirmNewPassword'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Confirm New Password</FormLabel>
              <FormControl>
                <>
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='•••••'
                    className='pr-10'
                    {...field}
                  />
                  <Button
                    variant='link'
                    className='absolute right-0 top-6'
                    size='icon'
                    type='button'
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className='h-5 w-5' strokeWidth={1.8} />
                    ) : (
                      <Eye className='h-5 w-5' strokeWidth={1.8} />
                    )}
                  </Button>
                </>
              </FormControl>
              <FormMessage />
              <FormDescription>
                Must be at least 8 characters and include a mix of uppercase,
                lowercase, numbers, and special characters.
              </FormDescription>
            </FormItem>
          )}
        />

        <DialogFooter className='pt-2'>
          <DialogClose asChild>
            <Button variant='outline' type='button'>
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type='submit'>Save</Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default ChangePasswordForm;
