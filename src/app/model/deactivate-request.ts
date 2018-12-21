import { Device } from "../model/device";

export interface DeactivateRequest {
    requestId: string;
    sessionId: string;
    userId: number;
    cid: number;
    reason: number;
    status: number;
    cm_notes: string;
    cust_notes: string;
    requestDate: string;
    completedDate: string;
    username: string;
    deviceList: Device[];
}