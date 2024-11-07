import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as XLSX from 'xlsx';
import { environment } from 'src/environments/environment';


const URL = `${environment.apiUrl}`;
 

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  constructor(private http: HttpClient,
    private router: Router) { }


    getMasterDetails(data)
    {
      return this.http.post(`${URL}api/Master/fetch-all-active-master-details`, data)
      .pipe(
        catchError(this.handleError)
      );
    }

    fetchProductCategory(data)
    {
      return this.http.post(`${URL}api/Product/fetch-product-category`, data)
      .pipe(
        catchError(this.handleError)
      );
    }


    insertProductDetails(data)
    {
      return this.http.post(`${URL}api/Product/insert-product`, data)
      .pipe(
        catchError(this.handleError)
      );
    }

    fetchProduct(data)
    {
      return this.http.post(`${URL}api/Product/fetch-products`, data)
      .pipe(
        catchError(this.handleError)
      );
    }

      fetchProductBasedOnId(data)
    {
      return this.http.post(`${URL}api/Product/fetch-product-details-based-on-uid`, data)
      .pipe(
        catchError(this.handleError)
      );
    }

    inserDocument(data)
    {
      return this.http.post(`${URL}api/Product/insert-product-document`, data)
      .pipe(
        catchError(this.handleError)
      );
    }

    getCountryList(data) {
      return this.http.post(`${URL}api/Master/fetch-country-basedon-visibility`, data)
        .pipe(
          catchError(this.handleError)
        );
    }

    updateProdcut(data) {
      return this.http.post(`${URL}api/Product/update-product`, data)
        .pipe(
          catchError(this.handleError)
        );
    }

    deleteDocument(data)
    {
      return this.http.post(`${URL}api/Product/delete-product-document`, data)
        .pipe(
          catchError(this.handleError)
        );
    }

insertCategory(data)
{
  return this.http.post(`${URL}api/Product/insert-product-category`, data)
        .pipe(
          catchError(this.handleError)
        );
}







          // Error handling
  handleError(error) {
    // debugger
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
