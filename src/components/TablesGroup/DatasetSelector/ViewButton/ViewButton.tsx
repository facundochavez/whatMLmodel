import React from 'react'; // Asegúrate de importar React si estás usando JSX

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { Button, ButtonProps } from '@/components/ui/button';
import { Eye } from 'lucide-react';
import PipelineDialogContent from '@/components/DialogContents/Pipeline.dialogContent';

// Usa ButtonProps o cualquier otro tipo de props que quieras aceptar
const ViewButton: React.FC<ButtonProps> = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline' className='px-3 md:pr-4 bg-muted/30 sm:bg-background'>
          <Eye className='h-[18px] w-[18px]' strokeWidth={1.8} />
          <span className='hidden xs:flex sm:hidden ml-2 md:flex'>View</span>
        </Button>
      </DialogTrigger>
      <PipelineDialogContent />
    </Dialog>
  );
};

export default ViewButton;
