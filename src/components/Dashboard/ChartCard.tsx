import React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Jan', '2021': 510000, '2020': 560000 },
  { name: 'Feb', '2021': 540000, '2020': 780000 },
  { name: 'Mar', '2021': 590000, '2020': 480000 },
  { name: 'Apr', '2021': 480000, '2020': 180000 },
  { name: 'May', '2021': 630000, '2020': 300000 },
  { name: 'Jun', '2021': 760000, '2020': 200000 },
  { name: 'Jul', '2021': 300000, '2020': 340000 },
  { name: 'Aug', '2021': 620000, '2020': 310000 },
  { name: 'Sep', '2021': 710000, '2020': 450000 },
  { name: 'Oct', '2021': 680000, '2020': 400000 },
  { name: 'Nov', '2021': 800000, '2020': 310000 },
  { name: 'Dec', '2021': 580000, '2020': 460000 },
];

interface ChartCardProps {
  title: string;
  mainValue: string;
  mainSubtitle: string;
  progress?: {
    percentage: number;
    targetValue: string;
  };
  className?: string;
  data?: typeof chartData;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-md shadow-lg">
        <p className="label text-sm text-muted-foreground">{`${label}`}</p>
        <p className="intro text-primary font-semibold">{`2021 : $${(payload[0].value / 1000000).toFixed(1)}M`}</p>
        <p className="intro text-secondary font-semibold">{`2020 : $${(payload[1].value / 1000000).toFixed(1)}M`}</p>
      </div>
    );
  }
  return null;
};

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  mainValue,
  mainSubtitle,
  progress,
  className,
  data = chartData,
}) => {
  return (
    <Card className={cn('bg-card text-card-foreground p-6 col-span-2', className)}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
        {/* Left Side: Stats */}
        <div className="flex flex-col justify-between">
          <h3 className="text-lg text-muted-foreground font-medium">{title}</h3>
          <div className="flex-grow flex flex-col justify-center my-4">
            <p className="text-6xl font-bold tracking-tighter">{mainValue}</p>
            <p className="text-muted-foreground text-sm uppercase font-semibold tracking-wider mt-1">{mainSubtitle}</p>
          </div>
          {progress && (
            <div>
              <div className="relative h-1.5 w-full bg-border rounded-full">
                  <div 
                      className="absolute top-0 left-0 h-full bg-primary rounded-full"
                      style={{ width: `${progress.percentage}%`}}
                  ></div>
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>{progress.percentage}%</span>
                <span>{progress.targetValue}</span>
              </div>
            </div>
          )}
        </div>
        {/* Right Side: Chart */}
        <div className="lg:col-span-2 flex flex-col">
           <div className="flex justify-end items-center gap-4 text-sm mb-4">
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-primary"></span>
                    <span>2021</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-secondary"></span>
                    <span>2020</span>
                </div>
           </div>
          <div className="flex-grow min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 0, left: -20, bottom: 5 }} barGap={4}>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tickFormatter={(value) => `$${value / 1000000}M`}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  width={50}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsla(var(--card), 0.5)' }} />
                <Bar dataKey="2021" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={12} />
                <Bar dataKey="2020" fill="hsl(var(--secondary))" radius={[4, 4, 0, 0]} barSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ChartCard;
