import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class MarkattendanceService {

  getdata:any;
  constructor(private http:HttpClient) { }

  addattendance(symbol:any,mode:any): Observable<any> {

    return this.http.post(`${environment.markAttendance}`,{"symbol":symbol,"mode":mode})
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
