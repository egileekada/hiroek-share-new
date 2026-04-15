"use client";
import CustomInput from "@/components/shared/input";
import useChat from "@/hooks/useChat";
import { useConversationMessageData } from "@/hooks/useGetUserData";
import { SendIcon } from "@/svg";
import { Spinner } from "@heroui/react";
import { FormikProvider } from "formik";
import { useRouter } from "next/navigation";
import { IoChevronBack } from "react-icons/io5";

export default function Message() {
    const router = useRouter();

    const { formik, loadingChat } = useChat();

    const { data } = useConversationMessageData()

    console.log(data);
    

    const ChatCard = ({
        self
    }: {
        self?: boolean;

    }) => {
        return (
            <div className={` ${self ? " ml-auto " : ""} max-w-[250px] flex flex-col gap-1 relative  `}>
                <div className={` ${self ? " bg-[#37137F4D] " : "bg-[#F0F0F0]"} max-w-[250px] p-3 rounded-2xl  "`}>
                    <p className=" text-xs font-medium ">
                        Sure, is happening live. Do come with your friends and
                        family and I promise you, is going to be real fun.
                    </p>
                </div>
                <p className={` ${self ? " ml-auto mr-2 " : "ml-2"} text-[10px] font-bold  "`} >7:55 pm</p>
            </div>
        );
    };

    return (
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
                        <div className=" w-9 h-9 rounded-full bg-foreground " />
                        <p className=" text-lg lg:text-2xl font-bold text-foreground ">
                            Testing
                        </p>
                    </div>
                </div>
                <div className=" flex flex-col overflow-hidden flex-1">
                    <div className=" flex-1 flex flex-col p-4 overflow-y-auto gap-3 ">
                        <ChatCard />
                        <ChatCard />
                        <ChatCard  self />
                        <ChatCard />
                        <ChatCard />
                        <ChatCard />
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
    );
}
