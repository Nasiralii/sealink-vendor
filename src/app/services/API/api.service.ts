import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { catchError, map } from "rxjs/operators";
import { BehaviorSubject, throwError } from "rxjs";
import { environment } from "src/environments/environment";

const URL = `${environment.apiUrl}`;

@Injectable({
    providedIn: "root",
})
export class ApiService {
    constructor(private http: HttpClient) {}

    private dataSubject = new BehaviorSubject<boolean>(false);
    data$ = this.dataSubject.asObservable();

    updateData(value: boolean) {
        this.dataSubject.next(value);
    }

    getData(url: any, data: any) {
        return this.http.get(`${URL + url}`).pipe(catchError(this.handleError));
    }

    postData(url: any, data: any) {
        return this.http
            .post(`${URL + url}`, data)
            .pipe(catchError(this.handleError));
    }

    //functions for making http call for ownership report

    GetActiveReportCategory() {
        return this.http.post(
            `${environment.apiUrl}api/Vessel/fetch-all-active-report-categories`,
            {}
        );
    }

    GetDepartmentMasterList(data: any) {
        return this.http.post(
            `${environment.apiUrl}api/Master/fetch-all-active-master-details`,
            data
        );
    }

    UpdateReportCategoryOwner(data: any) {
        return this.http.post(
            `${environment.apiUrl}api/Vessel/update-report-category-owner`,
            data
        );
    }

    //function for making http call to login API
    login(data: any) {
        return this.http.post<any>(
            `${environment.apiUrl}api/Authentication/token`,
            data
        );
    }

    getAccessToken(data: any) {
        return this.http.post<any>(
            `${environment.apiUrl}api/Authentication/refresh-token`,
            data
        );
    }

    validateEmail(data: any) {
        //return this.http.post<any>(`${environment.apiUrl}api/Employee/forgot-password-email-validation`,data);
        return this.http.post<any>(
            `${environment.apiUrl}api/Authentication/validate-forgot-password-email`,
            data
        );
    }
    checkUserName(data: any) {
        return this.http.post<any>(
            `${environment.apiUrl}api/Authentication/check-username`,
            data
        );
    }

    verifyOtp(data) {
        // return this.http.post<any>(`${environment.apiUrl}api/Employee/verify-otp`,data);
        return this.http.post<any>(
            `${environment.apiUrl}api/Authentication/validate-forgot-password-otp`,
            data
        );
    }

    changePassword(data) {
        return this.http.post<any>(
            `${environment.apiUrl}api/Employee/change-password`,
            data
        );
    }
    resetPassword(data) {
        // return this.http.post<any>(`${environment.apiUrl}api/Employee/reset-password`,data);
        return this.http.post<any>(
            `${environment.apiUrl}api/Authentication/reset-forgot-password`,
            data
        );
    }

    editCompanyTitle(data) {
        return this.http.post<any>(
            `${environment.apiUrl}api/Company/update-company-name`,
            data
        );
    }
    deleteCompanyLogo(data) {
        return this.http.post(
            `${environment.apiUrl}api/Company/remove-company-logo`,
            data
        );
    }

    indiaCountryUID(){

        // return 'B6BCA822-7DB4-EE11-B65F-6045BD14B532' //live
        return '69472395-254B-EE11-852F-000D3AF2B9A8' //dev
    }

    handleError(error: any) {
        let errorMessage = "";
        if (error.error instanceof ErrorEvent) {
            // Get client-side error
            errorMessage = error.error.message;
        } else {
            // Get server-side error
            errorMessage = error.error;
        }
        return throwError(errorMessage);
    }
}
