import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http'
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Device } from "./device";
import { DeactivateRequest } from "./deactivate-request";
import { DeactivationReport } from "./DeactivationReport";


@Injectable()
export class DeactivateService {

    private baseUrl: string = '/api/';

    constructor(private http: HttpClient){

    }

    getDeviceList(companyId: number, page: number, pageSize: number): Observable<any> {
        let fullUrl = this.baseUrl + `device/getDeviceList?companyId=${companyId}&page=${page}&pageSize=${pageSize}`;

        // Get autmatically converts from JSON
        return this.http.get(fullUrl);//.pipe(map((this.extractData)));
    }

    getSwapReport(companyId: number, page: number, pageSize: number, onlyPending: boolean): Observable<any> {
        let fullUrl = this.baseUrl + `deactivate/getReport?companyId=${companyId}&page=${page}&pageSize=${pageSize}&onlyPending=${onlyPending}`;

        return this.http.get(fullUrl);
    }

    findDevice(companyId: number, trucknum: string): Observable<any> {
        let fullUrl = `${this.baseUrl}device/getDevice?companyId=${companyId}&trucknum=${trucknum}`;

        return this.http.get(fullUrl);
    }

    swapDSN(deactivateRequest: DeactivateRequest): Observable<any>{
        let fullURL = `${this.baseUrl}deactivate/deactivateDevice`;
        return this.http.post(fullURL, deactivateRequest); 
    }

    cancelRequest(device: Device): Observable<any>{
        let fullUrl = `${this.baseUrl}deactivate/cancelRequest`;

        return this.http.post(fullUrl, device);
    }

    updateRequestStatus(request: DeactivationReport): Observable<any> {
        let fullUrl = `${this.baseUrl}deactivate/updateStatus`;

        return this.http.post(fullUrl, request);
    }

    private extractData(res: any){
        if(res == null){
            return null;
        }

        try{
            let body = res.json();
            return body || null;
        }catch(error){
            console.log(error);
            return null;
        }
    }
}