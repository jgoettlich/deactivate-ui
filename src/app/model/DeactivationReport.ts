
export interface DeactivationReport {
    vid: number;
    cid: number;
    trucknum: string;
    dsn: number;
    status: number;
    requestDate: string;
    completedDate: string;
    username: string;
    cm_notes: string;
    cust_notes: string;
    reason: number;
}