import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ResponsesLast24HoursChart({ responses, formId }) {
  const [hourlyCounts, setHourlyCounts] = useState([]);

  useEffect(() => {
    const now = new Date();
    const past24 = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const hours = Array.from({ length: 24 }, (_, i) => {
      const date = new Date(past24.getTime() + i * 60 * 60 * 1000);
      return `${date.getHours().toString().padStart(2, "0")}:00`;
    });

    const map = new Map(hours.map((h) => [h, 0]));

    responses.forEach((r) => {
      if (r.formId !== formId) return;

      const date = new Date(r.submittedAt);
      if (date >= past24 && date <= now) {
        const hour = `${date.getHours().toString().padStart(2, "0")}:00`;
        map.set(hour, (map.get(hour) || 0) + 1);
      }
    });

    const formatted = hours.map((h) => ({ hour: h, count: map.get(h) || 0 }));
    setHourlyCounts(formatted);
  }, [responses, formId]);

  const chartData = {
    labels: hourlyCounts.map((d) => d.hour),
    datasets: [
      {
        label: "Hourly (Last 24h)",
        data: hourlyCounts.map((d) => d.count),
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.1)",
        tension: 0.3,
        fill: true,
        pointRadius: 2,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { y: { beginAtZero: true, ticks: { stepSize: 1, precision: 0 } } },
        }}
      />
    </div>
  );
}
