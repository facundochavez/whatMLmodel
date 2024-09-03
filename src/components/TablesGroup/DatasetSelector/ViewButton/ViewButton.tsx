import React from 'react'; // Asegúrate de importar React si estás usando JSX

import { DialogTrigger } from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Usa ButtonProps o cualquier otro tipo de props que quieras aceptar
const ViewButton: React.FC<ButtonProps> = () => {
  return (
    <DialogTrigger asChild>
      <Button variant='secondary' className='px-3 md:pr-4 bg-secondary'>
        <Eye className='h-[18px] w-[18px]' />
        <span className='hidden ml-2 md:flex'>View</span>
      </Button>
    </DialogTrigger>
  );
};

export default ViewButton;
