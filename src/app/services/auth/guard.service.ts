import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UrlService } from '../url/url.service';

@Injectable()
export class GuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router, private urlService: UrlService) {}

  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
