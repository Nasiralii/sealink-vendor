import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { HelperUtility } from "../utilities/helper.utility";

@Injectable({
    providedIn: 'root',
})
export class BaseApiService {
    // https://sealink.azurewebsites.net/
    private baseUrl: string = HelperUtility.removeTrailingSlash(`${environment.apiUrl}`);

    constructor(private http: HttpClient) { }
    get<T>(endpoint: string, params?: any): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}/${endpoint}`, { params })
            .pipe(
                catchError(this.handleError)
            );
    }

    post<T>(endpoint: string, data: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endpoint}`, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    put<T>(endpoint: string, data: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${endpoint}`, data)
            .pipe(
                catchError(this.handleError)
            );
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${endpoint}`)
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage: string;

        if (error.error instanceof ErrorEvent) {
            // Client-side error
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side error
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => new Error(errorMessage));
    }
}
