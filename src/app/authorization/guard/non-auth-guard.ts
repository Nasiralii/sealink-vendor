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
export class NonAuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private storage: LocalStorageService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): any {
    if (this.storage.retrieve('accessToken')) {
      this.router.navigate(['/web'],
        { queryParams: { menu_id: 102, f_id: 501, action: 701 } });
    } else {
      return true;
    }
  }

}
