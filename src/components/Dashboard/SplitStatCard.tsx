import React from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ArrowUp, ArrowDown } from 'lucide-react';

export interface Comparison {
  value: string;
  trend: 'up' | 'down' as const;
}

export interface TextItem {
  id: string;
  title: string;
  count: string;
  value?: string;
  countComparison?: Comparison;
  valueComparison?: Comparison;
}

export interface BarItem {
  id: string;
  label: string;
  value: string;
  percentage: number;
}

export type StatItem = TextItem | BarItem;

interface SplitStatCardProps {
  title: string;
  items: StatItem[];
  variant: 'text' | 'bar' as const;
  className?: string;
}

const ComparisonIndicator: React.FC<{ comparison: Comparison }> = ({ comparison }) => {
  const TrendIcon = comparison.trend === 'up' ? ArrowUp : ArrowDown;
  const trendColor = comparison.trend === 'up' ? 'text-success' : 'text-error';
  return (
    <div className={cn('flex items-center gap-1 text-xs font-medium', trendColor)}>
      <TrendIcon className="h-3 w-3" />
      <span>{comparison.value} vs LY</span>
    </div>
  );
};

const SplitStatCard: React.FC<SplitStatCardProps> = ({ title, items, variant, className }) => {
  return (
    <Card className={cn('bg-card text-card-foreground', className)}>
      <CardHeader>
        <CardTitle className="text-lg text-muted-foreground font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 pt-0">
        {variant === 'text' && (items as TextItem[]).map((item, index) => (
          <React.Fragment key={item.id}>
            {index > 0 && <Separator className="bg-border my-6" />}\
            <div>
              <p className="text-muted-foreground mb-2 text-sm">{item.title}</p>
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-4xl font-bold tracking-tight">{item.count}</p>
                  {item.countComparison && <ComparisonIndicator comparison={item.countComparison} />}
                </div>
                {item.value && (
                  <div className="text-right">
                    <p className="text-4xl font-bold tracking-tight">{item.value}</p>
                    {item.valueComparison && <ComparisonIndicator comparison={item.valueComparison} />}
                  </div>
                )}
              </div>
            </div>
          </React.Fragment>
        ))}

        {variant === 'bar' && (items as BarItem[]).map((item) => (
          <div key={item.id}>
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="text-card-foreground">{item.label}</span>
              <span className="font-semibold">{item.value}</span>
            </div>
            <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                <div 
                    className="h-full bg-primary"
                    style={{ width: `${item.percentage}%`}}
                ></div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default SplitStatCard;