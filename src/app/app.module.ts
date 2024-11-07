import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "./app-routing.module";
import { ApiService } from "./services/API/api.service";
import { NgxWebstorageModule } from "ngx-webstorage";
import { AuthGuard } from "./authorization/guard/auth-guard";
import { NonAuthGuard } from "./authorization/guard/non-auth-guard";
import { ToastModule } from "primeng/toast";
import { AppComponent } from "./app.component";
import { AuthInterceptor } from "./shared/interceptors/auth.interceptor";
import { MessageService } from "primeng/api";
import { ForbiddenComponent } from "./forbidden/forbidden.component";
import { ReactiveFormsModule } from "@angular/forms";
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { RadioButtonModule } from "primeng/radiobutton";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgxWebstorageModule.forRoot(),
        ToastModule,
        ReactiveFormsModule,
        DialogModule,
        ButtonModule,
        RadioButtonModule,
    ],
    declarations: [AppComponent, ForbiddenComponent],
    providers: [
        ApiService,
        MessageService,
        AuthGuard,
        NonAuthGuard,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
    constructor() {}
}
