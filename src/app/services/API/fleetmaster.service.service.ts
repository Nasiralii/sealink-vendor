import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class FleetmasterServiceService {

  constructor( private http: HttpClient) { }

  public fleetUid:any=""


  postData(url: any,data: any) {
    return this.http.post(`${URL+url}`, data)
      .pipe(
        catchError(this.handleError)
      );
  }





















  handleError(error: any) {
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
