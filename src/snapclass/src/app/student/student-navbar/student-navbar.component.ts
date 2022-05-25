import { Component, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { routeNames } from '../../services/routing.service';
import { AlertService } from '../../services/alert.service';
import { APIService } from '../../services/api.service';

/**
 * Student Navbar Component
 */
@Component({
  selector: 'app-student-navbar',
  templateUrl: './student-navbar.component.html',
  styleUrls: ['./student-navbar.component.css']
})
export class StudentNavbarComponent {

 /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param alertService message and error handler service
   * @param router provides the navigation and url manipulation capabilities.
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    public router: Router) { }

  /**
   * current path url
   */
  url: String;

  /** 
   * Current user of the system
   */ 
  user: User;

  /**
   * Student enrolled courses
   */
  courses: any;

  /**
   * Assignments for all sections
   */
  assignments: any;

  /**
   * Route URLs
   */
  teacherLanding = routeNames.TEACHERLANDING; 
  studentLanding = routeNames.STUDENTLANDING;
  studentLogin = routeNames.STUDENTLOGIN;
  studentAssignment = routeNames.STUDENTASSIGNMENT;
  studentCourse = routeNames.STUDENTCOURSE;
  studentAccount = routeNames.STUDENTACCOUNT;

  /**
   * Empty method
   */
  ngOnInit() {
    this.url = window.location.pathname;
    if (this.url === '/' || this.url.includes(routeNames.TEACHERLANDING) || this.url.includes(routeNames.STUDENTLOGIN)) {
      return;
    }
    this.user = this.authService.getUser();
    this.courses = [];
    this.assignments = [];
    this.getCourses();
  }

  /**
   * Get courses for student
   */
  getCourses() {
    this.apiService.getCoursesForStudent(this.user.id)
    .subscribe(res => {
      if (res["success"]) {
        this.courses = res["courses"];
        this.courses.forEach(course => {
          this.getAssignments(course["section_id"]);
        });
      }
    });
  }

  /**
   * Get upcoming assignments for section
   * @param sectionId section id
   */
  getAssignments(sectionId) {
    this.apiService.getUpcomingAssignmentsForStudentSection(sectionId)
    .subscribe(res => {
      if (res["success"]) {
        res["assignments"].forEach(assignment => {
          this.assignments.push(assignment);
        }); 
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

}
