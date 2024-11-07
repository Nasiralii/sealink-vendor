import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BaseApiService } from "./base-api-service";

@Injectable({
    providedIn: "root",
})
export class VendorCommonService {
    constructor(private api: BaseApiService) {}

    getCurrencies(code: string = "GM0027"): Observable<any> {
        const data = {
            masterCode: code,
        };
        return this.api.post<any>(
            `api/Master/fetch-all-active-master-details`,
            data
        );
    }

    getCountryList(data: any) {
        return this.api.post<any>(
            `api/Master/fetch-country-basedon-visibility`,
            data
        );
    }

    getStateList(data: any) {
        return this.api.post<any>(`api/Master/fetch-state`, data);
    }

    postData(url: any, data: any) {
        return this.api.post<any>(url, data);
        // return this.api
        //     .post(`${URL + url}`, data)
        //     .pipe(catchError(this.handleError));
    }

    uploadDocuments(data: any) {
        return this.api.post<any>(`api/Vendor/insert-document`, data);
        // return this.api
        //     .post(`api/Vendor/insert-document`, data)
        //     .pipe(catchError(this.handleError));
    }
}
