import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { RfqData, VendorRfqDataQuery } from "../../models/vendor-rfq-models";
import { VendorRFQService } from "../../services/vendor-rfq-service";
import { LocalStorageService } from "ngx-webstorage";
import { MessageService } from "primeng/api";
import { switchMap, takeWhile } from "rxjs";
@Component({
    selector: "app-rfq",
    templateUrl: "./rfq.component.html",
    styleUrls: ["./rfq.component.scss"],
})

export class RfqComponent implements OnInit, OnDestroy {
    componentAlive = true;
    userInfo: any;

    isDropdownOpen: boolean = false;
    constructor(
        private router: Router,
        private activateRoute: ActivatedRoute,
        private storage: LocalStorageService,
        private vendorRFQService: VendorRFQService,
        private message: MessageService,
    ) {
    }

    ngOnInit(): void {
        this.userInfo = this.storage.retrieve('userinfo');
        this.activateRoute.queryParams
            .pipe(takeWhile(() => this.componentAlive))
            .subscribe(x => {
                this.getRFQList(x.status)
            });

    }
    toggleDropdown() {
        // this.isDropdownOpen = !this.isDropdownOpen;
    }
    first2 = 0;
    rows2 = 10;
    firstAsset = 0;
    rowsAsset = 10;

    onPageChange(event: any) {
        this.first2 = event.first;
        this.rows2 = event.rows;
        console.log(event)
    }

    rfqsData: RfqData[] = [];
    categories: string[] = [
        "RFQ Pending",
        "RFQ Processing",
        "RFQ Processed",
        "RFQ Rejected",
    ]; // Start with predefined categories
    selectedCategory: string | null = null; // To keep track of the selected category
    selectCategory(category: string) {
        this.selectedCategory = category;
    }
    groups: string[] = [
        "Status",
        "Created Date",
        "Order Deadline",
        "Expected Arrival",
        "Publish Date",
        "Port Name",
        "Vessel/Branch",
        "Company",
    ];
    selectedGroup: string | null = null; // Track selected group

    // Function to handle group selection
    selectGroup(group: string) {
        this.selectedGroup = group; // Set the selected group
    }
    // Method to add a new category dynamically (for demonstration)
    addCategory(newCategory: string) {
        this.categories.push(newCategory); // Add new category to the list
    }


    onNavigateToDetails(rfq) {  
        this.router.navigate(["/vendor/rfp-details"], { queryParams: { rfqSummaryUID: rfq.rfqSummaryUID } });
        // this.router.navigate(["vendor/rfp-details"]);
    }

    private getRFQList(status: string) {
        const query: VendorRfqDataQuery = {
            VendorUID: this.userInfo.uiContactId,
            // VendorUID: "9FDE0674-A0D7-EE11-9483-6045BD6A77B3",
            DateFrom: null,
            DateTo: null,
            Status: status == 'all' ? null : status
        }

        this.vendorRFQService.listRFQs(query).subscribe(x => {
            if (x?.responseResult?.responseDescription == "SUCCESS") {
                this.rfqsData = x?.data || [];
            } else {
                this.message.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
            }
        });
    }

    ngOnDestroy(): void {
        this.componentAlive = false;
    }
}
