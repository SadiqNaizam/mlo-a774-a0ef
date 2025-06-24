import React from 'react';
import { Presentation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  const [currentTime, setCurrentTime] = React.useState<string>('');

  React.useEffect(() => {
    const updateTime = () => {
      // Format time as HH:mm (e.g., 09:24)
      setCurrentTime(
        new Date().toLocaleTimeString('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }),
      );
    };

    updateTime(); // Set initial time
    const intervalId = setInterval(updateTime, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <footer className={cn('w-full text-sm text-muted-foreground', className)}>
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-success/20">
            <Presentation className="h-5 w-5 text-success" />
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-card-foreground">Sales YTD</span>
            <span>Powered by Geckoboard</span>
          </div>
        </div>
        <div className="font-mono text-base text-card-foreground">
          {currentTime}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
