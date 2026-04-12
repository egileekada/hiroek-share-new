import type { IMember } from "./user"

export interface IEvent {
    "fundRaiser": IFundRaiser,
    currency: string,
    "eventPledge": {
        "organizations": 
            {
                "fundRaised": number,
                "totalDonations": number,
                "_id": string,
                "name": string,
                "charityRegNumber": string,
                "email": string,
                "description": string,
                "logo": string,
                "address": string
            } []
        ,
        "totalPledgedAmount": number,
        "minimumPledge": number 
    },
    "loc": {
        "type": string,
        "coordinates": number[]
    },
    "adminType": string,
    "isTicketed": boolean,
    "isRecurring": boolean,
    "isPrimaryEvent": boolean,
    "primaryEventId": string,
    "members": any[],
    "meetingLink": string,
    "privacy": string,
    "invitees": any[],
    "_id": string,
    "name": string,
    "description": string,
    "category": {
        "_id": string,
        "name": string,
        "image": string
    },
    "eventEndDate": string,
    "endTime": string,
    "address": string,
    "recurrence": {
        "interval": number,
        "daysOfWeek": number[],
        "endType": string,
        "totalOccurrences": number,
        "_id": string,
        "frequency":string
    },
    "ticketing": IEventTicket[],
    "photo": string,
    "admin": {
        "_id": string,
        "name": string,
        "email": string,
        "description": string,
        "logo": string,
        photo: string
        fullname: string
        "address": string
    },
    "__v": number,
    "createdAt": string,
    "updatedAt": string
}

export interface IScanEvent {
    "callerType": string,
    "createAt": string,
    "_id": string,
    "event": string,
    "user": {
        "_id": string,
        "fullname": string,
        "photo": string
    },
    "attendee": string,
    "ticketId": string,
    "caller": {
        "_id": string,
        "name": string,
        "logo": string
    },
    "createdAt": string,
    "updatedAt": string,
    "__v": string
}

export interface IEventDashboard {
    "fundRaised": number | any;
    "todayDonations": number | any;
    "members": number | any;
    "tickets": number | any;
    "ticketValues": number | any;
    "pledges": number
}

interface IFundRaiser {
    "organizations": IOrganization[],
    "fundRaised": number,
    "goalReached": boolean,
    "fundRaisingGoal": number
}

interface IOrganization {
    "fundRaised": number,
    "totalDonations": number,
    "_id": string,
    "name": string,
    "charityRegNumber": string,
    "email": string,
    "description": string,
    "logo": string,
    address: string
}

export interface IEventTicket {
    "isPayedTicket": boolean,
    "absorbFees": boolean,
    "signUpLimit": number,
    "_id": string,
    "salesEndDate": string,
    "salesStartDate": string,
    "ticketPrice": number,
    "ticketType": string,
    spotsLeft: number
}

export interface ITicketHistory {
    "_id": string,
    "tickets": Array<any>,
    "createAt": string,
    "event": IEvent,
    "user": IMember,
    "totalTickets": number,
    "createdAt": string,
    "updatedAt": string,
    "__v": number
}

export interface IConversationMember {
    "participantType": string,
    "event": {
        "_id": string,
        "name": string,
        "photo": string
    },
    "participant": {
        "_id": string,
        "createdAt": string,
        "photo": string,
        "fullname": string
    },
    "name": string
}

export interface ICreateEvent {
    name: string
    description: string
    fundRaiser: {
        fundRaisingGoal: number | any
        organizations: string[]
    }
    ticketing: {
        ticketType: string
        ticketPrice: number | any
        signUpLimit: number | any
        salesStartDate: string // ISO date string
        salesEndDate: string   // ISO date string
        absorbFees: boolean
    }[]
    recurrence: {
        interval: number | any
        frequency: "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY" | string
        daysOfWeek: number[]
        endType: "AFTER_OCCURRENCES" | "ON_DATE" | string
        occurrenceCount: number | any
        endDate: string
    }
    category: string
    subcategory: string
    privacy: string
    eventEndDate: string
    endTime: string
    address: string
    latitude: number | any
    longitude: number | any
    signUpLimit: number | any
    communityId: string
    photo: string
}