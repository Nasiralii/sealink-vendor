import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Injectable } from '@angular/core'; 
import { LocalStorageService } from 'ngx-webstorage';


@Injectable()
export class VendorCanActivateGuardGuard implements CanActivate {

  constructor(
    private router: Router,
    private storage: LocalStorageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    if (this.storage.retrieve('accessToken')) {
      return true;
    } else {
      this.router.navigate(['/vendor-auth/login']);
    } 
  }

}



