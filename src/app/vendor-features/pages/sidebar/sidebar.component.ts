import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { LocalStorageService } from "ngx-webstorage";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent implements OnInit {
    showRFQList = false;
    showPurchaseOrderList = false;
    showDrop: boolean;
    confirmPopupDescription: string;
    actionType: string;
    isConfirmStatusChange: boolean;
    confirmPopupTitle: any = "Confirm";

    constructor(private router: Router, private storage: LocalStorageService,) { }

    ngOnInit(): void {
        // Check the current route on initialization
        this.checkCurrentRoute(this.router.url);

        // Subscribe to route changes to handle navigation
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.checkCurrentRoute(event.url);
            }
        });
    }

    // Method to update the state based on the current URL
    checkCurrentRoute(url: string): void {
        this.showRFQList = url.includes("/vendor/rfp-list");
        this.showPurchaseOrderList = url.includes("/vendor/purchase-orders");
    }

    onNavigateRFQ(eve, status = 'all'): void {
        eve.stopPropagation();
        this.router.navigate(["/vendor/rfp-list"], { queryParams: { status } });
    }

    onNavigatePurchase(): void {
        this.router.navigate(["vendor/purchase-orders"]);
    }

    onNavigateDashboard(): void {
        this.router.navigate(["vendor/dashboard"]);
    }

    showConfirmation(type) {
        // To show confirmation popup
        if (type == "signout") {
            //logout confirmation
            this.showDrop = false;
            this.confirmPopupDescription = "Are you sure you want to sign out?";
            this.actionType = type;
        }
        this.isConfirmStatusChange = true;
    }

    confirmPopupClicked(confirm) {
        this.isConfirmStatusChange = false;
        this.showDrop = true;
        if (confirm) {
            //this.confirmStatusData.status = this.confirmStatusData.status ? false : true;
            if (this.actionType == "signout") {
                this.LogoutConfirmed();
            }
        }
    }

    LogoutConfirmed() {
        // function for logout

        this.storage.clear("accessToken");
        this.storage.clear("refreshToken");
        this.storage.clear("userInfo");
        this.router.navigate(["/vendor-auth/login"]);
    }
}
