import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { VendorLoginComponent } from './vendor-login/vendor-login.component';
import { VendorRegisterComponent } from './vendor-register/vendor-register.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            { path: 'login', component: VendorLoginComponent },
            { path: 'register', component: VendorRegisterComponent },
        ])
    ],
    exports: [RouterModule]
})
export class VendorAuthorizationRoutingModule {
}
