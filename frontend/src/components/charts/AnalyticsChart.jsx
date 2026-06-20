import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import EmptyState from "../common/EmptyState";

const AnalyticsChart = ({
  data,
  dataKey = "value",
  nameKey = "name",
  type = "bar",
  height = 260,
}) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <EmptyState title="No chart data yet" />;
  }

  const Chart = type === "line" ? LineChart : BarChart;

  return (
    <div style={{ width: "100%", height }}>
      <ResponsiveContainer>
        <Chart data={data} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
          <XAxis dataKey={nameKey} tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} allowDecimals />
          <Tooltip
            contentStyle={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--text)",
            }}
          />
          {type === "line" ? (
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke="var(--primary)"
              strokeWidth={3}
              dot={{ r: 4, fill: "var(--primary)" }}
            />
          ) : (
            <Bar dataKey={dataKey} fill="var(--primary)" radius={[6, 6, 0, 0]} />
          )}
        </Chart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;
