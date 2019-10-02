import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../environments/environment';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UrlService } from '../../services/url/url.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private auth0: AuthService,
    private fb: FormBuilder,
    private urlService: UrlService,
    private router: Router,
    ) {}
  ngOnInit() {
    this.loginForm = this.fb.group ({
      email: ['', Validators.required],
      password: ['', Validators.required],
     });
    console.log(environment.name);
    if (this.auth0.isAuthenticated()) {
      this.router.navigate([this.urlService.getOverviewUrl()]);
    } else {
      this.router.navigate([this.urlService.getLoginUrl()]);
    }
  }
  onSubmit() {
    this.auth0.startLogin(this.loginForm.get('email').value, this.loginForm.get('password').value);
  }
}