import { Component, OnInit, ViewEncapsulation, OnChanges } from '@angular/core';
import { UrlService } from '../../services/url/url.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuBarComponent implements OnInit {
  //This is the list of tabs and their paths for the ngFor in the html view
  //url.get[pathname]Url is a service that fetches the paths from the environment.ts file
  tabs = [
    {
      label: 'Overview',
      path: this.url.getOverviewUrl()
    },
    {
      label: 'Batches',
      path: this.url.getBatchesUrl()
    },
    {
      label: 'Locations',
      path: this.url.getLocationsUrl()
    },
    {
      label: 'Curricula',
      path: this.url.getCurriculaUrl()
    },
    {
      label: 'Trainers',
      path: this.url.getTrainersUrl()
    },
    {
      label: 'Profile',
      path: this.url.getProfileUrl()
    },
    {
      label: 'Reports',
      path: this.url.getReportsUrl()
    },
    {
      label: 'Settings',
      path: this.url.getSettingsUrl()
    },
    {
      label: 'Room Scheduler',
      path: this.url.getRoomSchedulerUrl()
    },
    {
      label: 'Final Projects',
      path: this.url.getProject3Url()
    }
  ];

  constructor(private url: UrlService, public auth0: AuthService) {}

  ngOnInit() {
  }
}
