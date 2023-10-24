'use client';

import {buttonVariants} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from '@/components/ui/card';
import {cn} from '@/lib/utils';
import {Car} from '@/types';
import {Session, User} from 'next-auth';
import Link from 'next/link';
import {useEffect, useState} from 'react';

type CarsListProps = {
  session: Session | null;
};

export const CarsListComponent = ({session}: CarsListProps) => {
  const [cars, setCars] = useState<Car[]>([]);
  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/cars`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${session?.tokens.accessToken}`,
        },
      });

      if (!response?.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      setCars(result);
    };

    fetchCars().catch((e) => {
      console.error(e);
    });
  }, [session]);

  return (
    <div className="grid xl:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 grid-cols-1">
      {cars.map((car) => (
        <Link href={`/settings/cars/${car.id}`} key={car.id}>
          <Card className="hover:bg-white/5 transition cursor-pointer">
            <CardHeader>
              <CardTitle>
                {car.make} {car.model} ({new Date(car.year).toLocaleDateString()})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-rows-2 gap-2">
                <span>Color: {car.color}</span>
                <span>Fuel: {car.fuel}</span>
                <span>FIN: {car.fin ?? 'Not provided yet'}</span>
              </div>
            </CardContent>
            <CardFooter className="gap-4">
              <button type="submit" className={cn(buttonVariants())}>
                <span>Edit</span>
              </button>
              <button type="submit" className={cn(buttonVariants({variant: 'destructive'}))}>
                <span>Delete</span>
              </button>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  );
};
