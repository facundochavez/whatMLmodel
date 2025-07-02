'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

const ModeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Esperar a que el componente se monte para evitar errores de hydration
  useEffect(() => {
    setMounted(true);
    setTheme('dark'); // Forzar dark como default
  }, [setTheme]);

  if (!mounted) return null;

  const isDark = theme === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  return (
    <Button
      variant="secondary"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {isDark ? (
        <Moon className="h-5 w-5" strokeWidth={1.8} />
      ) : (
        <Sun className="h-5 w-5" strokeWidth={1.8} />
      )}
    </Button>
  );
};

export default ModeToggle;
