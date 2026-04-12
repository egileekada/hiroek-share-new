import type { IMember } from "./user";

export interface ICommunity {
    admin: {
        _id: string
    };
    adminType: string;
    createdAt: string;
    description: string;
    interests: any
    invitees: Array<any>;
    members: Array<IMember>;
    moderators: Array<any>;
    name: string;
    photo: string;
    privacy: string;
    updatedAt: string;
    _id: string
}