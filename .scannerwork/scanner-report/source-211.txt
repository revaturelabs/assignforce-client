import { from } from './../../../../node_modules/rxjs/observable/from';
import { Router } from '@angular/router';
import { AuthService } from './../../services/auth/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatInputModule,
  MatProgressBarModule,
  MatSelectModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { SettingControllerService } from '../../services/api/setting-controller/setting-controller.service';
import { SettingsComponent } from './settings.component';
import { ErrorObservable } from '../../../../node_modules/rxjs/observable/ErrorObservable';

describe('SettingsComponent', () => {
  let component: SettingsComponent;
  let fixture: ComponentFixture<SettingsComponent>;
  let settingService;
  let addressService;
  let buildingService;
  let message = '';

  class AuthServiceStub {
    userHasRole(strings: string[]) {
      return true;
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatExpansionModule,
        MatGridListModule,
        MatSelectModule,
        MatProgressBarModule,
        MatCardModule,
        HttpClientTestingModule
      ],
      declarations: [SettingsComponent],
      providers: [
        AddressControllerService,
        SettingControllerService,
        { provide: AuthService, useClass: AuthServiceStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsComponent);
    component = fixture.componentInstance;
    settingService = TestBed.get(SettingControllerService);
    addressService = TestBed.get(AddressControllerService);

    //fixture.detectChanges();
  });

  it('should create with services valid', () => {
    spyOn(addressService, 'find').and.callFake(() => {
      return from([[1, 2, 3]]);
    });

    spyOn(settingService, 'find').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(addressService, 'findAll').and.callFake(() => {
      return from([[1, 2, 3]]);
    });

    component.ngOnInit();

    expect(component).toBeTruthy();
  });

  it('should create with services error', () => {
    spyOn(addressService, 'find').and.callFake(() => {
      return ErrorObservable.create('error message');
    });

    spyOn(settingService, 'find').and.callFake(() => {
      return ErrorObservable.create('error message');
    });
    spyOn(addressService, 'findAll').and.callFake(() => {
      return ErrorObservable.create('error message');
    });

    component.ngOnInit();
    addressService.find().subscribe(
      data => {},
      error => {
        this.message = error;
      }
    );

    expect(this.message).toBe('error message');
  });

  it('should reset with setting services', () => {
    let findServiceSpy = spyOn(settingService, 'find').and.callFake(() => {
      return from([[1, 2, 3]]);
    });

    component.reset();

    expect(findServiceSpy).toHaveBeenCalled();
  });

  it('should save with setting services', () => {
    let updateServiceSpy = spyOn(settingService, 'update').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(component, 'isReadOnly').and.callFake(() => {
      return false;
    });

    component.save();

    expect(updateServiceSpy).toHaveBeenCalled();
  });

  it('should save with read only', () => {
    let updateServiceSpy = spyOn(settingService, 'update').and.callFake(() => {
      return from([[1, 2, 3]]);
    });
    spyOn(component, 'isReadOnly').and.callFake(() => {
      return true;
    });

    component.save();

    expect(updateServiceSpy).not.toHaveBeenCalled();
  });

  it('should test on isReadyOnly function', () => {
    let isReadOnly: boolean = component.isReadOnly();

    expect(isReadOnly).toBe(false);
  });
});
