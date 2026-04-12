"use client";

import { Logo } from "../../svg";

interface IProps {
    children: React.ReactNode;
    header?: string;
    body?: string;
    hidesidebar?: boolean;
    hidefooter?: boolean;
}

export default function AuthLayout({
    children,
    header,
    body,
    hidesidebar,
}: IProps) {
    return (
        <div className="w-full h-screen flex overflow-hidden lg:bg-linear-to-r from-[#37137F] from-[34.29%] to-[#2E4991] to-100%">
            {/* Background blobs */}
            <div className="w-[477px] h-[477px] fixed hidden lg:block z-50 -top-[300px] -left-[270px] bg-[#FFFFFF26] rounded-r-full rounded-bl-full" />
            <div className="w-[477px] h-[477px] fixed hidden lg:block z-50 top-[77%] -left-[270px] bg-[#FFFFFF26] rounded-r-full rounded-bl-full" />

            {hidesidebar && (
                <>
                    <div className="w-[477px] h-[477px] fixed z-50 -top-[300px] -right-[270px] bg-[#FFFFFF26] rounded-l-full rounded-br-full hidden lg:block" />
                    <div className="w-[477px] h-[477px] fixed z-50 top-[80%] -right-[270px] bg-[#FFFFFF26] rounded-l-full rounded-br-full hidden lg:block" />
                </>
            )}

            {/* Center Content */}
            <div className="w-full h-full flex flex-col justify-center items-center relative px-6 lg:px-0">
                {/* Mobile Header */}
                <div className="absolute top-0 w-full flex justify-center lg:hidden">
                    <div className="max-w-[450px] h-[250px] w-full flex justify-center relative">
                        <div className="w-[500px] h-[507px] bg-primary rounded-full absolute -mt-[365px]" />

                        <div className="w-full flex flex-col absolute top-0 pt-8 text-white items-center">
                            <Logo />
                            <p className="text-[12px] font-extrabold text-center">
                                FOR CHARITIES & SOCIAL <br />
                                IMPACT ORGANISATIONS
                            </p>
                        </div>
                    </div>
                </div>

                {/* Card */}
                <div className="max-w-[450px] w-full flex flex-col items-center bg-white p-6 rounded-2xl gap-4 text-primary ">
                    <div className="w-full flex flex-col items-center text-center">
                        <h1 className="uppercase hidden lg:block text-[32px] font-black">
                            Hiroek
                        </h1>

                        <p className="hidden lg:block text-xs font-medium">
                            FOR CHARITIES & SOCIAL IMPACT ORGANISATIONS
                        </p>

                        <h2 className="text-[28px] font-black mt-4">
                            {header}
                        </h2>

                        {body && <p className="text-sm font-medium">{body}</p>}
                    </div>

                    {children}
                </div>
            </div>

            {/* Sidebar */}
            {!hidesidebar && (
                <div className="hidden lg:block w-full h-full">
                    <div className="w-full h-full rounded-bl-[150px] flex flex-col relative gap-5 px-8 pt-[10%] text-white">
                        {/* Background Image */}
                        <div className="absolute inset-0 rounded-bl-[150px] overflow-hidden z-10">
                            <img
                                alt="bg1"
                                src="/images/bg1.png"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="absolute inset-0 bg-black/50 rounded-bl-[150px] z-[12]" />

                        <h2 className="relative z-20 text-[40px] text-center font-extrabold leading-[48px]">
                            Get Started With 3 Easy Steps
                        </h2>

                        {/* Steps */}
                        {[
                            {
                                title: "Verify Organisation",
                                text: "Start by entering your organisation’s email to claim your account. A verification link will be sent.",
                            },
                            {
                                title: "Create New Password",
                                text: "After verifying, you’ll create a new password for your account.",
                            },
                            {
                                title: "Setup Organisation Profile",
                                text: "Maximise your time through seamless event creation and community activation.",
                            },
                        ].map((step, i) => (
                            <div key={i} className="flex gap-3 relative z-20">
                                <div className="w-[64px] h-[64px] rounded-full flex items-center justify-center bg-white/10 text-[18px] font-bold text-white/80">
                                    {i + 1}
                                </div>

                                <div className="flex flex-col flex-1">
                                    <h3 className="text-[24px] font-black">
                                        {step.title}
                                    </h3>
                                    <p className="text-lg font-medium">
                                        {step.text}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
