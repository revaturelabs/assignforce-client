import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup } from '@angular/forms';
import { Skill } from '../../model/Skill';
import { S3CredentialService } from '../../services/s3-credential/s3-credential.service';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { TrainerControllerService } from '../../services/api/trainer-controller/trainer-controller.service';
import { Trainer } from '../../model/Trainer';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { AddressControllerService } from '../../services/api/address-controller/address-controller.service';
import { Address } from '../../model/Address';
import { Unavailability } from '../../model/Unavailability';
import { Observable } from '../../../../node_modules/rxjs/Observable';

declare const gapi;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() fName: string;
  @Input() lName: string;
  //I'm not sure what this does but... it's a -1
  tId: -1;
  //Google API Constant
  //Decides if the edit will show up for certain users so for trainers it takes out the skill edit but leaves the
  lockProfile = true;
  fb: FormBuilder = new FormBuilder();
  //Anything you want to add to be editable should be added here
  //Ex: resumeThing: new FormControl('',Validators.required) *.required if you think it's necessary just make sure
  //You can add required to your input field
  nameForm = this.fb.group({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    linkIn: new FormControl('', Validators.required),
    locSelect: new FormControl('')
  });

  unavailableForm = new FormGroup({
    startDate: new FormControl(),
    endDate: new FormControl(),
    description: new FormControl()
  });
  //Default url that'll be set until someone puts in their own url
  //Might add it so it only takes in the vanity part of the url and that + the linkedIn URL gets added to the DB
  link: String = 'https://www.linkedin.com';
  nameFound = false;

  myFile: FileList;
  creds: any;
  failed = false;
  //certFile: FileList = null;
  certName: string;
  skillsList: Skill[] = [];
  edit = false;
  loading: boolean;
  trainers: Trainer[] = [];
  trainer: Trainer;
  unavailability: Unavailability = new Unavailability();
  displayTrainer = this.trainer;
  trainerEmail: string;
  //This was set to false and turned off all edit options so unless a bug pops up later I'd leave this as true
  //We aren't sure why this is here it just is and it doesn't ruin anything
  editable = true;
  addresses: Address[];

  // @Input() startDate: Date;
  // @Input() endDate: Date;
  // @Input() description: string;

  constructor(
    private skillsService: SkillControllerService,
    private trainerService: TrainerControllerService,
    private addressService: AddressControllerService,
    private router: Router,
    private route: ActivatedRoute,
    public auth0: AuthService
  ) { }

  ngOnInit() {
    this.addressService
      .findAll()
      .toPromise()
      .then(addresses => (this.addresses = addresses));

   
    this.route.params.subscribe((params: Params) => {
      this.trainerEmail = params["email"];
      this.setTrainer(this.trainerEmail)
        .toPromise()
        .then(trainer => {
          if (trainer !== null) {
            //DO NOT REMOVE THIS CHECK
            //some environments return an array with
            //a single element
            if (Array.isArray(trainer)) {
              this.trainer = trainer[0]
            } else {
              this.trainer = trainer;
            }
            this.loading = false;
          } else {
            this.failed = true;
          }
        })
        .catch(error => {
          this.loading = false;
        });

      if (localStorage.getItem('roles') !== 'Trainer') this.editable = !this.editable;
    });
  }

  onLocationChange(location: Address) {
    this.trainer.preferredLocation = location.id;
  }

  setTrainer(email: string): Observable<Trainer> {
    this.loading = true;
    return this.trainerService.findByEmail(email);
  }

  toggleEdit() {
    this.edit = !this.edit;
  }

  getFiles(event) {
    this.myFile = event.target.files;
  }

  updateTrainer(trainer: Trainer) {
    this.trainerService
      .update(trainer)
      .toPromise()
      .then(response => {
        this.trainer = response;
      });
  }

  showToast(message) {
    // this.aCtrl.showToast( message );
  }

  //Updates user's name
  updateTrainerInfo() {
    this.lockProfile = !this.lockProfile;
    if (this.lockProfile) {
      if (this.nameForm.valid) {
        this.trainerService
          .update(this.trainer)
          .toPromise()
          .then(trainer => {
            this.trainer = trainer;
          })
          .catch(error => {
            console.log(error);
          });
      }
      // if (this.myFile[0] !== undefined) {
      //   this.uploadResume();
      // }
    }
  }

  saveUnavailable() {
    this.trainer.unavailabilities.push(this.unavailability);
    this.trainerService.update(this.trainer).subscribe(trainer => {
      this.trainer = trainer;
      this.unavailability = new Unavailability();
    });
  }

  verifyEmail() {
    if (this.trainerEmail === localStorage.getItem('email')) return true;
    else return false;
  }

  padZeroMonth(number: number) {
    if (number < 9) {
      return '0' + (number + 1);
    } else return number + 1;
  }

  padZeroDate(number: number) {
    if (number < 10) {
      return '0' + number;
    } else return number;
  }
}


/** Google Calendar Code
 *
 * Credentials can be generated at
 * https://console.developers.google.com
 *
 * */

