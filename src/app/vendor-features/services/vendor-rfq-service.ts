import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { BaseApiService } from "./base-api-service";
import { VendorRfqDataQuery, VendorRFQApiResponse } from "../models/vendor-rfq-models";
import { VendorRfqStatisticsApiResponse, VendorRfqStatisticsQuery } from "../models/vendor-rfq-statistics";

@Injectable({
    providedIn: "root",
})
export class VendorRFQService {
    constructor(private api: BaseApiService) { }

    listRFQs(data: VendorRfqDataQuery): Observable<VendorRFQApiResponse> {
        return this.api.post<VendorRFQApiResponse>(`api/Rfq/rfq-list-for-contact-login `, data);
    }

    rfqsDetails(data: any): Observable<any> {
        return this.api.post<any>(`api/Rfq/fetch-rfq-details-based-on-id-for-contact`, data);
    }

    rfqStatistics(data: VendorRfqStatisticsQuery): Observable<VendorRfqStatisticsApiResponse> {
        return this.api.post<VendorRfqStatisticsApiResponse>(`api/Rfq/contact-dashboard-statistics`, data);
    }

    insertQuotation(data: any): Observable<any> {
        // "rfqStatus":"Processing",
        return this.api.post<any>(`api/quotation/insert-quotation`, data);
    }

    setQuotationItem(data: any): Observable<any> {
        return this.api.post<any>(`api/quotation/set-quotation-item`, data);
    }
}
