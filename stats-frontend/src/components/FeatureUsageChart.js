import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const FeatureUsageChart = () => {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/stats/feature-usage");
                const data = await response.json();

                const labels = data.map(item => item._id); // Feature names
                const values = data.map(item => item.count); // Interaction counts

                setChartData({
                    labels: labels,
                    datasets: [
                        {
                            label: "Feature Usage Count",
                            data: values,
                            backgroundColor: "rgba(75, 192, 192, 0.2)",
                            borderColor: "rgba(75, 192, 192, 1)",
                            borderWidth: 1
                        }
                    ]
                });
            } catch (error) {
                console.error("Error fetching feature usage data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div>
            <h2>Feature Usage</h2>
            <Bar data={chartData} />
        </div>
    );
};

export default FeatureUsageChart;
