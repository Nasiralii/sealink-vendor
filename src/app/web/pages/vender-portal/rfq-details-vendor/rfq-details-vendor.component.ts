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
    selector: "app-rfq-details-vendor",
    templateUrl: "./rfq-details-vendor.component.html",
    styleUrls: ["./rfq-details-vendor.component.scss"],
})
export class RfqDetailsVendorComponent {
    checked: boolean = false;
    outlined: boolean = true;
    visibleReject: boolean = false;
    visibleApprove: boolean = false;
    selectedFile: File | null = null;
    fileName: string | null = null;

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
}
