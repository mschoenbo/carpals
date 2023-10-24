import {Separator} from '@/components/ui/separator';
import {EditCarForm} from './edit-car-form';
import {getServerSession} from 'next-auth';
import {authOptions} from '@/lib/auth';

export default async function EditCarView({params}: {params: {id: string}}) {
  const session = await getServerSession(authOptions);
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cars/${params.id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${session?.tokens.accessToken}`,
    },
  });

  if (!response?.ok) throw new Error(`HTTP error! status: ${response.status}`);
  const result = await response.json();

  console.log(result);

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Edit Car</h3>
        <p className="text-sm text-muted-foreground">Update the settings of your car here.</p>
      </div>
      <Separator />
      <div className="px-1">
        <EditCarForm car={result} />
      </div>
    </div>
  );
}
