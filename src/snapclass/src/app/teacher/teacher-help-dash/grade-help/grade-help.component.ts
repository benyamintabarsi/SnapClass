import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { APIService } from '../../../services/api.service';
import { AlertService } from '../../../services/alert.service';
import { User } from '../.././../models/user.model';
import {NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { Router } from '@angular/router';
import { routeNames } from '../../../services/routing.service';
import { TeacherHelpDashComponent } from '../teacher-help-dash.component';


@Component({
  selector: 'app-grade-help',
  templateUrl: './grade-help.component.html',
  styleUrls: ['./grade-help.component.css']
})
export class GradeHelpComponent implements OnInit {

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
  teacherGrades = routeNames.GRADEBOOK;


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