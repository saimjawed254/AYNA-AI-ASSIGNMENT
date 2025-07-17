import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
import { useEffect, useState } from "react";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function Last24HoursChart() {
  const { token } = useAuth();
  const [hourlyData, setHourlyData] = useState([]);

  useEffect(() => {
    const fetchHourly = async () => {
      try {
        const res = await api.get("/responses/all-dates", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const now = new Date();
        const past24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

        // Init 24-hour slots: [ "15:00", "16:00", ..., "14:00" ]
        const hours = Array.from({ length: 24 }, (_, i) => {
          const date = new Date(past24Hours.getTime() + i * 60 * 60 * 1000);
          return `${date.getHours().toString().padStart(2, "0")}:00`;
        });

        const hourMap = new Map(hours.map((h) => [h, 0]));

        res.data.forEach(({ submittedAt }) => {
          const date = new Date(submittedAt);
          if (date >= past24Hours && date <= now) {
            const hour = `${date.getHours().toString().padStart(2, "0")}:00`;
            hourMap.set(hour, (hourMap.get(hour) || 0) + 1);
          }
        });

        const final = hours.map((h) => ({ hour: h, count: hourMap.get(h) || 0 }));
        setHourlyData(final);
      } catch (err) {
        console.error("Error loading hourly data", err);
      }
    };

    fetchHourly();
  }, [token]);

  const data = {
    labels: hourlyData.map((d) => d.hour),
    datasets: [
      {
        label: "Responses (Last 24h)",
        data: hourlyData.map((d) => d.count),
        borderColor: "#28a745",
        backgroundColor: "rgba(40, 167, 69, 0.1)",
        tension: 0.3,
        pointRadius: 2,
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
      <Line data={data} options={options} />
    </div>
  );
}
