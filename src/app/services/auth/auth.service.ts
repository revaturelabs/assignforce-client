import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UrlService } from '../url/url.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import Auth0Lock from 'auth0-lock';
import * as auth0 from 'auth0-js';
import { Trainer } from '../../model/Trainer';
import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
@Injectable()
export class AuthService {
  changePasswordUrl = "http://localhost:4200/change-password/";
  authUrl = "http://localhost:5000/api/auth/";
  constructor(private router: Router, private urlService: UrlService, private http: HttpClient) {}
  //Userpool information for connection
  poolData = {
    UserPoolId:  'us-east-1_hE8EafqgV', //revature
    ClientId: '4vd3i79p1ml95c14vkfl9i7567'
    //UserPoolId: 'us-east-2_bAaqirY4q', //personal
    //ClientId: '1r4vaek14a6qkouvf2udcklo6f'
  };
  userPool = new AmazonCognitoIdentity.CognitoUserPool(this.poolData);
  //Performs authentication with user entered information
  public startLogin(email: string, password: string) {
    const userData = {
      Username: email,
      Pool: this.userPool
    };
    const authenticationData = {
      Username: email,
      Password: password
    };
    const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails(authenticationData);
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    const router = this.router;
    const urlService = this.urlService;
    const onSuccess = result => {
    console.log("Successful login...");
    const expiresAt = JSON.stringify(result.getAccessToken().getExpiration() * 1000 + new Date().getTime());
    localStorage.setItem('access_token', result.getAccessToken().getJwtToken());
    localStorage.setItem('id_token', result.getIdToken().getJwtToken());
    localStorage.setItem('expires_at', expiresAt);
    //if (authenticationData.Username.includes('svp')){
      //localStorage.setItem('roles', 'SVP of Technology');
    //} else {
      //localStorage.setItem('roles', 'Trainer');
    //}
    localStorage.setItem('roles', result.getIdToken().payload.roles);
    localStorage.setItem('email', authenticationData.Username);
    router.navigate([urlService.getOverviewUrl()]);};
  const onFailure = (err) => {
    console.log("Error upon trying to login...");
    alert("Error upon trying to login...");
    router.navigate([urlService.getLoginUrl()]); };
    //const newPasswordRequired = vUser => {
      //console.log(password);
      //const newPassword = passwordChallenge();
      //cognitoUser.completeNewPasswordChallenge(newPassword, [], {onSuccess, onFailure
      //});
    //};
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess,
      onFailure,
      }
    );
  }
  public forgotPassword() {
    let username = prompt("Enter your Email");
    const userData = {
      Username: username,
      Pool: this.userPool,
    };
    const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.forgotPassword({
      onSuccess: (result) => {
      console.log('call result: ' + result);
    },
    onFailure: (err) => {
      alert(JSON.stringify(err));
      // console.log(err);
    },
    inputVerificationCode() {
      const verificationCode = prompt('Please input verification code ' ,'');
      const newPassword = prompt('Enter new password ' ,'');
      cognitoUser.confirmPassword(verificationCode, newPassword, this);
    }
  });
  }
  public logout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('expires_at');
    localStorage.removeItem('roles');
    localStorage.removeItem('email');
    this.router.navigate([this.urlService.getLoginUrl()]);
  }
  // Check whether the current time is past the Access Token's expiry time
  public isAuthenticated(): boolean {
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return new Date().getTime() < expiresAt;
  }
  //Checks role of current session and should return either a single role or multiple roles (roles based access)
  public userHasRole(expectedRoles: Array<string>): boolean {
    const userRoles = localStorage.getItem('roles');
    if (!this.isAuthenticated()) {
      return false;
    }
    return expectedRoles.every(value => userRoles.indexOf(value) >= 0);
  }
  //Gets stored access token
  public getToken(): string {
    return localStorage.getItem('access_token');
  }

}
