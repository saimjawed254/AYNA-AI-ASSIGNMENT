import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ResponsesPerDayChart({ responses, formId }) {
  const [dailyCounts, setDailyCounts] = useState([]);

  useEffect(() => {
    const map = new Map();

    responses.forEach((r) => {
      if (r.formId !== formId) return;

      const date = new Date(r.submittedAt).toISOString().split("T")[0];
      map.set(date, (map.get(date) || 0) + 1);
    });

    const formatted = Array.from(map.entries()).sort().map(([date, count]) => ({
      date,
      count,
    }));

    setDailyCounts(formatted);
  }, [responses, formId]);

  const chartData = {
    labels: dailyCounts.map((d) => d.date),
    datasets: [
      {
        label: "Daily Responses",
        data: dailyCounts.map((d) => d.count),
        borderColor: "#007bff",
        backgroundColor: "rgba(0,123,255,0.1)",
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
