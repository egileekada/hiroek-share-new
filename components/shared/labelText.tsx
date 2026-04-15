import React from "react"

export default function LabelText(
    {
        children
    } : {
        children: React.ReactNode
    }
) {
    return(
        <div className=" w-fit h-[35px] mx-auto rounded-xl bg-[#37137F26] flex justify-center items-center px-4 " >
            <p className=" text-sm font-extrabold " >{children}</p>
        </div>
    )
}