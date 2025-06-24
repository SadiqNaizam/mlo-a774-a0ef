import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  mainValue: string;
  mainSubtitle?: string;
  comparison?: {
    value: string;
    trend: 'up' | 'down' as const;
  };
  secondaryValue: string;
  secondarySubtitle: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  mainValue,
  mainSubtitle,
  comparison,
  secondaryValue,
  secondarySubtitle,
  className,
}) => {
  const TrendIcon = comparison?.trend === 'up' ? ArrowUp : ArrowDown;
  const trendColor = comparison?.trend === 'up' ? 'text-success' : 'text-error';

  return (
    <Card className={cn('bg-card text-card-foreground p-6 flex flex-col', className)}>
      <h3 className="text-lg text-muted-foreground font-medium">{title}</h3>
      <div className="flex-grow flex flex-col justify-around gap-4 py-4">
        <div>
          <p className="text-5xl lg:text-6xl font-bold tracking-tighter">{mainValue}</p>
          {mainSubtitle && <p className="text-muted-foreground text-sm uppercase font-semibold tracking-wider mt-1">{mainSubtitle}</p>}
          {comparison && (
            <div className="flex items-center gap-1 mt-2">
              <TrendIcon className={cn('h-4 w-4', trendColor)} />
              <span className={cn('text-sm font-medium', trendColor)}>{comparison.value}</span>
              <span className="text-sm text-muted-foreground">v LY</span>
            </div>
          )}
        </div>
        <div>
          <p className="text-4xl lg:text-5xl font-bold tracking-tight">{secondaryValue}</p>
          {secondarySubtitle && <p className="text-muted-foreground text-sm mt-1">{secondarySubtitle}</p>}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
