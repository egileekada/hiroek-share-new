import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import httpService, { unsecureHttpService } from "../utils/httpService";
import type { ICommunity } from "../model/community";
import type { IUserDetail } from "../model/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { toast } from "@heroui/react";

const useAuth = (community?: ICommunity) => {
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false);
    const [paymentUrl, setPaymentUrl] = useState("");

    const [user, setUser] = useState<IUserDetail>({} as IUserDetail);

    const [tab, setTab] = useState(community ? 3 : 2);

    const params = useParams();
    const searchParams = useSearchParams();

    const { id, slug } = params as { id?: string; slug?: string };

    console.log(id);

    console.log(slug?.replace("%40", "@"));

    const [email, setEmail] = useState("");

    const queryClient = useQueryClient();

    const resetCode = searchParams.get("resetCode");
    const emailData = searchParams.get("email");

    const signupMutation = useMutation({
        mutationFn: (data: any) =>
            unsecureHttpService.post(`/auth/email-signup`, data),
        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message);
        },
        onSuccess: () => {
            toast.success("Signed Up Successfully");

            localStorage.setItem("email", formikSignup.values.email);
            setEmail(formikSignup.values.email);
            setTab(1);
        },
    });

    const resetPasswordMutation = useMutation({
        mutationFn: (data: any) =>
            unsecureHttpService.post(`/auth/password-reset`, data),
        onError: (error: any) => {
            toast.danger(
                error?.response?.data?.error?.details?.message ||
                    "Failed to reset password",
            );
        },
        onSuccess: () => {
            toast.success("Password reset successful.");

            // Wait 3 seconds before closing
            setTimeout(() => {
                window.close();
            }, 3000);
        },
    });

    const loginMutation = useMutation({
        mutationFn: (data: any) =>
            unsecureHttpService.post(`/auth/email-signin`, data),
        onError: (error: any) => {
            console.log("test");

            toast.danger(error?.response?.data?.error?.details?.message);
        },
        onSuccess: (data: any) => {
            let token: string = data?.data?.token;

            userDataMutation.mutate(data?.data?.user?._id);
            localStorage.setItem("userId", data?.data?.user?._id);
            localStorage.setItem("access_token", data?.data?.token);
            // queryClient.invalidateQueries({ queryKey: ["userdata")
            if (!community?._id) {
                toast.success("Logged In Successfully");
                setTab(5);
            } else {
                joinChannelWithToken.mutate({ id: community?._id + "", token });
            }
        },
    });

    console.log(loginMutation?.isSuccess);

    const forgotMutation = useMutation({
        mutationFn: (data: any) =>
            unsecureHttpService.post(`/auth/password-reset-request`, data),
        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message);
        },
        onSuccess: () => {
            toast.success("Password reset link sent to your email");
            setTab(3);
        },
    });

    const userDataMutation = useMutation({
        mutationFn: (data: string) => httpService.get(`/users/${data}`),
        onError: () => {
            // toast.danger(error?.response?.data?.error?.details?.message)
        },
        onSuccess: (data: any) => {
            if (data?.data?.user) {
                setUser(data?.data?.user);
            }
        },
    });

    const payForTicket = useMutation({
        mutationFn: (data: {
            eventId: string;
            ticketTypes: {
                ticketTypeId: string;
                numberOfTickets: number;
            }[];
        }) => httpService.post(`/donations/payment-intent`, data),
        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message);
            setTab(0);
        },
        onSuccess: (data) => {
            const paymentUrl = data?.data?.url;

            if (paymentUrl) {
                // ✅ Open the payment page in a new tab
                window.open(`${paymentUrl}&eventbtn=true`, "_blank");
            } else {
                toast.danger("Payment URL not found.");
            }
        },
    });

    const discountCode = useMutation({
        mutationFn: (data: { code: string; amount: string }) =>
            httpService.post(`/events/verify-discount-code/${id}`, data),
        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message); 
        },
        onSuccess: (data) => {
            console.log(data);
        },
    });

    const payForTicketFree = useMutation({
        mutationFn: (data: {
            eventId: string;
            ticketTypes: {
                ticketTypeId: string;
                numberOfTickets: number;
            }[];
        }) => httpService.post(`/donations/event-ticket-free-purchase`, data),
        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message);
            setTab(0);
        },
        onSuccess: () => {
            setTab(4);
        },
    });

    const joinChannel = useMutation({
        mutationFn: (data: string) =>
            httpService.post(`/communities/join-community/${data}`, {}),
        onError: () => {
            setTab(4);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userdata"] });
            queryClient.invalidateQueries({ queryKey: ["communities-by-id"] });
            if (!community?._id) {
                setShow(true);
                setTab(4);
            }
        },
    });

    const joinChannelWithToken = useMutation({
        mutationFn: ({ id, token }: { id: string; token: string }) =>
            httpService.post(
                `/communities/join-community/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            ),

        onError: () => {
            setTab(4);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["userdata"] });
            queryClient.invalidateQueries({ queryKey: ["communities-by-id"] });

            //   if (!community?._id) {
            setTab(4);
            //   }
        },
    });

    const verifyMutation = useMutation({
        mutationFn: (data: any) =>
            unsecureHttpService.post(`/auth/verify-otp`, data),
        onError: (error: any) => {
            toast.danger(error?.response?.data?.error?.details?.message);
        },
        onSuccess: () => {
            toast.success("OTP Verified Successfully");
            setTab(3);
        },
    });

    const formikSignup = useFormik<{
        fullname: string;
        email: string;
        phone: string;
        password: string;
    }>({
        initialValues: {
            fullname: "",
            email: "",
            phone: "",
            password: "",
        },
        validationSchema: Yup.object({
            fullname: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
            phone: Yup.string().required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (data) => {
            signupMutation.mutate(data);
        },
    });

    const formikForgotPassword = useFormik<{
        email: string;
    }>({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
        }),
        onSubmit: (data) => {
            forgotMutation.mutate(data);
        },
    });

    const formikResetPassword = useFormik<{
        email: string;
        resetCode: string;
        password: string;
    }>({
        initialValues: {
            email:
                slug?.replace("%40", "@") ??
                emailData?.replace("%40", "@") + "",
            resetCode: id ?? resetCode + "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
        }),
        onSubmit: (data) => {
            resetPasswordMutation.mutate(data);
        },
    });

    const formik = useFormik<{
        email: string;
        password: string;
    }>({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            password: Yup.string().required("Required"),
        }),
        onSubmit: (data) => {
            loginMutation.mutate(data);
        },
    });

    const formikVerify = useFormik<{
        otp: string;
        phoneOrEmail: string;
    }>({
        initialValues: {
            otp: "",
            phoneOrEmail: email,
        },
        validationSchema: Yup.object({
            otp: Yup.string().required("Required"),
            phoneOrEmail: Yup.string().required("Required"),
        }),
        onSubmit: (data) => {
            verifyMutation.mutate(data);
        },
    });

    const isLoading =
        verifyMutation?.isPending ||
        signupMutation?.isPending ||
        loginMutation?.isPending ||
        resetPasswordMutation?.isPending ||
        payForTicket?.isPending ||
        payForTicketFree?.isPending;

    return {
        formik,
        signupMutation,
        joinChannel,
        formikVerify,
        verifyMutation,
        loginMutation,
        formikSignup,
        payForTicket,
        payForTicketFree,
        isLoading,
        open,
        setOpen,
        tab,
        show,
        setShow,
        setTab,
        email,
        setEmail,
        setPaymentUrl,
        paymentUrl,
        forgotMutation,
        formikForgotPassword,
        resetPasswordMutation,
        formikResetPassword,
        user,
        userDataMutation,
        discountCode
    };
};

export default useAuth;
