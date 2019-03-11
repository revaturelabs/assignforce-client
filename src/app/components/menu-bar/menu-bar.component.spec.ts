import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AppMaterialModule } from '../../material.module';
import { AuthService } from '../../services/auth/auth.service';
import { MockAuthService } from '../../services/auth/auth.service.spec';
import { MenuBarComponent } from './menu-bar.component';
import { UrlService } from '../../services/url/url.service';
import { LoginComponent } from '../login/login.component';
import { AuthenticatingComponent } from '../authenticating/authenticating.component';

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

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;

  const activeRoute = new MockActivatedRoute();
  let authService;
  let urlService;
  // let router: Router;
  let routerStub;

  class MockRouter {
    navigate = jasmine.createSpy('navigate');
  }

  beforeEach(async(() => {
    // routerStub={
    //   navigate: jasmine.createSpy('navigate'),
    // }
    TestBed.configureTestingModule({
      imports: [AppMaterialModule, RouterTestingModule, 
      BrowserAnimationsModule],
      declarations: [MenuBarComponent],
      providers: [
        // { provide: ActivatedRoute, useValue: activeRoute },
        // { provide: AuthService, useValue: authService, useClass: MockAuthService },
        UrlService,
        AuthService,
        // { provide: Router, useClass: RouterTestingModule}
        { provide: Router, useClass: MockRouter}
        // { provide: Router, useValue: MockRouter}

      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    //fixture.detectChanges();
    // authService = TestBed.get(AuthService);
    // urlService = TestBed.get(UrlService);
    // router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
