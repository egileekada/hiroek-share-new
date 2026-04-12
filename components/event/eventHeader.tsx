"use client";

import { IEventTicket } from "@/model/event";
import { HiTicket } from "react-icons/hi2";
import { dateFormat, timeFormat } from "@/utils/dateFormat";
import { CalendarIcon2, ClockIcon, LocationIcon, TicketIcon } from "@/svg";
import { formatNumber } from "@/utils/numberFormat";

export default function EventHeader({ event, totalTickets }: any) {
    const minPrice =
        event?.ticketing?.length > 0
            ? Math.min(
                  ...event.ticketing.map((t: IEventTicket) => t.ticketPrice),
              )
            : 0;

    return (
        <div className="w-full p-4 bg-white rounded-xl font-medium shadow flex flex-col gap-2">
            <p className="font-bold text-lg text-primary">{event?.name}</p>

            <div className="flex gap-2 items-center mt-2 ">
                <LocationIcon block={true} />
                <p className="text-sm">
                    {event?.meetingLink ? "Online" : event?.address}
                </p>
            </div>

            <div className="flex gap-2 items-center">
                <CalendarIcon2 />
                <p className="text-sm">{dateFormat(event?.endTime)}</p>
                <ClockIcon />
                <p className="text-sm">{timeFormat(event?.endTime)}</p>
            </div>

            {event?.ticketing?.length > 0 && (
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <TicketIcon />
                        <p className="text-sm font-semibold">
                            {totalTickets === 0
                                ? "Sold Out"
                                : "Ticket Available"}
                        </p>
                    </div>

                    <div className="flex gap-2 items-center">
                        <HiTicket />
                        <p className="text-sm font-semibold">
                            {minPrice === 0
                                ? "Free"
                                : formatNumber(minPrice / 100, event?.currency)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
