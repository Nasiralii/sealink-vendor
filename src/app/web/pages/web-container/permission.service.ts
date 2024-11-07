import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

const URL = `${environment.apiUrl}`;

@Injectable()

export class PermissionService {


    pagePermissionData: any;
    specialPermissionData: any;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }

    getPagePermission(data) {
        return new Promise((resolve, reject) => {
            this.http.post(`${URL}api/Employee/fetch-special-permissions-and-page-permissions-basedon-userrole`, data)
            .subscribe((res: any) => {
                if (res) {
                    if (res && res.SpecialPermissionData) {
                        this.specialPermissionData = res.SpecialPermissionData;
                        //console.log('this.specialPermissionData      uuuuuuuuuuuuuuuu  ', this.specialPermissionData)
                    }
                    if (res && res.PagePermissionData) {
                        this.pagePermissionData = res.PagePermissionData;
                    }
                    resolve(res);
                }
            }, (err) => {
                reject(err);
            })
        });
       
    }

    // get page permission data
    fetchPagePermissionData(){

    return this.pagePermissionData

   }
    // Error handling
    handleError(error) {
        let errorMessage = '';
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
