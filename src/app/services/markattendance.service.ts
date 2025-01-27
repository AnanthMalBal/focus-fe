import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class MarkattendanceService {

  getdata:any;
  constructor(private http:HttpClient) { }

  addattendance(id:any,symbol:any,mode:any): Observable<any> {
    return this.http.post("http://localhost:3007/timesheet/addusersattendance",{"employeeId":id,"symbol":symbol,"mode":mode})
      .pipe(map((result: any) => {
        console.log(result);
        this.getdata=result;
        Swal.fire({
          text:
            this.getdata.message,
            confirmButtonColor: '#2ecc71',
        });
       
      }))
    }

}
