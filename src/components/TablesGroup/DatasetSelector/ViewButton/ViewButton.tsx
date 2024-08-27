import React from 'react'; // Asegúrate de importar React si estás usando JSX

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { Eye } from 'lucide-react';

// Usa ButtonProps o cualquier otro tipo de props que quieras aceptar
const ViewButton: React.FC<ButtonProps> = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='secondary' className='px-3 md:pr-4'>
          <Eye className='h-5 w-5' />
          <span className='hidden ml-2 md:flex'>View</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Titanic</DialogTitle>
          <DialogDescription>
          Based on the features of Titanic passengers, the goal is to determine which types of people were more likely to survive.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ViewButton;
