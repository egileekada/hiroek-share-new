import { useState, useEffect, useRef } from "react";
import { LabelText } from "./shared";

const CountdownTimer = ({ targetTime }: { targetTime: string }) => {
    const [timeLeft, setTime] = useState({} as any);
    const intervalRef: any = useRef(null);

    useEffect(() => {
        const target = new Date(targetTime).getTime();

        const updateCountdown = () => {
            const now = Date.now();
            const diff = target - now;

            if (diff <= 0) {
                clearInterval(intervalRef.current);
                setTime(null);
                return;
            }

            const seconds = Math?.floor((diff / 1000) % 60);
            const minutes = Math?.floor((diff / 1000 / 60) % 60);
            const hours = Math?.floor((diff / (1000 * 60 * 60)) % 24);
            const days = Math?.floor(diff / (1000 * 60 * 60 * 24));

            setTime({ days, hours, minutes, seconds });
        };

        updateCountdown(); // Initial run
        intervalRef.current = setInterval(updateCountdown, 1000);

        return () => clearInterval(intervalRef.current);
    }, [targetTime]);

    return (
        <div className=" w-full flex flex-col gap-2 items-center ">
            <LabelText>Event Countdown</LabelText>
            <div className=" w-fit flex gap-3 ">
                <div className=" flex gap-2 flex-col items-center ">
                    <div className=" w-[64px] h-[90px] flex justify-center items-center bg-[#37137F4D] text-[30px] text-primary font-bold rounded-[7px] ">
                        <p className=" pt-2 ">
                            {timeLeft?.days ? timeLeft?.days : 0}
                        </p>
                    </div>
                    <p className=" text-xs text-primary font-black ">Days</p>
                </div>
                <div className=" flex gap-2 flex-col items-center ">
                    <div className=" w-[64px] h-[90px] flex justify-center items-center bg-[#37137F4D] text-[30px] text-primary font-bold rounded-[7px] ">
                        <p className=" pt-2 ">
                            {timeLeft?.hours ? timeLeft?.hours : 0}
                        </p>
                    </div>
                    <p className=" text-xs text-primary font-black ">Hours</p>
                </div>
                <div className=" flex gap-2 flex-col items-center ">
                    <div className=" w-[64px] h-[90px] flex justify-center items-center bg-[#37137F4D] text-[30px] text-primary font-bold rounded-[7px] ">
                        <p className=" pt-2 ">
                            {timeLeft?.minutes ? timeLeft?.minutes : 0}
                        </p>
                    </div>
                    <p className=" text-xs text-primary font-black ">Minutes</p>
                </div>
                <div className=" flex gap-2 flex-col items-center ">
                    <div className=" w-[64px] h-[90px] flex justify-center items-center bg-[#37137F4D] text-[30px] text-primary font-bold rounded-[7px] ">
                        <p className=" pt-2 ">
                            {timeLeft?.seconds ? timeLeft?.seconds : 0}
                        </p>
                    </div>
                    <p className=" text-xs text-primary font-black ">Seconds</p>
                </div>
            </div>
        </div>
    );
};

export default CountdownTimer;
