'use client';

import {userAuthSchema} from '@/lib/validations/auth';
import {z} from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect, useState} from 'react';
import {useRouter, useSearchParams} from 'next/navigation';
import {getSession, signIn, useSession} from 'next-auth/react';
import {carUpdateSchema} from '@/lib/validations/car';
import {cn} from '@/lib/utils';
import {Label} from '@radix-ui/react-label';
import {Input} from '@/components/ui/input';
import {buttonVariants} from '@/components/ui/button';
import {Icons} from '@/components/icons';
import {Car} from '@/types';

interface EditCarFormProps extends React.HTMLAttributes<HTMLDivElement> {
  car: Car;
}

type FormData = z.infer<typeof carUpdateSchema>;

export function EditCarForm({className, car, ...props}: EditCarFormProps) {
  console.log(car);
  const {
    register,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      color: car.color,
      fin: car.fin,
      fuel: car.fuel,
      make: car.make,
      model: car.model,
      year: car.year,
    },
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    setIsLoading(false);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2 grid-cols-2">
          <div className="grid gap-1">
            <Label htmlFor="email">Manufacturer</Label>
            <Input id="make" type="text" disabled={isLoading} {...register('make')} />
            {errors?.make && <p className="px-1 text-xs text-red-600">{errors.make.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">Model</Label>
            <Input id="model" type="text" disabled={isLoading} {...register('model')} />
            {errors?.model && <p className="px-1 text-xs text-red-600">{errors.model.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">Year</Label>
            <Input id="make" type="date" disabled={isLoading} {...register('year')} />
            {errors?.year && <p className="px-1 text-xs text-red-600">{errors.year.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">FIN</Label>
            <Input id="fin" type="text" disabled={isLoading} {...register('fin')} />
            {errors?.fin && <p className="px-1 text-xs text-red-600">{errors.fin.message}</p>}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="email">Color</Label>
            <Input id="color" type="text" disabled={isLoading} {...register('color')} />
            {errors?.color && <p className="px-1 text-xs text-red-600">{errors.color.message}</p>}
          </div>
        </div>
        <button className={cn(buttonVariants())} disabled={isLoading}>
          {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </button>
      </form>
    </div>
  );
}
