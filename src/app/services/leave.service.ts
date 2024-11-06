import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { LeaveModel } from '../modals/leavemodel';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {
  result: any;
  applyleavedata:any
  
  constructor(private http: HttpClient, private router: Router) { }

getLeaveType(): Observable<any>{
  console.log("getleave");

return this.http.get<any>("http://localhost:3007/timesheet/getLeaveType")
}

addleave(data:LeaveModel): Observable<any> {
  console.log("data",data);
  return this.http.post("http://localhost:3007/users/addusersleave", data)
    .pipe(map((result: any) => {
      this.applyleavedata=result
      console.log(result);
      Swal.fire({
        text:
          this.applyleavedata.message,
          confirmButtonColor: '#2ecc71',
      });
     
    }))
  }

  getleavehistory(id:any): Observable<any> {

    return this.http.get<any>("http://localhost:3007/users/userleavelist?employeeId="+id)

  }

  cancelLeave(leaveId:any) : Observable<any>{
    return this.http.post<any>("http://localhost:3007/users/userleavecancel",{leaveId})

  }

}
