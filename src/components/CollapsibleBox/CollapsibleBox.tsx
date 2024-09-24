import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { clear } from 'console';

interface CollapsibleBoxProps {
  children: React.ReactNode;
  collapsedHeight?: number;
  arrowButton?: boolean;
  isButtonHighlighted?: boolean;
  isDefaultOpen?: boolean;
  disabled?: boolean;
  externalIsCollapsed?: boolean; // Nuevo prop para recibir directiva externa
  onCollapseChange?: (collapsed: boolean) => void; // Callback para notificar cambios de colapsado
}

export const CollapsibleBox = ({
  children,
  collapsedHeight = 200,
  arrowButton = false,
  isButtonHighlighted = false,
  isDefaultOpen = false,
  disabled = false,
  externalIsCollapsed,
  onCollapseChange,
}: CollapsibleBoxProps) => {
  const [isCollapsed, setIsCollapsed] = useState(
    externalIsCollapsed !== undefined ? externalIsCollapsed : !isDefaultOpen
  );
  const [maskHeight, setMaskHeight] = useState(150);
  const [expandedHeight, setExpandedHeight] = useState(collapsedHeight);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (externalIsCollapsed !== undefined) {
      setIsCollapsed(externalIsCollapsed);
    }
  }, [externalIsCollapsed]);

  useEffect(() => {
    const handleMaskHeight = () => {
      if (!isCollapsed) {
        setTimeout(() => {
          setMaskHeight(0);
        }, 300);
      } else {
        setMaskHeight(150);
      }
    };
    handleMaskHeight();
  }, [isCollapsed]);

  useEffect(() => {
    const handleExpandedHeight = () => {
      if (contentRef.current) {
        const childrenHeight = contentRef.current.scrollHeight;
        setExpandedHeight(childrenHeight);
      }
    };
    handleExpandedHeight();

    window.addEventListener('resize', handleExpandedHeight);
    return () => {
      window.removeEventListener('resize', handleExpandedHeight);
    };
  }, [children, isCollapsed]);

  useEffect(() => {
    if (disabled) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  }, [disabled]);

  const toggleCollapse = () => {
    if (externalIsCollapsed === undefined) {
      setIsCollapsed(!isCollapsed);
    }
    if (onCollapseChange) {
      onCollapseChange(!isCollapsed);
    }
  };

  return (
    <div className='w-full flex flex-col items-center gap-8'>
      <div
        className={`w-full duration-500 ease-in-out overflow-hidden`}
        style={{
          height: isCollapsed ? `${collapsedHeight}px` : `${expandedHeight}px`,
          maskImage: `linear-gradient(to bottom, black calc(100% - ${maskHeight}px), transparent)`,
        }}
      >
        <div className='w-full' ref={contentRef}>
          {children}
        </div>
      </div>
      {!arrowButton ? (
        <Button
          size='sm'
          variant='secondary'
          onClick={toggleCollapse}
          disabled={disabled}
          className='opacity-100'
        >
          {isCollapsed ? 'View more' : 'View less'}
        </Button>
      ) : (
        <Button
          size='icon'
          id='arrow-button'
          variant='outline'
          onClick={toggleCollapse}
          disabled={disabled}
          className={`!opacity-100 z-[1] -mt-12 duration-0 ${
            isButtonHighlighted && 'border-2 border-foreground'
          }`}
        >
          <ChevronUp
            className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
              isCollapsed ? 'rotate-180' : 'rotate-0'
            }`}
          />
        </Button>
      )}
    </div>
  );
};
