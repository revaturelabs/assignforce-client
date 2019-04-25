import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth0: AuthService) {}

  ngOnInit() {
    console.log(environment.name)
    this.auth0.showLogin();
  }
}
