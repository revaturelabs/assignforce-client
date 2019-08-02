import { Component, OnInit } from "@angular/core";
import { Sprint } from "../../model/sprint";
import { SprintControllerService } from "../../services/api/sprint-controller/sprint-controller.service";

@Component({
  selector: "app-add-sprint",
  templateUrl: "./add-sprint.component.html",
  styleUrls: ["./add-sprint.component.css"],
})
export class AddSprintComponent implements OnInit {
  name: string;
  description: string;

  sprint: Sprint[];

  constructor(private sprintService: SprintControllerService) { }

  // tslint:disable-next-line:one-line
  submit(){
    this.sprintService.submit(this.name, this.description);
  }

  ngOnInit() {
  }

}
