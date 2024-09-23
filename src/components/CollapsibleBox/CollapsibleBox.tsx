import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';

interface CollapsibleBoxProps {
  children: React.ReactNode;
  collapsedHeight?: number;
}

export const CollapsibleBox = ({
  children,
  collapsedHeight = 200,
}: CollapsibleBoxProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [maskHeight, setMaskHeight] = useState(100);
  const [expandedHeight, setExpandedHeight] = useState(collapsedHeight);

  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMaskHeight = () => {
      if (isExpanded) {
        setTimeout(() => {
          setMaskHeight(0);
        }, 300);
      } else {
        setMaskHeight(150);
      }
    };
    handleMaskHeight();
  }, [isExpanded]);

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
  }, [children, isExpanded]);

  return (
    <div className='w-full flex flex-col items-center gap-8'>
      <div
        className={`duration-500 ease-in-out overflow-hidden`}
        style={{
          height: isExpanded ? `${expandedHeight}px` : `${collapsedHeight}px`,
          maskImage: `linear-gradient(to bottom, black calc(100% - ${maskHeight}px), transparent)`,
        }}
      >
        <div className='w-full' ref={contentRef}>
          {children}
        </div>
      </div>
      <Button
        size='sm'
        variant='secondary'
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? 'View Less' : 'View More'}
      </Button>
    </div>
  );
};
