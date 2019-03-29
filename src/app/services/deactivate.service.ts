import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { Device } from "../model/device";
import { DeactivateRequest } from "../model/DeactivateRequest";
import { StatusUpdate } from "../model/StatusUpdate";
import { ReasonUpdate } from "../model/REasonUpdate";


@Injectable()
export class DeactivateService {

    httpOptions = null;
    private baseUrl: string = '/deactivate-service/api/';

    constructor(private http: HttpClient){
        this.httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*'
            })
        };
    }

    setAccessToken(token: string): void {
        if(token == null){
            return;
        }
        this.httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*',
                'x-access-token': token
            })
        };
    }

    getDeviceList(companyId: number, page: number, pageSize: number): Observable<any> {
        let fullUrl = this.baseUrl + `device/getDeviceList?companyId=${companyId}&page=${page}&pageSize=${pageSize}`;

        // Get autmatically converts from JSON
        return this.http.get(fullUrl, this.httpOptions);//.pipe(map((this.extractData)));
    }

    getDeactivateReport(companyId: number, page: number, pageSize: number, 
        onlyPending: boolean, sortColumn: string, sortAsc: boolean,
        filterColumn: string, filterValue: any): Observable<any> {
        let fullUrl = this.baseUrl + `deactivate/getReport?companyId=${companyId}&page=${page}&pageSize=${pageSize}&onlyPending=${onlyPending}`;
        fullUrl += `&sortColumn=${sortColumn}&sortAsc=${sortAsc}`;

        if(filterColumn != null){
            fullUrl += `&filterColumn=${filterColumn}&filterValue=${filterValue}`;
        }

        return this.http.get(fullUrl, this.httpOptions);
    }

    getDeactivateRequest(requestId: string, companyId: number): Observable<any> {
        let fullURL = `${this.baseUrl}deactivate/getRequest?requestId=${requestId}&companyId=${companyId}`;

        return this.http.get(fullURL, this.httpOptions);
    }

    getStatusSummary(companyId: number): Observable<any> {
        let fullURL = `${this.baseUrl}deactivate/getStatusSummary?companyId=${companyId}`;

        return this.http.get(fullURL, this.httpOptions);
    }

    findDevice(companyId: number, trucknum: string): Observable<any> {
        let fullUrl = `${this.baseUrl}device/getDevice?companyId=${companyId}&trucknum=${trucknum}`;

        return this.http.get(fullUrl, this.httpOptions);
    }

    deactivateDevice(deactivateRequest: DeactivateRequest): Observable<any>{
        let fullURL = `${this.baseUrl}deactivate/deactivateDevice`;
        return this.http.post(fullURL, deactivateRequest, this.httpOptions); 
    }

    removeDeviceFromRequest(device: Device): Observable<any>{
        let fullUrl = `${this.baseUrl}deactivate/removeDeviceFromRequest`;
        return this.http.post(fullUrl, device, this.httpOptions);
    }

    cancelRequest(request: DeactivateRequest): Observable<any>{
        let fullUrl = `${this.baseUrl}deactivate/cancelRequest`;
        return this.http.post(fullUrl, request, this.httpOptions);
    }

    updateRequest(request: DeactivateRequest): Observable<any> {
        let fullUrl = `${this.baseUrl}deactivate/updateRequest`;

        return this.http.post(fullUrl, request, this.httpOptions);
    }

    updateRequestStatus(statusUpdate: StatusUpdate): Observable<any> {
        let fullURL = `${this.baseUrl}deactivate/updateRequestStatus`;

        return this.http.post(fullURL, statusUpdate, this.httpOptions);
    }

    updateRequestReason(reasonUpdate: ReasonUpdate): Observable<any> {
        let fullURL = `${this.baseUrl}deactivate/updateRequestReason`;

        return this.http.post(fullURL, reasonUpdate, this.httpOptions);
    }

    updateDeviceFees(deviceList: Device[]): Observable<any> {
        let fullURL = `${this.baseUrl}deactivate/updateDeviceFees`;

        return this.http.post(fullURL, deviceList, this.httpOptions);
    }
}