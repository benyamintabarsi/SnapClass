import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Router }  from '@angular/router';
import { NavBarService } from '../../services/navbar.service';

@Component({
  selector: 'app-student-landing',
  templateUrl: './student-landing.component.html',
  styleUrls: ['./student-landing.component.css']
})
export class StudentLandingComponent implements OnInit {

  /**
   * Construct dependencies
   * @param authService token authorization service
   * @param alertService message and error handler service
   * @param authService token authorization service
   * @param navService provides navigation bar manipulation
   * @param route router service
   */
  constructor(
    private apiService: APIService,
    private alertService: AlertService,
    private authService: AuthService,
    private navService: NavBarService,
    private route: Router) {}

  /**
   * Current logged in student
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

  ngOnInit() {
      this.user = this.authService.getUser();
      this.assignments = [];
      this.getCourses();
      this.navService.openNav();
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
        console.log(this.courses);
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
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
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
  }

  /**
   * Navigate to course view
   * @param sectionId section ID
   */
  goToCourse(sectionId) {
    this.route.navigateByUrl("/student/course/" + sectionId);
  }

}
