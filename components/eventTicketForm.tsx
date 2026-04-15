import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { IEvent } from "../model/event";
import useAuth from "../hooks/useAuth";
import { ForgotPasswordTab, LoginTab, SignupTab, VerifyOtpTab } from "./forms";
import TicketSelectionTab from "./event/TicketSelectionTab";
import TicketPreviewTab from "./event/TicketPreviewTab";
import { AppDownloadTab, SuccessTab } from "./event/SuccessTab";
 

type TicketPayload = {
    numberOfTickets: number;
    ticketTypeId: string;
};

const STRIPE_FEES: Record<string, { percentage: number; fixed: number }> = {
    gbp: { percentage: 0.015, fixed: 0.2 },
    usd: { percentage: 0.029, fixed: 0.3 },
    eur: { percentage: 0.015, fixed: 0.25 },
    aud: { percentage: 0.0175, fixed: 0.3 },
    cad: { percentage: 0.029, fixed: 0.3 },
    nzd: { percentage: 0.0265, fixed: 0.3 },
    default: { percentage: 0.0325, fixed: 0.3 },
};

const BASE_HIROEK_FEE = 0.6;

export default function EventTicketForm({
    event,
    convert,
}: {
    setOpen?: any;
    event: IEvent;
    convert: any;
}) {
    const {
        formikSignup,
        signupMutation,
        formikVerify,
        verifyMutation,
        formik, 
        tab,
        isLoading,
        setTab,
        payForTicket,
        payForTicketFree,
        email,
        forgotMutation,
        formikForgotPassword,
        paymentUrl,
        discountCode,
        user,
        userDataMutation,
    } = useAuth();

    const [payload, setPayload] = useState<TicketPayload[]>([]);
    const [totalPrices, setTotalPrices] = useState(0);
    const [serviceFees, setServiceFees] = useState(0);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("access_token");

    const totalTickets = payload.reduce((total, item) => total + item.numberOfTickets, 0);

    const getTicketCount = (ticketTypeId: string): number =>
        payload.find((p) => p.ticketTypeId === ticketTypeId)?.numberOfTickets ?? 0;

    const updateTicket = (ticketTypeId: string, action: "add" | "remove") => {
        setPayload((prev) => {
            const existing = prev.find((p) => p.ticketTypeId === ticketTypeId);

            if (existing) {
                const newCount = action === "add"
                    ? existing.numberOfTickets + 1
                    : existing.numberOfTickets - 1;

                if (newCount <= 0) return prev.filter((p) => p.ticketTypeId !== ticketTypeId);

                return prev.map((p) =>
                    p.ticketTypeId === ticketTypeId ? { ...p, numberOfTickets: newCount } : p
                );
            }

            if (action === "add") return [...prev, { ticketTypeId, numberOfTickets: 1 }];

            return prev;
        });
    }; 

    const handleSubmit = () => {
        const ticketData = discountCode?.data?.data?.code ? { eventId: event?._id, ticketTypes: payload, discountCode: discountCode?.data?.data?.code} : { eventId: event?._id, ticketTypes: payload };
        if (event?.ticketing[0]?.ticketPrice > 0) {
            payForTicket.mutate(ticketData);
        } else {
            payForTicketFree.mutate(ticketData);
        }
    };

    const handlePreview = () => setTab(user?.email ? 5 : 3);

    // Fetch user data on mount if userId exists
    useEffect(() => {
        if (!userId) return;
        userDataMutation?.mutate(userId);
    }, [userId]);

    // Skip to ticket selection if already logged in
    useEffect(() => {
        if (user?.fullname) setTab(2);
    }, []);

    // Sync email into verify formik field
    useEffect(() => {
        if (!formikVerify?.values?.phoneOrEmail) {
            formikVerify.setFieldValue("phoneOrEmail", email);
        }
    }, [email]);

    // Recalculate ticket subtotal whenever payload or event changes
    useEffect(() => {
        const total = payload.reduce((sum, selected) => {
            const ticket = event?.ticketing.find((t) => t._id === selected.ticketTypeId);
            return ticket ? sum + ticket.ticketPrice * selected.numberOfTickets : sum;
        }, 0);
        setTotalPrices(total / 100);
    }, [event, payload]);

    // Recalculate service fee whenever subtotal or currency changes
    useEffect(() => {
        const currency = event?.currency?.toLowerCase() ?? "default";
        const stripeFee = STRIPE_FEES[currency] ?? STRIPE_FEES.default;
        const rate = convert?.[currency] ?? convert?.gbp ?? 1;
        const hiroekFee = Math.round(BASE_HIROEK_FEE * rate * 100) / 100;

        const fee = Math.round(
            (hiroekFee + totalPrices * stripeFee.percentage + stripeFee.fixed) * 100
        ) / 100;

        setServiceFees(fee);
    }, [totalPrices, event?.currency]);

    // Listen for payment confirmation via socket
    useEffect(() => {
        if (!userId) return;

        const socket = io(BASE_URL?.replace("/api", ""), { auth: { token } });
        socket.on(`ticket-payment-${userId}`, () => setTab(4));

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    const sharedPaymentProps = {
        payForTicket,
        payForTicketFree,
        payload,
    };

    const sharedPricingProps = {
        totalPrices,
        serviceFees,
        event,
    };

    const handleDiscount = ( code: string, amount: string ) => {
        discountCode.mutate({
            code: code,
            amount: amount
        })
    }

    return (
        <div className=" text-foreground " >
            {tab === 0 && (
                <SignupTab
                    formikSignup={formikSignup}
                    signupMutation={signupMutation}
                    setTab={setTab}
                />
            )}

            {tab === 1 && (
                <VerifyOtpTab
                    formikVerify={formikVerify}
                    verifyMutation={verifyMutation}
                />
            )}

            {tab === 3 && (
                <LoginTab
                    formik={formik}
                    isLoading={isLoading}
                    setTab={setTab}
                />
            )}

            {tab === 10 && (
                <ForgotPasswordTab
                    formikForgotPassword={formikForgotPassword}
                    forgotMutation={forgotMutation}
                    setTab={setTab}
                />
            )}

            {tab === 7 && (
                <div className="w-full flex flex-col h-[90vh]">
                    <iframe src={paymentUrl} width="100%" height="100%" />
                </div>
            )}

            {tab === 4 && (
                <TicketSelectionTab
                    {...sharedPaymentProps}
                    {...sharedPricingProps}
                    handleDiscount={handleDiscount}
                    user={user}
                    discountData={discountCode.data}
                    isLoading={discountCode.isPending}
                    getTicketCount={getTicketCount}
                    updateTicket={updateTicket}
                    handlePreview={handlePreview}
                />
            )}

            {tab === 5 && (
                <TicketPreviewTab
                    {...sharedPaymentProps}
                    {...sharedPricingProps}
                    discountData={discountCode.data}
                    user={user}
                    totalTickets={totalTickets}
                    handleSubmit={handleSubmit}
                    setTab={setTab}
                />
            )}

            {tab === 2 && (
                <SuccessTab event={event} setTab={setTab} />
            )}

            {tab === 6 && (
                <AppDownloadTab />
            )}
        </div>
    );
}
