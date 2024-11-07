import { Component } from "@angular/core";
import { Router } from "@angular/router";
@Component({
    selector: "app-rfq",
    templateUrl: "./rfq.component.html",
    styleUrls: ["./rfq.component.scss"],
})
export class RfqComponent {
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
            rfqId: "RFQ-2023-001",
            status: "Pending",
            createdDate: "23-11-2023",
            orderDeadline: "23-11-2023",
            expectedArrival: "23-11-2023",
        },
        {
            rfqId: "RFQ-2023-002",
            status: "Processing",
            createdDate: "24-11-2023",
            orderDeadline: "24-11-2023",
            expectedArrival: "24-11-2023",
        },
        {
            rfqId: "RFQ-2023-002",
            status: "Processed",
            createdDate: "24-11-2023",
            orderDeadline: "24-11-2023",
            expectedArrival: "24-11-2023",
        },
        {
            rfqId: "RFQ-2023-002",
            status: "Rejected",
            createdDate: "24-11-2023",
            orderDeadline: "24-11-2023",
            expectedArrival: "24-11-2023",
        },
        // Add more product objects as needed
    ];
    categories: string[] = ["Tax Category", "Service Category"]; // Start with predefined categories
    selectedCategory: string | null = null; // To keep track of the selected category

    // Function to handle category selection
    selectCategory(category: string) {
        this.selectedCategory = category; // Set the selected category
    }
    groups: string[] = ["Tax Category", "Service Category"]; // Predefined groups
    selectedGroup: string | null = null; // Track selected group

    // Function to handle group selection
    selectGroup(group: string) {
        this.selectedGroup = group; // Set the selected group
    }
    // Method to add a new category dynamically (for demonstration)
    addCategory(newCategory: string) {
        this.categories.push(newCategory); // Add new category to the list
    }
    onNavigateToDetails() {
        this.router.navigate(["/web"], {
            queryParams: {
                menu_id: 102,
                f_id: 501,
                action: 1201,
            },
        });
    }
}
