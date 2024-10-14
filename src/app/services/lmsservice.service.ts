import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LmsserviceService {

  constructor(private http:HttpClient) { }

  getholidays(date:any): Observable<any>{
    return this.http.get<any>("http://localhost:3007/timesheet/getHolidays?cdate="+date)

  }

  getlmslist(): Observable<any>{
    console.log(" check lms service" );
    return this.http.get<any>("http://localhost:3007/timesheet/getLmsList");
  }

  getleavebalance(id:any): Observable<any>{
    console.log(" id recieved",id );
    console.log(" leave balance service" );
    return this.http.get<any>("http://localhost:3007/timesheet/getLeaveBalance?empid="+id);
  }
}
