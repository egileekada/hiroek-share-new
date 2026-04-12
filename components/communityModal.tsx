// import { useEffect } from "react";
// import CustomButton from "./shared/customButton";
// import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui";
// import CustomInput from "./shared/input";
// import useAuth from "../hooks/useAuth";
// import { FormikProvider } from "formik";
// import type { IUserDetail } from "../model/user";
// import type { ICommunity } from "../model/community";

// export default function CommunityModal({ channel, user, setOpen }: { setOpen?: any, user: IUserDetail, channel?: ICommunity, tab?: number, setTab?: any }) {

//     const { formikSignup, signupMutation, formikVerify, verifyMutation, formik, loginMutation, forgotMutation, formikForgotPassword, joinChannel, setTab, tab } = useAuth(channel)

//     useEffect(()=> {
//         if(loginMutation.isSuccess){
//             if(!channel?.members?.some((m) => m?._id === user?._id)){
//                 joinChannel.mutate(channel?._id+"")
//             } else {
//                 setOpen(false)
//             }
//         }
//     }, [loginMutation?.isSuccess])

//     return (
//         <>
//             {tab === 0 && (
//                 <FormikProvider value={formikSignup}>
//                     <form onSubmit={formikSignup.handleSubmit} className=" w-full flex flex-col items-center pb-3 " >
//                         <p className=" text-primary text-2xl font-bold " >Sign Up</p>
//                         <p className=" text-primary20 text-xs font-medium " >Please fill in your details below.</p>
//                         <div className=" w-full flex flex-col items-center gap-4 mt-3 " >
//                             <CustomInput borderRadius="8px" name="fullname" label="Full Name" type="text" placeholder="" />
//                             <CustomInput borderRadius="8px" name="email" label="Email Address" type="email" placeholder="" />
//                             <CustomInput borderRadius="8px" name="phone" label="Phone Number" type="tel" placeholder="" />
//                             <CustomInput borderRadius="8px" name="password" isPassword label="Password" type="password" placeholder="" />
//                             <CustomButton type="submit" loading={signupMutation.isLoading} rounded="44px" width="100%" height="50px"  >Proceed</CustomButton>
//                             <p className=" text-primary20 text-xs font-medium " >Already have an account? <button type="button" className=" text-primary font-semibold cursor-pointer" onClick={() => setTab(3)} >Login</button></p>
//                         </div>
//                     </form>
//                 </FormikProvider>
//             )}
//             {tab === 1 && (
//                 <FormikProvider value={formikVerify}>
//                     <form onSubmit={formikVerify.handleSubmit} className=" w-full flex flex-col items-center pb-3 " >
//                         <p className=" text-primary text-2xl font-bold " >Verify OTP</p>
//                         <p className=" text-primary20 text-xs font-medium " >Please enter the OTP sent to your email.</p>
//                         <div className=" w-full flex flex-col items-center gap-4 mt-3 " >

//                             <div className=" w-full flex items-center justify-center gap-2 pt-2 pb-4 ">

//                                 <OneTimePasswordField.Root
//                                     // autoSubmit
//                                     value={formikVerify.values.otp}
//                                     // onAutoSubmit={formikVerify.handleSubmit}
//                                     onValueChange={formikVerify.handleChange("otp")}
//                                 >