// Client ID and API key from the Developer Console
//CLIENT_ID is non-essential for program functionality. The one here is example from Google. Replace with a
//more permanent CLIENT_ID and API_KEY from dev console.
const CLIENT_ID = '831371170934-udapit5jhjj56pft5l2drc9gjhfeclf3.apps.googleusercontent.com';
const API_KEY = 'AIn7eB9WLHL3kNbGwz7RLGCc9dq7bHM';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = 'https://www.googleapis.com/auth/calendar';

const authorizeButton = document.getElementById('authorize_button');
const signoutButton = document.getElementById('signout_button');
const eventButton = document.getElementById('add_event');
/**
 *  On load, called to load the auth2 library and API client library.
 */
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

/**
 *  Google Button fetches
 */

function onSignIn(googleUser) {
  const profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

/**
 *  Initializes the API client library and sets up sign-in state
 *  listeners.
 */
function initClient() {
  gapi.client
    .init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })
    .then(function () {
      // Listen for sign-in state changes.
      gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

      // Handle the initial sign-in state.
      updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
      authorizeButton.onclick = handleAuthClick;
      signoutButton.onclick = handleSignoutClick;
    });
}

/**
 *  Called when the signed in status changes, to update the UI
 *  appropriately. After a sign-in, the API is called.
 */
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    listUpcomingEvents();
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
  }
}

/**
 *  Sign in the user upon button click.
 */
function handleAuthClick(event) {
  gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
  gapi.auth2.getAuthInstance().signOut();
}

/**
 * Append a pre element to the body containing the given message
 * as its text node. Used to display the results of the API call.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
  const pre = document.getElementById('content');
  const textContent = document.createTextNode(message + '\n');
  pre.appendChild(textContent);
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
  gapi.client.calendar.events
    .list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime'
    })
    .then(function (response) {
      const events = response.result.items;
      appendPre('Upcoming events:');

      if (events.length > 0) {
        for (let i = 0; i < events.length; i++) {
          const event = events[i];
          let when = event.start.dateTime;
          if (!when) {
            when = event.start.date;
          }
          appendPre(event.summary + ' (' + when + ')');
        }
      } else {
        appendPre('No upcoming events found.');
      }
    });
}
/**
 Trainer Object
 {
         id: number,
         firstName: string,
         lastName: string,
         isActive: boolean,
         preferredLocation: number,
         unavailabilities: Unavailability[],
         email: string,
         skills: Skill[],
         certifications: Certification[],
         resume: string,
         linkedInUrl: string
     }

 Unavailability Object
 {
         id: number,
         startDate: string, // formatted (yyyy-dd-mmThh:mm:ssZ)
         endDate: string, // formatted (yyyy-dd-mmThh:mm:ssZ)
         description: string
     }
 */

// FUNCTION TO DELETE EVENT
function deleteEvent(eventID) {
  gapi.client.load('calendar', 'v3', function () {
    const request = gapi.client.calendar.events.delete({
      calendarId: 'primary',
      eventId: eventID
    });
    request.execute(function (resp) {
      if (typeof resp === 'undefined') {
        alert('Event was successfully removed from the calendar!');
      } else {
        alert('An error occurred, please try again later.');
      }
    });
  });
}
// END DELETEEVENT FUNCTION
/**
 for (y in myObj.unavailabilities){
		 for (x in myObj.unavailabilities[y]) {
			document.getElementById("demo").innerHTML += myObj.unavailabilities[y][x] +"<br>";
		}
	  }

 let resource1 = {
				"summary":"My Summary",
				"location": "My Location",
				"description": "My Description",
				"start": {
				  "dateTime": "2019-07-12T08:30:00.0z"  //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
				},
				"end": {
				  "dateTime": "2019-07-12T09:30:00.0z"  //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
				}
      };

 **/
// FUNCTION TO INSERT EVENT
function insertEvent(JsonObj) {
  for (const y in JsonObj.unavailabilities) {
    const start = JsonObj.unavailabilities[y].startDate;
    const end = JsonObj.unavailabilities[y].endDate;
    const desc = JsonObj.unavailabilities[y].description;

    const resource = {
      summary: 'My Summary',
      location: 'My Location',
      description: desc,
      start: {
        dateTime: start //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
      },
      end: {
        dateTime: end //if not an all day event, "date" should be "dateTime" with a dateTime value formatted according to RFC 3339
      }
    };
    gapi.client.load('calendar', 'v3', function () {
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: resource
      });
      request.execute(function (resp) {
        console.log(resp);
        if (resp.id) {
          alert('Event was successfully added to the calendar!');
        } else {
          alert('An error occurred. Please try again later.');
        }
      });
    });
  }
}
// END INSERTEVENT FUNCTION

// QUERY EXISTING EVENTS FUNCTION
function checkExists(calID) {
  gapi.client.load('calendar', 'v3', function () {
    const request = gapi.client.calendar.events.list({
      calendarId: calID,
      q: 'My query string' //set the query string letiable
    });
    request.execute(function (resp) {
      console.log(resp);
      if (resp.items) {
        for (let i = 0; i < resp.items.length; i++) {
          //set event letiables and list matching events
        }
      } else {
        alert('No matching events!');
      }
    });
  });
}
// END QUERY EVENTS FUNCTION
