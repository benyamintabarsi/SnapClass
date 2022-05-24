import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { APIService } from '../../../services/api.service';
import { AlertService } from '../../../services/alert.service';
import { User } from '../.././../models/user.model';
import {NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { Router } from '@angular/router';
import { routeNames } from '../../../services/routing.service';
import { TutorialStatus, tutorialSubStatus } from '../../../models/tutorial.enum';
import { TeacherHelpDashComponent } from '../teacher-help-dash.component';

@Component({
  selector: 'app-course-help',
  templateUrl: './course-help.component.html',
  styleUrls: ['./course-help.component.css']
})
export class CourseHelpComponent implements OnInit {

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
    private sectionService: ActiveSectionService,
    private modalService: NgbModal,
    public router: Router,
    public dash: TeacherHelpDashComponent) {}

  ngOnInit() {
  }
  /**
   * Route URL
   */
  teacherCourses = routeNames.TEACHERCOURSES;
  sectionManagement = routeNames.TEACHERACTIVESECTION;


  /**
   * Close result
   */
  closeResult: string;


  /**
   * Open current modal
   * @param content content of the modal
   */
  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * Return reason for dismissing model
   * @param reason reason text
   */
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
