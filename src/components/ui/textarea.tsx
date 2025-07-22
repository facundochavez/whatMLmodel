import * as React from 'react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  currentLength?: number;
  showMaxLength?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, currentLength, showMaxLength = true, ...props }, ref) => {
  return (
    <div className="relative">
      <textarea
        spellCheck={false}
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        ref={ref}
        {...props}
      />
      {props.maxLength && showMaxLength && (
        <Badge className="absolute right-1 bottom-2 text-xs text-muted-foreground bg-background hover:bg-background active:bg-background">{`${currentLength}/${props.maxLength}`}</Badge>
      )}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
