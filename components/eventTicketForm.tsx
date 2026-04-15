// import { useEffect, useState } from "react";
// import CustomButton from "./shared/customButton";
// import { formatNumber } from "../utils/numberFormat";
// import { unstable_OneTimePasswordField as OneTimePasswordField } from "radix-ui";
// import type { IEvent } from "../model/event";
// import { dateFormat } from "../utils/dateFormat";
// import { AiOutlineMinusCircle } from "react-icons/ai";
// import { IoMdAddCircleOutline } from "react-icons/io";
// import CustomInput from "./shared/input";
// import useAuth from "../hooks/useAuth";
// import { io } from "socket.io-client";
// import { FormikProvider } from "formik"; 
// import { textLimit } from "../utils/textlimit";
// import { IoChevronBack } from "react-icons/io5";

// export default function EventTicketForm({
//     event,
//     convert,
// }: {
//     setOpen?: any;
//     event: IEvent;
//     convert: any;
// }) {
//     const {
//         formikSignup,
//         signupMutation,
//         formikVerify,
//         verifyMutation,
//         formik,
//         loginMutation,
//         tab,
//         setTab,
//         payForTicket,
//         payForTicketFree,
//         email,
//         forgotMutation,
//         formikForgotPassword,
//         paymentUrl,
//         user,
//         userDataMutation,
//     } = useAuth();

//     const [totalPrices, setTotalPrices] = useState(0);
//     const [serviceFees, setServiceFees] = useState(0);

//     const userId = localStorage.getItem("userId");
//     const token = localStorage.getItem("access_token");

//     const [payload, setPayload] = useState<
//         { numberOfTickets: number; ticketTypeId: string }[]
//     >([]);

//     const totalTickets = payload.reduce(
//         (total, item) => total + item.numberOfTickets,
//         0,
//     );

//     const getTicketCount = (ticketTypeId: string) => {
//         return (
//             payload.find((p) => p.ticketTypeId === ticketTypeId)
//                 ?.numberOfTickets || 0
//         );
//     };

//     const socket: any = io("https://staging.hiroek.io", {
//         auth: {
//             token: token,
//         },
//     });

//     useEffect(() => {
//         if (!userId) {
//             return;
//         }
//         userDataMutation?.mutate(userId);
//     }, [userId]);

//     const updateTicket = (ticketTypeId: string, action: "add" | "remove") => {
//         setPayload((prev) => {
//             const existing = prev.find((p) => p.ticketTypeId === ticketTypeId);
//             if (existing) {
//                 const newCount =
//                     action === "add"
//                         ? existing.numberOfTickets + 1
//                         : existing.numberOfTickets - 1;

//                 // Remove ticket if number is 0
//                 if (newCount <= 0) {
//                     return prev.filter((p) => p.ticketTypeId !== ticketTypeId);
//                 }

//                 // Update ticket count
//                 return prev.map((p) =>
//                     p.ticketTypeId === ticketTypeId
//                         ? { ...p, numberOfTickets: newCount }
//                         : p,
//                 );
//             } else if (action === "add") {
//                 // Add new ticket entry
//                 return [...prev, { ticketTypeId, numberOfTickets: 1 }];
//             }

//             return prev;
//         });
//     };

//     useEffect(() => {
//         if (!formikVerify?.values?.phoneOrEmail) {
//             formikVerify.setFieldValue("phoneOrEmail", email);
//         }
//     }, [email]);

//     // Listen to: ticket-purchase-{userid}

//     const handleSubmit = () => {
//         if (event?.ticketing[0].ticketPrice > 0) {
//             payForTicket.mutate({
//                 eventId: event?._id,
//                 ticketTypes: payload,
//             });
//         } else {
//             payForTicketFree.mutate({
//                 eventId: event?._id,
//                 ticketTypes: payload,
//             });
//         }
//     };

//     const handlePreview = () => {
//         if (user.email) {
//             setTab(5);
//         } else {
//             setTab(3);
//         }
//     };

