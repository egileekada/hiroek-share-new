import { FormikProvider } from "formik";
import CustomButton from "../shared/customButton";
import CustomInput from "../shared/input";

export default function SignupTab({
    formikSignup,
    signupMutation,
    setTab,
}: {
    formikSignup: any;
    signupMutation: any;
    setTab: (tab: number) => void;
}) {
    return (
        <FormikProvider value={formikSignup}>
            <form
                onSubmit={formikSignup.handleSubmit}
                className="w-full flex flex-col"
            >
                <p className="text-primary text-2xl text-left font-bold">Checkout</p>
                <p className="text-primary text-xs text-left font-semibold">
                    Continue to secure your place.
                </p>
                <div className="w-full flex flex-col items-center gap-4 mt-3">
                    <CustomInput name="fullname" label="Full Name" type="text" placeholder="" />
                    <CustomInput name="email" label="Email Address" type="email" placeholder="" />
                    <CustomInput name="phone" label="Phone Number" type="tel" placeholder="" />
                    <CustomInput name="password" isPassword label="Password" type="password" placeholder="" />
                    <CustomButton type="submit" loading={signupMutation.isLoading} rounded="44px" width="100%" height="50px">
                        Proceed
                    </CustomButton>
                    <p className="text-primary20 text-xs font-medium">
                        Are you a returning attendee?{" "}
                        <button type="button" className="text-primary font-semibold cursor-pointer" onClick={() => setTab(3)}>
                            Continue here
                        </button>
                    </p>
                </div>
            </form>
        </FormikProvider>
    );
}
