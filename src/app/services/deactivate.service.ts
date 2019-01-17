import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";
import { Device } from "../model/device";
import { DeactivateRequest } from "../model/DeactivateRequest";


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

    getDeactivateRequest(requestId: string): Observable<any> {
        let fullURL = `${this.baseUrl}deactivate/getRequest?requestId=${requestId}`;

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
        return this.http.post(fullURL, deactivateRequest); 
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

    updateDeviceFees(deviceList: Device[]): Observable<any> {
        let fullURL = `${this.baseUrl}deactivate/updateDeviceFees`;

        return this.http.post(fullURL, deviceList, this.httpOptions);
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