"use client";
import CustomButton from "@/components/shared/customButton";
import ModalLayout from "@/components/shared/modalLayout";
import useAuth from "@/hooks/useAuth";
import useGetEventData from "@/hooks/useGetEventData";
import { useEventByUserId } from "@/hooks/useGetUserData";
import { formatNumber } from "@/utils/numberFormat";
import { textLimit } from "@/utils/textlimit";
import { useEffect, useState } from "react";
import { IoChevronBack } from "react-icons/io5";

export default function PolicyPage() {
    const { isLoading, data: event } = useGetEventData();

    const  { data } = useEventByUserId()

    console.log(data);
    

    const [isOpen, setIsOpen] = useState(true);
    const [tab, setTab] = useState(1);
    const userId = localStorage.getItem("userId");
    const { user, userDataMutation } = useAuth();

    // Fetch user data on mount if userId exists
    useEffect(() => {
        if (!userId) return;
        userDataMutation?.mutate(userId);
    }, [userId]); 

    const policy = [
        {
            title: "Privacy Policy",
            description:
                "The event organiser is legally responsible for informing ticket buyers and attendees how their personal data is collected and used. Please contact the organiser directly to request this information.",
        },
        {
            title: "Refund Policy",
            description:
                "You may request a refund within 7 days of purchase. After this period, tickets become non-refundable. Approved refunds will be processed back to the original payment method. Additional terms may apply based on the event organiser's policy.",
        },
        {
            title: "Event Cancellation Policy (After 7-Day Window)",
            description:
                "If an event is cancelled after the 7-day refund period has passed, you will be issued a voucher equal to the value of your ticket. This voucher can be used toward any of our future events and is valid for 12 months from the date of issue.",
        },
    ];

    const nonrefundPolicy = [
        {
            title: "Privacy Policy",
            description:
                "The event organiser is legally responsible for informing ticket buyers and attendees how their personal data is collected and used. Please contact the organiser directly to request this information.",
        },
        {
            title: "No-Refund Policy",
            description:
                "All ticket purchases are final and non-refundable. Please review event details carefully before completing your purchase.",
        },
        {
            title: "No-Refund Event Cancellation Policy",
            description:
                "If an event is designated as no refund and is subsequently cancelled, a refund may be issued at the sole discretion of the event host. Refunds are not guaranteed.",
        },
    ];

    return (
        <div className=" w-full flex flex-col h-screen p-4 gap-10">
            <div className=" flex  ">
                <button className=" w-11 h-11 bg-foreground flex justify-center items-center rounded-2xl text-white ">
                    <IoChevronBack />
                </button>
            </div>
            <div className=" w-full flex flex-col gap-6 ">
                {policy.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="  text-sm flex flex-col gap-2 "
                        >
                            <p className=" font-bold  ">{item?.title}</p>
                            <p className=" font-medium text-black  ">
                                {item?.description}
                            </p>
                        </div>
                    );
                })}
            </div>
            <div className=" flex justify-end mt-auto ">
                <button
                    onClick={() => setIsOpen(true)}
                    className=" font-bold text-foreground "
                >
                    Refund Request
                </button>
            </div>
            <ModalLayout open={isOpen} setOpen={setIsOpen}>
                {tab === 0 && (
                    <div className=" flex w-full flex-col gap-7 ">
                        <p className=" font-bold text-center text-foreground ">
                            Are you sure you want <br /> to request for this
                            refund?
                        </p>
                        <div className=" w-full font-bold flex justify-around items-center ">
                            <button className=" text-[#23B33A] ">Yes</button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className=" text-[#EE3124] "
                            >
                                No
                            </button>
                        </div>
                    </div>
                )}
                {tab === 1 && (
                    <div className=" flex w-full flex-col gap-8 overflow-x-hidden ">
                        <p className=" font-bold text-center text-xl text-foreground ">
                            Ticket Refund Preview
                        </p>
                        <div className=" w-full flex flex-col gap-4 ">
                            {/* <div className=" w-full! grid grid-cols-2 text-sm text-black font-semibold gap-3 ">
                                <p>Full Name</p>
                                <p className=" text-right ">Fredd</p>
                                <p>Email</p>
                                <p className=" text-right ">
                                    example@gmail.com
                                </p>
                                <p>Phone Number</p>
                                <p className=" text-right ">+345566566</p>
                                <p>Event Name</p>
                                <p className=" text-right ">Test</p>
                                <p>Noumber Of Tickets</p>
                                <p className=" text-right ">1</p>
                            </div> */}

                            <div className="w-full flex flex-col text-black gap-4 text-sm">
                                <div className="w-full flex justify-between gap-4">
                                    <p className="font-semibold">Full Name</p>
                                    <p className=" font-medium ">
                                        {textLimit(user?.fullname, 30)}
                                    </p>
                                </div>
                                <div className="w-full flex justify-between gap-4">
                                    <p className="font-semibold">Email</p>
                                    <p className=" font-medium ">
                                        {textLimit(user?.email, 30)}
                                    </p>
                                </div>
                                <div className="w-full flex justify-between gap-4">
                                    <p className="font-semibold">
                                        Phone Number
                                    </p>
                                    <p className=" font-medium ">
                                        {user?.phone}
                                    </p>
                                </div>
                                <div className="w-full flex justify-between gap-4">
                                    <p className="font-semibold">Event Name</p>
                                    <p className=" font-medium capitalize ">
                                        {textLimit(event?.name+"", 30)}
                                    </p>
                                </div>
                                <div className="w-full flex justify-between gap-4">
                                    <p className="font-semibold">
                                        Number of Ticket
                                    </p>
                                    <p className=" font-medium ">
                                        {formatNumber(1)}
                                    </p>
                                </div>
                            </div>
                            <div className=" w-full col-span-12 text-foreground rounded-lg font-bold flex justify-between bg-[#37137F1A] p-2 ">
                                <p>Ticket Price</p>
                                <p className=" text-right ">$7</p>
                            </div>
                        </div>
                        <div className=" pt-4 w-full border-t">
                            <CustomButton rounded="999px">Proceed</CustomButton>
                        </div>
                    </div>
                )}
            </ModalLayout>
        </div>
    );
}
