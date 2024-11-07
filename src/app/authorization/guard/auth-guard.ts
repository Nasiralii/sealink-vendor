import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Router
  } from '@angular/router';
  import { Injectable } from '@angular/core';
  import { Observable } from 'rxjs';
  
  import { LocalStorageService } from 'ngx-webstorage';
  
  
  @Injectable()
  export class AuthGuard implements CanActivate {
  
    constructor(
      private router: Router,
      private storage: LocalStorageService
    ) {}
  
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
    ): any {
      if (this.storage.retrieve('accessToken')) {
        return true;
      } else {
        this.router.navigate(['/auth/login']);
      }
    }
  
  }
  