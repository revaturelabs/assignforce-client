import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from '../url/url.service';
import { environment } from '../../../environments/environment';
import Auth0Lock from 'auth0-lock';
import * as auth0 from 'auth0-js';
import { Trainer } from '../../model/Trainer';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
@Injectable()
export class AuthService {
  constructor(private router: Router, private urlService: UrlService) {}
  //userProfile: any;
  //trainer = new Trainer(0, '', '', [], [], true, null, [], '', 0,'');
  poolData = {
    UserPoolId: environment.cognito.UserPoolId, // your user pool id here
    ClientId: environment.cognito.ClientId, // your app client id here
  };
  userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);
  /*auth0 = new auth0.WebAuth({
    clientID: environment.auth0.clientId,
    domain: environment.auth0.domain,
    apiAudience: environment.auth0.audience,
    responseType: environment.auth0.responseType,
    redirectUri: environment.auth0.redirectUri,
    scope: environment.auth0.scope
  });
  lock = new Auth0Lock(environment.auth0.clientId, environment.auth0.domain, {
    autoclose: true,
    closable: true,
    auth: {
      redirectUrl: environment.auth0.redirectUri,
      responseType: environment.auth0.responseType,
      audience: environment.auth0.audience,
      params: {
        scope: environment.auth0.scope
      }
    },
    allowSignUp: false,
    allowConnections: false
  });
  trainerEmail = '';
  public showLogin(): void {
   if (this.isAuthenticated()) {
     this.router.navigate([this.urlService.getOverviewUrl()]);
   } else {
     this.lock.show();
   }
  }*/
  /*public showLogin(): void {
   if (this.isAuthenticated()) {
     this.router.navigate([this.urlService.getOverviewUrl()]);
   } else {}
  }*/
  public startLogin(email: string, password: string) {
    const userData = {
      Username: email, // your username here
      Pool: this.userPool,
    };
    const authenticationData = {
      Username: email, // your username here
      Password: password, // your password here
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess(result) {
        this.setSession(result, authenticationData.Username);
        localStorage.setItem('email', authenticationData.Username);
        this.router.navigate([this.urlService.getOverviewUrl()]);
      },
      onFailure(err) {
        console.log('Error upon trying to login...');
        alert(err);
        this.router.navigate([this.urlService.getLoginUrl()]);
      },
    });
  }
  /*public handleAuthentication(): void {
    this.lock.on('authenticated', authResult => {
      this.lock.getUserInfo(authResult.accessToken, (error, profile) => {
        if (authResult && authResult.accessToken && authResult.idToken) {
          this.userProfile = profile;
          this.setSession(authResult);
          this.trainerEmail = profile.name;
          localStorage.setItem('email', this.trainerEmail);
          this.router.navigate([this.urlService.getOverviewUrl()]);
        } else if (error) {
          this.router.navigate([this.urlService.getLoginUrl()]);
        }
      });
    });
  }*/
  /*private setSession(authResult): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(authResult.expiresIn * 1000 + new Date().getTime());
    localStorage.setItem('access_token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('expires_at', expiresAt);
    localStorage.setItem('roles', authResult.idTokenPayload['https://revature.com/roles']);
    localStorage.setItem('groups', authResult.idTokenPayload['https://revature.com/groups']);
  }*/
  private setSession(result: AmazonCognitoIdentity.CognitoUserSession, email: string): void {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(result.getAccessToken().getExpiration() * 1000 + new Date().getTime());
    localStorage.setItem('access_token', result.getAccessToken().getJwtToken());
    localStorage.setItem('id_token', result.getIdToken().getJwtToken());
    localStorage.setItem('expires_at', expiresAt);
    if (email.includes('svp')) {
      localStorage.setItem('roles', 'SVP of Technology');
    } else {
      localStorage.setItem('roles', 'Trainer');
    }
  }
  /*public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('roles');
    localStorage.removeItem('groups');
    localStorage.removeItem('email');
    this.lock.logout({
      returnTo: environment.baseUrl + '/' + environment.appRoutes.login
    });
  }*/
  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('roles');
    localStorage.removeItem('email');
    this.router.navigate([this.urlService.getLoginUrl()]);
  }
  /*public isAuthenticated(): boolean {
    // Check whether the current time is past the
    // Access Token's expiry time
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }*/
  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  public userHasRole(expectedRoles: Array<string>): boolean {
    const userRoles = localStorage.getItem('roles');
    if (!this.isAuthenticated()) {
      return false;
    }
    return expectedRoles.every((value) => userRoles.indexOf(value) >= 0);
  }
  /*public getProfile(cb): void {
    const accessToken = localStorage.getItem('access_token');
    if (!accessToken) {
      throw new Error('Access token must exist to fetch profile');
    }
    if (!this.userProfile) {
      this.lock.getUserInfo(accessToken, (error, profile) => {
        cb(error, profile);
      });
    } else {
      cb(null, this.userProfile);
    }
  }*/
  public getToken(): string {
    return localStorage.getItem('access_token');
  }
}