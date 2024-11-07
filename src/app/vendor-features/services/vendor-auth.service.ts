import { Injectable } from "@angular/core";
import { VendorLoginModel } from "../models/vendor-login-model";
import { catchError, Observable, throwError } from "rxjs";
import {
    ApiResponse,
    VendorLoginResponse,
} from "../models/vendor-login-response-model";
import { BaseApiService } from "./base-api-service";
import { VendorRegisterModel } from "../models/vendor-register.models";
@Injectable({
    providedIn: "root",
})
export class VendorAuthService {
    constructor(private api: BaseApiService) {}

    login(
        data: VendorLoginModel
    ): Observable<ApiResponse<VendorLoginResponse>> {
        return this.api.post<ApiResponse<VendorLoginResponse>>(
            `api/Vendor/token`,
            data
        );
    }

    register(data: VendorRegisterModel): Observable<any> {
        return this.api.post<any>(`api/Vendor/signup-vendor`, data);
    }
}