//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                 </OneTimePasswordField.Root>
//                             </div>
//                             <CustomButton type="submit" loading={verifyMutation.isLoading} rounded="44px" width="100%" height="50px"  >Verify</CustomButton>
//                         </div>
//                     </form>
//                 </FormikProvider>
//             )}
//             {tab === 2 && (
//                 <FormikProvider value={formik}>
//                     <form onSubmit={formik.handleSubmit} className=" w-full flex flex-col items-center pb-3 " >
//                         <p className=" text-primary text-2xl font-bold " >Login</p>
//                         <p className=" text-primary20 text-xs font-medium " >Please fill in your details below.</p>
//                         <div className=" w-full flex flex-col items-center gap-4 pb-3 " >
//                             <CustomInput borderRadius="8px" name="email" label="Email Address" type="email" placeholder="" />
//                             <CustomInput borderRadius="8px" name="password" isPassword label="Password" type="password" placeholder="" />
//                             <p className=" text-primary font-semibold cursor-pointer" onClick={() => setTab(10)} >forgot password</p>
//                             <CustomButton type="submit" loading={loginMutation.isLoading || joinChannel?.isLoading} rounded="44px" width="100%" height="50px"  >Login</CustomButton>
//                             <p className=" text-primary20 text-xs font-medium " >Don't have an account? <button type="button" className=" text-primary font-semibold cursor-pointer" onClick={() => setTab(0)} >Sign Up</button></p>
//                         </div>
//                     </form>
//                 </FormikProvider>
//             )}
//             {tab === 10 && (
//                 <FormikProvider value={formikForgotPassword}>
//                     <form onSubmit={formikForgotPassword.handleSubmit} className=" w-full flex flex-col items-center pb-3 " >
//                         <p className=" text-primary text-2xl font-bold " >Forgot Password</p>
//                         <p className=" text-primary20 text-xs font-medium " >Please fill in your details below.</p>
//                         <div className=" w-full flex flex-col items-center gap-4 pb-3 " >
//                             <CustomInput borderRadius="8px" name="email" label="Email Address" type="email" placeholder="" />
//                             <CustomButton type="submit" loading={forgotMutation.isLoading} rounded="44px" width="100%" height="50px"  >Submit</CustomButton>
//                             <p className=" text-primary20 text-xs font-medium " >Already have an account? <button type="button" className=" text-primary font-semibold cursor-pointer" onClick={() => setTab(3)} >Login</button></p>
//                         </div>
//                     </form>
//                 </FormikProvider>
//             )}
//             {tab === 4 && (
//                 <div className=" w-full h-[75vh] flex flex-col items-center " >
//                     <div className=" flex flex-col gap-1 items-center px-3 text-center " >
//                         <p className=" text-xl font-black text-[#37137F] max-w-[320px] text-center " >{`You have successfully joined the channel`}</p>
//                         <p className=" text-sm font-medium text-[#37137F] " >{channel?.name}</p>
//                     </div>
//                     <img src="/images/heart.png" alt="heart" />
//                     <div className=" w-full mt-auto pb-4 px-4 flex justify-end items-end " >
//                         <CustomButton type="button" onClick={() => setTab(6)} rounded="44px" height="50px"  >View Channel On The App</CustomButton>
//                     </div>
//                 </div>
//             )}
//             {tab === 6 && (
//                 <div className=" w-full flex flex-col gap-6 items-center px-2 pb-4 " >
//                     <p className=" font-bold text-primary " >Get The Full Experience In The App!</p>
//                     <div className=" w-full flex flex-col gap-4 " >
//                         <div className=" flex w-full justify-between items-center " >
//                             <img src="/images/google.png" alt="google" className=" w-[145px] " />
//                             <a href="https://play.google.com/store/apps/details?id=com.hiroek.app.hiroek" target="_blank" >
//                                 <CustomButton rounded="8px" width="93px" fontSize="12px" color="#37137F" bgColor="#37137F4D" height="44px"  >Proceed</CustomButton>
//                             </a>
//                         </div>
//                         <div className=" flex w-full justify-between items-center " >
//                             <img src="/images/apple.png" alt="google" className=" w-[145px] " />
//                             <a href="https://apps.apple.com/ng/app/hiroek/id6474194083" target="_blank" >
//                                 <CustomButton rounded="8px" width="93px" fontSize="12px" color="#37137F" bgColor="#37137F4D" height="44px"  >Proceed</CustomButton>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }
import { useEffect } from "react";
import CustomButton from "./shared/customButton";
import useAuth from "../hooks/useAuth";
import type { IUserDetail } from "../model/user";
import type { ICommunity } from "../model/community";
import { ForgotPasswordTab, LoginTab, SignupTab, VerifyOtpTab } from "./forms";
import { AppDownloadTab } from "./event/SuccessTab";
import CustomImage from "./shared/customImage";

export default function CommunityModal({
    channel,
    user,
    setOpen,
}: {
    setOpen?: any;
    user: IUserDetail;
    channel?: ICommunity;
}) {
    const {
        formikSignup,
        signupMutation,
        formikVerify,
        verifyMutation,
        formik,
        loginMutation,
        isLoading,
        forgotMutation,
        formikForgotPassword,
        joinChannel,
        setTab,
        tab,
    } = useAuth(channel);

    useEffect(() => {
        if (loginMutation.isSuccess) {
            if (!channel?.members?.some((m) => m?._id === user?._id)) {
                joinChannel.mutate(channel?._id + "");
            } else {
                setOpen(false);
            }
        }
    }, [loginMutation?.isSuccess]);

    return (
        <div className=" text-foreground ">
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
            {tab === 4 && (
                <div className=" w-full h-[75vh] flex flex-col items-center ">
                    <div className=" flex flex-col gap-1 items-center px-3 text-center ">
                        <p className=" text-xl font-black text-[#37137F] max-w-[320px] text-center ">{`You have successfully joined the channel`}</p>
                        <p className=" text-sm font-medium text-[#37137F] ">
                            {channel?.name}
                        </p>
                    </div>
                    <div className=" w-full h-[341px] ">
                        <CustomImage
                            src="/images/heart.png"
                            alt="heart"
                            fillContainer
                        />
                    </div>
                    <div className=" w-full mt-auto pb-4 px-4 flex justify-end items-end ">
                        <CustomButton
                            type="button"
                            onClick={() => setTab(6)}
                            rounded="44px"
                            height="50px"
                        >
                            View Channel On The App
                        </CustomButton>
                    </div>
                </div>
            )}
            {tab === 6 && <AppDownloadTab channel />}
        </div>
    );
}
