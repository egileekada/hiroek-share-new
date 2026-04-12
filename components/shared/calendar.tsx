"use client";

import React, { useState } from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";

interface Props {
    value?: Date;
    onSelect?: (date: Date) => void;
    label?: string;
    minYear?: number;
    maxYear?: number;
    disabled?: boolean;
}

const MONTHS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

export default function SmartCalendar({
    value,
    onSelect,
    label,
    minYear = 2000,
    maxYear = new Date().getFullYear() + 5,
    disabled = false,
}: Props) {
    const currentYear = new Date().getFullYear();
    const [year, setYear] = useState(value?.getFullYear() ?? currentYear);

    const isSelectedMonth = (monthIndex: number) =>
        value &&
        value.getMonth() === monthIndex &&
        value.getFullYear() === year;

    const handleSelect = (monthIndex: number) => {
        if (disabled) return;
        onSelect?.(new Date(year, monthIndex, 1));
    };

    const canGoPrev = year > minYear;
    const canGoNext = year < maxYear;

    return (
        <div className="w-full max-w-sm flex flex-col gap-3">
            {label && (
                <label className="text-sm font-medium text-center text-gray-700">
                    {label}
                </label>
            )}

            {/* Year Navigation */}
            <div className="flex items-center justify-between px-2">
                <button
                    type="button"
                    disabled={!canGoPrev || disabled}
                    onClick={() => setYear((y) => y - 1)}
                    className="border rounded px-2 py-1 text-sm disabled:opacity-40"
                >
                    <IoChevronBack />
                </button>

                <span className="font-medium text-gray-800">{year}</span>

                <button
                    type="button"
                    disabled={!canGoNext || disabled}
                    onClick={() => setYear((y) => y + 1)}
                    className="border rounded px-2 py-1 text-sm disabled:opacity-40"
                >
                    <IoChevronForward />
                </button>
            </div>

            {/* Months */}
            <div className="grid grid-cols-3 gap-3 rounded-lg border bg-white p-4 shadow-sm">
                {MONTHS.map((month, index) => {
                    const selected = isSelectedMonth(index);

                    return (
                        <button
                            key={month}
                            type="button"
                            disabled={disabled}
                            onClick={() => handleSelect(index)}
                            className={`
                rounded-md px-3 py-2 text-sm font-medium transition
                ${
                    selected
                        ? "bg-[#37137F] text-white"
                        : "bg-gray-100 hover:bg-gray-200"
                }
                ${disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
                        >
                            {month}
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
