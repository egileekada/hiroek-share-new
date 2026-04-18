import { AiOutlineMinusCircle } from "react-icons/ai";
import { IoMdAddCircleOutline } from "react-icons/io";
import CustomButton from "../shared/customButton";
import { formatNumber } from "../../utils/numberFormat";
import { dateFormat } from "../../utils/dateFormat";
import type { IEvent } from "../../model/event";
import { IUserDetail } from "@/model/user";
import { useEffect, useState } from "react";

export default function TicketSelectionTab({
    event,
    payload,
    user,
    totalPrices,
    serviceFees,
    payForTicket,
    payForTicketFree,
    getTicketCount,
    updateTicket,
    handlePreview,
    handleDiscount,
    discountData,
    isLoading,
}: {
    event: IEvent;
    user: IUserDetail;
    payload: { numberOfTickets: number; ticketTypeId: string }[];
    totalPrices: number;
    serviceFees: number;
    payForTicket: any;
    payForTicketFree: any;
    getTicketCount: (id: string) => number;
    updateTicket: (id: string, action: "add" | "remove") => void;
    handlePreview: () => void;
    handleDiscount: (code: string, amount: string) => void;
    isLoading: boolean;
    discountData: any;
}) {

    const [code, setCode] = useState("");
    const [discountPerctage, setDiscountPerctage] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);

    useEffect(() => {
        if (discountData?.data?.discount) {
            const perct =
                (discountData?.data?.discount / 100 / totalPrices) * 100;
            setDiscountPerctage(perct);
            setDiscountPrice(discountData?.data?.discount / 100);
        }
    }, [discountData?.data?.discount]);

    return (
        <div className="w-full flex flex-col gap-4 items-center text-foreground ">
            <div className="pb-2 w-full flex flex-col border-b border-[#E8E8E8]">
                <p className="text-xl font-black text-primary capitalize ">
                    {event?.name}
                </p>
                <p className="text-xs font-bold">
                    {dateFormat(event?.endTime)}
                </p>
                <p className="text-xs font-semibold">{event?.address}</p>
            </div>

            <div className="w-full flex flex-col max-h-[55vh] gap-4 overflow-y-auto">
                {event?.ticketing?.map((item, index) => {
                    const count = getTicketCount(item._id);
                    const now = new Date();
                    const salesStarted = now >= new Date(item?.salesStartDate);
                    const salesOngoing = now < new Date(item?.salesEndDate);
                    const isSoldOut = item?.spotsLeft === 0;
                    const isUnavailable =
                        !salesStarted || !salesOngoing || isSoldOut;
                    const hasNoLimit =
                        item?.signUpLimit === 0 || !item?.signUpLimit;

                    return (
                        <div
                            key={index}
                            className="w-full border rounded-xl flex items-center justify-between gap-4 p-4"
                        >
                            <div className="flex flex-col">
                                <p className="text-xs font-semibold text-primary capitalize ">
                                    {item?.ticketType}
                                </p>
                                <p className="font-semibold text-primary">
                                    {formatNumber(
                                        item?.ticketPrice / 100,
                                        event?.currency as any,
                                    )}
                                </p>
                                <p className="text-xs font-semibold text-primary">
                                    {"Sale Ends On " +
                                        dateFormat(item?.salesEndDate)}
                                </p>
                                <p className="text-xs font-bold text-primary">
                                    Tickets Available:{" "}
                                    <span>{item?.spotsLeft}</span>
                                </p>
                            </div>

                            {isUnavailable ? (
                                <div className="w-[116px] h-[54px] text-primary px-2 flex justify-between items-center rounded-lg">
                                    <p className="text-xs font-semibold text-center">
                                        {!salesStarted
                                            ? `Sales Starts on ${dateFormat(item?.salesStartDate)}`
                                            : now >
                                                new Date(event?.eventEndDate)
                                              ? "Event Ended"
                                              : !salesOngoing
                                                ? "Sales Ended"
                                                : "Ticket Sold Out"}
                                    </p>
                                </div>
                            ) : hasNoLimit ? (
                                <div className="w-[116px] h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg">
                                    <button
                                        role="button"
                                        onClick={() =>
                                            updateTicket(item._id, "remove")
                                        }
                                    >
                                        <AiOutlineMinusCircle size="30px" />
                                    </button>
                                    <input
                                        value={count}
                                        readOnly
                                        placeholder="0"
                                        className="focus:border-0 w-[40px] outline-none font-bold text-center"
                                    />
                                    <button
                                        role="button"
                                        onClick={() =>
                                            updateTicket(item._id, "add")
                                        }
                                    >
                                        <IoMdAddCircleOutline size="30px" />
                                    </button>
                                </div>
                            ) : (
                                <div className="w-[116px] h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg">
                                    <button
                                        role="button"
                                        onClick={() =>
                                            updateTicket(item._id, "remove")
                                        }
                                    >
                                        <AiOutlineMinusCircle size="30px" />
                                    </button>
                                    <input
                                        value={count}
                                        readOnly
                                        placeholder="0"
                                        className="focus:border-0 w-[40px] outline-none text-center"
                                    />
                                    <button
                                        role="button"
                                        disabled={
                                            item?.spotsLeft !== null &&
                                            item?.spotsLeft <= count
                                        }
                                        onClick={() =>
                                            updateTicket(item._id, "add")
                                        }
                                    >
                                        <IoMdAddCircleOutline size="30px" />
                                    </button>
                                </div>
                            )}
                        </div>
                    );
                })}

                {totalPrices > 0 && (
                    <div className=" w-full flex items-center p-1 gap-1 border border-foreground rounded-lg ">
                        <input
                            onChange={(e) => setCode(e.target.value)}
                            value={code}
                            className=" hover:border-0 active:border-0 focus:border-0 px-2 w-full font-semibold rounded-lg h-[35px] "
                        />
                        <div className=" w-fit ">
                            <CustomButton
                                loading={isLoading}
                                onClick={() =>
                                    handleDiscount(code, (totalPrices * 100) + "")
                                }
                                isDisabled={code ? false : true}
                                fontSize="12px"
                                height="35px"
                            >
                                Apply Promo/Voucher Code
                            </CustomButton>
                        </div>
                    </div>
                )}

                <div className="w-full p-4 bg-[#37137F1A] rounded-2xl flex flex-col">
                    <div className="grid grid-cols-2 text-primary gap-3 w-full mt-1">
                        <p className="text-sm font-bold">Ticket Price</p>
                        <p className="font-black text-right">
                            {formatNumber(totalPrices, event?.currency as any)}
                        </p>
                        <p
                            className={` ${discountPrice > 0 ? "" : "hidden"} text-sm font-bold `}
                        >
                            Discount(%)
                        </p>
                        <p
                            className={` ${discountPrice > 0 ? "" : "hidden"} font-black text-right `}
                        >
                            {formatNumber(discountPerctage)}
                        </p>
                        <p
                            className={` ${discountPrice > 0 ? "" : "hidden"} text-sm font-bold `}
                        >
                            Discount Prize
                        </p>
                        <p
                            className={` ${discountPrice > 0 ? "" : "hidden"} font-black text-right `}
                        >
                            {formatNumber(
                                discountPrice,
                                event?.currency as any,
                            )}
                        </p>
                        <p className="text-sm font-bold">Service Fee</p>
                        <p className="font-black text-right">
                            {formatNumber(
                                totalPrices > 0 ? serviceFees : 0,
                                event?.currency as any,
                            )}
                        </p>
                        <p className="text-sm font-bold">Total</p>
                        <p className="font-black text-right">
                            {formatNumber(
                                discountPrice > 0
                                    ? discountPrice + serviceFees
                                    : totalPrices > 0
                                      ? totalPrices + serviceFees
                                      : totalPrices,
                                event?.currency as any,
                            )}
                        </p>
                    </div>
                </div>
                {user?.fullname && (
                    <div className=" w-full py-4 flex flex-col items-center text-center gap-2  ">
                        <p className=" font-bold text-foreground ">
                            Signed In As
                        </p>
                        <div className=" flex flex-col text-black ">
                            <p className=" font-semibold ">{user?.fullname}</p>
                            <p className=" font-semibold ">{user?.phone}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full flex items-center border-t justify-between border-[#E8E8E8]">
                <CustomButton
                    loading={
                        payForTicket?.isLoading || payForTicketFree?.isLoading
                    }
                    isDisabled={
                        payload.length === 0 ||
                        payForTicket?.isLoading ||
                        payForTicketFree?.isLoading
                    }
                    onClick={handlePreview}
                    rounded="44px"
                    height="50px"
                >
                    Get Ticket (s)
                </CustomButton>
            </div>
        </div>
    );
}
