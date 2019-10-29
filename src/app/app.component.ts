import { Component, OnInit } from '@angular/core';
import { SecurityContext } from './services/auth/security-context.service';
import { SecurityConfig } from './services/auth/security-config';
import { environment } from '../environments/environment';
import { AuthService } from './services/auth/auth.service';
import { UrlService } from './services/url/url.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private securityContext: SecurityContext,
    private auth0: AuthService,
    private urlService: UrlService,
    private router: Router
  ) {
    const securityConfig = new SecurityConfig();
    securityConfig.roles = environment.security_config.roles;
    securityConfig.permissions = environment.security_config.permissions;
    securityConfig.groups = environment.security_config.groups;
    this.securityContext.setSecurityConfig(securityConfig);
  }

  //On page loadup checks if has been authentication to transition to overview page
  ngOnInit() {
    console.log(environment.name);
    if (this.auth0.isAuthenticated()) {
      this.router.navigate([this.urlService.getOverviewUrl()]);
    } else {
      this.router.navigate([this.urlService.getLoginUrl()]);
    }
  }

  //Calls service logout to remove user info from current session
  logout() {
    this.auth0.logout();
  }
}
