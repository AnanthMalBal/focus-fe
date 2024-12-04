import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import Swal from 'sweetalert2';
import { environment } from '../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
  menuresults: any;
  authresults: any;
  private apiData = new BehaviorSubject<any>(null);
  public apiData$ = this.apiData.asObservable();
  loginData: any;

  constructor(private http: HttpClient, private router: Router,) { }

  // http://localhost:3007/auth/auth

  login(data: any): Observable<any> {
    console.log("I am server");
    return this.http.post(`${environment.authUrl}`, data)
      .pipe(map((result: any) => {
        console.log("from authserver",result);
        this.authresults = result;
        this.loginData = result;
        this.setData(this.loginData)
        if (this.authresults.accesstoken) {
          this.saveToken(this.authresults.accesstoken);
          localStorage.setItem('token', this.authresults.accesstoken);
          localStorage.setItem('userobject', this.authresults.user);
          localStorage.setItem('roles', this.authresults.user.roles);
          this.getmenu(this.authresults.user.roles);
          Swal.fire({
            text:
              this.authresults.message,
            confirmButtonColor: '#2ecc71',
          });
          this.router.navigate(["dashboard"])
        }
      }))
  }

  getmenu(role: any): Observable<any> {
    return this.http.post(`${environment.menuUrl}`, {roles:role})

  }

  setData(loginData: any) {
    this.apiData.next(loginData)
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Get the token from local storage
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Remove token (for logout)
  logout(): void {
    localStorage.removeItem('authToken');
  }
}



