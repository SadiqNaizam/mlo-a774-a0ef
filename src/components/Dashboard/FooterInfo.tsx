import React from 'react';
import { Presentation } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FooterInfoProps {
  className?: string;
}

const FooterInfo: React.FC<FooterInfoProps> = ({ className }) => {
    const [currentTime, setCurrentTime] = React.useState<string>('');

    React.useEffect(() => {
        const updateTime = () => {
            setCurrentTime(new Date().toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: false
            }));
        };
        updateTime();
        const intervalId = setInterval(updateTime, 60000); // Update every minute
        return () => clearInterval(intervalId);
    }, []);

    return (
        <footer className={cn("w-full text-muted-foreground text-sm col-span-3 py-4", className)}>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="bg-success/20 p-1.5 rounded-md flex items-center justify-center">
                      <Presentation className="h-5 w-5 text-success" />
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-card-foreground">Sales YTD</span>
                        <span className="text-muted-foreground">Powered by Geckoboard</span>
                    </div>
                </div>
                <div className="font-mono text-base text-card-foreground">
                    {currentTime || '09:24'}
                </div>
            </div>
        </footer>
    );
};

export default FooterInfo;
