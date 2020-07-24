import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let currentUser = this.authenticationService.currentUserValue;

   
      request = request.clone({
        setHeaders: {
          Authorization: `${currentUser.token}`,
        },
      });
  
    return next.handle(request);
  }

  isHeaderNeeded(url: string) {
    if (url === 'other.api.com') {
      // this condition is up to you, it could be an exact match or how ever you like
      return false;
    } else {
      return true;
    }
  }
}
