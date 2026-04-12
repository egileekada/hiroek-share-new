"use client"
import { FormikProvider } from "formik";
import CustomButton from "../../../../components/shared/customButton";
import CustomInput from "../../../../components/shared/input";
import useAuth from "../../../../hooks/useAuth";
import AuthLayout from "../../../../components/shared/authLayout";

export default function ResetPassword() {
    const { formikResetPassword, resetPasswordMutation,  } = useAuth();

    console.log(formikResetPassword.errors);

    return (
        <AuthLayout
            hidesidebar={true}
            header="Reset Password"
            body="Enter your details to access your account."
        >
            <FormikProvider value={formikResetPassword}>
                <form
                    onSubmit={formikResetPassword.handleSubmit}
                    className=" w-full bg-white text-foreground flex flex-col items-center "
                >
                    <div className=" w-full flex flex-col items-center gap-4 pb-3 ">
                        <CustomInput
                            name="password"
                            isPassword
                            label="Password"
                            type="password"
                            placeholder="Password"
                        />
                        <CustomButton
                            type="submit"
                            loading={resetPasswordMutation.isPending}
                            rounded="44px"
                            width="100%"
                            height="50px"
                        >
                            Change Password
                        </CustomButton>
                    </div>
                </form>
            </FormikProvider>
        </AuthLayout>
    );
}
