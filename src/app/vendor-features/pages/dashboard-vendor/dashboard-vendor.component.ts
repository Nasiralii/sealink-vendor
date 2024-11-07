import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { LocalStorageService } from "ngx-webstorage";
import { MessageService } from "primeng/api";
import { VendorRFQService } from "../../services/vendor-rfq-service";
import { RfqStatistic, VendorRfqStatisticsQuery } from "../../models/vendor-rfq-statistics";

@Component({
    selector: "app-dashboard-vendor",
    templateUrl: "./dashboard-vendor.component.html",
    styleUrls: ["./dashboard-vendor.component.scss"],
})
export class DashboardVendorComponent implements OnInit {
    userInfo: any;
    isDropdownOpen: boolean = false; // Initial state
    showToggle: boolean = false;
    isArowDown: boolean = false;
    first2 = 0;
    value: string;
    rows2 = 10;
    firstAsset = 0;
    rowsAsset = 10;
    activeIndex: number = 0;
    currentStepIndex: number = 0;
    dashboardStatistics: RfqStatistic;
    constructor(
        private messageService: MessageService,
        private router: Router,
        private activateRoute: ActivatedRoute,
        private storage: LocalStorageService,
        private vendorRFQService: VendorRFQService,
    ) { }

    ngOnInit(): void {
        this.userInfo = this.storage.retrieve('userinfo');
        this.loadStatistics();
    }
    toggleDropdown() {
        // this.isDropdownOpen = !this.isDropdownOpen;
    }
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
    categories: string[] = [
        "RFQ Pending",
        "RFQ Processing",
        "RFQ Processed",
        "RFQ Rejected",
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
    handleToggle() {
        this.showToggle = !this.showToggle;
        this.isArowDown = !this.isArowDown;
    }

    onPageChange2(event: any) {
        this.first2 = event.first;
        this.rows2 = event.rows;
    }

    items: any[] = [
        { label: "Step 1", content: "Content for Step 1" },
        { label: "Step 2", content: "Content for Step 2" },
        { label: "Step 3", content: "Content for Step 3" },
    ];

    onActiveIndexChange(event: number) {
        this.activeIndex = event;
    }
    goToNextStep() {
        if (this.activeIndex < this.items.length - 1) {
            this.activeIndex++;
            console.log("Navigating to next step:", this.activeIndex); // Debugging line
            this.messageService.add({
                severity: "info",
                detail: `${this.items[this.activeIndex].label}`,
            });
        }
    }
    goToPreviousStep() {
        if (this.activeIndex > 0) {
            this.activeIndex--;
            console.log("Navigating to previous step:", this.activeIndex); // Debugging line
            this.messageService.add({
                severity: "info",
                summary: "Step Changed",
                detail: `Moved to ${this.items[this.activeIndex].label}`,
            });
        }
    }


    private loadStatistics() {
        const query: VendorRfqStatisticsQuery = {
            VendorUID: this.userInfo.uiContactId,
            // VendorUID: "9FDE0674-A0D7-EE11-9483-6045BD6A77B3",
        }

        this.vendorRFQService.rfqStatistics(query).subscribe(x => {
            if (x?.responseResult?.responseDescription == "SUCCESS") {
                this.dashboardStatistics = x?.data?.length ? x.data[0] : {} as RfqStatistic;
            } else {
                // log errors 
            }
        });
    }
}
