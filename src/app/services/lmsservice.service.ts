import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, throwError } from 'rxjs';
import { environment } from '../environments/environments';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LmsserviceService {

  constructor(private http:HttpClient) { }

  getholidays(date:any): Observable<any>{
    return this.http.post(`${environment.getLeaveHolidayColor}`,{"selectedDate":date})
    .pipe(
      tap(result => console.log("getLeaveHolidayColor fetched:", result)), 
      catchError(error => {
        console.error("Error fetching LeaveHolidayColor:", error);
        return throwError(() => error); 
      })
    );

  }

 

  getleavebalance(): Observable<any>{
    console.log(" leave balance service" );
    return this.http.post(`${environment.getLeaveBalance}`,{})
    .pipe(
      tap(result => console.log("Leave balance fetched:", result)), 
      catchError(error => {
        console.error("Error fetching leave balance:", error);
        return throwError(() => error); 
      })
    );
  }
}
