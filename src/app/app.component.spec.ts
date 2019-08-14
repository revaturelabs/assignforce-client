import { NO_ERRORS_SCHEMA } from "@angular/core";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute, Router } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { AppComponent } from "./app.component";
import { AppRouting } from "./app.routing";
import { LoginComponent } from "./components/login/login.component";
import { MenuBarComponent } from "./components/menu-bar/menu-bar.component";
import { AppMaterialModule } from "./material.module";
import { AuthService } from "./services/auth/auth.service";
import { SecurityContext } from "./services/auth/security-context.service";
import { UrlService } from "./services/url/url.service";

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

describe("AppComponent", () => {
  let originalTimeout;

  class MockRouter {
    navigate = jasmine.createSpy("navigate");
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
        UrlService,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;
  });

  it("should create the app", async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  afterEach(() => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
  });
});
