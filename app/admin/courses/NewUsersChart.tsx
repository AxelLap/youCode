"use client";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Rectangle,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type NewUsersChartProps = {
  data: {
    date: string;
    count: number;
  }[];
};

export const NewUsersChart = ({ data }: NewUsersChartProps) => {
  return (
    <BarChart
      style={{
        width: "100%",
        maxWidth: "700px",
        maxHeight: "70vh",
        aspectRatio: 1.618,
      }}
      responsive
      data={data}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="date" />
      <YAxis width="auto" />
      <Tooltip />
      <Legend />
      <Bar
        dataKey="count"
        fill="#8884d8"
        activeBar={<Rectangle fill="pink" stroke="blue" />}
      />
    </BarChart>
  );
};
