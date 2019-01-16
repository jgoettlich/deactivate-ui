import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from "rxjs";
import { EventEmitter } from "events";


@Injectable()
export class CustomerService {
    private baseUrl: string = '/deactivate-service/api/customer/';
    showCompanySearch: boolean;
    sessionId: string = null;
    companyId: number = 57;
    onCompanyChanged: EventEmitter = null;
    isCustomerManager: boolean = true;
    httpOptions = null;

    constructor(private http: HttpClient){
        this.onCompanyChanged = new EventEmitter();
        this.httpOptions = {
            headers: new HttpHeaders({
                'Access-Control-Allow-Origin':'*'
            })
        };
    }

    getCompanyId(): number {
        return this.companyId;
    }

    setCompanyId(companyId: number){
        this.companyId = companyId;
        this.onCompanyChanged.emit('companyChanged', {value: companyId});
    }

    getCustomerList(query: string): Observable<any> {
        let page: number = 0;
        let pageSize: number = 10;
        let fullUrl = this.baseUrl + `getCustomerList?page=${page}&pageSize=${pageSize}&query=${query}`;

        return this.http.get(fullUrl, this.httpOptions);
    }

    getCustomer(companyId: number): Observable<any> {
        let fullUrl = `${this.baseUrl}getCustomer?companyId=${companyId}`;

        return this.http.get(fullUrl, this.httpOptions);
    }

    getCustomerInfo(companyId: number): Observable<any> {
        let fullUrl = `${this.baseUrl}getCustomerInfo?companyId=${companyId}`;
        
        return this.http.get(fullUrl, this.httpOptions);
    }
}