import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routeNames } from '../../services/routing.service';
import { NavBarService}  from  '../../services/navbar.service';


/**
 * Student Header Component
 */
@Component({
  selector: 'app-student-header',
  templateUrl: './student-header.component.html',
  styleUrls: ['./student-header.component.css']
})
export class StudentHeaderComponent implements OnInit {

  /**
   * Construct dependencies
   * @param router provides the navigation and url manipulation capabilities.
   */
  constructor(public router: Router,
    public navService: NavBarService) { }

  /**
   * Flag for icon to open/close nav
   */
  // navOpen: boolean;

  /**
   * Route URLs
   */
  teacherLogin = routeNames.TEACHERLOGIN;
  teacherLanding = routeNames.TEACHERLANDING;
  studentLanding = routeNames.STUDENTLANDING;
  studentLogin = routeNames.STUDENTLOGIN;
  teacherAccount = routeNames.TEACHERACCOUNT;
  teacherCourses = routeNames.TEACHERCOURSES;
  teacherAssignments = routeNames.TEACHERASSIGNMENTS;
  studentAccount = routeNames.STUDENTACCOUNT;

  /**
   * Empty method
   */
  ngOnInit() {

  }

  navigateToAccount() {
    this.router.navigateByUrl(this.studentAccount);
  }

  toggleNav() {
      this.navService.toggleNav();
    
  }

}
