import { IoChevronBack } from "react-icons/io5";
import CustomButton from "../shared/customButton";
import { formatNumber } from "../../utils/numberFormat";
import { textLimit } from "../../utils/textlimit";
import type { IEvent } from "../../model/event";

export default function TicketPreviewTab({
    event,
    user,
    totalPrices,
    serviceFees,
    totalTickets,
    payload,
    payForTicket,
    payForTicketFree,
    handleSubmit,
    setTab,
}: {
    event: IEvent;
    user: any;
    totalPrices: number;
    serviceFees: number;
    totalTickets: number;
    payload: { numberOfTickets: number; ticketTypeId: string }[];
    payForTicket: any;
    payForTicketFree: any;
    handleSubmit: () => void;
    setTab: (tab: number) => void;
}) {
    return (
        <div className="w-full flex flex-col gap-4 text-pr items-center">
            <div className="pb-2 w-full flex gap-2 justify-center border-b border-[#E8E8E8]">
                <button onClick={() => setTab(2)}>
                    <IoChevronBack size="20px" />
                </button>
                <p className="text-xl font-black text-primary">Ticket Purchase Preview</p>
            </div>

            <div className="w-full flex flex-col px-3 gap-3 text-sm">
                <div className="w-full flex justify-between gap-4">
                    <p className="font-semibold">Full Name</p>
                    <p className=" font-medium " >{textLimit(user?.fullname, 30)}</p>
                </div>
                <div className="w-full flex justify-between gap-4">
                    <p className="font-semibold">Email</p>
                    <p className=" font-medium " >{textLimit(user?.email, 30)}</p>
                </div>
                <div className="w-full flex justify-between gap-4">
                    <p className="font-semibold">Phone Number</p>
                    <p className=" font-medium " >{user?.phone}</p>
                </div>
                <div className="w-full flex justify-between gap-4">
                    <p className="font-semibold">Event Name</p>
                    <p className=" font-medium " >{textLimit(event?.name, 30)}</p>
                </div>
                <div className="w-full flex justify-between gap-4">
                    <p className="font-semibold">Number of Ticket</p>
                    <p className=" font-medium " >{formatNumber(totalTickets)}</p>
                </div>
            </div>

            <div className="w-full p-4 bg-[#37137F1A] rounded-2xl flex flex-col">
                <div className="grid grid-cols-2 text-primary gap-3 w-full mt-1">
                    <p className="text-sm font-bold">Ticket Price</p>
                    <p className="font-black text-right">{formatNumber(totalPrices, event?.currency as any)}</p>
                    <p className="text-sm font-bold">Service Fee</p>
                    <p className="font-black text-right">{formatNumber(totalPrices > 0 ? serviceFees : 0, event?.currency as any)}</p>
                    <p className="text-sm font-bold">Total</p>
                    <p className="font-black text-right">
                        {formatNumber(totalPrices > 0 ? totalPrices + serviceFees : totalPrices, event?.currency as any)}
                    </p>
                </div>
            </div>

            <div className="w-full flex items-center border-t justify-between border-[#E8E8E8]">
                <CustomButton
                    loading={payForTicket?.isLoading || payForTicketFree?.isLoading}
                    isDisabled={payload.length === 0 || payForTicket?.isLoading || payForTicketFree?.isLoading}
                    onClick={handleSubmit}
                    rounded="44px"
                    height="50px"
                >
                    Get Ticket (s)
                </CustomButton>
            </div>
        </div>
    );
}