//     useEffect(() => {
//         const totalPrice = payload.reduce((sum, selected) => {
//             const ticket = event?.ticketing.find(
//                 (t) => t._id === selected.ticketTypeId,
//             );
//             if (ticket) {
//                 sum += ticket.ticketPrice * selected.numberOfTickets;
//             }
//             return sum;
//         }, 0);

//         setTotalPrices(totalPrice / 100);
//     }, [event, payload]);

//     useEffect(() => {
//         const stripeFees: Record<
//             string,
//             { percentage: number; fixed: number }
//         > = {
//             gbp: { percentage: 0.015, fixed: 0.2 },
//             usd: { percentage: 0.029, fixed: 0.3 },
//             eur: { percentage: 0.015, fixed: 0.25 },
//             aud: { percentage: 0.0175, fixed: 0.3 },
//             cad: { percentage: 0.029, fixed: 0.3 },
//             nzd: { percentage: 0.0265, fixed: 0.3 },
//             default: { percentage: 0.0325, fixed: 0.3 },
//         };

//         const currency = event?.currency?.toLowerCase() || "default";
//         const stripeFee = stripeFees[currency] ?? stripeFees.default;

//         const BASE_HIROEK_FEE = 0.6; // £0.60

//         const rate = convert?.[currency] ?? convert?.gbp ?? 1;

//         const hiroekFee = Math.round(BASE_HIROEK_FEE * rate * 100) / 100;

//         console.log(hiroekFee);
//         console.log(rate);
//         console.log(currency);

//         const serviceFee =
//             Math.round(
//                 (hiroekFee +
//                     Number(totalPrices) * stripeFee.percentage +
//                     stripeFee.fixed) *
//                     100,
//             ) / 100;
//         setServiceFees(serviceFee);
//     }, [totalPrices, event?.currency]);

//     useEffect(() => {
//         if (user?.fullname) {
//             setTab(2);
//         }
//     }, []);

//     useEffect(() => {
//         if (!userId || !socket) return;

//         const eventName = `ticket-payment-${userId}`;

//         const handlePurchase = () => {
//             setTab(4);
//         };

//         console.log("Subscribing to:", eventName);
//         socket.on(eventName, handlePurchase);
//     }, [userId, socket]);

