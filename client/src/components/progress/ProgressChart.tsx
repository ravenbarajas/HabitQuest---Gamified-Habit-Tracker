import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from "recharts";
import { getCompletions } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface ProgressChartProps {
  habitId: number;
}

interface MonthData {
  name: string;
  rate: number;
  streak: number;
}

const ProgressChart = ({ habitId }: ProgressChartProps) => {
  const [data, setData] = useState<MonthData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Get all completions
      const allCompletions = getCompletions();
      const habitCompletions = allCompletions.filter(c => c.habitId === habitId);
      
      // Get data for the last 6 months
      const result: MonthData[] = [];
      const today = new Date();
      
      for (let i = 5; i >= 0; i--) {
        // Calculate month
        const monthDate = new Date(today.getFullYear(), today.getMonth() - i, 1);
        const monthYear = monthDate.getFullYear();
        const monthIndex = monthDate.getMonth();
        
        // Count days in month
        const daysInMonth = new Date(monthYear, monthIndex + 1, 0).getDate();
        
        // Count completions in this month
        let completedCount = 0;
        let maxStreak = 0;
        let currentStreak = 0;
        
        for (let day = 1; day <= daysInMonth; day++) {
          const date = new Date(monthYear, monthIndex, day);
          // Skip future dates
          if (date > today) break;
          
          const dayStr = date.toISOString().split('T')[0];
          
          const wasCompleted = habitCompletions.some(
            c => c.completionDate.startsWith(dayStr)
          );
          
          if (wasCompleted) {
            completedCount++;
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
          } else {
            currentStreak = 0;
          }
        }
        
        // Calculate completion rate
        const rate = Math.round((completedCount / daysInMonth) * 100);
        
        const monthName = monthDate.toLocaleString('default', { month: 'short' });
        
        result.push({
          name: monthName,
          rate: rate,
          streak: maxStreak
        });
      }
      
      setData(result);
    } catch (error) {
      console.error("Failed to load progress chart data:", error);
      toast({
        title: "Error",
        description: "Failed to load progress trends data",
        variant: "destructive"
      });
    }
  }, [habitId, toast]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-neutral-200">
          <p className="font-medium">{label}</p>
          <p className="text-sm text-primary-600">
            Completion Rate: {payload[0].value}%
          </p>
          <p className="text-sm text-accent-500">
            Max Streak: {payload[1].value} days
          </p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" domain={[0, 100]} />
        <YAxis yAxisId="right" orientation="right" domain={[0, 'dataMax + 2']} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <ReferenceLine yAxisId="left" y={80} stroke="#00B894" strokeDasharray="3 3" />
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="rate"
          name="Completion Rate %"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="streak"
          name="Max Streak"
          stroke="hsl(var(--accent))"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProgressChart;
