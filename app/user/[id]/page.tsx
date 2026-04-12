"use client";

import Image from "next/image";
import { HiClock, HiMiniMapPin, HiTicket } from "react-icons/hi2";
import { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";

import SmartCalendar from "../../../components/shared/calendar";
import LoadingAnimation from "../../../components/loadingAnimation";
import ModalLayout from "../../../components/shared/modalLayout";

import {
    useCurrentUser,
    useEventDataByDate,
    useUserData,
} from "../../../hooks/useGetUserData";

import { dateFormat } from "../../../utils/dateFormat";
import { textLimit } from "../../../utils/textlimit";
import { formatNumber } from "../../../utils/numberFormat";

import type { IEvent, IEventTicket } from "../../../model/event";

export default function UserId() {
    const { data, isLoading } = useUserData();

    const {
        data: dateEvent,
        isLoading: loading,
        month,
        setMonth,
        setInternalId,
        showModal,
        setShowModal,
    } = useEventDataByDate();

    const [showBio, setShowBio] = useState(false);
    const [showImg, setShowImg] = useState(false);

    /* ✅ FIXED dependency */
    useEffect(() => {
        if (data?._id) setInternalId(data._id);
    }, [data?._id]);

    const paragraphs = useMemo(
        () => data?.bio?.split(/\n\s*\n/).filter(Boolean) || [],
        [data?.bio],
    );

    const handleDateClick = (date: Date) => {
        setMonth(new Date(date));
        setShowModal(true);
    };

    return (
        <LoadingAnimation loading={isLoading}>
            <div className="w-full flex text-foreground flex-col items-center overflow-y-auto pb-6">
                <div className="w-full max-w-[500px] bg-[#37137F] rounded-b-4xl shadow flex flex-col gap-4">
                    {/* HEADER */}
                    <div className="flex justify-center pt-6">
                        <div
                            onClick={() => setShowImg(true)}
                            className="relative w-24 h-24 cursor-pointer"
                        >
                            {data?.logo && (
                                <Image
                                    src={data.logo}
                                    alt="logo"
                                    fill
                                    className="rounded-2xl object-cover"
                                />
                            )}
                        </div>
                    </div>

                    {/* CONTENT */}
                    <div className="bg-white rounded-4xl px-4 py-6 flex flex-col items-center gap-4 text-[#37137F]">
                        {/* NAME */}
                        <h1 className="text-2xl font-extrabold text-center">
                            {data?.name}
                        </h1>

                        {/* ABOUT */}
                        <section className="w-full bg-[#37137F1A] rounded-3xl p-3 shadow text-sm">
                            <div className="mx-auto mb-2 w-fit px-4 py-1 bg-[#37137F] text-white rounded-3xl font-bold">
                                About Us
                            </div>

                            <p className="text-left font-medium ">
                                {textLimit(data?.bio ?? "", 150)}
                                {data?.bio && data.bio.length > 150 && (
                                    <span
                                        onClick={() => setShowBio(true)}
                                        className="ml-1 font-bold underline cursor-pointer"
                                    >
                                        Read More
                                    </span>
                                )}
                            </p>
                        </section>

                        {/* EVENTS */}
                        <section className="w-full flex flex-col items-center gap-3">
                            <div className="bg-[#B00062] text-white px-4 py-2 rounded-lg font-bold text-sm">
                                Upcoming Events
                            </div>

                            <SmartCalendar
                                label="Select A Month & Year To View Availability"
                                value={month}
                                onSelect={handleDateClick}
                                minYear={2024}
                                maxYear={2040}
                            />
                        </section>
                    </div>
                </div>

                {/* BIO MODAL */}
                <ModalLayout
                    width="lg:max-w-[500px] w-full"
                    rounded="24px"
                    open={showBio}
                    setOpen={setShowBio}
                >
                    <div className="h-[80vh] overflow-y-auto py-4">
                        <div className="mx-auto mb-4 w-fit px-4 py-1 bg-[#37137F] text-white rounded-3xl font-bold">
                            About Us
                        </div>

                        {paragraphs.map((text, i) => (
                            <p
                                key={i}
                                className="mb-4 text-sm font-medium leading-relaxed"
                            >
                                {text}
                            </p>
                        ))}
                    </div>
                </ModalLayout>

                {/* EVENTS MODAL */}
                <ModalLayout
                    width="lg:max-w-[500px] w-full"
                    rounded="24px"
                    open={showModal}
                    setOpen={setShowModal}
                >
                    <div className="h-[80vh] flex flex-col gap-4 py-4">
                        <div className="mx-auto bg-[#B00062] text-white px-4 py-2 rounded-lg font-bold text-sm">
                            Event Schedules
                        </div>

                        {month && (
                            <p className="text-center text-sm text-gray-600">
                                {format(month, "MMMM yyyy")}
                            </p>
                        )}

                        <LoadingAnimation
                            loading={loading}
                            text="No Events Found"
                            length={Object.keys(dateEvent ?? {}).length}
                        >
                            <div className="flex flex-col gap-3 overflow-y-auto">
                                {Object.entries(dateEvent ?? {}).map(
                                    ([date, events]) =>
                                        (events as IEvent[])?.map((item) => {
                                            const minPrice =
                                                item?.ticketing?.length > 0
                                                    ? Math.min(
                                                          ...item.ticketing.map(
                                                              (
                                                                  t: IEventTicket,
                                                              ) =>
                                                                  t.ticketPrice,
                                                          ),
                                                      )
                                                    : 0;

                                            return (
                                                <a
                                                    key={item._id}
                                                    href={`/event/${item._id}?back=true`}
                                                    className="bg-[#37137F] text-white p-4 rounded-xl flex flex-col gap-1"
                                                >
                                                    <p className="text-xs font-bold">
                                                        {textLimit(
                                                            item.name,
                                                            30,
                                                        )}
                                                    </p>

                                                    <InfoRow
                                                        icon={<HiMiniMapPin />}
                                                    >
                                                        {item.meetingLink
                                                            ? "Online"
                                                            : textLimit(
                                                                  item.address,
                                                                  40,
                                                              )}
                                                    </InfoRow>

                                                    <InfoRow icon={<HiClock />}>
                                                        {dateFormat(
                                                            item.endTime,
                                                        )}
                                                    </InfoRow>

                                                    <InfoRow
                                                        icon={<HiTicket />}
                                                    >
                                                        {minPrice === 0
                                                            ? "Free"
                                                            : formatNumber(
                                                                  minPrice /
                                                                      100,
                                                                  item.currency as any,
                                                              )}
                                                    </InfoRow>
                                                </a>
                                            );
                                        }),
                                )}
                            </div>
                        </LoadingAnimation>
                    </div>
                </ModalLayout>

                {/* IMAGE MODAL */}
                <ModalLayout
                    width="max-w-[400px]"
                    rounded="24px"
                    open={showImg}
                    setOpen={setShowImg}
                >
                    <div className="relative w-full h-[300px]">
                        {data?.logo && (
                            <Image
                                src={data.logo}
                                alt="image"
                                fill
                                className="object-contain rounded-2xl"
                            />
                        )}
                    </div>
                </ModalLayout>
            </div>
        </LoadingAnimation>
    );
}

/* 🔹 Small reusable row */
function InfoRow({
    icon,
    children,
}: {
    icon: React.ReactNode;
    children: React.ReactNode;
}) {
    return (
        <div className="flex items-center gap-2 text-xs">
            {icon}
            <span>{children}</span>
        </div>
    );
}
