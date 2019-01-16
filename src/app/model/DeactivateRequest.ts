import { Device } from "./device";

export interface DeactivateRequest {
    requestId: string;
    sessionId: string;
    userId: number;
    cid: number;
    reason: number;
    status: number;
    cm_notes: string;
    cust_notes: string;
    createdDate: string;
    completedDate: string;
    username: string;
    deviceList: Device[];
    fee: number;
    requestedDate: Date;
}