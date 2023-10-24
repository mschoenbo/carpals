'use client';

import {userRegisterSchema} from '@/lib/validations/auth';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {use, useState} from 'react';
import {toast} from '../ui/use-toast';
import {cn} from '@/lib/utils';
import {Label} from '../ui/label';
import {Input} from '../ui/input';
import {buttonVariants} from '../ui/button';
import {Icons} from '../icons';
import {env} from 'process';
import {useRouter} from 'next/navigation';

interface UserRegisterFormProps extends React.HTMLAttributes<HTMLDivElement> {}

type FormData = z.infer<typeof userRegisterSchema>;

export function UserRegisterForm({className, ...props}: UserRegisterFormProps) {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormData>({
    resolver: zodResolver(userRegisterSchema),
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    console.log(env.NEXT_PUBLIC_BACKEND_URL);

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setIsLoading(false);

    if (!res?.ok) {
      return toast({
        title: 'Something went wrong',
        description: res.statusText,
        variant: 'destructive',
      });
    }

    router.replace('/login');

    return toast({
      title: 'Success',
      description: 'New user created. Please log in now. ',
    });
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Email
            </Label>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors?.email && <p className="px-1 text-xs text-red-600">{errors.email.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Firstname
            </Label>
            <Input id="givenName" placeholder="Firstname" type="text" disabled={isLoading} {...register('givenName')} />
            {errors?.givenName && <p className="px-1 text-xs text-red-600">{errors.givenName.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Surename
            </Label>
            <Input
              id="familyName"
              placeholder="Surename"
              type="text"
              disabled={isLoading}
              {...register('familyName')}
            />
            {errors?.familyName && <p className="px-1 text-xs text-red-600">{errors.familyName.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Password
            </Label>
            <Input
              id="password"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              disabled={isLoading}
              {...register('password')}
            />
            {errors?.password && <p className="px-1 text-xs text-red-600">{errors.password.message}</p>}
          </div>
          <button className={cn(buttonVariants())} disabled={isLoading} type="submit">
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Sign Up
          </button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <button type="button" className={cn(buttonVariants({variant: 'outline'}))} disabled={isLoading}>
        <Icons.gitHub className="mr-2 h-4 w-4" /> Github
      </button>
    </div>
  );
}
