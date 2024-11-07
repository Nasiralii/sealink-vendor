import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../environments/environment';

const URL = `${environment.apiUrl}`;

@Injectable()

export class SharedService {

    private sharedInfoSource = new BehaviorSubject<any>('');
    sharedData = this.sharedInfoSource.asObservable();
    comonData = {};

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  setCompanyUid(updateObject) {
    this.comonData = {...this.comonData, ...updateObject}
    this.sharedInfoSource.next(this.comonData);
  }

//   getManualApprovalHistory(data) {
//     return this.http.post(`${URL}api/sms/fetch-manual-approval-history`, data)
//       .pipe(
//         catchError(this.handleError)
//       );
//   }


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
