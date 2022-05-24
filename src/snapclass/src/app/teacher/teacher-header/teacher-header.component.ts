import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeNames } from '../../services/routing.service';
import { NavBarService}  from  '../../services/navbar.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AuthService } from 'src/app/services/auth.service';
import { APIService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user.model';
/**
 * Teacher Header Component
 */
@Component({
  selector: 'app-teacher-header',
  templateUrl: './teacher-header.component.html',
  styleUrls: ['./teacher-header.component.css']
})

export class TeacherHeaderComponent implements OnInit {

  /**
   * Construct dependencies
   * @param router provides the navigation and url manipulation capabilities.
   * @param navService provides navigation bar manipulation
   */
  constructor(public router: Router,
    public navService: NavBarService,
    private tutorialService: TutorialService,
    private authService: AuthService,
    private apiService: APIService) { }

  /**
   * Route URLs
   */
  teacherLogin = routeNames.TEACHERLOGIN;
  teacherLanding = routeNames.TEACHERLANDING;
  studentLanding = routeNames.STUDENTLANDING;
  teacherAccount = routeNames.TEACHERACCOUNT;
  teacherHelpDash = routeNames.TEACHERHELPDASH;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial subStatus
   */
  tutorialSubStatus: any;

  /**
   * The current user
   */
  user: User;

  ngOnInit() {
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

  navigateToAccount() {
    this.router.navigateByUrl(this.teacherAccount);
  }

  navigateToHelp() {
    this.router.navigateByUrl(this.teacherHelpDash);
  }

  navigateToLanding() {
    this.router.navigateByUrl(this.teacherLanding);
  }
  
  toggleNav() {
    this.navService.toggleNav();
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
    console.log(this.user["username"]+" exited the tutorial at: "+new Date().toLocaleString());
      this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: "exitTutorial"}).subscribe(res => {
          if(res["success"]){
              console.log(res);
          }
      });
  }
}
