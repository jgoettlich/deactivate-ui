import { Device } from "./device";

export interface DeactivateRequest {
    sessionId: string;
    deviceList: Device[];
}