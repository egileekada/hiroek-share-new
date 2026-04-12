// export default PaymentForm;
import React, { Fragment, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
    PaymentElement,
    Elements,
    useStripe,
    useElements,
} from "@stripe/react-stripe-js";
import type { IPayment } from "../model/payment";
import CustomButton from "./shared/customButton";
import { useParams } from "next/navigation"; 

interface CheckoutFormProps {
    formData: IPayment;
    finalAmount?: number;
    paymentFee?: number;
    setTab?: any;
}

const CheckoutForm: React.FC<CheckoutFormProps> = (props) => {
    const stripe = useStripe();
    const elements = useElements();

    const { id } = useParams();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [isLoading, setLoader] = useState<boolean>(false);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const { error: submitError } = await elements.submit();
        if (submitError) {
            //   setErrorMessage(submitError?.message);
            return;
        }

        setLoader(true);

        try {
            const payload: {
                amount: number;
                firstName: string;
                lastName: string;
                phone: string;
                email: string;
                event: string;
            } = {
                amount: props.formData.amount * 100,
                firstName: props?.formData?.firstName,
                lastName: props?.formData?.lastName,
                phone: props?.formData?.phone,
                email: props?.formData?.email,
                event: id + "",
            };

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/donations/anonymous-payment-intent`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                },
            );

            console.log(response);

            const { paymentIntent } = await response.json();

            const { error } = await stripe.confirmPayment({
                elements,
                clientSecret: paymentIntent,
                confirmParams: {
                    return_url: `http://donations.hiroek.io/success?amount=${props.formData.amount * 100}`,
                },
            });

            setLoader(false);

            if (error) {
                // setErrorMessage(error.message);
            } else {
                props?.setTab(true);
            }
        } catch (err) {
            setLoader(false);
            if (err instanceof Error) {
                setErrorMessage(err.message);
            } else {
                setErrorMessage("An unknown error occurred");
            }
        }
    };

    return (
        <form className="flex flex-col justify-between" onSubmit={handleSubmit}>
            <div className="order-last m-6">
                <Fragment>
                    <PaymentElement />

                    <button
                        className="px-10 py-3 my-3 mx-auto rounded-lg w-full bg-purple-700 font-medium text-sm text-white"
                        type="submit"
                        disabled={!stripe || !elements || isLoading}
                    >
                        {isLoading ? "Processing..." : "Finalise"}
                    </button>

                    {errorMessage && <div>{errorMessage}</div>}
                </Fragment>
            </div>
        </form>
    );
};

const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string,
);

interface PaymentProps {
    payload: IPayment;
    setOpen?: any;
}

const Payment: React.FC<PaymentProps> = (props) => {
    const amount = props.payload.amount;
    //   const fee = 50; // 0.5 gbp
    const percentageToAdd = (amount * 10) / 100;

    const [tab, setTab] = useState(false);
    const amountInPounds = amount * 100;
    const newAmount = amountInPounds;

    const options = {
        mode: "payment" as const,
        payment_method_types: ["card"] as ["card"],
        currency: "gbp",
        amount: parseInt(newAmount.toString()),
        appearance: {} as Record<string, unknown>,
    };

    console.log(props?.payload);

    return (
        <>
            {!tab && (
                <Elements stripe={stripePromise} options={options}>
                    <CheckoutForm
                        formData={props.payload}
                        finalAmount={parseInt(newAmount.toString()) / 100}
                        paymentFee={percentageToAdd}
                        setTab={setTab}
                    />
                </Elements>
            )}
            {tab && (
                <div className=" w-full min-h-[60vh] flex flex-col justify-between ">
                    <div className=" w-full flex flex-col items-center px-4  gap-2 py-[20%] ">
                        <p className=" text-xl font-bold leading-[110%] text-center text-primary  ">
                            Thank You <br /> for your generosity!
                        </p>
                        <p className=" text-sm font-semibold text-[#37137F80] text-center maw-w-[200px] ">
                            Your donation has been successfully received. your
                            support will make a real difference in the lives of
                            those in need.
                        </p>
                    </div>
                    <div className=" w-full  px-4 pb-6 ">
                        <CustomButton
                            onClick={() => props?.setOpen(false)}
                            rounded="16px"
                            width="100%"
                            height="50px"
                        >
                            View Event
                        </CustomButton>
                    </div>
                </div>
            )}
        </>
    );
};

export default Payment;
