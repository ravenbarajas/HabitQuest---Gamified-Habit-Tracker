import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { getCompletions } from "@/lib/storage";
import { useToast } from "@/hooks/use-toast";

interface MonthViewProps {
  habitId: number;
}

interface WeekData {
  name: string;
  completed: number;
  missed: number;
  range: string;
}

const MonthView = ({ habitId }: MonthViewProps) => {
  const [data, setData] = useState<WeekData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Get all completions
      const allCompletions = getCompletions();
      const habitCompletions = allCompletions.filter(c => c.habitId === habitId);
      
      // Get data for the last 4 weeks
      const result: WeekData[] = [];
      const today = new Date();
      
      for (let i = 3; i >= 0; i--) {
        // Calculate start and end of week
        const endDate = new Date(today);
        endDate.setDate(today.getDate() - (i * 7));
        
        const startDate = new Date(endDate);
        startDate.setDate(endDate.getDate() - 6);
        
        // Format date strings for comparison
        const startStr = startDate.toISOString().split('T')[0];
        const endStr = endDate.toISOString().split('T')[0];
        
        // Count completions in this date range
        let completedCount = 0;
        
        for (let j = 0; j < 7; j++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + j);
          const dayStr = date.toISOString().split('T')[0];
          
          const wasCompleted = habitCompletions.some(
            c => c.completionDate.startsWith(dayStr)
          );
          
          if (wasCompleted) {
            completedCount++;
          }
        }
        
        // Format week label
        const startMonth = startDate.toLocaleString('default', { month: 'short' });
        const startDay = startDate.getDate();
        const endMonth = endDate.toLocaleString('default', { month: 'short' });
        const endDay = endDate.getDate();
        
        const weekLabel = i === 0 
          ? "This Week" 
          : i === 1 
          ? "Last Week"
          : `${startMonth} ${startDay}-${endMonth} ${endDay}`;
        
        result.push({
          name: weekLabel,
          completed: completedCount,
          missed: 7 - completedCount,
          range: `${startStr} to ${endStr}`
        });
      }
      
      setData(result);
    } catch (error) {
      console.error("Failed to load monthly data:", error);
      toast({
        title: "Error",
        description: "Failed to load monthly progress data",
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
            Completed: {payload[0].value} days
          </p>
          <p className="text-sm text-neutral-600">
            Missed: {payload[1].value} days
          </p>
          <p className="text-xs text-neutral-500 mt-1">
            {payload[0].payload.range}
          </p>
        </div>
      );
    }
    
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="name" />
        <YAxis domain={[0, 7]} ticks={[0, 1, 2, 3, 4, 5, 6, 7]} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="completed"
          name="Days Completed"
          stackId="a"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="missed"
          name="Days Missed"
          stackId="a"
          fill="hsl(var(--muted))"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default MonthView;
