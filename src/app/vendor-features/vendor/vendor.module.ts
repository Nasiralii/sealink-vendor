import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { VendorRoutingModule } from "./vendor-routing.module";
import { VendorComponent } from "./vendor.component";
import { VendorCanActivateGuardGuard } from "src/app/authorization/guard/vendor-can-activate-guard.guard";
import { SidebarComponent } from "../pages/sidebar/sidebar.component";
import { primengModules } from "src/app/shared/primeng";
import { DashboardVendorComponent } from "../pages/dashboard-vendor/dashboard-vendor.component";
import { RfqComponent } from "../pages/rfq/rfq.component";
import { RfqDetailPageComponent } from "../pages/rfq-detail-page/rfq-detail-page.component";
import { PurchaseOrderComponent } from "../pages/purchase-order/purchase-order.component";
import { PurchaseOrderDetailsComponent } from "../pages/purchase-order-details/purchase-order-details.component";
import { ConfirmationVendorComponent } from "../pages/shared/confirmation-vendor/confirmation-vendor.component";
import { FooterComponent } from "../pages/footer/footer.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
    declarations: [
        VendorComponent,
        SidebarComponent,
        DashboardVendorComponent,
        RfqComponent,
        RfqDetailPageComponent,
        PurchaseOrderComponent,
        FooterComponent,
        PurchaseOrderDetailsComponent,
        ConfirmationVendorComponent,
        // FormsModule,
    ],
    providers: [VendorCanActivateGuardGuard],
    imports: [FormsModule, ReactiveFormsModule, CommonModule, VendorRoutingModule, primengModules],
})

export class VendorModule {}
