export interface ResponseResult {
    responseCode: string;
    responseDescription: string;
}

export interface RfqData {
    rfqSummaryID?: number;
    rfqSummaryUID?: string;
    rfqNumber?: string;
    rfqDate?: string | null;
    rfqOrderDeadLineDate?: string;
    rfqExpectedArrivalDate?: string;
    rfqStatus?: string;
    rfqVesselUID?: string;
    vesselName?: string;
    rfqCreatedDate?: string;
    rfqBranchUID?: string | null;
    BranchName?: string | null;
    rfqCompanyUID?: string;
    CompanyName?: string;
}

export interface VendorRfqDataQuery {
    VendorUID?: string;
    DateFrom?: string;
    DateTo?: string;
    Status?: string;
    Keyword?: string;
}

export interface VendorRFQApiResponse {
    responseResult: ResponseResult;
    data: RfqData[];
}  