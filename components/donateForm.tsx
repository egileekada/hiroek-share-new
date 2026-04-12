import { useState } from "react";
import CustomButton from "./shared/customButton"; 
import { formatNumber } from "../utils/numberFormat";
import PaymentForm from "./paymentForm";
import { toast } from "@heroui/react";
export default function DonateForm({ setOpen } : { setOpen?: any }) {

    const [payload, setPayload] = useState({
        "firstName": "",
        "lastName": "",
        "phone": "",
        "email": "",
        "event": "",
        "amount": ""
      }) 

    const [tab, setTab] = useState(0)

    const handleSubmit = () => { 
        if (payload.firstName && payload.lastName && payload.email && payload.phone && payload.amount) {
            setTab(1)
        } else {
            toast.danger("Please fill in all fields")
        }
    }

    const servicefee = 0.6 + (Number(payload?.amount) * 0.015) + 0.2

    return (
        <>
            {tab === 0 && ( 
                <div className=" w-full flex flex-col items-center pb-3 " >
                    <p className=" text-primary text-2xl font-bold " >Give Now</p>
                    <p className=" text-primary20 text-xs font-medium " >Please fill in your details and finalise your donation.</p>
                    <div className=" w-full flex flex-col items-center gap-4 mt-3 " >
                        <div className=" w-full flex flex-col  gap-2 " >
                            <p className=" text-primary text-xs font-medium " >First Name</p>
                            <input 
                                onChange={(e) =>  setPayload({ ...payload, firstName: e.target.value })}
                                type="text"
                                className=" w-full h-[50px] rounded-md border !font-sm text-primary border-[#37137F14] px-3 bg-[#37137F0D] " />
                        </div>
                        <div className=" w-full flex flex-col  gap-2 " >
                            <p className=" text-primary text-xs font-medium " >Last Name</p>
                            <input 
                                onChange={(e) =>  setPayload({ ...payload, lastName: e.target.value })}
                                type="text"
                                className=" w-full h-[50px] rounded-md border !font-sm text-primary border-[#37137F14] px-3 bg-[#37137F0D] " />
                        </div>
                        <div className=" w-full flex flex-col  gap-2 " >
                            <p className=" text-primary text-xs font-medium " >Email Address</p>
                            <input 
                                onChange={(e) =>  setPayload({ ...payload, email: e.target.value })}
                                type="email"
                                className=" w-full h-[50px] rounded-md border !font-sm text-primary border-[#37137F14] px-3 bg-[#37137F0D] " />
                        </div>
                        <div className=" w-full flex flex-col  gap-2 " >
                            <p className=" text-primary text-xs font-medium " >Phone Number</p>
                            <input 
                                type="tel"
                                onChange={(e) =>  setPayload({ ...payload, phone: e.target.value })}
                                className=" w-full h-[50px] rounded-md border !font-sm text-primary border-[#37137F14] px-3 bg-[#37137F0D] " />
                        </div>
                        <div className=" w-full flex flex-col  gap-2 mb-6 " >
                            <p className=" text-primary text-xs font-medium " >Donation Amount</p>
                            <input 
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (/^\d*$/.test(value)) {
                                        setPayload({ ...payload, amount: value })
                                    }
                                }}
                                onKeyPress={(e) => {
                                    if (!/[0-9]/.test(e.key)) {
                                        e.preventDefault();
                                    }
                                }} 
                                className=" w-full h-[50px] rounded-md border !font-sm text-primary border-[#37137F14] px-3 bg-[#37137F0D] " />
                        </div>
                        <CustomButton onClick={handleSubmit} rounded="44px" width="100%" height="50px"  >Donate {payload?.amount ? formatNumber(payload?.amount) : "£0.00"}</CustomButton>
                    </div>
                </div>
            )}
            {tab === 1 && (
                <div className=" w-full flex flex-col items-center " >
                    <div className=" py-2 w-full flex justify-center border-b border-[#E8E8E8] " >
                        <p className=" text-2xl font-bold text-primary " >Donation Preview</p>
                    </div>
                    <div className=" w-full grid grid-cols-2 gap-4 py-4 " >
                        <p className=" font-semibold text-xs " >Full Name</p>
                        <p className=" font-semibold text-xs text-right " >{payload?.firstName+" "+payload?.lastName}</p>
                        <p className=" font-semibold text-xs " >Email</p>
                        <p className=" font-semibold text-xs text-right " >{payload?.email}</p>
                        <p className=" font-semibold text-xs " >Phone Number</p>
                        <p className=" font-semibold text-xs text-right " >{payload?.phone}</p>
                        <p className=" font-semibold text-sm " >Donation Amount</p>
                        <p className=" font-semibold text-sm text-right " >{formatNumber(payload?.amount)}</p>
                        <p className=" font-semibold text-sm " >Service Charge</p>
                        <p className=" font-semibold text-sm text-right " >{formatNumber(servicefee)}</p>
                    </div>
                    <div className=" w-full py-5 flex items-center border-t justify-between border-[#E8E8E8] " >
                        <p className=" font-bold " >Total: {formatNumber(Number(payload?.amount) + Number(servicefee))}</p>
                        <CustomButton onClick={()=> setTab(2)} rounded="44px" width="130px" height="50px"  >Donate Now</CustomButton>
                    </div>
                </div>
            )}
            {tab === 2 && (
                <PaymentForm payload={payload} setOpen={setOpen} />
            )}
        </>
    )
}