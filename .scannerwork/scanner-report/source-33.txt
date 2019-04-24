import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditCurriculumComponent } from '../edit-curriculum/edit-curriculum.component';
import { CurriculumControllerService } from '../../services/api/curriculum-controller/curriculum-controller.service';
import { Curriculum } from '../../model/Curriculum';
import { SkillControllerService } from '../../services/api/skill-controller/skill-controller.service';
import { Skill } from '../../model/Skill';
import { AuthService } from '../../services/auth/auth.service';
import { FillSkillsService } from '../../services/api/skill-controller/fill-skills.service';
import { map, filter } from 'rxjs/operators';
import { CachedObjectsService } from '../../services/api/cache/cached-objects.service';
import { AddCurriculumComponent } from '../add-curriculum/add-curriculum.component';


@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.css']
})
export class CoreComponent implements OnInit {

  /**
   * NOTE: As of 8.10.18, the focus component has been removed and merged into
   * the curriculum service in order to eliminate redudancies. The curriculum and
   * focus are essentially the same and uses the same data. We use the
   * isCore variable in order to distinguish between a batch's base curriculum and their focus
   */
  @Input()
  isCore: boolean;

  constructor(
    private dialog: MatDialog,
    private curriculumControllerService: CurriculumControllerService,
    private skillControllerService: SkillControllerService,
    public auth0: AuthService,
    private cacheService: CachedObjectsService
  ) {}

  //An array of all Core Curricula currently in the backend.
  coreData: Curriculum[] = [];
  skills: Skill[] = [];


  //Gets every core Cirrcula
  loadCurriculum() {
    this.curriculumControllerService.findAll().subscribe(curricula => {
      this.coreData = curricula.filter(curr => curr.isCore === this.isCore);
    });
  }

  //Gathers all core Curricula from the backend and assigns it to coreData for displaying in a list.
  ngOnInit() {
    this.loadCurriculum();
    this.skillControllerService.findAll().subscribe(data => (this.skills = data));

    this.skills = this.cacheService.getSkills();
    if (!this.skills[0]) {
      this.skillControllerService.findAll().subscribe(data => {
        this.skills = data;
        this.cacheService.setSkills(data);
      });
    }
  }

  /**
   * this function will receive a curriculum or focus and filter through its
   * skills property, which contains a list of only skill IDs.
   * ---
   * The function uses the ids to return a filtered list
   * of skills based on the master list (this.skills)
   */
  curriculumSkills(curriculum: Curriculum): Skill[] {
    const filtered: Skill[] = [];
    curriculum.skills.forEach(skill => {
      for (const s of this.skills) {
        if (skill.skillId === s.skillId) {
          filtered.push(s);
          break; //match found, break to next curriculum skill
        }
      }
    });
    return filtered;
  }

  //Opens up the Edit Curriculum Modal
  openEditCurriculumSkillsDialog(curriculum: Curriculum) {
    const dialogRef = this.dialog.open(EditCurriculumComponent, {
      data: {
        curriculumData: curriculum
      }
    });
    dialogRef
      .afterClosed()
      .toPromise()
      .then(() => {
        this.loadCurriculum();
      });
  }

  //Opens up the Add Curriculum Modal
  openAddCurriculumDialog(event: Event, isCore: boolean) {
    event.stopPropagation();
    const dialogRef = this.dialog.open(AddCurriculumComponent, {
      data: {
        isCore: isCore
      }
    });
    dialogRef
      .afterClosed()
      .toPromise()
      .then(result => {
        this.loadCurriculum();
      });
  }

  //This is used to remove, and confirm removal of curricula.
  confirmRemoveCurriculum(curriculum: Curriculum) {
    if (confirm('Are you sure you want to deactivate ' + curriculum.name + '?')) {
      curriculum.isActive = false;
      this.curriculumControllerService
        .update(curriculum)
        .toPromise()
        .then(() => {
          this.loadCurriculum();
        })
        .catch(err => {
          alert('Error occurred while removing focus');
          console.log(err);
        });
    }
  }

}
