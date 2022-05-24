import { Component, OnInit} from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { CourseStatus } from '../../models/status.enum';
import { FormGroup , FormControl } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { addAccordion } from '../../../assets/js/accordion';
import { Router } from '@angular/router';
import { TutorialService } from 'src/app/services/tutorial.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { routeNames } from '../../services/routing.service';

import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations'


/**
 * Teacher view courses page.
 * Allows teacher to change course status.
 * Allows teacher to view sections for course.
 * Allows teacher to add students to section.
 */
@Component({
  selector: 'app-teacher-courses',
  templateUrl: './teacher-courses.component.html',
  styleUrls: ['./teacher-courses.component.css'],
})
export class TeacherCoursesComponent implements OnInit {
  /**
   * Current logged in teacher
   */
  user: User;

  /**
   * List of all courses for teacher
   */
  courses: any[];

  /**
   * List of courses for teacher filtered by status
   */
  viewCourses: any[];

  /**
   * List of sections for course
   */
  sections: any[][];

  /**
   * Current course status view
   */
  status: CourseStatus;

  /**
   * Course status enumeration
   */
  courseStatus: any;

  /**
   * Toggle for add section form
   */
  sectionToggle: boolean;

  currentSection: any;
  currentCourse: any;



  /**
   * Status change form
   */
  statusForm = new FormGroup({
    status: new FormControl('')
  });

  /**
   * Add section form
   */
  sectionForm = new FormGroup({
    section_number: new FormControl(''),
    course_id: new FormControl(null)
  });

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  teacherAssignments = routeNames.TEACHERASSIGNMENTS;

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
    private tutorialService: TutorialService,
    private sectionService: ActiveSectionService) {}

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
          this.sectionToggle = false;
          this.courses = [];
          this.viewCourses = [];
          this.sections = [];
          this.status = CourseStatus.Active;
          this.getCourses();
          this.courseStatus = CourseStatus;
          this.onChanges();
          this.tutorialStatus = this.tutorialService.getTutorialStatus();
          this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
      }
  }

  /**
   * Get courses for teacher
   * Get sections for course
   * Set courses to display based on current status
   */
  getCourses() {
    var _this = this;
    this.apiService.getCoursesForTeacher(this.user.id)
    .subscribe(res => {
      if(res["success"]) {
        this.courses = [];
        res["courses"].forEach(course => {
          _this.courses.push(course);
          this.getSectionsForCourse(course.id);
        });
        _this.viewCourses = _this.courses.filter(function(course) {
          return course.status == _this.status;
        });
        addAccordion();
      }
    });
  }

  /**
   * Get all sections for specific course
   * @param courseId course ID
   */
  getSectionsForCourse(courseId) {
    var _this = this;
    this.apiService.getSectionsForCourse(courseId)
    .subscribe(res => {
      if(res["success"] && res["sections"]) {
        _this.sections[courseId] = [];

        res["sections"].forEach(section => {
          _this.sections[courseId].push(section);
        });
      }
    });
  }

  /**
   * Bind event to status form
   * On change update current status and courses to display
   */
  onChanges() {
    this.statusForm.valueChanges.subscribe(val => {
      this.status = val.status;
      this.viewCourses = this.courses.filter(function(course) {
        return course.status == val.status;
      });
     addAccordion();
    });
  }

  /**
   * Update course status
   * @param courseId course ID
   * @param statusValue status value
   */
  changeStatus(courseId, statusValue, i) {
      setTimeout( () => {
          $("#pogger"+i).hide();
     }, 50);

    var idNum = i;
    var s = {status: statusValue};
    this.apiService.putCourse(s, courseId)
      .subscribe(res => {
        if (res["success"]) {
          this.alertService.setSuccessHTML(res["message"]);
        }
        else {
          this.alertService.setErrorHTML(res["message"]);
        }
      });

      setTimeout( () => {
         $("#button"+i).parent().addClass("deleted fadeOut");

     }, 100);

      setTimeout( () => {
          this.getCourses();
      }, 500);

  }

  /**
   * Update list of courses when new course is added
   * @param event Update course event
   */
  updateCourseList(event: any) {
    this.getCourses();
    this.sectionService.getCourses();
    if (this.courses.length == 1) {
      window.location.reload();
      this.setTutorialStatus(this.getTutorialStatus(), this.getTutorialSubStatus());
    }
  }

  /**
   * Add section to course
   * @param courseId course ID
   */
  addSection(courseId) {
    this.sectionForm.patchValue({course_id: courseId});
    this.apiService.postSection(this.sectionForm.value)
    .subscribe(res => {
      if (res["success"]) {
        this.alertService.setSuccessHTML(res["message"]);
        this.getSectionsForCourse(courseId);
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
    this.sectionForm.reset();
  }

  /**
   * Toggle section add form enabled
   */
  toggleSection(event: any) {
    if (!Array.from(event.target.parentElement.parentElement.classList).includes('collapsed')) {
      event.stopPropagation();
      this.sectionToggle = !this.sectionToggle;
    } else {
      this.sectionToggle = true;
    }
  }

  //change active section

  changeSection(section) {
      this.sectionService.setActiveSection(section.id);
      setTimeout( () => {
          this.getSection();
     }, 100);

      setTimeout( () => {
          this.router.navigateByUrl(this.teacherAssignments);
     }, 300);
  }

  getSection() {
    this.apiService.getSection(this.sectionService.getActiveSection())
    .subscribe(res => {
      if (res["success"]) {
        this.currentSection = res["section"];
        this.getCourse();
      }
      else {
        this.alertService.setErrorHTML(res["Error loading course section."]);
      }
    });
  }

  /**
   * Get current course
   */
  getCourse() {
    this.apiService.getCourse(this.currentSection.course_id)
      .subscribe(res => {
        if(res["success"]) {
          this.currentCourse = res['course'];
        }
        else {
          this.alertService.setErrorHTML(res["message"]);
        }
      })
  }



  /**
   * Navigate to URl
   * @param url URL to navigate to
   */
  navigate(url) {
    this.router.navigateByUrl(url);
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
