import { Component } from "@angular/core";
import {
    ActivatedRoute,
    NavigationEnd,
    NavigationStart,
    Router,
    RoutesRecognized,
} from "@angular/router";
import { LocalStorageService } from "ngx-webstorage";

import { PermissionService } from "./permission.service";
import { ApiService } from "src/app/services/API/api.service";
import { AppStateService } from "src/app/services/app-state.service";

@Component({
    selector: "app-web-container",
    templateUrl: "./web-container.component.html",
    styleUrls: ["./web-container.component.scss"],
})
export class WebContainerComponent { 
  actionId: any = '';
  actionIdDup: any = '';
  userInfo: any;
  IsInProgress:boolean=true;
  apiResponse:any;
  lstCompany:any;
  lstModules:any;
  lstToDoList:any;
  toDoCount:any;
  lstCalendarEvents:any;
  fullcalendarOptions:any;
  loadDashbaord=false;
  userRole:any;
  previousUrl:any;

  currentUrl:any;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storage: LocalStorageService,
    private permissionService: PermissionService,
    private server: ApiService,
    private appStateService: AppStateService,
  ) {
    this.currentUrl = this.router.url;
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.previousUrl = this.currentUrl;
        this.currentUrl = event.url;
      };
    });

  }
 Swap(){

 }
  ngOnInit() {
    this.userInfo = this.storage.retrieve('userinfo');
    this.route.queryParams
      .subscribe(params => {
        if (params['action'] && this.actionId != params['action']) {
          this.actionIdDup = params['action'];
          this.getPagePermission();
        }
      }
    );
    this.getDashboardData();
  }
  ngOnChanges(){

  }


  getDashboardData(){ //To fetch dashboard data(modules/to do /calender)
    let data = {
      'employeeUID':this.userInfo.employeeUID
    }
    this.server.postData('api/Employee/fetch-employee-homepage-details',data).subscribe((res:any)=>{
      this.apiResponse=res["responseResult"];
      if(this.apiResponse!=null && this.apiResponse.responseCode=="000"){

        this.lstModules=res["Modules"];
        this.lstToDoList=res["ToDo"];
        this.toDoCount=res["ToDoCount"]["ToDoCount"];
        this.lstCalendarEvents=res["CalendarEvents"];
        this.lstCompany = res["Company"]
        this.userRole=this.lstCompany
       // console.log(this.lstCompany)

        this.fullcalendarOptions = {...this.fullcalendarOptions, ...{events: this.lstCalendarEvents}};
        //console.log("Dashboard Data", this.toDoCount);
      }
      else{

      }
      this.loadDashbaord=true;
    })
  }
  getPagePermission() {
    if(this.appStateService.getCurrentState()?.permissions){ 
      var ismenuPermissionView = 'Yes' 
      if (ismenuPermissionView =='Yes' || this.actionIdDup == 701)  
      {
        this.actionId = this.actionIdDup;
      } else {
        this.IsInProgress=false;
        window.scroll(0, 0);
        let allQueryString=this.getallQueryStrings();
        if(allQueryString){
          this.router.navigate(
            ['/forbidden'],
          { queryParams: { returnURL: this.previousUrl} }
          );
        }else{
          this.router.navigate(['/forbidden']);
        }

        this.IsInProgress=false;
      }
      return;
    } else { 
    const data = {
      userroleUID: this.userInfo.defaultUserRoleUID,
      loggedInEmployeeUID: this.userInfo.employeeUID,
      companyUID: null,
      pageNavigationID: this.actionIdDup
    };
    this.permissionService.getPagePermission(data)
      .then((res: any) => {
        this.appStateService.updateState({permissions: res});
        //// debugger;
        var ismenuPermissionView = 'Yes' // (res?.PagePermissionData?res?.PagePermissionData[0].menuPermissionView:'No');
        //ismenuPermissionView =='Yes' || this.actionIdDup == 701 , true
        if (ismenuPermissionView =='Yes' || this.actionIdDup == 701) // has permission  // || this.actionIdDup == 701 this condition need to avoid
        {
          this.actionId = this.actionIdDup;
        } else {
          this.IsInProgress=false;
          window.scroll(0, 0);
          let allQueryString=this.getallQueryStrings();
          if(allQueryString){
            this.router.navigate(
              ['/forbidden'],
            { queryParams: { returnURL: this.previousUrl} }
            );
          }else{
            this.router.navigate(['/forbidden']);
          }

        }
        this.IsInProgress=false;
      });
    }
  }

  getallQueryStrings(){
    let queryStringBuilder=[];
    this.route.queryParams.subscribe(params => {
      Object.keys(params).forEach(key => {
        const value = params[key];
        queryStringBuilder.push(`${key}:${value}`);
      });
    });
    return queryStringBuilder;
  }

}
