"use client";

import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    ChartOptions,
    Plugin,
} from "chart.js";
import { useEventDetail } from "../global/useEventDetails";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export default function ChartGraph() {
    const { event } = useEventDetail((state) => state);

    const fundRaised = event?.fundRaiser?.fundRaised ?? 0;
    const fundGoal = event?.fundRaiser?.fundRaisingGoal ?? 0;
    const remaining = fundGoal - fundRaised;

    const data = {
        labels: ["Donated", "Remaining"],
        datasets: [
            {
                label: "Donation",
                data: [fundRaised, remaining],
                backgroundColor: ["#37137F", "#37137F26"],
                circumference: 180,
                rotation: 270,
            },
        ],
    };

    const options: ChartOptions<"doughnut"> = {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "80%", // Thickness of the doughnut
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
        },
    };

    // Plugin to show percentage in the center
    const centerTextPlugin: Plugin<"doughnut"> = {
        id: "centerText",
        beforeDraw: (chart) => {
            const { width, height, ctx } = chart;
            if (!ctx) return;

            const dataset = chart.data.datasets[0].data;
            const sum = dataset.reduce((acc, value) => acc + Number(value), 0);
            const percentage =
                sum > 0 ? ((Number(dataset[0]) / sum) * 100).toFixed(1) : "0";

            ctx.save();
            const fontSize = (height / 160).toFixed(2);
            ctx.font = `${fontSize}em sans-serif`;
            ctx.textBaseline = "middle";

            const text = `${percentage}%`;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;

            ctx.fillStyle = "#37137F"; // Ensure text color is visible
            ctx.fillText(text, textX, textY);
            ctx.restore();
        },
    };

    return (
        <div className="w-full flex justify-center text-primary py-8">
            <Doughnut
                data={data}
                options={options}
                plugins={[centerTextPlugin]}
            />
        </div>
    );
}
