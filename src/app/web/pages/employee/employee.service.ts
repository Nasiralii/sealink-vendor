import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';

const URL = `${environment.apiUrl}`;

@Injectable()

export class EmployeeService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  getCertificatPath(data) {
    return this.http.post(`${URL}api/Settings/fetch-commonsettings-basedon-key`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSidenavMenu(data) {
    return this.http.post(`${URL}api/Employee/fetch-sidemenu-details`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmployeeList(data) {
    return this.http.post(`${URL}api/Employee/fetch-employee-cardlistView`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  insertEmployee(data) {
    return this.http.post(`${URL}api/Employee/insert-employee`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateEmployeeStatus(data) {
    return this.http.post(`${URL}api/Employee/update-employee-status`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  fetchCompanyList(data) {
    return this.http.post(`${URL}api/Company/fetch-company-details`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  fetchUserRoleList(data) {
    return this.http.post(`${URL}api/Master/fetch-active-userrole`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMasterDetailsForDesignation(data) {
    return this.http.post(`${URL}api/Master/fetch-designation-basedon-type`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getMasterDetails(data)
  {
    return this.http.post(`${URL}api/Master/fetch-all-active-master-details`, data)
    .pipe(
      catchError(this.handleError)
    );
  }
  // getNationalityList(data){
  //   return this.http.post(`${URL}api/Employee/fetch-employee-cardlistView`,data )
  //     .pipe(
  //       catchError(this.handleError)
  //     );
  // }

  getCountryList(data) {
    return this.http.post(`${URL}api/Master/fetch-country-basedon-visibility`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getStateList(data) {
    return this.http.post(`${URL}api/Master/fetch-state`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getEmployeeDetailsBasedOnUid(data) {
    return this.http.post(`${URL}api/Employee/fetch-employee-details-basedon-uid`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveOfficialInfo(data) {
    return this.http.post(`${URL}api/Employee/update-official-info`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  savePersonalInfo(data) {
    return this.http.post(`${URL}api/Employee/update-personal-info`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Competencies api =====================================================================

  getCompetenciesList(data) {
    return this.http.post(`${URL}api/Employee/fetch-competencies`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  insertCompetencies(data) {
    return this.http.post(`${URL}api/Employee/insert-competencies`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCompetencies(data) {
    return this.http.post(`${URL}api/Employee/update-competencies`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCompetencies(data) {
    return this.http.post(`${URL}api/Employee/delete-competencies`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Qualification api =====================================================================

  getQualificationList(data) {
    return this.http.post(`${URL}api/Employee/fetch-qualification`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  insertQualification(data) {
    return this.http.post(`${URL}api/Employee/insert-qualification`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateQualification(data) {
    return this.http.post(`${URL}api/Employee/update-qualification`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteQualification(data) {
    return this.http.post(`${URL}api/Employee/delete-qualification`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Certification api =====================================================================

  getCertificationList(data) {
    return this.http.post(`${URL}api/Employee/fetch-certifications`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  insertCertification(data) {
    return this.http.post(`${URL}api/Employee/insert-certification`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateCertification(data) {
    return this.http.post(`${URL}api/Employee/update-certification`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteCertification(data) {
    return this.http.post(`${URL}api/Employee/delete-certification`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Skills api =====================================================================

  getSkillList(data) {
    return this.http.post(`${URL}api/Employee/fetch-skill`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  insertSkill(data) {
    return this.http.post(`${URL}api/Employee/insert-employee-skill`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateSkill(data) {
    return this.http.post(`${URL}api/Employee/update-employee-skill`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteSkill(data) {
    return this.http.post(`${URL}api/Employee/delete-employee-skill`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSkillType(data) {
    return this.http.post(`${URL}api/Master/fetch-skill-type-basedon-visibility`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSkillNameList(data) {
    return this.http.post(`${URL}api/Master/fetch-skills-basedon-type`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getSkillLevelList(data) {
    return this.http.post(`${URL}api/Master/fetch-skilllevel-basedon-type`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCompanyAllocationList(data) {
    return this.http.post(`${URL}api/Employee/fetch-employee-company-and-userrole-basedon-id`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  getCompanyBasedOnEmployeeId(data) {
    return this.http.post(`${URL}api/Employee/fetch-company-basedon-employee-uid`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  insertCompanyAllocation(data) {
    return this.http.post(`${URL}api/Employee/insert-company-allocation`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  // Dependencies api =====================================================================

  getDependenciesList(data) {
    return this.http.post(`${URL}api/Employee/fetch-dependants`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  insertDependencies(data) {
    return this.http.post(`${URL}api/Employee/insert-dependants`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateDependencies(data) {
    return this.http.post(`${URL}api/Employee/update-dependants`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDependencies(data) {
    return this.http.post(`${URL}api/Employee/delete-dependants`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  uploadProfileInfo(data) {
    return this.http.post(`${URL}api/Employee/update-employee-profilepicture`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  removeProfileInfo(data) {
    return this.http.post(`${URL}api/Employee/delete-employee-profilepicture`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  insertCertificate(data) {
    return this.http.post(`${URL}api/Employee/insert-certificate`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  fetchEmployeeBasedOnRole(data) {
    return this.http.post(`${URL}api/Employee/fetch-active-employees-basedon-userrolecode`, data)
      .pipe(
        catchError(this.handleError)
      );
  }


  getDivisionBasedOnDepartment(data) {
    return this.http.post(`${URL}api/Master/fetch-division-basedon-department-id`, data)
      .pipe(
        catchError(this.handleError)
      );
  }

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
//---------------------Payroll api------------


fetchLeavePlanList(data) {
  return this.http.post(`${URL}api/LeavePlan/fetch-leave-plans`, data)
    .pipe(
      catchError(this.handleError)
    );
}

fetchHolidayPlanList(data) {
  return this.http.post(`${URL}api/payroll/fetch-holiday-plan`, data)
    .pipe(
      catchError(this.handleError)
    );
}
fetchPayrollShiftList(data) {
  return this.http.post(`${URL}api/payroll/fetch-payroll-shift`, data)
    .pipe(
      catchError(this.handleError)
    );
}

updateEmployeePayroll(data) {
  return this.http.post(`${URL}api/Employee/update-employee-payroll-details`, data)
    .pipe(
      catchError(this.handleError)
    );
}
 //*********************************send login invitaion****************************************


 sendLoginInvitaion(data) {
  // return of()
  return this.http.post(`${URL}api/Master/fetch-state`, data)
    .pipe(
      catchError(this.handleError)
    );
}



sendInvitation(loggedInEmployeeUID: string, userUID: string) {
  const param = {
    loggedInEmployeeUID,
    userUID,
  };
  return this.http.post(`${URL}api/Employee/send-invitation`, param)
  .pipe(
    catchError(this.handleError)
  );
 }

 updateInvitation(loggedInEmployeeUID: string, userUID: string) {
  const param = {
    loggedInEmployeeUID,
    userUID,
  };
  return this.http.post(`${URL}api/Employee/update-invitation`, param)
  .pipe(
    catchError(this.handleError)
  );
 }


 userStatus(data) {
  // return of()
  return this.http.post(`${URL}api/Employee/update-employee-status`,data)
    .pipe(
      catchError(this.handleError)
    );
}


SendReactivation(loggedInEmployeeUID: string, userUID: string)
{
  const param = {
    loggedInEmployeeUID,
    userUID,
  };
  return this.http.post(`${URL}api/Employee/send-reactivation`, param)
  .pipe(
    catchError(this.handleError)
  );
}


getCheckListOrForms(data)
{

  return this.http.post(`${URL}api/vessel/fetch-checklist-templates-by-filter`, data)
  .pipe(
    catchError(this.handleError)
  );
}

fetchAllocatedCompanyList(data) {
  return this.http.post(`${URL}api/Employee/fetch-company-basedon-employee-uid`, data)
    .pipe(
      catchError(this.handleError)
    );
}
getUserRoleBasedOnCompany(data) {
  return this.http.post(`${URL}api/Master/fetch-active-userrole-basedon-company`, data).pipe(
    catchError(this.handleError)

  )
}

// sendReactivationEmail(data) {
  
//   return this.http.post(`${URL}api/Employee/send-invitation`, data)
//   .pipe(
//     catchError(this.handleError)
//   );
//  }


/******************************Employee Crew Configuration */


getAllEmployeeCrewConfiguration(data)
{
  return this.http.post(`${URL}api/Employee/fetch-employee-pick-list-configurations`, data)
    .pipe(
      catchError(this.handleError)
    );
}

FetchUserRoleOfCompany(data) {
  return this.http.post(`${URL}api/UserGroup/fetch-userrole-company`, data)
    .pipe(
      catchError(this.handleError)
    );
}

updateEmployeeConfigDetails(data)
{
  return this.http.post(`${URL}api/Employee/update-employee-pick-list-configurations`, data)
    .pipe(
      catchError(this.handleError)
    );
}

fetchConfigDetsilsBasedOnID(data)
{
  return this.http.post(`${URL}api/Employee/fetch-employee-pick-list-configurations-based-on-id`, data)
    .pipe(
      catchError(this.handleError)
    );
}

}
