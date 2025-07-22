import React, { useEffect, useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronUp } from 'lucide-react';
import { useGlobalStore } from '@/store/global.store';

interface CollapsibleBoxProps {
  children: React.ReactNode;
  collapsedHeight?: number;
  arrowButton?: boolean;
  isButtonHighlighted?: boolean;
  blocked?: boolean;
  externalIsCollapsed?: boolean;
  onCollapseChange?: (collapsed: boolean) => void;
}

export const CollapsibleBox = ({
  children,
  collapsedHeight = 200,
  arrowButton = false,
  isButtonHighlighted = false,
  blocked = false,
  externalIsCollapsed = false,
  onCollapseChange,
}: CollapsibleBoxProps) => {
  const isMobile = useGlobalStore((state) => state.isMobile);
  const [isCollapsed, setIsCollapsed] = useState(externalIsCollapsed !== undefined ? externalIsCollapsed : true);
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
    if (blocked) {
      setIsCollapsed(false);
    } else {
      setIsCollapsed(true);
    }
  }, [blocked]);

  const toggleCollapse = () => {
    if (externalIsCollapsed === undefined) {
      setIsCollapsed(!isCollapsed);
    }
    if (onCollapseChange) {
      onCollapseChange(!isCollapsed);
    }
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 relative">
      <div
        className={'w-full duration-500 ease-in-out overflow-hidden'}
        style={{
          height: isCollapsed ? `${collapsedHeight}px` : `${expandedHeight}px`,
          maskImage: `linear-gradient(to bottom, black calc(100% - ${maskHeight}px), transparent)`,
        }}
      >
        <div className="w-full" ref={contentRef}>
          {children}
        </div>
        {isCollapsed && <div className={`absolute bottom-0 w-full`} style={{ height: isMobile ? '190px' : '225px' }}></div>}
      </div>
      {!arrowButton ? (
        <Button size="sm" variant="secondary" type="button" onClick={toggleCollapse} disabled={blocked} className="opacity-100">
          {isCollapsed ? 'View more' : 'View less'}
        </Button>
      ) : (
        <Button
          size="icon"
          id="arrow-button"
          type="button"
          variant="outline"
          onClick={() => {
            toggleCollapse();
            if (!isCollapsed) window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          disabled={blocked}
          className={`!opacity-100 z-[1] -mt-12 duration-0 ${isButtonHighlighted && 'border-2 border-foreground'}`}
        >
          <ChevronUp className={`h-5 w-5 shrink-0 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : 'rotate-0'}`} />
        </Button>
      )}
    </div>
  );
};
