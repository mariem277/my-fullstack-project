import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ChartComponent = () => {
    // Example data for the chart
    const data = {
        labels: ['Feature A', 'Feature B', 'Feature C', 'Feature D'],
        datasets: [
            {
                label: 'User Interactions',
                data: [12, 19, 7, 15],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Feature Usage Statistics',
            },
        },
    };

    return (
        <div style={{ width: '80%', margin: '0 auto' }}>
            <h2>User Interaction Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default ChartComponent;
