import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {

  authresults: any;
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  loginData: any;

  constructor(private http: HttpClient, private router: Router,) { }

 

  login(data: any): Observable<any> {
    console.log("I am server");
    return this.http.post("http://localhost:3007/auth/auth", data)
      .pipe(map((result: any) => {
        console.log(result);
        this.authresults = result;
        this.loginData = result;
        this.setData(this.loginData)
        if (this.authresults.accesstoken) {
          localStorage.setItem('token', this.authresults.accesstoken);
          Swal.fire({
            text:
              this.authresults.message,
              confirmButtonColor: '#2ecc71',
          });
          this.router.navigate(["lmscalendar"])
        }
      }))
  }

  setData(loginData: any) {
    this.apiData.next(loginData)
  }
}



