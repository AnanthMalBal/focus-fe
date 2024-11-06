import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {
  result: any;
  timesheetdata:any;

  constructor(private http: HttpClient, private router: Router) { }
 
 
  getwork(): Observable<any>{
    console.log(" getwork" );
    return this.http.get<any>("http://localhost:3007/timesheet/getProjectList");
  }

  getdepartmwnt(): Observable<any>{
    console.log(" getdepartmwnt" );
    return this.http.get<any>("http://localhost:3007/timesheet/getProcessList");
  }

  getproject(date:any): Observable<any>{
    console.log(" getproject" );
    return this.http.get<any>("http://localhost:3007/timesheet/getTimesheetId?markedTime="+date);
  }

  getuserdailylog(timeid:any): Observable<any>{
    console.log(" getdailylog" );
    console.log(" timeid",timeid );

    return this.http.get<any>("http://localhost:3007/timesheet//getUsersDailyLog?timesheetId="+timeid);
  }

  getSignDate(id:any,date:any): Observable<any>{
    console.log(" getSignDate"+id+date );
    return this.http.get<any>("http://localhost:3007/timesheet/getmarkedtime?employeeId="+id+"&date="+date);
  }
  
  deletedailylog(autoId:any): Observable<any>{
    console.log(" deleted"+autoId );
    const body = { autoId };
    return this.http.delete<any>("http://localhost:3007/timesheet/deleteUserDailyLog",{  body });
  }

  addTimesheet(data:any): Observable<any> {
    console.log("data",data);
    return this.http.post("http://localhost:3007/users/addusersdailylog", data)
      .pipe(map((result: any) => {
        this.timesheetdata=result
        Swal.fire({
          text:
            this.timesheetdata.message,
            confirmButtonColor:"rgb(133, 187, 131)",
        });
      }))
    }

}
