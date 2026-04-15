"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import httpService from "@/utils/httpService"; 
import { useRouter, usePathname, useSearchParams, useParams } from "next/navigation";
import { useState } from "react";
import { toast } from "@heroui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const useChat = () => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = useParams();

    const id = searchParams.get("id");
    const eventId = params?.id as string;

    const [inputMessage, setInputMessage] = useState("");

    const queryClient = useQueryClient();

    const getValidEvent = (participants: any[]) => {
        return participants?.filter((item) => item.event !== null);
    };

    // ✅ Create Conversation
    const { mutate: createConversation, isPending: loadingConversation } = useMutation({
        mutationFn: (data: {
            userTwo: string;
            ownEvent?: string;
            userTwoEvent?: string;
            userType: "User" | "Organization" | "EventPartner" | string;
        }) => httpService.post(`/conversations`, data),

        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message);
        },

        onSuccess: (data) => { 

            const event = getValidEvent(data?.data?.conversation?.participants);
 
                router.push(
                    `/message/${event[0]?.event._id}?id=${data?.data?.conversation?._id}`
                ); 
        },
    });

    // ✅ Create Conversation With Creator
    const { mutate: createConversationWithCreator, isPending: loadingConversationWithCreator } =
        useMutation({
            mutationFn: (data: {
                userTwo: string;
                ownEvent?: string;
                userTwoEvent?: string;
                userType: "User" | "Organization" | "EventPartner";
            }) => httpService.post(`/conversations`, data),

            onError: (error: any) => {
                toast.danger(error?.response?.data?.error?.details?.message);
            },

            onSuccess: (data) => {
                const event = getValidEvent(data?.data?.conversation?.participants);

                router.push(
                    `/message/${event[0]?.event._id}?id=${data?.data?.conversation?._id}`
                );
            },
        });

    // ✅ Join Event
    const { mutate: joinEvent, isPending: loadingJoinEvent } = useMutation({
        mutationFn: (eventId: string) =>
            httpService.post(`/events/${eventId}/join-events`),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Event"] });
        },

        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message);
        },
    });

    // ✅ Verify Ticket
    const { mutate: verifyTicket, isPending: verifying } = useMutation({
        mutationFn: (id: string) =>
            httpService.get(`/events/user-event-ticket-verification/${id}`),

        onSuccess: (data) => {
            if (
                data?.data?.isTicketValid &&
                pathname.includes("/dashboard/event/scanner")
            ) {
                toast.success("ticket is valid");
                router.push(`/dashboard/event/scan/history/${eventId}`);
            }
        },

        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message);
        },
    });

    // ✅ Send Message
    const { mutate: createChat, isPending: loadingChat } = useMutation({
        mutationFn: (data: {
            message: string;
            replying?: string;
        }) => httpService.post(`/conversations/${id}/messages`, data),

        onSuccess: () => {
            setInputMessage("");
        },

        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message);
        },
    });



    const formik = useFormik<{
        message: string;
        replying?: string; 
    }>({
        initialValues: {
            message: "", 
        }, 
        onSubmit: (data) => {
            createChat(data);
        },
    });

    return {
        createConversation,
        loadingConversation,
        createChat,
        formik,
        loadingChat,
        searchParams, 
        verifyTicket,
        verifying,
        joinEvent,
        loadingJoinEvent,
        createConversationWithCreator,
        loadingConversationWithCreator,
    };
};

export default useChat;