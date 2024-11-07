import { Component } from "@angular/core";

@Component({
    selector: "app-rfq-view-vendor",
    templateUrl: "./rfq-view-vendor.component.html",
    styleUrls: ["./rfq-view-vendor.component.scss"],
})
export class RfqViewVendorComponent {
    checked: boolean = false;
    outlined: boolean = true;
    product = [{}];
    visibleReject: boolean = false;
    visibleApprove: boolean = false;

    showDialogRej() {
        this.visibleReject = true;
    }
    showDialogApprv() {
        this.visibleApprove = true;
    }
}
