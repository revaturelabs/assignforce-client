import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';

import { AppRouting } from '../../app.routing';
import { AuthService } from '../../services/auth/auth.service';
import { UrlService } from '../../services/url/url.service';
import { LoginComponent } from './login.component';
import { MockAuthService } from '../../services/auth/auth.service.spec';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [LoginComponent],
      providers: [
        {
          provide: AuthService,
          useClass: MockAuthService
        },
        { provide: Router, useClass: AppRouting },
        UrlService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
