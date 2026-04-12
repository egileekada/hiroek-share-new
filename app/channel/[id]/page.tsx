"use client";

import Image from "next/image";
import { useCurrentUser } from "@/hooks/useGetUserData";
import CommunityModal from "@/components/communityModal";
import LoadingAnimation from "@/components/loadingAnimation";
import CustomButton from "@/components/shared/customButton";
import ModalLayout from "@/components/shared/modalLayout";
import useAuth from "@/hooks/useAuth";
import useGetCommunityById from "@/hooks/useGetCommunityById";
import { formatNumberWithK } from "@/utils/formatNumberWithK";
import { textLimit } from "@/utils/textlimit";
import { useState } from "react";

export default function ChannelsPage() {
    const { data: item, isLoading } = useGetCommunityById();
    const { data: user } = useCurrentUser();
    const [open, setOpen] = useState(false);

    // const { joinChannel, open, setOpen, tab, setTab, setShow, show } =
    //     useAuth();

    const isMember = item?.members?.some((m) => m?._id === user?._id); 

    const handleViewApp = () => {
        setOpen(true);
    };

    console.log(item?.members);

    return (
        <LoadingAnimation loading={isLoading}>
            <div className="w-full h-full p-4 flex flex-col items-center gap-6">
                <div className="w-full max-w-[500px] flex flex-col items-center gap-3">
                    {/* HERO CARD */}
                    <div className="relative w-full h-[240px] rounded-2xl overflow-hidden shadow-md">
                        {item?.photo && (
                            <Image
                                src={item.photo}
                                alt={item?.name || "channel"}
                                fill
                                className="object-cover"
                                priority
                            />
                        )}

                        <div className="absolute bottom-10 rounded-3xl inset-x-5 p-4 bg-[#37137FE5] text-white flex flex-col items-center gap-2">
                            <p className="font-black text-lg text-center uppercase ">
                                {textLimit(item?.name ?? "", 30)}
                            </p>

                            {/* MEMBERS */}
                            {item?.members && item.members.length > 0 && (
                                <div className="flex items-center bg-[#FFFFFF4D] px-3 h-[44px] rounded-full">
                                    <div className="flex -space-x-2">
                                        {item.members
                                            .slice(0, 3)
                                            .map((member) => (
                                                <div
                                                    key={member._id}
                                                    className="relative w-7 h-7 rounded-full border-2 border-white overflow-hidden"
                                                >
                                                    <Image
                                                        src={member.photo}
                                                        alt="member"
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            ))}
                                    </div>

                                    <span className="ml-2 text-xs font-semibold text-white">
                                        {formatNumberWithK(item.members.length)}{" "}
                                        Members
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                    <p className=" text-xs font-semibold ">
                        Request To Join channel to gain access!
                    </p>

                    {/* ACTION BUTTONS */}
                    {!user?._id && (
                        <div className=" max-w-[258px] w-full ">
                            <CustomButton
                                onClick={() => setOpen(true)}
                                width="100%"
                                height="54px"
                                rounded="999px"
                            >
                                Request To Join Channel
                            </CustomButton>
                        </div>
                    )}

                    {/* {user?._id && !isMember && (
                        <CustomButton
                            onClick={handleJoin}
                            loading={joinChannel?.isPending}
                            width="100%"
                            height="50px"
                            rounded="10px"
                        >
                            Join Channel
                        </CustomButton>
                    )} */}

                    {isMember && (
                        <CustomButton
                            onClick={handleViewApp}
                            width="100%"
                            height="50px"
                            rounded="10px"
                        >
                            View Channel On The App
                        </CustomButton>
                    )}
                </div>

                {/* JOIN MODAL */}
                <ModalLayout
                    width="lg:max-w-[390px] w-full"
                    height="h-[100vh]"
                    rounded="24px"
                    open={open}
                    setOpen={setOpen}
                >
                    <CommunityModal
                        user={user as any}
                        channel={item}
                        setOpen={setOpen}
                    />
                </ModalLayout>

                {/* SUCCESS / APP MODAL */}
                {/* <ModalLayout
                    width="lg:max-w-[390px] w-full"
                    height="h-[100vh]"
                    rounded="24px"
                    open={show}
                    setOpen={setShow}
                >
                    {tab === 4 && (
                        <div className="h-[75vh] flex flex-col items-center text-center px-4">
                            <div className="space-y-1">
                                <p className="text-xl font-black text-[#37137F]">
                                    You have successfully joined the channel
                                </p>
                                <p className="text-sm font-medium text-[#37137F]">
                                    {item?.name}
                                </p>
                            </div>

                            <div className="relative w-[120px] h-[120px]">
                                <Image
                                    src="/images/heart.png"
                                    alt="success"
                                    fill
                                    className="object-contain"
                                />
                            </div>

                            <div className="mt-auto w-full pb-4 flex justify-end">
                                <CustomButton
                                    onClick={() => setTab(6)}
                                    rounded="44px"
                                    height="50px"
                                >
                                    View Channel On The App
                                </CustomButton>
                            </div>
                        </div>
                    )}

                    {tab === 6 && (
                        <div className="flex flex-col items-center gap-6 px-4 pb-6">
                            <p className="font-bold text-primary text-center">
                                Get The Full Experience In The App!
                            </p>

                            <div className="w-full space-y-4">
                                <StoreLink
                                    image="/images/google.png"
                                    link="https://play.google.com/store/apps/details?id=com.hiroek.app.hiroek"
                                />

                                <StoreLink
                                    image="/images/apple.png"
                                    link="https://apps.apple.com/ng/app/hiroek/id6474194083"
                                />
                            </div>
                        </div>
                    )}
                </ModalLayout> */}
            </div>
        </LoadingAnimation>
    );
}

/* 🔹 Reusable store link */
function StoreLink({ image, link }: { image: string; link: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="relative w-[145px] h-[40px]">
                <Image
                    src={image}
                    alt="store"
                    fill
                    className="object-contain"
                />
            </div>

            <a href={link} target="_blank" rel="noopener noreferrer">
                <CustomButton
                    width="93px"
                    height="44px"
                    rounded="8px"
                    fontSize="12px"
                    color="#37137F"
                    bgColor="#37137F4D"
                >
                    Proceed
                </CustomButton>
            </a>
        </div>
    );
}
