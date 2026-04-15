"use client";
import LoadingAnimation from "@/components/loadingAnimation";
import CustomImage from "@/components/shared/customImage";
import CustomInput from "@/components/shared/input";
import useChat from "@/hooks/useChat";
import useGetEventData from "@/hooks/useGetEventData";
import { useConversationMessageData } from "@/hooks/useGetUserData";
import { IChatdetail } from "@/model/user";
import { SendIcon } from "@/svg";
import { Spinner } from "@heroui/react";
import { FormikProvider } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { IoChevronBack } from "react-icons/io5";
import { io } from "socket.io-client";

export default function Message() {
    const router = useRouter();

    const { formik, loadingChat } = useChat();
    const userId = localStorage.getItem("userId");
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

    const searchParams = useSearchParams();

    const id = searchParams.get("id");

    const token = localStorage.getItem("access_token");
    const { isLoading, data: event } = useGetEventData();
    const { data, refetch, isLoading: loading } = useConversationMessageData();

    console.log(data);

    const socket: any = io(BASE_URL?.replace("/api", ""), {
        auth: {
            token: token,
        },
    });

    useEffect(() => {
        // Establish connection
        if (id) {
            // Listen for incoming messages
            socket.on(`conversation-${id}`, () => {
                refetch();
            });
        }
    }, [id]);

    useEffect(() => {
        socket.emit("conversation-opened", {
            conversationId: id,
        });
        refetch;
    }, [id]);

    const ChatCard = ({ item }: { item: IChatdetail }) => {
        return (
            <div
                className={` ${item?.sender?._id === userId ? " ml-auto " : ""} max-w-[250px] flex flex-col gap-1 relative  `}
            >
                <div
                    className={` ${item?.sender?._id === userId ? " bg-[#37137F4D] " : "bg-[#F0F0F0]"} max-w-[250px] p-3 rounded-2xl  "`}
                >
                    <p className=" text-xs font-medium ">{item?.message}</p>
                </div>
                <p
                    className={` ${item?.sender?._id === userId ? " ml-auto mr-2 " : "ml-2"} text-[10px] font-bold  "`}
                >
                    7:55 pm
                </p>
            </div>
        );
    };

    return (
        <LoadingAnimation loading={loading || isLoading}>
            <FormikProvider value={formik}>
                <div className=" w-full flex flex-col h-screen ">
                    <div className=" bg-gray-400 flex items-center w-full gap-4 p-4 ">
                        <button
                            onClick={() => router.back()}
                            className=" w-11 h-11 bg-foreground flex justify-center items-center rounded-2xl text-white "
                        >
                            <IoChevronBack />
                        </button>
                        <div className=" flex items-center gap-2 ">
                            <div className=" w-9 h-9 rounded-full border border-foreground ">
                                <img
                                    className=" w-full h-full rounded-full object-cover "
                                    src={
                                        event?.admin?.photo
                                            ? event?.admin?.photo + ""
                                            : event?.admin?.logo + ""
                                    }
                                    alt="image"
                                />
                            </div>
                            <p className=" text-lg lg:text-2xl font-bold text-foreground ">
                                {event?.admin?.fullname ?? event?.admin?.name}
                            </p>
                        </div>
                    </div>
                    <div className=" flex flex-col overflow-hidden flex-1">
                        <div className=" flex-1 flex flex-col-reverse p-4 overflow-y-auto gap-3 ">
                            {data?.map((item: IChatdetail, index: number) => {
                                return <ChatCard item={item} key={index} />;
                            })}
                        </div>
                        <div className=" w-full py-3 px-2 flex items-center gap-2 bg-white shadow ">
                            <CustomInput
                                name="message"
                                placeholder="Enter Chat..."
                            />
                            <div className=" w-fit h-fit ">
                                <button
                                    onClick={() => formik.handleSubmit()}
                                    className=" w-10 h-10 flex justify-center items-center "
                                >
                                    {loadingChat ? (
                                        <Spinner />
                                    ) : (
                                        <SendIcon
                                            color={
                                                formik.values?.message
                                                    ? "#37137F"
                                                    : "#37137F80"
                                            }
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </FormikProvider>
        </LoadingAnimation>
    );
}
