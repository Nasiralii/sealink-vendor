import { Component } from "@angular/core";
interface Product {
    checked?: boolean;
    name: string;
    rob: number;
    reqQty: number;
    fulfilledQty: number;
    unit: string;
    unitPrice: number;
    totalPrice: number;
}

@Component({
    selector: "app-purchase-order-details",
    templateUrl: "./purchase-order-details.component.html",
    styleUrls: ["./purchase-order-details.component.scss"],
})
export class PurchaseOrderDetailsComponent {
    checked: boolean = false;
    outlined: boolean = true;
    visibleReject: boolean = false;
    visibleApprove: boolean = false;
    activeIndex: number = 0;
    items = [
        { label: "Vendor Portal Registration" },
        { label: "Uploading Documents" },
        { label: "KYC Verification" },
    ];
    showDialogRej() {
        this.visibleReject = true;
    }
    showDialogApprv() {
        this.visibleApprove = true;
    }
    visible: boolean = false;

    showDialog() {
        this.visible = true;
    }
    constructor() {}
    product: Product[] = [
        {
            name: "Iron",
            rob: 2000,
            reqQty: 1500,
            fulfilledQty: 0, // Default to 0, can be updated
            unit: "Ton",
            unitPrice: 0, // Default to 0, can be updated
            totalPrice: 1750000,
        },
    ];
}
