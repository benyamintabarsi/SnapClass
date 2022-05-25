import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router, ActivationEnd } from '@angular/router';
import { Assignment} from '../../../models/assignment.model';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-view-assignment',
  templateUrl: './view-assignment.component.html',
  styleUrls: ['./view-assignment.component.css']
})
export class ViewAssignmentComponent implements OnInit {


  constructor(
    private apiService: APIService,
    private route: ActivatedRoute,
    private alertService: AlertService,
    private router: Router,
    private authService: AuthService,
    private sectionService: ActiveSectionService,
    private tutorialService: TutorialService
    ) { }

  /**
   * assignment id
   */
  assignmentID: number;

  /**
   * assignment variable
   */
  assignment: Assignment;
  
  /**
   * rubric information
   */
  rubric: any;

  /**
   * Assignment gradebook
   */
  gradebook: any;

  /**
   * Rubric categories
   */
  rubricCategories: any;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  /**
   * The current user
   */
  user: User;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.assignmentID = +params['id']; 
    });
    this.getAssignment();
    this.getGradebook();
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
  }

  /**
   * Gets the current status of the tutorial
   */
  getTutorialStatus(): any {
    return this.tutorialService.getTutorialStatus();
  }

  /**
   * Gets the current substatus of the tutorial
   */
  getTutorialSubStatus(): any {
    return this.tutorialService.gettutorialSubStatus();
  }

  /**
   * Get assignment information
   */
  getAssignment() {
    this.apiService.getAssignment(this.assignmentID)
      .subscribe(res => {
        if (res["success"]) {
          this.assignment = new Assignment(res["assignment"]);
          if(this.assignment.rubric_id) this.getRubricInformation();
        } else {
          this.alertService.setErrorHTML(res["message"]);
        }
      })
  }

  /**
   * Get rubric information for assignment
   */
  getRubricInformation() {
    this.apiService.getRubric(this.assignment.rubric_id)
    .subscribe(res => {
      if (res["success"]) {
        this.rubric = res["rubric"];
      }
    });
    this.apiService.getRubricsCategories(this.assignment.rubric_id)
    .subscribe(res => {
      if (res["success"]) {
        this.rubricCategories = res["categories"];
      }
    });

  }

  /**
   * Navigate to grade assignment
   */
  gradeAssignment() {
    this.router.navigateByUrl('teacher/grade/assignment/' + this.assignmentID);
    this.user = this.authService.getUser();
    console.log(this.user["username"]+" reached the grade assignment page at: "+new Date().toLocaleString());
    this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: "grade"}).subscribe(res => {
          if(res["success"]){
              console.log(res);
          }
    });
  }

  /**
   * Navigate to editing assignment
   */
   editAssignment() {
    this.router.navigateByUrl('teacher/assignments/code/' + this.assignmentID);
    this.user = this.authService.getUser();
    console.log(this.user["username"]+" reached the code assignment page at: "+new Date().toLocaleString());
    this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: "edit"}).subscribe(res => {
          if(res["success"]){
              console.log(res);
          }
    });
  }

  /**
   * Get gradebook for assignment
   */
  getGradebook() {
    this.apiService.getAssignmentGrades(this.sectionService.getActiveSection(), this.assignmentID)
    .subscribe(res => {
      if (res["success"]) {
        this.gradebook = res["gradebook"];
      }
    });
  }

  getPoint(student, category) {
    var value = null;
    if (student.point_for_categories) {
      student.point_for_categories.forEach(c => {
        if (c.category == category.id) {
          value = c.point + "/" + category.max_point;
        }
      });
      if (value) { return value; }
      else return "N/A";
    }
    else return "N/A";
  }

  /**
   * Sets the new status for the tutorial.
   * @param status the number indicating the status of the tutorial
   * @param subStatus the number indicating the substatus of the tutorial
   */
  setTutorialStatus(status, subStatus) {
    this.tutorialService.setTutorialStatus(status, subStatus);
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
  }

}
