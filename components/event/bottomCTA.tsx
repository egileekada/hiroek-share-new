"use client";
import CustomButton from "../shared/customButton";

export default function BottomCTA({ event, onJoin, onDonate }: any) {
    return (
        <div className="fixed lg:hidden bottom-0 w-full bg-white p-4 shadow-lg">
            {event?.fundRaiser?.fundRaisingGoal ? (
                <CustomButton onClick={onDonate}>Give Now</CustomButton>
            ) : (
                <CustomButton onClick={onJoin}>Join Event</CustomButton>
            )}
        </div>
    );
}
