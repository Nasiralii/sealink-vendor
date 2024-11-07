import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent {

  loginVesselUID=this.storage.retrieve('userInfo')['vesselUID'];
  returnURLValue:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private storage:LocalStorageService
  ) {
    this.route.queryParams.subscribe(params => {
      this.returnURLValue = params['returnURL'];
    });
  }

  GotoBack(){
    if(this.returnURLValue){
      this.router.navigateByUrl(this.returnURLValue);
    }else{
      this.GotoDashboard();
    }
    
  }
  GotoDashboard(){
    if(this.loginVesselUID){
      window.scroll(0, 0);
      this.router.navigate(['/web'],
        { queryParams: { menu_id: 104, f_id: 501, action: 701 } });
    }else{
      window.scroll(0, 0);
      this.router.navigate(['/web'],
        { queryParams: { menu_id: 101, f_id: 501, action: 701 } });
    }
  }
  

}
