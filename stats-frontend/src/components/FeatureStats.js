// src/components/FeatureStats.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';

const FeatureStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    // Fetch the stats from your backend
    fetch('http://localhost:3000/stats/feature-usage')
      .then((res) => res.json())
      .then((data) => setStats(data));
  }, []);

  const data = {
    labels: stats.map((stat) => stat._id),
    datasets: [
      {
        label: 'Feature Usage Count',
        data: stats.map((stat) => stat.count),
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Feature Usage Statistics</h2>
      <Bar data={data} />
    </div>
  );
};

export default FeatureStats;