//     return (
//         <>
//             {tab === 0 && (
//                 <FormikProvider value={formikSignup}>
//                     <form
//                         onSubmit={formikSignup.handleSubmit}
//                         className=" w-full flex flex-col pb-3 "
//                     >
//                         <p className=" text-primary text-2xl text-left font-bold ">
//                             Checkout
//                         </p>
//                         <p className=" text-primary text-xs text-left font-semibold ">
//                             Continue to secure your place.
//                         </p>
//                         <div className=" w-full flex flex-col items-center gap-4 mt-3 ">
//                             <CustomInput
//                                 borderRadius="8px"
//                                 name="fullname"
//                                 label="Full Name"
//                                 type="text"
//                                 placeholder=""
//                             />
//                             <CustomInput
//                                 borderRadius="8px"
//                                 name="email"
//                                 label="Email Address"
//                                 type="email"
//                                 placeholder=""
//                             />
//                             <CustomInput
//                                 borderRadius="8px"
//                                 name="phone"
//                                 label="Phone Number"
//                                 type="tel"
//                                 placeholder=""
//                             />
//                             <CustomInput
//                                 borderRadius="8px"
//                                 name="password"
//                                 isPassword
//                                 label="Password"
//                                 type="password"
//                                 placeholder=""
//                             />
//                             <CustomButton
//                                 type="submit"
//                                 loading={signupMutation.isLoading}
//                                 rounded="44px"
//                                 width="100%"
//                                 height="50px"
//                             >
//                                 Proceed
//                             </CustomButton>
//                             <p className=" text-primary20 text-xs font-medium ">
//                                 Are you a returning attendee?{" "}
//                                 <button
//                                     type="button"
//                                     className=" text-primary font-semibold cursor-pointer"
//                                     onClick={() => setTab(3)}
//                                 >
//                                     Continue here
//                                 </button>
//                             </p>
//                         </div>
//                     </form>
//                 </FormikProvider>
//             )}
//             {tab === 1 && (
//                 <FormikProvider value={formikVerify}>
//                     <form
//                         onSubmit={formikVerify.handleSubmit}
//                         className=" w-full flex flex-col items-center pb-3 "
//                     >
//                         <p className=" text-primary text-2xl font-bold ">
//                             Verify OTP
//                         </p>
//                         <p className=" text-primary text-xs font-semibold ">
//                             Please enter the OTP sent to your email.
//                         </p>
//                         <div className=" w-full flex flex-col items-center gap-4 mt-3 ">
//                             <div className=" w-full flex items-center justify-center gap-2 pt-2 pb-4 ">
//                                 <OneTimePasswordField.Root
//                                     // autoSubmit
//                                     value={formikVerify.values.otp}
//                                     // onAutoSubmit={formikVerify.handleSubmit}
//                                     onValueChange={formikVerify.handleChange(
//                                         "otp",
//                                     )}
//                                 >
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                     <OneTimePasswordField.Input className=" w-[40px] h-[40px] text-center bg-white border-2 border-gray-300 rounded-md mx-1 " />
//                                 </OneTimePasswordField.Root>
//                             </div>
//                             <CustomButton
//                                 type="submit"
//                                 loading={verifyMutation.isLoading}
//                                 rounded="44px"
//                                 width="100%"
//                                 height="50px"
//                             >
//                                 Verify
//                             </CustomButton>
//                         </div>
//                     </form>
//                 </FormikProvider>
//             )}
//             {tab === 3 && (
//                 <FormikProvider value={formik}>
//                     <form
//                         onSubmit={formik.handleSubmit}
//                         className=" w-full flex flex-col items-center pb-3 "
//                     >
//                         <p className=" text-primary text-2xl font-bold ">
//                             Welcome!
//                         </p>
//                         <p className=" text-primary text-xs font-semibold ">
//                             Enter your details to continue.
//                         </p>
//                         <div className=" w-full flex flex-col items-center gap-4 py-3 ">
//                             <CustomInput
//                                 borderRadius="8px"
//                                 name="email"
//                                 label="Email Address"
//                                 type="email"
//                                 placeholder=""
//                             />
//                             <CustomInput
//                                 borderRadius="8px"
//                                 name="password"
//                                 isPassword
//                                 label="Password"
//                                 type="password"
//                                 placeholder=""
//                             />
//                             <p
//                                 className=" text-primary font-medium cursor-pointer"
//                                 onClick={() => setTab(10)}
//                             >
//                                 Forgot Password
//                             </p>
//                             <CustomButton
//                                 type="submit"
//                                 loading={loginMutation.isLoading}
//                                 rounded="44px"
//                                 width="100%"
//                                 height="50px"
//                             >
//                                 Continue
//                             </CustomButton>
//                             <p className=" text-primary20 text-xs font-medium ">
//                                 First time here?{" "}
//                                 <button
//                                     type="button"
//                                     className=" text-primary font-semibold cursor-pointer"
//                                     onClick={() => setTab(0)}
//                                 >
//                                     Continue
//                                 </button>
//                             </p>
//                             {/* <p className=" text-primary20 text-xs font-medium " >Don't have an account? <button type="button" className=" text-primary font-semibold cursor-pointer" onClick={() => setTab(0)} >Sign Up</button></p> */}
//                         </div>
//                     </form>
//                 </FormikProvider>
//             )}
//             {tab === 7 && (
//                 <div className=" w-full flex flex-col h-[90vh] ">
//                     <iframe
//                         src={paymentUrl}
//                         width="100%"
//                         height="100%"
//                     ></iframe>
//                 </div>
//             )}
//             {tab === 10 && (
//                 <FormikProvider value={formikForgotPassword}>
//                     <form
//                         onSubmit={formikForgotPassword.handleSubmit}
//                         className=" w-full flex flex-col items-center pb-3 "
//                     >
//                         <p className=" text-primary text-2xl font-bold ">
//                             Forgot Password
//                         </p>
//                         <p className=" text-primary20 text-xs font-medium ">
//                             Please fill in your details below.
//                         </p>
//                         <div className=" w-full flex flex-col items-center gap-4 pb-3 ">
//                             <CustomInput
//                                 borderRadius="8px"
//                                 name="email"
//                                 label="Email Address"
//                                 type="email"
//                                 placeholder=""
//                             />
//                             <CustomButton
//                                 type="submit"
//                                 loading={forgotMutation.isLoading}
//                                 rounded="44px"
//                                 width="100%"
//                                 height="50px"
//                             >
//                                 Submit
//                             </CustomButton>
//                             <p className=" text-primary20 text-xs font-medium ">
//                                 Already have an account?{" "}
//                                 <button
//                                     type="button"
//                                     className=" text-primary font-semibold cursor-pointer"
//                                     onClick={() => setTab(3)}
//                                 >
//                                     Login
//                                 </button>
//                             </p>
//                         </div>
//                     </form>
//                 </FormikProvider>
//             )}
//             {tab === 2 && (
//                 <div className=" w-full flex flex-col gap-4 items-center ">
//                     <div className=" pb-2 w-full flex flex-col border-b border-[#E8E8E8] ">
//                         <p className=" text-xl font-black text-primary ">
//                             {event?.name}
//                         </p>
//                         <p className=" text-xs font-bold ">
//                             {dateFormat(event?.endTime)}
//                         </p>
//                         <p className=" text-xs font-semibold ">
//                             {event?.address}
//                         </p>
//                     </div>
//                     <div className=" w-full flex flex-col max-h-[55vh] gap-4 overflow-y-auto ">
//                         {event?.ticketing?.map((item, index) => {
//                             const count = getTicketCount(item._id);
//                             return (
//                                 <div
//                                     key={index}
//                                     className=" w-full border rounded-xl flex items-center justify-between gap-4 p-4 "
//                                 >
//                                     <div className=" flex flex-col ">
//                                         <p className=" text-xs font-semibold text-primary ">
//                                             {item?.ticketType}
//                                         </p>
//                                         <p className=" font-semibold text-primary ">
//                                             {formatNumber(
//                                                 item?.ticketPrice / 100,
//                                                 event?.currency as any,
//                                             )}
//                                         </p>
//                                         <p className=" text-xs font-semibold text-primary ">
//                                             {"Sale Ends On " +
//                                                 dateFormat(item?.salesEndDate)}
//                                         </p>
//                                         <p className=" text-xs font-bold text-primary ">
//                                             Tickets Available:{" "}
//                                             <span>{item?.spotsLeft}</span>
//                                         </p>
//                                     </div>
//                                     {(item?.signUpLimit === 0 ||
//                                         !item?.signUpLimit) &&
//                                         new Date() >=
//                                             new Date(item?.salesStartDate) &&
//                                         new Date() <
//                                             new Date(item?.salesEndDate) && (
//                                             <div className=" w-[116px] h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg ">
//                                                 <button
//                                                     role="button"
//                                                     onClick={() =>
//                                                         updateTicket(
//                                                             item._id,
//                                                             "remove",
//                                                         )
//                                                     }
//                                                 >
//                                                     <AiOutlineMinusCircle
//                                                         size={"30px"}
//                                                     />
//                                                 </button>
//                                                 <input
//                                                     value={count}
//                                                     name="signUpLimit"
//                                                     placeholder="0"
//                                                     readOnly
//                                                     className=" focus:border-0 w-[40px] outline-none text-center "
//                                                     onFocus={(e) =>
//                                                         e.target.addEventListener(
//                                                             "wheel",
//                                                             function (e) {
//                                                                 e.preventDefault();
//                                                             },
//                                                             { passive: false },
//                                                         )
//                                                     }
//                                                 />

