import React from 'react';
import Image from 'next/image';
import { Collaborator } from '@/types';

const CollaboratorThumbnail = ({
  collaborator,
}: {
  collaborator: Collaborator;
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className='flex flex-col items-center cursor-pointer'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(collaborator.url, '_blank')}
    >
      <div
        className={`relative w-20 h-20 mb-2 overflow-hidden rounded-full border-2 border-muted-foreground ${
          isHovered ? '!border-foreground' : 'grayscale'
        }`}
      >
        <Image
          src={`/images/${collaborator.nick}.png`}
          alt={collaborator.name}
          fill
        />
      </div>
      <span
        className={`text-sm text-muted-foreground ${
          isHovered ? 'underline !text-foreground' : ''
        }`}
      >
        @{collaborator.nick}
      </span>
    </div>
  );
};

export default CollaboratorThumbnail;
