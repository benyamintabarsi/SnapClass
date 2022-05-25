import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FormGroup , FormControl } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { addAccordion } from '../../../assets/js/accordion';
import { Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-rubric-management',
  templateUrl: './rubric-management.component.html',
  styleUrls: ['./rubric-management.component.css']
})
export class RubricManagementComponent implements OnInit {

  /**
   * Current logged in teacher
   */
  user: User;

  /**
   * List of all rubrics
   */
  rubrics: any[];

  /**
   * List of rubrics filtered by sort status
   */
  viewRubrics: any[];

  /**
   * Sort change form
   */
  sortForm = new FormGroup({
    sort: new FormControl('')
  });

  /**
   * Current sort status of view
   */
  sort: any;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param alertService message and error handler service
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    private router: Router,
    private tutorialService: TutorialService) {}

  /**
   * Set current teacher information using local storage
   * Initialize array variables
   * Set default course status view to active
   * Initialize courses for teacher and set all active courses
   * Add event binding when current status changes
   */
  ngOnInit() {
    this.user = this.authService.getUser();
    if((this.user["data"]["account_type"]) != 1){
        this.authService.logout();
        this.navigate('/');
    }
    else{
        this.rubrics = [];
        this.viewRubrics = [];
        this.sort = 2;
        this.getRubrics();
        this.onChanges();
        this.tutorialStatus = this.tutorialService.getTutorialStatus();
        this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
    }
  }

  /**
   * Get rubrics for teacher
   * Get all template rubrics
   * Set rubrics to display based on current status
   */
  getRubrics() {
    var _this = this;
    this.rubrics = [];
    this.apiService.getRubricsForTeacher(this.user.id)
    .subscribe(res => {
      if(res["success"]) {
        res["rubrics"].forEach(rubric => {
          _this.rubrics.push(rubric);
        });
      }
      this.getTemplateRubrics();
    });
  }

  /**
   * Get template rubrics
   */
  getTemplateRubrics() {
    var _this = this;
    this.apiService.getTemplateRubrics()
      .subscribe(res => {
        if(res["success"]) {
          res["rubrics"].forEach(rubric => {
            _this.rubrics.push(rubric);
          });
          _this.viewRubrics = _this.rubrics.filter(function(rubric) {
            return (rubric.is_template == _this.sort) || (_this.sort == 2);
          });
        }
        addAccordion();
      });
  }

  /**
   * Bind event to status form
   * On change update current status and courses to display
   */
  onChanges() {
    this.sortForm.valueChanges.subscribe(val => {
      this.sort = val.sort;
      this.viewRubrics = this.rubrics.filter(function(rubric) {
        return (rubric.is_template == val.sort) || (val.sort == 2);
      });
      addAccordion();
    });
  }

  /**
   * Delete rubric
   * @param id rubric ID
   */
  deleteRubric(id, idNum) {
      var i = idNum;
      setTimeout( () => {
          $("#pooping"+i).hide();
     }, 50);
    this.apiService.deleteRubric(id)
    .subscribe(res => {
      if(res["success"]) {

        this.alertService.setSuccessHTML(res["message"]);
        this.getRubrics();
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });

   //  setTimeout( () => {
   //     $("#button"+i).parent().addClass("deleted fadeOut");
   // }, 100);

    // setTimeout( () => {
    //     this.getTemplateRubrics();
    // }, 500);

  }

  /**
   * Update list of rubrics when new rubric is added
   * @param event Update rubric event
   */
  updateRubricList(event: any) {
    this.getRubrics();
  }

  /**
   * Navigate to URL
   * @param url URL to navigate to
   */
  navigate(url) {
    this.router.navigateByUrl(url);
  }

  /**
   * Format category names for display
   * @param categories category names
   */
  formatNames(categories: string) {
    return categories.replace(',', " | ");
  }

  /**
   * Gets the current substatus of the tutorial
   */
  getTutorialSubStatus(): any {
    return this.tutorialService.gettutorialSubStatus();
  }

  /**
   * Gets the current status of the tutorial
   */
  getTutorialStatus(): any {
    return this.tutorialService.getTutorialStatus();
  }

  /**
   * Sets the new status of the tutorial
   * @param status the number to set the status to.
   * @param subStatus the number to set the substatus to.
   */
  setTutorialStatus(status, subStatus) {
    this.tutorialService.setTutorialStatus(status, subStatus);
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
  }
}
