import { NgModule } from '@angular/core';
import { VendorAuthorizationRoutingModule } from './vendor-auth-routing.module';
import { SharedService } from 'src/app/shared/services/shared.service';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { vendorPrimeNgModules } from '../shared-modules/primeng-Vendor.modules';
import { vendorSharedModules } from '../shared-modules/vendor-shared-modules';
import { VendorRegisterComponent } from './vendor-register/vendor-register.component';

@NgModule({
    imports: [
        vendorPrimeNgModules,
        vendorSharedModules,
        VendorAuthorizationRoutingModule,
    ],
    declarations: [
        VendorLoginComponent,
        VendorRegisterComponent,
    ],
    providers: [
        SharedService
    ],
    exports: []
})
export class VendorAuthorizationModule { }
