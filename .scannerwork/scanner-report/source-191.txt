import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MenuBarComponent } from './components/menu-bar/menu-bar.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AppMaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { RouterTestingModule } from '@angular/router/testing';
import { AppRouting } from './app.routing';
import { AuthService} from './services/auth/auth.service';
import { UrlService } from './services/url/url.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SecurityContext } from './services/auth/security-context.service';
import { LoginComponent } from './components/login/login.component';

export class MockActivatedRoute {
  private paramsSubject = new BehaviorSubject(this.testParams);
  private _testParams: {};

  params = this.paramsSubject.asObservable();

  get testParams() {
    return this._testParams;
  }
  set testParams(newParams: any) {
    this._testParams = newParams;
    this.paramsSubject.next(newParams);
  }
}

export class MockAuthService {
  lock = null;
  showLogin() {
    return;
  }
  handleAuthentication() {
    return;
  }
}

describe('AppComponent', () => {
  let originalTimeout;

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }
  const activeRoute = new MockActivatedRoute();
  let app: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, ReactiveFormsModule, RouterTestingModule.withRoutes([]), BrowserAnimationsModule],
      declarations: [AppComponent, MenuBarComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activeRoute },
        { provide: Router, useClass: MockRouter },
        { provide: AuthService, useClass: MockAuthService },
        SecurityContext,
        UrlService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });

  it('should create the app', async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
