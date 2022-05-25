import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Section } from '../../models/section.model';
import { Assignment } from '../../models/assignment.model';


@Component({
  selector: 'app-student-course-view',
  templateUrl: './student-course-view.component.html',
  styleUrls: ['./student-course-view.component.css']
})
export class StudentCourseViewComponent implements OnInit {

  /**
   * Construct dependencies
   * @param authService token authorization service
   * @param alertService message and error handler service
   * @param authService token authorization service
   * @param router router service
   */
  constructor(
    private apiService: APIService,
    private alertService: AlertService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router) {}

  /**
   * Current section ID
   */
  sectionId: number;

  /**
   * Course information
   */
  course: any;

  /**
   * Upcoming assignments
   */
  upcomingAssignments: any;

  /**
   * Past assignments
   */
  pastAssignments: any;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.sectionId = +params['id']; // (+) converts string 'id' to a number
      this.getSection();
      this.getPastAssignments();
      this.getUpcomingAssignments();

   });
  }

  /**
   * Get section information
   */
  getSection() {
    this.apiService.getCourseForStudent(this.sectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.course = res["course"][0];
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
  }

  /**
   * Get upcoming assignments for section
   */
  getUpcomingAssignments() {
    this.apiService.getUpcomingAssignmentsForStudentSection(this.sectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.upcomingAssignments = res["assignments"];
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
  }

  /**
   * Get past assignments for section
   */
  getPastAssignments() {
    this.apiService.getPastAssignmentsForStudentSection(this.sectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.pastAssignments = res["assignments"];
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
  }

  navigateToAssignment(id) {
    this.router.navigateByUrl("student/assignment/" + id);
  }

}
