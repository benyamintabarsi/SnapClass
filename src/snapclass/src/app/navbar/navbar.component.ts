import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { routeNames } from '../services/routing.service';
import { AlertService } from '../services/alert.service';
import { APIService } from '../services/api.service';
import { NavBarService } from '../services/navbar.service';
import { ActiveSectionService } from '../services/active-section.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Cloud } from '../services/cloud.service';

/**
 * NavbarComponent, main navigation for application
 */
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnChanges {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param alertService message and error handler service
   * @param router provides the navigation and url manipulation capabilities.
   * @param cloud Berkley Snap! Cloud
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    private navService: NavBarService,
    public sectionService: ActiveSectionService,
    public router: Router,
    private tutorialService: TutorialService,
    private cloud: Cloud) { }


  /**
   * current path url
   */
  url: String;

  /**
   * Current user of the system
   */
  user: User;

  /**
   * The current active section
   */
  activeSection: any;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial subStatus
   */
  tutorialSubStatus: any;

  /**
   * Route URLs
   */
  guestLanding = routeNames.GUESTLANDING
  teacherLogin = routeNames.TEACHERLOGIN;
  teacherLanding = routeNames.TEACHERLANDING;
  studentLanding = routeNames.STUDENTLANDING;
  teacherAccount = routeNames.TEACHERACCOUNT;
  teacherCourses = routeNames.TEACHERCOURSES;
  teacherAssignments = routeNames.TEACHERASSIGNMENTS;
  teacherRubricManagement = routeNames.RUBRICMANAGEMENT;
  teacherGradeAssignment = routeNames.GRADEASSIGNMENT;
  gradebook = routeNames.GRADEBOOK;
  teacherHelpDash = routeNames.TEACHERHELPDASH;
  statsnap = routeNames.STATSNAP;

  /**
   * Sets the user of the system based on authentication
   */
  ngOnInit() {
    this.user = this.authService.getUser();
    this.getSection();
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
   * Gets the current status of the tutorial
   */
  getTutorialSubStatus(): any {
    return this.tutorialService.gettutorialSubStatus();
  }
  /**
   * Opens navigation bar after page renders
   */
  ngOnChanges() {
    this.user = this.authService.getUser();
    this.getSection();
  }

  getSection() {
    this.apiService.getSection(this.sectionService.getActiveSection())
    .subscribe(res => {
      if (res["success"]) {
        this.activeSection = res["section"];
      }
      else {
        this.alertService.setErrorHTML(res["Error loading course section."]);
      }
    });
  }

  /**
   * Navigate to URl
   * @param url URL to navigate to
   */
  navigate(url) {
    this.router.navigateByUrl(url);
  }

  logout() {
    this.cloud.logout(function(){}, function(){});
    this.user = this.authService.getUser();
    console.log(this.user["username"]+" logged out at: "+new Date().toLocaleString());
    this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: "logout"}).subscribe(res => {
        if(res["success"]){
            console.log(res);
        }
    });
    this.setTutorialStatus(0, 0);
    this.router.navigateByUrl('/');
    this.navService.closeNav();
    this.authService.logout();
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

  /**
   * Logs when the user exits the tutorial
   */
  exitTutorial() {
    this.user = this.authService.getUser();
    console.log(this.user["username"]+" finished the tutorial at: "+new Date().toLocaleString());
      this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: "finishTutorial"}).subscribe(res => {
          if(res["success"]){
              console.log(res);
          }
      });
  }
}
