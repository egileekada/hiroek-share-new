import { FormikProvider } from "formik";
import CustomButton from "../shared/customButton";
import CustomInput from "../shared/input";

export default function LoginTab({
    formik,
    isLoading,
    setTab,
}: {
    formik: any;
    isLoading: boolean;
    setTab: (tab: number) => void;
}) {
    return (
        <FormikProvider value={formik}>
            <form
                onSubmit={formik.handleSubmit}
                className="w-full flex flex-col items-center"
            >
                <p className="text-primary text-2xl font-bold">Welcome!</p>
                <p className="text-primary text-xs font-semibold">
                    Enter your details to continue.
                </p>
                <div className="w-full flex flex-col items-center gap-4 pt-3">
                    <div className=" flex flex-col gap-2 w-full " > 
                    <CustomInput name="email" label="Email Address" type="email" placeholder="" />
                    <CustomInput name="password" isPassword label="Password" type="password" placeholder="" />
                    </div>
                    <p className="text-primary font-medium cursor-pointer" onClick={() => setTab(10)}>
                        Forgot Password
                    </p>
                    <CustomButton type="submit" loading={isLoading} rounded="44px" width="100%" height="50px">
                        Continue
                    </CustomButton>
                    <p className="text-primary20 text-xs font-medium">
                        First time here?{" "}
                        <button type="button" className="text-primary font-semibold cursor-pointer" onClick={() => setTab(0)}>
                            Continue
                        </button>
                    </p>
                </div>
            </form>
        </FormikProvider>
    );
}
