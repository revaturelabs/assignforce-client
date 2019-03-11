import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class SpringXsrfInterceptor implements HttpInterceptor {
  headerName = 'Authorization';
  constructor(private auth0: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth0.getToken();
    // Be careful not to overwrite an existing header of the same name.
    if (token !== null && !req.headers.has(this.headerName)) {
      req = req.clone({ headers: req.headers.set(this.headerName, 'Bearer ' + token) });
    }
    return next.handle(req);
  }
}
