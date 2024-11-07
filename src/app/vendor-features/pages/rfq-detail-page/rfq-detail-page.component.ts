import { Component, OnDestroy, OnInit } from "@angular/core";
import { VendorRFQService } from "../../services/vendor-rfq-service";
import { ApiService } from "src/app/services/API/api.service";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "ngx-webstorage";
import { MessageService } from "primeng/api";
import { forkJoin, switchMap, takeWhile } from "rxjs";

@Component({
    selector: "app-rfq-detail-page",
    templateUrl: "./rfq-detail-page.component.html",
    styleUrls: ["./rfq-detail-page.component.scss"],
})
export class RfqDetailPageComponent implements OnInit, OnDestroy {
    rfqDetailForm: FormGroup;
    componentAlive = true;
    quality: any[] | undefined;
    userInfo: any;
    checked: boolean = false;
    outlined: boolean = true;
    visibleReject: boolean = false;
    visibleApprove: boolean = false;
    selectedFile: File | null = null;
    fileName: string | null = null;
    rfqsDetailData: any = {};
    itemRequisitionDetailData: any;
    rfqSummaryUID: any;
    total_price: any = 0;

    showDialogRej() {
        this.visibleReject = true;
    }

    showDialogApprv() {
        this.visibleApprove = true;
    }

    showApprovalDialog: boolean = false;
    showDialog() {
        this.showApprovalDialog = true;
    }

    constructor(
        private vendorRFQService: VendorRFQService,
        private server: ApiService,
        private storage: LocalStorageService,
        private fb: FormBuilder,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private message: MessageService
    ) {
        this.rfqDetailForm = this.fb.group({
            insertQuotation: this.fb.group({
                loggedInEmployeeUID: [""],
                companyUID: [""],
                RFQUID: [""],
                expectedDeliveryDate: [""],
                remarks: [""],
                rfqIncoTermUID: [""],
                rfqIncoTermValue: [""],
            }),

            setQuotations: this.fb.group({
                RFQUID: [""],
                rfqDetailUID: [""],
                vendorQuantity: [""],
                vendorUnitPrice: [""],
                vendorQualityUID: [""],
                companyUID: [""],
                loggedInEmployeeUID: [""],
                rfqVendorMake: [""],
                rfqVendorReason: [""],
                rfqItemMakerDetails: [""],
                rfqIsQuotationSend: [""],
                rfqVendorExpectedDeliveryDate: [""],
                rfqQuantity: [""],
                rfFulfilqQuantity: [""],
            }),
        });
    }

    ngOnInit(): void {
        this.userInfo = this.storage.retrieve("userinfo");

        this.activateRoute.queryParams
            .pipe(takeWhile(() => this.componentAlive))
            .subscribe((x) => {
                this.rfqSummaryUID = x.rfqSummaryUID;
                this.getRfqDetail(x.rfqSummaryUID);
            });

        this.getIncoTerm();
        this.getQualityMaster();
    }

