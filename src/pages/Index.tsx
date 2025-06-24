import React from 'react';
import ChartCard from '@/components/Dashboard/ChartCard';
import SplitStatCard from '@/components/Dashboard/SplitStatCard';
import FooterInfo from '@/components/Dashboard/FooterInfo';

// Define types locally as they are not exported from the components.
// This ensures type safety for the data props.
interface Comparison {
  value: string;
  trend: 'up' | 'down' as const;
}

interface TextItem {
  id: string;
  title: string;
  count: string;
  value?: string;
  countComparison?: Comparison;
  valueComparison?: Comparison;
}

interface BarItem {
  id: string;
  label: string;
  value: string;
  percentage: number;
}

// Data for the "Invoiced" ChartCard. 
const invoicedChartMonthlyData = [
  { name: 'Jan', '2021': 510000, '2020': 560000 },
  { name: 'Feb', '2021': 590000, '2020': 780000 },
  { name: 'Mar', '2021': 520000, '2020': 480000 },
  { name: 'Apr', '2021': 480000, '2020': 180000 },
  { name: 'May', '2021': 630000, '2020': 300000 },
  { name: 'Jun', '2021': 760000, '2020': 410000 },
  { name: 'Jul', '2021': 300000, '2020': 340000 },
  { name: 'Aug', '2021': 620000, '2020': 380000 },
  { name: 'Sep', '2021': 710000, '2020': 450000 },
  { name: 'Oct', '2021': 750000, '2020': 400000 },
  { name: 'Nov', '2021': 800000, '2020': 310000 },
  { name: 'Dec', '2021': 580000, '2020': 460000 },
];

// Data for the "Orders" ChartCard. Making it slightly different for visual variety.
const ordersChartMonthlyData = [
    { name: 'Jan', '2021': 540000, '2020': 380000 },
    { name: 'Feb', '2021': 620000, '2020': 410000 },
    { name: 'Mar', '2021': 780000, '2020': 490000 },
    { name: 'Apr', '2021': 300000, '2020': 330000 },
    { name: 'May', '2021': 580000, '2020': 310000 },
    { name: 'Jun', '2021': 680000, '2020': 450000 },
    { name: 'Jul', '2021': 730000, '2020': 490000 },
    { name: 'Aug', '2021': 780000, '2020': 410000 },
    { name: 'Sep', '2021': 700000, '2020': 500000 },
    { name: 'Oct', '2021': 670000, '2020': 580000 },
    { name: 'Nov', '2021': 610000, '2020': 630000 },
    { name: 'Dec', '2021': 600000, '2020': 610000 },
];

// Data for "By brand" SplitStatCard
const byBrandData: BarItem[] = [
  { id: 'roya', label: 'Roya', value: '$4.5M', percentage: 100 },
  { id: 'bjorn', label: 'Bjorn 2.0', value: '$0.2M', percentage: 4.4 },
  { id: 'wolfsten', label: 'Wolfsten', value: '$1.2M', percentage: 26.6 },
  { id: 'luffe', label: 'Luffe', value: '$0.7M', percentage: 15.5 },
];

// Data for "Opps" SplitStatCard
const oppsData: TextItem[] = [
  {
    id: 'opps-90',
    title: 'Opps at 90%',
    count: '23',
    value: '$264K',
  },
  {
    id: 'opps-month',
    title: 'Opps created this month',
    count: '256',
    value: '$3.7M',
  },
  {
    id: 'opps-year',
    title: 'Opps created this year',
    count: '4,781',
    value: '$56M',
    countComparison: {
      value: '3.9%',
      trend: 'down' as const,
    },
    valueComparison: {
      value: '14%',
      trend: 'up' as const,
    },
  },
];

const IndexPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      {/* 
        This is the main dashboard layout, implemented as a CSS Grid.
        It uses a 3-column layout on large screens. The `ChartCard` components
        span 2 columns, while the `SplitStatCard` components occupy the third column,
        stacking vertically. The `FooterInfo` spans all 3 columns at the bottom.
      */}
      <main className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard
          title="Invoiced"
          mainValue="$6.7M"
          mainSubtitle="YTD"
          progress={{ percentage: 95, targetValue: "$7M" }}
          data={invoicedChartMonthlyData}
        />
        
        <SplitStatCard
          title="By brand"
          variant="bar"
          items={byBrandData}
        />

        {/* 
          The 'Orders' card is represented by a ChartCard. While the design image
          shows slightly different data points (like comparison trends), using the
          existing ChartCard component is the best fit given the available components.
          It correctly displays the main value, subtitle, and the year-over-year chart.
        */}
        <ChartCard
          title="Orders"
          mainValue="$7.1M"
          mainSubtitle="YTD"
          data={ordersChartMonthlyData}
        />

        <SplitStatCard
          title="Opportunities"
          variant="text"
          items={oppsData}
        />

        <FooterInfo />
      </main>
    </div>
  );
};

export default IndexPage;
