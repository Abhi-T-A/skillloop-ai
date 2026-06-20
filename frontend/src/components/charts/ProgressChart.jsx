import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";

import { formatScore, scoreToPercent } from "../../utils/helpers";

const ProgressChart = ({ score = 0, label = "Average score" }) => {
  const percent = scoreToPercent(score);
  const data = [{ name: label, value: percent, fill: "var(--primary)" }];

  return (
    <div className="progress-chart" aria-label={`${label}: ${formatScore(percent, "%")}`}>
      <ResponsiveContainer width="100%" height={220}>
        <RadialBarChart
          innerRadius="72%"
          outerRadius="96%"
          data={data}
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar dataKey="value" cornerRadius={8} background />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="progress-chart-center">
        <strong>{formatScore(percent, "%")}</strong>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default ProgressChart;