//                                                 <button
//                                                     role="button"
//                                                     onClick={() =>
//                                                         updateTicket(
//                                                             item._id,
//                                                             "add",
//                                                         )
//                                                     }
//                                                 >
//                                                     <IoMdAddCircleOutline
//                                                         size={"30px"}
//                                                     />
//                                                 </button>
//                                             </div>
//                                         )}
//                                     {item?.spotsLeft > 0 &&
//                                         new Date() >=
//                                             new Date(item?.salesStartDate) &&
//                                         new Date() <
//                                             new Date(item?.salesEndDate) && (
//                                             <div className=" w-[116px] h-[54px] text-primary border-2 px-2 border-[#37137F4D] flex justify-between items-center rounded-lg ">
//                                                 <button
//                                                     role="button"
//                                                     onClick={() =>
//                                                         updateTicket(
//                                                             item._id,
//                                                             "remove",
//                                                         )
//                                                     }
//                                                 >
//                                                     <AiOutlineMinusCircle
//                                                         size={"30px"}
//                                                     />
//                                                 </button>
//                                                 <input
//                                                     value={count}
//                                                     name="signUpLimit"
//                                                     placeholder="0"
//                                                     readOnly
//                                                     className=" focus:border-0 w-[40px] outline-none text-center "
//                                                     onFocus={(e) =>
//                                                         e.target.addEventListener(
//                                                             "wheel",
//                                                             function (e) {
//                                                                 e.preventDefault();
//                                                             },
//                                                             { passive: false },
//                                                         )
//                                                     }
//                                                 />
//                                                 <button
//                                                     disabled={
//                                                         item?.spotsLeft === 0 &&
//                                                         item?.spotsLeft !== null
//                                                             ? true
//                                                             : item?.spotsLeft >
//                                                                 count
//                                                               ? false
//                                                               : true
//                                                     }
//                                                     role="button"
//                                                     onClick={() =>
//                                                         updateTicket(
//                                                             item._id,
//                                                             "add",
//                                                         )
//                                                     }
//                                                 >
//                                                     <IoMdAddCircleOutline
//                                                         size={"30px"}
//                                                     />
//                                                 </button>
//                                             </div>
//                                         )}
//                                     {(new Date() <
//                                         new Date(item?.salesStartDate) ||
//                                         new Date() >
//                                             new Date(item?.salesEndDate) ||
//                                         item?.spotsLeft === 0) && (
//                                         <div className=" w-[116px] h-[54px] text-primary px-2 border-[#37137F4D] flex justify-between items-center rounded-lg ">
//                                             <p className=" text-xs font-semibold text-center ">
//                                                 {new Date() <
//                                                 new Date(item?.salesStartDate)
//                                                     ? `Sales Starts on ${dateFormat(item?.salesStartDate)}`
//                                                     : new Date() >
//                                                         new Date(
//                                                             event?.eventEndDate,
//                                                         )
//                                                       ? "Event Ended"
//                                                       : new Date() >
//                                                           new Date(
//                                                               item?.salesEndDate,
//                                                           )
//                                                         ? "Sales Ended"
//                                                         : "Ticket Sold Out"}
//                                             </p>
//                                         </div>
//                                     )}
//                                 </div>
//                             );
//                         })}
//                         <div className=" w-full p-4 bg-[#37137F1A] rounded-2xl flex flex-col ">
//                             <div className=" grid grid-cols-2 text-primary gap-3 w-full mt-1 ">
//                                 <p className=" text-sm font-bold ">
//                                     Ticket Price
//                                 </p>
//                                 <p className=" font-black text-right ">
//                                     {formatNumber(
//                                         totalPrices,
//                                         event?.currency as any,
//                                     )}
//                                 </p>
//                                 <p className=" text-sm font-bold ">
//                                     Service Fee
//                                 </p>
//                                 <p className=" font-black text-right ">
//                                     {formatNumber(
//                                         totalPrices > 0 ? serviceFees : 0,
//                                         event?.currency as any,
//                                     )}
//                                 </p>
//                                 <p className=" text-sm font-bold ">Total</p>
//                                 <p className=" font-black text-right ">
//                                     {formatNumber(
//                                         totalPrices > 0
//                                             ? totalPrices + serviceFees
//                                             : totalPrices,
//                                         event?.currency as any,
//                                     )}
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                     <div className=" w-full flex items-center border-t justify-between border-[#E8E8E8] ">
//                         <CustomButton
//                             loading={
//                                 payForTicket?.isLoading ||
//                                 payForTicketFree?.isLoading
//                             }
//                             isDisabled={
//                                 payload.length === 0 ||
//                                 payForTicket?.isLoading ||
//                                 payForTicketFree?.isLoading
//                             }
//                             onClick={() => handlePreview()}
//                             rounded="44px"
//                             height="50px"
//                         >
//                             Get Ticket (s)
//                         </CustomButton>
//                     </div>
//                 </div>
//             )}
//             {tab === 5 && (
//                 <div className=" w-full flex flex-col gap-4 items-center ">
//                     <div className=" pb-2 w-full flex gap-2 justify-center border-b border-[#E8E8E8] ">
//                         <button onClick={() => setTab(2)}>
//                             <IoChevronBack size={"20px"} />
//                         </button>
//                         <p className=" text-xl font-black text-primary ">
//                             Ticket Purchase Preview
//                         </p>
//                     </div>
//                     <div className=" w-full flex flex-col px-3 gap-3 text-sm ">
//                         <div className=" w-full flex justify-between gap-4 ">
//                             <p className=" font-semibold ">Full Name</p>
//                             <p>{textLimit(user?.fullname, 30)}</p>
//                         </div>
//                         <div className=" w-full flex justify-between gap-4 ">
//                             <p className=" font-semibold ">Email</p>
//                             <p>{textLimit(user?.email, 30)}</p>
//                         </div>
//                         <div className=" w-full flex justify-between gap-4 ">
//                             <p className=" font-semibold ">Phone Number</p>
//                             <p>{user?.phone}</p>
//                         </div>
//                         <div className=" w-full flex justify-between gap-4 ">
//                             <p className=" font-semibold ">Event Name</p>
//                             <p>{textLimit(event?.name, 30)}</p>
//                         </div>
//                         <div className=" w-full flex justify-between gap-4 ">
//                             <p className=" font-semibold ">Number of Ticket</p>
//                             <p>{formatNumber(totalTickets)}</p>
//                         </div>
//                     </div>
//                     <div className=" w-full p-4 bg-[#37137F1A] rounded-2xl flex flex-col ">
//                         <div className=" grid grid-cols-2 text-primary gap-3 w-full mt-1 ">
//                             <p className=" text-sm font-bold ">Ticket Price</p>
//                             <p className=" font-black text-right ">
//                                 {formatNumber(
//                                     totalPrices,
//                                     event?.currency as any,
//                                 )}
//                             </p>
//                             <p className=" text-sm font-bold ">Service Fee</p>
//                             <p className=" font-black text-right ">
//                                 {formatNumber(
//                                     totalPrices > 0 ? serviceFees : 0,
//                                     event?.currency as any,
//                                 )}
//                             </p>
//                             <p className=" text-sm font-bold ">Total</p>
//                             <p className=" font-black text-right ">
//                                 {formatNumber(
//                                     totalPrices > 0
//                                         ? totalPrices + serviceFees
//                                         : totalPrices,
//                                     event?.currency as any,
//                                 )}
//                             </p>
//                         </div>
//                     </div>
//                     <div className=" w-full flex items-center border-t justify-between border-[#E8E8E8] ">
//                         <CustomButton
//                             loading={
//                                 payForTicket?.isLoading ||
//                                 payForTicketFree?.isLoading
//                             }
//                             isDisabled={
//                                 payload.length === 0 ||
//                                 payForTicket?.isLoading ||
//                                 payForTicketFree?.isLoading
//                             }
//                             onClick={() => handleSubmit()}
//                             rounded="44px"
//                             height="50px"
//                         >
//                             Get Ticket (s)
//                         </CustomButton>
//                     </div>
//                 </div>
//             )}
//             {tab === 4 && (
//                 <div className=" w-full h-[75vh] flex flex-col items-center ">
//                     <div className=" flex flex-col gap-1 items-center px-3 text-center ">
//                         <p className=" text-xl font-black text-[#37137F] ">{`Congratulations, You're In!`}</p>
//                         <p className=" text-sm font-medium text-primary30 ">{`Thank you for joining ${event?.name}! We're excited to have you with us.`}</p>
//                     </div>
//                     <img src="/images/heart.png" alt="heart" />
//                     <div className=" w-full mt-auto pb-4 px-4 flex justify-end items-end ">
//                         <CustomButton
//                             type="button"
//                             onClick={() => setTab(6)}
//                             rounded="44px"
//                             height="50px"
//                         >
//                             View Ticket On The App{" "}
//                         </CustomButton>
//                     </div>
//                 </div>
//             )}
//             {tab === 6 && (
//                 <div className=" w-full flex flex-col gap-6 items-center px-2 pb-4 ">
//                     <p className=" font-bold text-primary ">
//                         Get The Full Experience In The App!
//                     </p>
//                     <div className=" w-full flex flex-col gap-4 ">
//                         <div className=" flex w-full justify-between items-center ">
//                             <img
//                                 src="/images/google.png"
//                                 alt="google"
//                                 className=" w-[145px] "
//                             />
//                             <a
//                                 href="https://play.google.com/store/apps/details?id=com.hiroek.app.hiroek"
//                                 target="_blank"
//                             >
//                                 <CustomButton
//                                     rounded="8px"
//                                     width="93px"
//                                     fontSize="12px"
//                                     color="#37137F"
//                                     bgColor="#37137F4D"
//                                     height="44px"
//                                 >
//                                     Proceed
//                                 </CustomButton>
//                             </a>
//                         </div>
//                         <div className=" flex w-full justify-between items-center ">
//                             <img
//                                 src="/images/apple.png"
//                                 alt="google"
//                                 className=" w-[145px] "
//                             />
//                             <a
//                                 href="https://apps.apple.com/ng/app/hiroek/id6474194083"
//                                 target="_blank"
//                             >
//                                 <CustomButton
//                                     rounded="8px"
//                                     width="93px"
//                                     fontSize="12px"
//                                     color="#37137F"
//                                     bgColor="#37137F4D"
//                                     height="44px"
//                                 >
//                                     Proceed
//                                 </CustomButton>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import type { IEvent } from "../model/event";
import useAuth from "../hooks/useAuth";
import { ForgotPasswordTab, LoginTab, SignupTab, VerifyOtpTab } from "./forms";
import TicketSelectionTab from "./event/TicketSelectionTab";
import TicketPreviewTab from "./event/TicketPreviewTab";
import { AppDownloadTab, SuccessTab } from "./event/SuccessTab";
 

