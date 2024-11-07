import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MaintenanceService {
  private apiUrl = 'https://sealink.azurewebsites.net/api/pms/insert-update-maintenance-task';

  constructor(private http: HttpClient) { }

  saveMaintenanceTask(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }
}