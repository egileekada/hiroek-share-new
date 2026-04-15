
export interface IParnter {
    "pinSet": boolean,
    "eventsPerYear": number,
    "isVerified": boolean,
    "accountClaimed": boolean,
    "_id": string,
    "name": string,
    "email": string,
    "address": string,
    "telephone": string,
    "logo": string,
    "userId": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    "bio": string
} 


export interface IUserDetail {
    "isActive": boolean,
    "isAdmin": boolean,
    "blocked": boolean,
    "isDeleted": boolean,
    "isAccountSetup": boolean,
    "role": string,
    "blockedUsers": string[],
    "following": string[],
    "followers": string[],
    "importedContacts": string[],
    "fcm_tokens": string,
    "_id": string,
    "fullname": string,
    "email": string,
    "phone": string,
    "createdAt": string,
    "updatedAt": string, 
}

export interface IUser {
    accountClaimed: boolean;
    bankAccountName: string;
    bankAccountNumber: string;
    bankName: string;
    charityRegNumber: string;
    city: string;
    country: string;
    createdAt: string;
    description: string;
    email: string;
    fundRaised: number;
    interests: Array<any>;
    loc: {
        type: string;
        coordinates: Array<any>
    };
    logo: string;
    name: string;
    postalCode: string;
    subcategories: Array<any>;
    totalDonations: number;
    updatedAt: string;
    userId: string;
    _id: string
}


export interface IMember {
    loc: {
        type: string;
        coordinates: Array<any>
    };
    "isActive": boolean,
    "isAdmin": boolean,
    "blocked": boolean,
    "isDeleted": boolean,
    "isAccountSetup": boolean,
    "role": "user",
    "blockedUsers": [],
    "following": Array<string>,
    "followers": Array<string>,
    "importedContacts": Array<any>,
    "fcm_tokens": string,
    "_id": string,
    "interest": Array<string>,
    "phone": string,
    "callingCode": string,
    "createdAt": string,
    "updatedAt": string,
    "__v": number,
    "birthDate": string,
    "email": string,
    "fullname": string,
    "photo": string
} 

export interface IChatdetail {
    "senderType": string,
    "recipientType": string,
    "status": string,
    "_id": string,
    "conversation": string,
    "message": string,
    "sender": {
        "fcm_tokens": string,
        "_id": string,
        "fullname": string,
        "email": string,
        "createdAt": string
    },
    "recipient": {
        "_id": string,
        "name": string,
        "address": string,
        "email": string,
        "bio": string,
        "logo": string,
        "createdAt": string
    },
    "createdAt": string,
    "updatedAt": string, 
}