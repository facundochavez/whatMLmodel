import { Button } from '@/components/ui/button';
import React from 'react';
import CollaboratorsDaraRaw from '@/data/Collaborators.data.json';
import CollaboratorThumbnail from '@/components/CollaboratorThumbnail/CollaboratorThumbnail';
import { Collaborator } from '@/types';
import { Code2 } from 'lucide-react';

const Collaborators: React.FC = () => {
  const collaborators: Collaborator[] = CollaboratorsDaraRaw as Collaborator[];

  return (
    <div className='w-screen relative flex flex-col items-center px-[5%] mt-4 -mb-10'>
      <div className='absolute w-full h-full bg-muted/30 -z-10' />
      <section className='w-full max-w-[1050px] py-24 flex flex-col items-center gap-10'>
        <h2 className='text-2xl text-center font-semibold max-w-[600px]'>
          This is an Open Source project, and we’re planning some cool new
          features. Want to join?
        </h2>
        <Button
          className='w-full sm:w-fit'
          onClick={() =>
            window.open(
              'https://github.com/facundochavez/whatMLmodel',
              '_blank'
            )
          }
        >
          <Code2 className='h-5 w-5 mr-2' strokeWidth={1.8} />
          Clone repo now
        </Button>
        <ul className='flex gap-4 sm:gap-10 sm:mt-6 flex-wrap justify-center'>
          {collaborators.map((collaborator, index) => (
            <li key={index}>
              <CollaboratorThumbnail collaborator={collaborator} />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Collaborators;
