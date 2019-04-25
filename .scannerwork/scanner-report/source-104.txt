import { Component, OnInit } from '@angular/core';

import { Building } from '../../model/Building';
import { Address } from '../../model/Address';
import { Setting } from '../../model/Setting';
// import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
// import { BuildingControllerService } from '../../services/api/building-controller/building-controller.service';
import { SettingControllerService } from '../../services/api/setting-controller/setting-controller.service';
import { AuthService } from '../../services/auth/auth.service';

/**
 * Possible functionality for setting default address and building left in
 **/

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  constructor(
    private settingService: SettingControllerService,
    // private addressService: AddressControllerService,
    // private buildingService: BuildingControllerService,
    public auth0 : AuthService
  ) {}

  /**
   * Defines the default settings to display if none can be retrieved.
   */
  setting: Setting = new Setting(0, 0, 0, 0, 0, 0, 0, 0, null, null, '');

  /**
   * Contains the value of the default location as found in the settings.
   */
  // defaultLocation: Address;
  /**
   * Contains the value of the default building as found in the settings.
   */
  // defaultBuilding: Building;

  /**
   * Contains the list of all possible locations.
   */
  // locations: Address[];
  /**
   * Contains the list of all possible buildings
   */
  // buildings: Building[];

  /**
   * A boolean indicating whether the page is loading data from the back-end.
   */
  isLoading = false;
  /**
   * A boolean indicating whether a call to the back-end was unsuccessful.
   */
  isError = false;

  ngOnInit() {
    this.isError = false;
    // this.loadLocations();
    // this.loadBuildings();
    this.getSettingsInfo();
  }

  /**
   * Makes a call to the AddressControllerService to retrieve the list of addresses
   * Assigns those values to local variables.
   *
   * Activated on page initialization.
   */
  // private loadLocations() {
  //   this.addressService
  //     .findAll()
  //     .toPromise()
  //     .then(locations => {
  //       this.locations = locations;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  /**
   * Makes a call to the BuildingControllerService to retrieve the list of buildings.
   * Assigns those values to local variables.
   *
   * Activated on page initialization.
   */
  // private loadBuildings() {
  //   this.buildingService
  //     .findAll()
  //     .toPromise()
  //     .then(buildings => {
  //       this.buildings = buildings;
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }

  /**
   * Makes a call to the SettingControllerService to retrieve the settings values from the back-end.
   * Assigns those values to local variables.
   *
   * Activated on page initialization and whenever the RESET button is pressed.
   */
  getSettingsInfo() {
    this.isLoading = true;

    this.settingService
      .find()
      .toPromise()
      .then(setting => {
        this.setting = setting;
        // this.defaultBuilding = setting[0].defaultBuilding;
        // this.defaultLocation = setting[0].defaultLocation;

        this.isLoading = false;
      })
      .catch(err => {
        this.isLoading = false;
        this.isError = true;
        console.log('error retrieving setting data.');
        console.log(err);
      });
  }

  /**
   * Makes a call to the SettingControllerService to save the input values to the back-end.
   *
   * Activated by the SAVE button on the settings page.
   */
  save() {
    if (this.isReadOnly()) return;
    console.log('saving settings...');
    this.isLoading = true;
    console.log(this.setting);
    this.settingService
      .update(this.setting)
      .toPromise()
      .then(setting => {
        console.log('save success');
        this.isLoading = false;
      })
      .catch(err => {
        console.log(err);
        this.isLoading = false;
      });
  }

  /**
   * Initiates a new call to the SettingControllerService to get the current Settings values.
   *
   * Activated by the RESET button on the settings page.
   */
  reset() {
    console.log('resetting settings');
    this.isError = false;
    this.getSettingsInfo();
  }

  /**
   * Returns whether the form fields on the Settings page should be read-only.
   *
   * This is based off of the auth0 role of the current user.
   * Only the SVP of Technology may edit and save fields in the Settings page.
   *
   * @returns {boolean} Whether the form should be read-only or not.
   */
  isReadOnly(): boolean {
    return !this.auth0.userHasRole(['SVP of Technology']);
  }
}
