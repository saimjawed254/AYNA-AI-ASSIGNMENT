import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ActivityLineChart() {
  const { token } = useAuth();
  const [dailyData, setDailyData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get("/responses/all-dates", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const raw = res.data;

        const map = new Map();
        raw.forEach(({ submittedAt }) => {
          const date = new Date(submittedAt).toISOString().split("T")[0]; // YYYY-MM-DD
          map.set(date, (map.get(date) || 0) + 1);
        });

        const formatted = Array.from(map.entries()).sort().map(([date, count]) => ({
          date,
          count,
        }));

        setDailyData(formatted);
      } catch (err) {
        console.error("Chart load error:", err);
      }
    };

    fetchData();
  }, [token]);

  const chartData = {
    labels: dailyData.map(d => d.date),
    datasets: [
      {
        label: "Responses per Day",
        data: dailyData.map(d => d.count),
        borderColor: "#007bff",
        backgroundColor: "rgba(0,123,255,0.1)",
        tension: 0.3,
        pointRadius: 2,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // allow stretch
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          precision: 0,
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: "100%", padding: "1rem" }}>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
}
