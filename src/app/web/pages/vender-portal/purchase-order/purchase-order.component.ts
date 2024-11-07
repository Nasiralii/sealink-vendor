import { Component } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector: "app-purchase-order",
    templateUrl: "./purchase-order.component.html",
    styleUrls: ["./purchase-order.component.scss"],
})
export class PurchaseOrderComponent {
    isDropdownOpen: boolean = false; // Initial state
    constructor(private router: Router) {}
    toggleDropdown() {
        this.isDropdownOpen = !this.isDropdownOpen;
    }
    first2 = 0;
    rows2 = 10;
    firstAsset = 0;
    rowsAsset = 10;
    onPageChange(event: any) {
        this.first2 = event.first;
        this.rows2 = event.rows;
    }
    products = [
        {
            quoteNumber: "Q123",
            poNumber: "PO156",
            status: "Received",
            publishedDate: new Date("2024-08-01"),
            emergencyProcurement: true,
        },
        {
            quoteNumber: "Q124",
            poNumber: "PO436",
            status: "Accepted",
            publishedDate: new Date("2024-08-05"),
            emergencyProcurement: true,
        },
        {
            quoteNumber: "Q125",
            poNumber: "PO454",
            status: "Rejected",
            publishedDate: new Date("2024-08-08"),
            emergencyProcurement: true,
        },
    ];
    categories: string[] = ["Tax Category", "Service Category"];
    selectedCategory: string | null = null;
    selectCategory(category: string) {
        this.selectedCategory = category;
    }
    groups: string[] = ["Tax Category", "Service Category"];
    selectedGroup: string | null = null;
    selectGroup(group: string) {
        this.selectedGroup = group;
    }
    addCategory(newCategory: string) {
        this.categories.push(newCategory);
    }
    onNavigateToDetails() {
        this.router.navigate(["/web"], {
            queryParams: {
                menu_id: 102,
                f_id: 501,
                action: 1207,
            },
        });
    }
}
