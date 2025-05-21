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

interface WeekViewProps {
  habitId: number;
}

interface DayData {
  name: string;
  completed: number;
  date: string;
}

const WeekView = ({ habitId }: WeekViewProps) => {
  const [data, setData] = useState<DayData[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      // Get all completions
      const allCompletions = getCompletions();
      
      // Get dates for the last 7 days
      const result: DayData[] = [];
      const today = new Date();
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dayStr = date.toISOString().split('T')[0];
        
        // Check if this habit was completed on this day
        const wasCompleted = allCompletions.some(
          c => c.habitId === habitId && c.completionDate.startsWith(dayStr)
        ) ? 1 : 0;
        
        result.push({
          name: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
          completed: wasCompleted,
          date: dayStr
        });
      }
      
      setData(result);
    } catch (error) {
      console.error("Failed to load weekly data:", error);
      toast({
        title: "Error",
        description: "Failed to load weekly progress data",
        variant: "destructive"
      });
    }
  }, [habitId, toast]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const dateObj = new Date(payload[0].payload.date);
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(dateObj);
      
      return (
        <div className="bg-white p-3 rounded-md shadow-lg border border-neutral-200">
          <p className="font-medium">{formattedDate}</p>
          <p className="text-sm text-neutral-600">
            Status: {payload[0].value === 1 ? 'Completed' : 'Not Completed'}
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
        <YAxis 
          domain={[0, 1]} 
          ticks={[0, 1]} 
          tickFormatter={(value) => value === 1 ? 'Completed' : 'Missed'} 
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Bar
          dataKey="completed"
          name="Completion Status"
          fill="hsl(var(--primary))"
          barSize={40}
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default WeekView;
