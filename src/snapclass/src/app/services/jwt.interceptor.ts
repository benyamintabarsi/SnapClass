import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";
import { Router }  from '@angular/router';
import { AlertService } from './alert.service';

export class JwtInterceptor implements HttpInterceptor {

  constructor(public auth: AuthService, public router: Router, public alert: AlertService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    return next.handle(request).pipe(tap((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
        this.auth.collectFailedRequest(request);
        if (err instanceof HttpErrorResponse) {
            if (err.status === 403) {
                this.alert.handleError(err, "Unauthorized request");
            }
        }
    }));
  }
}