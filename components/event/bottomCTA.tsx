"use client";
import { useRouter } from "next/navigation";
import CustomButton from "../shared/customButton";
import { IEvent } from "@/model/event";

export default function BottomCTA({ event, onJoin, onDonate }: {
    event: IEvent,
    onJoin: ()=> void,
    onDonate: ()=> void,
    setShowHost: ()=> void,
}) {

    const router = useRouter()

    return (
        <div className="fixed lg:hidden bottom-0 w-full flex flex-col gap-6 bg-white px-4 pb-4 pt-2 shadow-lg">
            {event?.fundRaiser?.fundRaisingGoal ? (
                <CustomButton rounded="999px" onClick={onDonate}>
                    Give Now
                </CustomButton>
            ) : (
                <CustomButton rounded="999px" onClick={onJoin}>
                    Join Event
                </CustomButton>
            )}
        </div>
    );
}
