import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthserviceService } from '../services/authservice.service';

@Injectable()
export class ServicesInterceptor implements HttpInterceptor {

  constructor(private authService:AuthserviceService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.authService.getToken();

    if (token) {
      // Clone the request to add the new header.
      console.log('interceptor');
      const clonedRequest = request.clone({
        headers: request.headers.set('Authorization', `${token}`),
      });

      // Pass the cloned request instead of the original request to the next handler.
      return next.handle(clonedRequest);
    } else {

    return next.handle(request);
    }

  }
}