type TicketPayload = {
    numberOfTickets: number;
    ticketTypeId: string;
};

const STRIPE_FEES: Record<string, { percentage: number; fixed: number }> = {
    gbp: { percentage: 0.015, fixed: 0.2 },
    usd: { percentage: 0.029, fixed: 0.3 },
    eur: { percentage: 0.015, fixed: 0.25 },
    aud: { percentage: 0.0175, fixed: 0.3 },
    cad: { percentage: 0.029, fixed: 0.3 },
    nzd: { percentage: 0.0265, fixed: 0.3 },
    default: { percentage: 0.0325, fixed: 0.3 },
};

const BASE_HIROEK_FEE = 0.6;

export default function EventTicketForm({
    event,
    convert,
}: {
    setOpen?: any;
    event: IEvent;
    convert: any;
}) {
    const {
        formikSignup,
        signupMutation,
        formikVerify,
        verifyMutation,
        formik, 
        tab,
        isLoading,
        setTab,
        payForTicket,
        payForTicketFree,
        email,
        forgotMutation,
        formikForgotPassword,
        paymentUrl,
        discountCode,
        user,
        userDataMutation,
    } = useAuth();

    const [payload, setPayload] = useState<TicketPayload[]>([]);
    const [totalPrices, setTotalPrices] = useState(0);
    const [serviceFees, setServiceFees] = useState(0);
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL as string;

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("access_token");

    const totalTickets = payload.reduce((total, item) => total + item.numberOfTickets, 0);

    const getTicketCount = (ticketTypeId: string): number =>
        payload.find((p) => p.ticketTypeId === ticketTypeId)?.numberOfTickets ?? 0;

    const updateTicket = (ticketTypeId: string, action: "add" | "remove") => {
        setPayload((prev) => {
            const existing = prev.find((p) => p.ticketTypeId === ticketTypeId);

            if (existing) {
                const newCount = action === "add"
                    ? existing.numberOfTickets + 1
                    : existing.numberOfTickets - 1;

                if (newCount <= 0) return prev.filter((p) => p.ticketTypeId !== ticketTypeId);

                return prev.map((p) =>
                    p.ticketTypeId === ticketTypeId ? { ...p, numberOfTickets: newCount } : p
                );
            }

            if (action === "add") return [...prev, { ticketTypeId, numberOfTickets: 1 }];

            return prev;
        });
    }; 

    const handleSubmit = () => {
        const ticketData = discountCode?.data?.data?.code ? { eventId: event?._id, ticketTypes: payload, discountCode: discountCode?.data?.data?.code} : { eventId: event?._id, ticketTypes: payload };
        if (event?.ticketing[0]?.ticketPrice > 0) {
            payForTicket.mutate(ticketData);
        } else {
            payForTicketFree.mutate(ticketData);
        }
    };

    const handlePreview = () => setTab(user?.email ? 5 : 3);

    // Fetch user data on mount if userId exists
    useEffect(() => {
        if (!userId) return;
        userDataMutation?.mutate(userId);
    }, [userId]);

    // Skip to ticket selection if already logged in
    useEffect(() => {
        if (user?.fullname) setTab(2);
    }, []);

    // Sync email into verify formik field
    useEffect(() => {
        if (!formikVerify?.values?.phoneOrEmail) {
            formikVerify.setFieldValue("phoneOrEmail", email);
        }
    }, [email]);

    // Recalculate ticket subtotal whenever payload or event changes
    useEffect(() => {
        const total = payload.reduce((sum, selected) => {
            const ticket = event?.ticketing.find((t) => t._id === selected.ticketTypeId);
            return ticket ? sum + ticket.ticketPrice * selected.numberOfTickets : sum;
        }, 0);
        setTotalPrices(total / 100);
    }, [event, payload]);

    // Recalculate service fee whenever subtotal or currency changes
    useEffect(() => {
        const currency = event?.currency?.toLowerCase() ?? "default";
        const stripeFee = STRIPE_FEES[currency] ?? STRIPE_FEES.default;
        const rate = convert?.[currency] ?? convert?.gbp ?? 1;
        const hiroekFee = Math.round(BASE_HIROEK_FEE * rate * 100) / 100;

        const fee = Math.round(
            (hiroekFee + totalPrices * stripeFee.percentage + stripeFee.fixed) * 100
        ) / 100;

        setServiceFees(fee);
    }, [totalPrices, event?.currency]);

    // Listen for payment confirmation via socket
    useEffect(() => {
        if (!userId) return;

        const socket = io(BASE_URL?.replace("/api", ""), { auth: { token } });
        socket.on(`ticket-payment-${userId}`, () => setTab(4));

        return () => {
            socket.disconnect();
        };
    }, [userId]);

    const sharedPaymentProps = {
        payForTicket,
        payForTicketFree,
        payload,
    };

    const sharedPricingProps = {
        totalPrices,
        serviceFees,
        event,
    };

    const handleDiscount = ( code: string, amount: string ) => {
        discountCode.mutate({
            code: code,
            amount: amount
        })
    }

    return (
        <div className=" text-foreground " >
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

            {tab === 7 && (
                <div className="w-full flex flex-col h-[90vh]">
                    <iframe src={paymentUrl} width="100%" height="100%" />
                </div>
            )}

            {tab === 2 && (
                <TicketSelectionTab
                    {...sharedPaymentProps}
                    {...sharedPricingProps}
                    handleDiscount={handleDiscount}
                    user={user}
                    discountData={discountCode.data}
                    isLoading={discountCode.isPending}
                    getTicketCount={getTicketCount}
                    updateTicket={updateTicket}
                    handlePreview={handlePreview}
                />
            )}

            {tab === 5 && (
                <TicketPreviewTab
                    {...sharedPaymentProps}
                    {...sharedPricingProps}
                    discountData={discountCode.data}
                    user={user}
                    totalTickets={totalTickets}
                    handleSubmit={handleSubmit}
                    setTab={setTab}
                />
            )}

            {tab === 4 && (
                <SuccessTab event={event} setTab={setTab} />
            )}

            {tab === 6 && (
                <AppDownloadTab />
            )}
        </div>
    );
}
