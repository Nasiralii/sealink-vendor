import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "app-sidebar",
    templateUrl: "./sidebar.component.html",
    styleUrls: ["./sidebar.component.scss"],
})
export class SidebarComponent {
    constructor(private router: Router) {}
    onNavigateRFQ() {
        this.router.navigate(["/web"], {
            queryParams: {
                menu_id: 102,
                f_id: 501,
                action: 1205,
            },
        });
    }
    onNavigatePurchase() {
        this.router.navigate(["/web"], {
            queryParams: {
                menu_id: 102,
                f_id: 501,
                action: 1206,
            },
        });
    }
}
