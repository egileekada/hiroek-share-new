import { FormikProvider } from "formik";
import CustomButton from "../shared/customButton";
import CustomInput from "../shared/input";

export default function ForgotPasswordTab({
    formikForgotPassword,
    forgotMutation,
    setTab,
}: {
    formikForgotPassword: any;
    forgotMutation: any;
    setTab: (tab: number) => void;
}) {
    return (
        <FormikProvider value={formikForgotPassword}>
            <form
                onSubmit={formikForgotPassword.handleSubmit}
                className="w-full flex flex-col items-center gap-3 "
            >
                <div className=" flex flex-col items-center " > 
                <p className="text-primary text-2xl font-bold">Forgot Password</p>
                <p className="text-primary20 text-xs font-medium">
                    Please fill in your details below.
                </p>
                </div>
                <div className="w-full flex flex-col items-center gap-4">
                    <CustomInput name="email" label="Email Address" type="email" placeholder="" />
                    <CustomButton type="submit" loading={forgotMutation.isLoading} rounded="44px" width="100%" height="50px">
                        Submit
                    </CustomButton>
                    <p className="text-primary20 text-xs font-medium">
                        Already have an account?{" "}
                        <button type="button" className="text-primary font-semibold cursor-pointer" onClick={() => setTab(3)}>
                            Login
                        </button>
                    </p>
                </div>
            </form>
        </FormikProvider>
    );
}
