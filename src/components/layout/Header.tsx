import React from 'react';
import { cn } from '@/lib/utils';

/**
 * A general-purpose header component for the application layout.
 * The design for the "Sales Dashboard Overview" page does not specify
 * any header content, so this component acts as a structural placeholder.
 * It can be populated with content via the `children` prop for other pages.
 */
interface HeaderProps {
  className?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ className, children }) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className,
      )}
    >
      <div className="container flex h-14 max-w-screen-2xl items-center">
        {/* The project name or navigation can be passed as children */}
        {children}
      </div>
    </header>
  );
};

export default Header;
