import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { AuthGuard } from "./authorization/guard/auth-guard";
import { NonAuthGuard } from "./authorization/guard/non-auth-guard";
import { ForbiddenComponent } from "./forbidden/forbidden.component";

@NgModule({
    imports: [
        RouterModule.forRoot(
            [
                {
                    path: "vendor",
                    loadChildren: () =>
                        import("./vendor-features/vendor/vendor.module").then(
                            (m) => m.VendorModule
                        ),
                },
                {
                    path: "web",
                    loadChildren: () =>
                        import("./web/web.module").then((m) => m.WebModule),
                    canActivate: [AuthGuard],
                },

                {
                    path: "auth",
                    loadChildren: () =>
                        import("./authorization/authorization.module").then(
                            (m) => m.AuthorizationModule
                        ),
                    canActivate: [NonAuthGuard],
                },
                {
                    path: "vendor-auth",
                    loadChildren: () =>
                        import(
                            "./vendor-features/vendor-auth/vendor-auth.mdoule"
                        ).then((m) => m.VendorAuthorizationModule),
                },
                { path: "forbidden", component: ForbiddenComponent },

                {
                    path: "**",
                    redirectTo: "/vendor-auth/login",
                },
            ],
            { scrollPositionRestoration: "enabled" }
        ),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
