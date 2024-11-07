import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { ApiService } from 'src/app/services/API/api.service';
import { LocalStorageService } from 'ngx-webstorage';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  static accessToken = '';
  static refreshToken = ''
  constructor(private apiService: ApiService,
    private storage: LocalStorageService,
    private router:Router,
    private message:MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let token = this.storage.retrieve('accessToken');
    const req = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.storage.clear('accessToken');
        this.storage.clear('refreshToken');
        this.storage.clear('userInfo');
        this.message.clear();
        this.message.add({ severity: 'error', detail: 'Your session expired. Please login to continue!' })

        this.router.navigate(['/auth/login']);
      }
      return throwError(() => err)
    }));
  }


  handleRefreshToken() {
    const data = {
      accessToken: this.storage.retrieve('accessToken'),
      refreshToken: this.storage.retrieve('refreshToken')
    }
    this.apiService.getAccessToken(data).subscribe((res) => {

      this.storage.store('accessToken', res.value.accessToken);
      this.storage.store('refreshToken', res.value.refreshToken);

    })

  }
}
