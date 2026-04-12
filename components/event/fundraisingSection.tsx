"use client";

import { formatNumber } from "@/utils/numberFormat";
import ChartGraph from "../chartGraph";

export default function FundraisingSection({ event }: any) {
    if (!event?.fundRaiser?.fundRaisingGoal) return null;

    return (
        <div className="flex flex-col items-center gap-2">
            <p className="font-bold">Fundraising Goal</p>

            <ChartGraph />

            <p className="text-sm">
                Donated: {formatNumber(event?.fundRaiser?.fundRaised / 100)}
            </p>
        </div>
    );
}