    private getRfqDetail(rfqSummaryUID = "") {
        // const query = { loggedInEmployeeUID: "ED898021-3335-EF11-9486-6045BD6A77B3", rfqSummaryUID: "348DF3BA-E939-EF11-9486-6045BD6A77B3" }
        const query = {
            loggedInEmployeeUID: this.userInfo.uiContactId,
            rfqSummaryUID: !!rfqSummaryUID ? rfqSummaryUID : this.rfqSummaryUID,
        };

        this.vendorRFQService.rfqsDetails(query).subscribe((x) => {
            if (
                x != null &&
                x?.responseResult?.responseDescription == "SUCCESS"
            ) {
                this.rfqsDetailData = x.RFQSummary[0];
                this.itemRequisitionDetailData = x.ItemRequisitionDetail;
                // console.log(this.rfqsDetailData, "this.rfqsDetailData")
                console.log(
                    this.itemRequisitionDetailData,
                    "this.itemRequisitionDetailData"
                );

                this.updateFormValues(x);
            } else {
                // log errors
            }
        });
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];
            this.fileName = this.selectedFile.name;
            console.log("Selected file:", this.selectedFile);
        }
    }

    uploadFile(): void {
        if (this.selectedFile) {
            const formData = new FormData();
            formData.append("file", this.selectedFile);
        } else {
            console.error("No file selected");
        }
    }

    incoTermList = [];
    getIncoTerm() {
        const data = {
            Keyword: "",
        };
        this.incoTermList = [];
        this.server
            .postData("api/Rfq/fetch-inco-terms", data)
            .subscribe((res: any) => {
                if (
                    res.responseResult !== null &&
                    res.responseResult.responseDescription === "SUCCESS"
                ) {
                    console.log(res, "incoterm");
                    this.incoTermList = res?.IncoTerms;
                }
            });
    }

    ngOnDestroy(): void {
        this.componentAlive = false;
    }

    submitQuotation() {
        this.showApprovalDialog = false;

        const insertQ = this.insertQuotation();
        const setQ$ = this.setQuotation();

        forkJoin({
            insertQ: insertQ,
            setQ: setQ$,
        }).subscribe((res) => {
            if (res.insertQ?.responseResult?.ResponseMessage == "SUCCESS") {
                this.message.add({
                    severity: "success",
                    summary: "Success",
                    detail: "RFQ quotation updated successfully",
                });
                this.getRfqDetail(); // Refresh the page
                this.router.navigate(["/vendor/rfp-list"], {
                    queryParams: { status: "Processing" },
                });
            } else {
                this.message.add({
                    severity: "error",
                    summary: "Error",
                    detail: "Something went wrong!",
                });
            }
        });
    }

    insertQuotation() {
        const query = {
            ...this.rfqDetailForm.get("insertQuotation").value,
            rfqStatus: "Processing",
        };

        return this.vendorRFQService.insertQuotation(query);
    }

    setQuotation() {
        const query = this.rfqDetailForm.get("setQuotations").value;
        query.rfqVendorExpectedDeliveryDate = this.formatDate(query.rfqVendorExpectedDeliveryDate,'-')
        return this.vendorRFQService.setQuotationItem(query);
    }

    private updateFormValues(detailAPIResponse: any) {
        let rfqSummary = detailAPIResponse.RFQSummary[0];
        let itemRequisitionDetail = detailAPIResponse.ItemRequisitionDetail[0];
        this.rfqDetailForm = this.fb.group({
            insertQuotation: this.fb.group({
                loggedInEmployeeUID: [this.userInfo.uiContactId],
                companyUID: [rfqSummary?.rfqCompanyUID],
                RFQUID: [rfqSummary?.rfqSummaryUID],
                expectedDeliveryDate: [rfqSummary?.rfqExpectedArrivalDate],
                remarks: [rfqSummary.rfqOwnerApprovalRemarks],
                rfqIncoTermUID: [rfqSummary?.rfqIncoTermUID],
                rfqIncoTermValue: [rfqSummary.rfqIncoTermValue],
            }),

            setQuotations: this.fb.group({
                RFQUID: [rfqSummary.rfqSummaryUID],
                rfqDetailUID: [itemRequisitionDetail.rfqDetailUID],
                vendorQuantity: [itemRequisitionDetail.rfqVendorQuantity],
                vendorUnitPrice: [itemRequisitionDetail.rfqVendorUnitPrice],
                vendorQualityUID: [itemRequisitionDetail.rfqVendorQualityUID],
                companyUID: [rfqSummary?.rfqCompanyUID],
                loggedInEmployeeUID: [this.userInfo.uiContactId],
                rfqVendorMake: [itemRequisitionDetail.rfqVendorMake],
                rfqVendorReason: [itemRequisitionDetail.rfqVendorReason],
                rfqIsQuotationSend: [itemRequisitionDetail.rfqIsQuotationSend],
                rfqVendorExpectedDeliveryDate: [itemRequisitionDetail.rfqVendorExpectedDeliveryDate != null ? new Date(itemRequisitionDetail.rfqVendorExpectedDeliveryDate): ''],
                rfqQuantity: [itemRequisitionDetail.rfqQuantity],
            }),
        });
        this.rfqDetailForm.updateValueAndValidity();
        this.totalPrice();
        // this.rfqDetailForm.valueChanges.subscribe();
        // log change
        //   this.rfqDetailForm.get('insertQuotation')?.setValue(insertQuotationData);
    }

    getQualityMaster() {
        const data = {
            masterCode: "GM0063",
        };

        this.server
            .postData("api/Master/fetch-master-details", data)
            .subscribe((res: any) => {
                console.log("QUAres", res);
                this.quality = res.MasterDetails;
            });
    }

    // totalPrice() {
    //     const unitPrice =
    //         this.rfqDetailForm.get("insertQuotation.vendorUnitPrice")?.value ||
    //         0;
    //     const quantity =
    //         this.rfqDetailForm.get("insertQuotation.vendorQuantity")?.value ||
    //         0;
    //     this.total_price = unitPrice * quantity;
    //     console.log(unitPrice, " * ", quantity);
    // }

    totalPrice() {
        const setQuotations = this.rfqDetailForm.get("setQuotations").value;
        if (setQuotations) {
            const unitPrice = setQuotations.vendorUnitPrice || 0;
            const quantity = setQuotations.vendorQuantity || 0;
            this.total_price = unitPrice * quantity;
            console.log(
                this.rfqDetailForm.get("setQuotations").value,
                unitPrice,
                quantity
            );
        }
    }

    formatDate(date: any, type: any): string {
        console.log(date, "date");
        if (date == null || date == "") {
            return null;
        }
        // date = date.replace(/\//g, '-');
        if (date instanceof Date) {
        } else {
            if (date.includes("/")) {
                const [dayy, monthh, yeary] = date.split("/");
                date = `${yeary}-${monthh}-${dayy}`;
            }
        }

        const d = new Date(date);
        console.log(date, d, "date");
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, "0");
        const day = d.getDate().toString().padStart(2, "0");
        if (type == "-") {
            return `${year}-${month}-${day}`;
        }
        return `${day}/${month}/${year}`;
    }
}
