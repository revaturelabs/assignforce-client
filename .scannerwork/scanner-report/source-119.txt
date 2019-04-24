import { Injectable } from '@angular/core';
import { SkillControllerService } from './skill-controller.service';
import { TrainerControllerService } from '../trainer-controller/trainer-controller.service';
import { CurriculumControllerService } from '../curriculum-controller/curriculum-controller.service';
import { FocusControllerService } from '../focus-controller/focus-controller.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FillSkillsService {
  //not necessary, but is used for some pages to buffer info
  isLoading = true;
  //this is the output object, this will be populated with the object with skills array fully populated
  objs: any[] = [];
  private skillList;
  private service;
  constructor(
    private skillService: SkillControllerService,
    private trainerService: TrainerControllerService,
    private curriculumService: CurriculumControllerService,
    private focusService: FocusControllerService
  ) {}

  /*

  So this one's a doozy. 
  
  This service can be used to populate objs. This is done by first getting the 
  list of skills, and then getting the list of objects. These are both done 
  through observabes, and then a filter is run to replace skill arrays that only 
  have skill ids to skill arrays with all information included.

  serviceType takes in the type of service to use
  callback allows the user to add custom functionality

  You can utilize this service like this:

    this.isLoading = true;
    this.fillSkills.setList("trainer", () => {
      this.isLoading = this.fillSkills.isLoading;
      // custom functionality here sets the trainers array with what has been put
      // into objs in this service
      this.trainers = this.fillSkills.objs;
    })

  I'm really sorry if this is a little too complicated. I tried separating everything
  into separate functions so that it's a little more readable.

  */
  setList(serviceType: string, callback) {
    //get complete skills list
    this.getSkills(serviceType).subscribe(skillList => {
      //get object list
      this.getObjs(skillList).subscribe(objList => {
        //filter object to fill skills list
        this.objectFilter(objList);
        //custom
        callback();
      });
    });
  }

  private getSkills(serviceType: string): Observable<any> {
    this.isLoading = true;
    //pick service
    switch (serviceType) {
      case 'trainer':
        this.service = this.trainerService;
        break;
      case 'curriculum':
        this.service = this.curriculumService;
        break;
      case 'focus':
        this.service = this.focusService;
        break;
      default:
        return;
    }
    return this.skillService.findAll();
  }

  private getObjs(skillList) {
    this.skillList = skillList;
    return this.service.findAll();
  }

  private objectFilter(objList) {
    for (const obj of objList) {
      for (let i = 0; i < obj.skills.length; i++) {
        obj.skills[i] = this.skillList.filter(skill => {
          return skill.skillId === obj.skills[i].skillId;
        })[0];
      }
    }
    this.objs = objList;
    this.isLoading = false;
  }
}
