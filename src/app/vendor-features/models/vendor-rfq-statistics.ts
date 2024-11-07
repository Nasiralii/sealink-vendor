export interface VendorRfqStatisticsApiResponse {
    responseResult: ResponseResult;
    data: RfqStatistic[];
}

export interface ResponseResult {
    responseCode: string;
    responseDescription: string;
}

export interface RfqStatistic {
    uiContactId: string;
    vaCompanyName: string;
    RfqReceived: number;
    RfqProcessing: number;
    RfqProcessed: number;
    RfqRejected: number;
    PoReceived: number;
    PoApproved: number;
    PoRejected: number;
}

export interface VendorRfqStatisticsQuery {
    VendorUID?: string;
}
