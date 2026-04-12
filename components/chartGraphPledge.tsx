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

export default function ChartGraphPledge() {
    const { event } = useEventDetail((state) => state);

    // Safe defaults in case values are undefined
    const totalPledged = event?.eventPledge?.totalPledgedAmount ?? 0;
    const minPledge = event?.eventPledge?.minimumPledge ?? 0;

    const pledgedAmount = totalPledged / 100;
    const remainingAmount = Math.max(minPledge / 100 - pledgedAmount, 0);

    const data = {
        labels: ["Donated", "Remaining"],
        datasets: [
            {
                label: "Donation",
                data: [pledgedAmount, remainingAmount],
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
                display: false, // No legend
            },
        },
    };

    // Optional: center text plugin
    const centerTextPlugin: Plugin<"doughnut"> = {
        id: "centerText",
        beforeDraw: (chart) => {
            const { width, height, ctx } = chart;
            if (!ctx) return;

            ctx.save();
            const fontSize = (height / 160).toFixed(2);
            ctx.font = `${fontSize}em sans-serif`;
            ctx.textBaseline = "middle";

            const text = `$${pledgedAmount.toLocaleString()}`;
            const textX = Math.round((width - ctx.measureText(text).width) / 2);
            const textY = height / 2;

            ctx.fillStyle = "#37137F";
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
