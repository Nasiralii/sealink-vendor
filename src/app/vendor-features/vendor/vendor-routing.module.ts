import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorComponent } from './vendor.component';
import { VendorCanActivateGuardGuard } from 'src/app/authorization/guard/vendor-can-activate-guard.guard';
import { DashboardVendorComponent } from '../pages/dashboard-vendor/dashboard-vendor.component';
import { RfqComponent } from '../pages/rfq/rfq.component';
import { RfqDetailPageComponent } from '../pages/rfq-detail-page/rfq-detail-page.component';
import { PurchaseOrderDetailsComponent } from '../pages/purchase-order-details/purchase-order-details.component';
import { PurchaseOrderComponent } from '../pages/purchase-order/purchase-order.component';
import { AuthGuard } from 'src/app/authorization/guard/auth-guard';

const routes: Routes = [
  {
    path: '',
    component: VendorComponent,
    canActivate: [VendorCanActivateGuardGuard],
    //canActivate: [AuthGuard],
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
      { path: 'dashboard', component: DashboardVendorComponent },
      { path: 'rfp-list', component:  RfqComponent},
      { path: 'rfp-details', component:  RfqDetailPageComponent},
      { path: 'purchase-orders', component:  PurchaseOrderComponent},
      { path: 'purchase-order-details', component:  PurchaseOrderDetailsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorRoutingModule { }
 