import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function App() {
  const [featureStats, setFeatureStats] = useState([]);
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const featureResponse = await fetch('http://localhost:3000/stats/feature-usage');
        const featureData = await featureResponse.json();
        setFeatureStats(featureData);

        const userResponse = await fetch('http://localhost:3000/stats/user-interactions');
        const userData = await userResponse.json();
        setUserStats(userData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const featureChartData = {
    labels: featureStats.map((stat) => stat._id),
    datasets: [
      {
        label: 'Feature Usage',
        data: featureStats.map((stat) => stat.count),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const userChartData = {
    labels: userStats.map((stat) => stat._id),
    datasets: [
      {
        label: 'User Interactions',
        data: userStats.map((stat) => stat.count),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 10,
          },
        },
      },
      title: {
        display: true,
        text: 'Chart Overview',
        font: {
          size: 14,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
    },
  };

  return (
    <div className="App" style={{ padding: '20px' }}>
      <h1>Data Detective: Stats Overview</h1>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}
      >
        <div style={{ width: '45%', height: '300px' }}>
          <h2>Feature Usage</h2>
          <Line data={featureChartData} options={chartOptions} />
        </div>

        <div style={{ width: '45%', height: '300px' }}>
          <h2>User Interactions</h2>
          <Line data={userChartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
}

export default App;
