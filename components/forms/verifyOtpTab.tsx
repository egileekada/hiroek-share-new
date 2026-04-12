import { FormikProvider } from "formik";
import { InputOTP } from "@heroui/react"; // ✅ Correct import
import CustomButton from "../shared/customButton";

export default function VerifyOtpTab({
    formikVerify,
    verifyMutation,
}: {
    formikVerify: any;
    verifyMutation: any;
}) {
    return (
        <FormikProvider value={formikVerify}>
            <form
                onSubmit={formikVerify.handleSubmit}
                className="w-full flex flex-col items-center pb-3"
            >
                <p className="text-primary text-2xl font-bold">Verify OTP</p>
                <p className="text-primary text-xs font-semibold">
                    Please enter the OTP sent to your email.
                </p>
                <div className="w-full flex flex-col items-center gap-4 mt-3">
                    <div className="w-full flex items-center justify-center pt-2 pb-4">
                        {/* <InputOTP
                            maxLength={6}
                            value={formikVerify.values.otp || ""}
                            onComplete={(val: string) => {
                                formikVerify.setFieldValue("otp", val);
                            }}
                            classNames={{
                                input: "w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md",
                                segmentWrapper: "gap-2",
                            }}
                        /> */}
                        <InputOTP
                            maxLength={6}
                            value={formikVerify.values.otp || ""}
                            onChange={(val: string) => {
                                formikVerify.setFieldValue("otp", val);
                            }}
                        >
                            <InputOTP.Group>
                                <InputOTP.Slot index={0} />
                                <InputOTP.Slot index={1} />
                                <InputOTP.Slot index={2} />
                            </InputOTP.Group>
                            <InputOTP.Separator />
                            <InputOTP.Group>
                                <InputOTP.Slot index={3} />
                                <InputOTP.Slot index={4} />
                                <InputOTP.Slot index={5} />
                            </InputOTP.Group>
                        </InputOTP>
                    </div>
                    <CustomButton
                        type="submit"
                        loading={verifyMutation.isLoading}
                        rounded="44px"
                        width="100%"
                        height="50px"
                    >
                        Verify
                    </CustomButton>
                </div>
            </form>
        </FormikProvider>
    );
}
