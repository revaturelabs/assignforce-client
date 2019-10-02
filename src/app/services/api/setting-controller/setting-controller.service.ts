import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Setting } from '../../../model/Setting';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingControllerService {
  constructor(private http: HttpClient) {}

  private settingController = environment.apiUrls.settingController;

  public find(): Observable<Setting> {
    return this.http.get<Setting>(this.settingController.baseUrl + this.settingController.find + "1");
  }

  public update(setting: Setting): Observable<Setting> {
    return this.http.put<Setting>(
      this.settingController.baseUrl + this.settingController.update, setting
    );
  }
}
