export interface DocumentDetail {
    vaDocumentTitle: string;
    vaDocumentOrginalFileName: string;
    DocumentBase64: string;
}

export interface VendorRegisterModel {
    vaCompanyName: string;
    vaVendorName: string;
    loggedInEmployeeUID: string;
    intVendorType: number;
    vaContactNo: string;
    vaContactPersonName: string;
    vaContactPersonMailID: string;
    uiCurrencyID: string;
    // DocumentDetails: DocumentDetail[];
    countryUID: string;
    uiCompanyState: string;
    workContactCountryCodeUID: string;
    vaTRN: string;
    uiTaxTreatmentID: string;
    supplierCountryUID: string;
    tradeLicenseRemarks: string;
    ultimateBeneficiaryRemarks: string;
    bankStatementRemarks: string;
    shareHolderDocumentRemarks: string;
    taxDocumentRemarks: string;
}
