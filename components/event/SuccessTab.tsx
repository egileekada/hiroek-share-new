import CustomButton from "../shared/customButton";
import type { IEvent } from "../../model/event";
import CustomImage from "../shared/customImage";

export function SuccessTab({
    event,
    setTab,
}: {
    event: IEvent;
    setTab: (tab: number) => void;
}) {
    return (
        <div className="w-full h-[75vh] flex flex-col items-center">
            <div className="flex flex-col gap-1 items-center px-3 text-center">
                <p className="text-xl font-black text-[#37137F]">{`Congratulations, You're In!`}</p>
                <p className="text-sm font-medium text-primary30">
                    {`Thank you for joining ${event?.name}! We're excited to have you with us.`}
                </p>
            </div>
            <img src="/images/heart.png" alt="heart" />
            <div className="w-full mt-auto pb-4 px-4 flex justify-end items-end">
                <CustomButton
                    type="button"
                    onClick={() => setTab(6)}
                    rounded="44px"
                    height="50px"
                >
                    View Ticket On The App
                </CustomButton>
            </div>
        </div>
    );
}

export function AppDownloadTab({ channel }: { channel?: boolean }) {
    return (
        <div className="w-full flex flex-col gap-6 items-center px-2 pb-4">
            <p className="font-extrabold text-lg text-primary">
                {channel
                    ? "View Channel On The App"
                    : "Get The Full Experience In The App!"}
            </p>
            <div className="w-full flex flex-col gap-4">
                <div className="flex w-full justify-between items-center">
                    <div className=" h-[44px] w-[148px] ">
                        <CustomImage src="/images/google.png" alt="google" fillContainer />
                    </div>
                    <a
                        href="https://play.google.com/store/apps/details?id=com.hiroek.app.hiroek"
                        target="_blank"
                    >
                        <CustomButton
                            rounded="999px"
                            width="93px"
                            fontSize="12px"
                            color="#37137F"
                            bgColor="#37137F4D"
                            height="44px"
                        >
                            <p className=" font-extrabold ">Download</p>
                        </CustomButton>
                    </a>
                </div>
                <div className="flex w-full justify-between items-center">
                    <div className=" h-[44px] w-[148px] ">
                        <CustomImage
                            src="/images/apple.png"
                            alt="apple"
                            fillContainer
                        />
                    </div>
                    <a
                        href="https://apps.apple.com/ng/app/hiroek/id6474194083"
                        target="_blank"
                    >
                        <CustomButton
                            rounded="999px"
                            width="93px"
                            fontSize="12px"
                            color="#37137F"
                            bgColor="#37137F4D"
                            height="44px"
                        >
                            <p className=" font-extrabold ">Download</p>
                        </CustomButton>
                    </a>
                </div>
            </div>
        </div>
    );
}
