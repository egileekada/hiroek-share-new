"use client";

import { useState } from "react";
import useGetEventData from "../../../hooks/useGetEventData";

import LoadingAnimation from "../../../components/loadingAnimation";

import ModalLayout from "../../../components/shared/modalLayout";
import DonateForm from "../../../components/donateForm";
import EventTicketForm from "../../../components/eventTicketForm";
import ViewMap from "../../../components/shared/viewMap";
import CountdownTimer from "../../../components/countDownTimer";
import { useCurrencyData } from "@/hooks/useGetUserData";
import BottomCTA from "@/components/event/bottomCTA";
import EventDescription from "@/components/event/eventDescription";
import EventHeader from "@/components/event/eventHeader";
import FundraisingSection from "@/components/event/fundraisingSection";
import { IEvent } from "@/model/event";
import CustomImage from "@/components/shared/customImage";
import CustomButton from "@/components/shared/customButton";
import { textLimit } from "@/utils/textlimit";
import { capitalizeFLetter } from "@/utils/capitalLetter";
import { LabelText } from "@/components/shared";
import { HiChatBubbleBottomCenterText } from "react-icons/hi2";
import { useRouter } from "next/navigation";

function SharePage() {
    const { isLoading, data: event } = useGetEventData();
    const { data: currencyData } = useCurrencyData();

    const router = useRouter();
    console.log(event);

    const [openDonate, setOpenDonate] = useState(false);
    const [openTicket, setOpenTicket] = useState(false);
    const [showPartner, setShowPartner] = useState(false);
    const [showHost, setShowHost] = useState(false);
    const [showImg, setShowImg] = useState(false);
    const [showType, setShowType] = useState<string | null>(null);

    const totalTickets = event?.ticketing?.reduce(
        (sum: number, t: any) => sum + t.spotsLeft,
        0,
    );

    const handleShowType = (type: string) => {
        setShowType(type);
        setShowImg(true);
    };

    return (
        <LoadingAnimation loading={isLoading}>
            <div className=" w-full lg:h-screen relative flex lg:flex-row flex-col pb-32 gap-6 text-primary ">
                <div className=" w-full h-fit flex flex-col gap-4 lg:rounded-[44px] lg:p-8 ">
                    {/* Image */}

                    <div className=" w-full lg:h-[300px] h-[300px] relative ">
                        <CustomImage
                            src={event?.photo + ""}
                            alt="photo"
                            fillContainer
                            style={{ borderRadius: "16px" }}
                        />
                        <div className=" bg-black opacity-45 rounded-2xl absolute inset-0 " />
                    </div>

                    {/* Header */}

                    <div className=" w-full -mt-[150px] z-20 px-3  ">
                        <div className=" w-full rounded-2xl flex flex-col gap-2 ">
                            <div className=" w-full flex gap-4">
                                <div
                                    role="button"
                                    className=" w-full flex items-center justify-center gap-2 px-2 bg-[#FFFFFF4D] bg-opacity-30 rounded-[10px] h-[50px] "
                                >
                                    <div
                                        onClick={() => handleShowType("host")}
                                        className=" w-8 h-8 rounded-full "
                                    >
                                        <img
                                            className=" w-full h-full rounded-full object-cover "
                                            src={
                                                event?.admin?.photo ??
                                                event?.admin?.logo
                                            }
                                            alt="image"
                                        />
                                    </div>
                                    <div
                                        onClick={() => setShowHost(true)}
                                        className=" flex flex-col items-center justify-center "
                                    >
                                        <div className=" font-bold text-[10px] flex justify-center items-center text-white bg-[#37137FBF] rounded h-[18px] w-[75px] ">
                                            Event Host:
                                        </div>
                                        <p className=" font-bold text-[12px] text-center text-white ">
                                            {textLimit(
                                                event?.admin?.fullname
                                                    ? event?.admin?.fullname +
                                                          ""
                                                    : event?.admin?.name + "",
                                                14,
                                            )}
                                        </p>
                                    </div>
                                </div>
                                <div className=" w-full ">
                                    <CustomButton
                                        onClick={() => setOpenTicket(true)}
                                        bgColor="#ffffff"
                                        rounded="44px"
                                        width="100%"
                                        height="50px"
                                        color="#37137f"
                                    >
                                        Join Event
                                    </CustomButton>
                                </div>
                            </div>
                            <EventHeader
                                event={event}
                                totalTickets={totalTickets}
                            />
                        </div>
                    </div>

                    {/* Description */}
                    <EventDescription description={event?.description ?? ""} />

                    {event?.eventPledge?.organizations &&
                        Array.isArray(event.eventPledge.organizations) &&
                        event.eventPledge.organizations.length > 0 && (
                            <div className=" w-full px-4 ">
                                <div
                                    style={{
                                        boxShadow: "0px 0px 4px 0px #00000040",
                                    }}
                                    className="lg:max-w-[500px] lg:mx-auto rounded-[20px] py-4 px-6 flex w-full items-center justify-center"
                                >
                                    <div className="flex flex-col gap-4 items-center">
                                        <LabelText>
                                            Please Make A Donation
                                        </LabelText>
                                        <p className="font-semibold text-sm">
                                            When You Join The Event, you Will
                                            Also Have The Chance To Support Our
                                            Chosen Charity Partner{" "}
                                            {event?.eventPledge
                                                ?.organizations &&
                                            Array.isArray(
                                                event.eventPledge.organizations,
                                            ) &&
                                            event.eventPledge.organizations
                                                .length > 0
                                                ? typeof event.eventPledge
                                                      .organizations[0] ===
                                                  "string"
                                                    ? event.eventPledge
                                                          .organizations[0]
                                                    : (event.eventPledge
                                                          .organizations[0]
                                                          ?.name ?? "")
                                                : ""}{" "}
                                            With A Donation.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                    {/* Map */}
                    {event?.address && (
                        <ViewMap
                            lat={event?.loc?.coordinates[1]}
                            lng={event?.loc?.coordinates[0]}
                        />
                    )}
                </div>
                <div className=" w-full flex flex-col relative lg:pt-10 gap-6 lg:px-0 px-4 ">
                    {/* Countdown */}
                    <CountdownTimer targetTime={event?.endTime ?? ""} />

                    {/* Fundraising */}
                    <FundraisingSection event={event} />

                    <div className=" w-full flex mt-4 items-center justify-between ">
                        <button
                            onClick={() => setShowHost(true)}
                            className=" text-sm font-black text-[#B00062] "
                        >
                            Message Event Host
                        </button>
                        <button
                            onClick={() => router.push(`/policy/${event?._id}`)}
                            className=" text-sm font-medium text-primary "
                        >
                            policy
                        </button>
                    </div>
                </div>
            </div>

            {/* Bottom CTA */}
            <BottomCTA
                event={event as IEvent}
                onJoin={() => setOpenTicket(true)}
                onDonate={() => setOpenDonate(true)}
                setShowHost={() => setShowHost(true)}
            />

            {/* Modals */}
            <ModalLayout open={openDonate} setOpen={setOpenDonate}>
                <DonateForm setOpen={setOpenDonate} />
            </ModalLayout>

            <ModalLayout open={openTicket} setOpen={setOpenTicket}>
                <EventTicketForm
                    event={event as IEvent}
                    convert={currencyData}
                />
            </ModalLayout>

            <ModalLayout
                width=" lg:max-w-[500px] max-w-full w-full "
                rounded="24px"
                open={showPartner}
                setOpen={setShowPartner}
            >
                {/* <DonateForm setOpen={setOpen} /> */}
                <div className=" w-full flex flex-col ">
                    <div className=" flex w-full justify-center ">
                        <p className=" text-primary text-center font-extrabold ">
                            Charity Partner(s)
                        </p>
                    </div>
                    <div className=" mt-6 flex flex-col max-h-[70vh] overflow-y-auto h-[70vh] gap-3 ">
                        {event?.eventPledge?.organizations?.map((item) => {
                            return (
                                <div className=" w-full flex items-center gap-2 shadow rounded-xl p-3 ">
                                    <div className=" w-[64px] h-[64px] rounded-2xl ">
                                        <img
                                            src={item?.logo}
                                            alt="logo"
                                            className=" w-full h-full object-cover rounded-2xl "
                                        />
                                    </div>
                                    <div className=" flex flex-col ">
                                        <p className=" text-sm font-extrabold ">
                                            {capitalizeFLetter(item?.name)}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </ModalLayout>

            <ModalLayout
                width=" max-w-[400px] "
                rounded="24px"
                open={showHost}
                setOpen={setShowHost}
            >
                <div className=" pb-3 px-4 flex flex-col gap-4 ">
                    <div className=" w-full flex items-center gap-3 px-2 bg-[#A73A7A66] bg-opacity-30 rounded-[20px] py-3 ">
                        <div
                            onClick={() => handleShowType("host")}
                            className=" w-[44px] h-[44px] rounded-full "
                        >
                            <img
                                className=" w-full h-full rounded-full object-cover "
                                src={
                                    event?.admin?.photo
                                        ? event?.admin?.photo
                                        : event?.admin?.logo
                                }
                                alt="image"
                            />
                        </div>
                        <div className=" flex flex-col ">
                            <div className=" font-bold text-[12px] flex justify-center items-center text-white bg-[#37137F] rounded h-[20px] w-[85px] ">
                                Event Host:
                            </div>
                            <p className=" font-semibold text-[14px] text-center text-[#37137F] ">
                                {event?.admin?.fullname ?? event?.admin?.name}
                            </p>
                        </div>
                    </div>
                    <CustomButton
                        hasFrontIcon
                        icon={<HiChatBubbleBottomCenterText />}
                        height="40px"
                        rounded="999px"
                    >
                        Message Event Host
                    </CustomButton>
                    <div
                        onClick={() => setShowHost(false)}
                        role="button"
                        className=" w-full flex justify-center items-center text-[#CC1B1B] font-semibold text-sm cursor-pointer "
                    >
                        Close
                    </div>
                </div>
            </ModalLayout>
            <ModalLayout
                width=" max-w-[400px] "
                rounded="24px"
                open={showImg}
                setOpen={setShowImg}
            >
                <div className=" w-full rounded-full pt-2 ">
                    <img
                        className=" w-full h-full rounded-[24px] object-contain "
                        src={
                            showType === "event"
                                ? event?.photo
                                : event?.admin?.photo
                                  ? event?.admin?.photo
                                  : event?.admin?.logo
                        }
                        alt="image"
                    />
                </div>
            </ModalLayout>
        </LoadingAnimation>
    );
}

export default SharePage;
