import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { Router } from '@angular/router';

import { AppRouting } from '../../app.routing';
import { AuthService } from '../../services/auth/auth.service';
import { MockAuthService } from '../../services/auth/auth.service.spec';
import { UrlService } from '../../services/url/url.service';
import { AuthenticatingComponent } from './authenticating.component';

describe('AuthenticatingComponent', () => {
  let component: AuthenticatingComponent;
  let fixture: ComponentFixture<AuthenticatingComponent>;

  let auth;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AuthenticatingComponent],
      imports: [MatProgressSpinnerModule],
      providers: [
        { provide: AuthService, useClass: MockAuthService },
        { provide: Router, useClass: AppRouting },
        UrlService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    auth = TestBed.get(AuthService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

/** This component contains only spinners, and no logic or forms for authentication - Sam J */