"use client";

import Image from "next/image";
import CustomButton from "../components/shared/customButton";
import ModalLayout from "../components/shared/modalLayout";

export default function InvitePage() {
    const close = () => {};

    return (
        <ModalLayout 
            width="lg:max-w-[390px] w-full"
            height="h-[100vh]"
            rounded="24px"
            open={true}
            setOpen={close}
        >
            <div className="w-full flex flex-col items-center gap-6 px-4 pb-6 text-center">
                <p className="font-bold text-primary">
                    Get The Full Experience In The App!
                </p>

                <div className="w-full flex flex-col gap-4">
                    <StoreLink
                        image="/images/google.png"
                        link="https://play.google.com/store/apps/details?id=com.hiroek.app.hiroek"
                    />

                    <StoreLink
                        image="/images/apple.png"
                        link="https://apps.apple.com/ng/app/hiroek/id6474194083"
                    />
                </div>
            </div>
        </ModalLayout>
    );
}

/* 🔹 Reusable Store लिंक */
function StoreLink({ image, link }: { image: string; link: string }) {
    return (
        <div className="flex items-center justify-between">
            <div className="relative w-[145px] h-[40px]">
                <Image
                    src={image}
                    alt="store"
                    fill
                    className="object-contain"
                />
            </div>

            <a href={link} target="_blank" rel="noopener noreferrer">
                <CustomButton
                    width="93px"
                    height="44px"
                    rounded="8px"
                    fontSize="12px"
                    color="#37137F"
                    bgColor="#37137F4D"
                >
                    Download
                </CustomButton>
            </a>
        </div>
    );
}
