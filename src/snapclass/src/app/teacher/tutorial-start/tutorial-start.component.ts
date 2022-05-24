import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { APIService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
import { User } from '.././../models/user.model';
import {NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { Router } from '@angular/router';
import { routeNames } from '../../services/routing.service';
import { TutorialStatus, tutorialSubStatus } from '../../models/tutorial.enum';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-tutorial-start',
  templateUrl: './tutorial-start.component.html',
  styleUrls: ['./tutorial-start.component.css']
})
export class TutorialStartComponent implements OnInit {

  /**
   * Route URLs
   */
  teacherLanding = routeNames.TEACHERLANDING;
  teacherCourses = routeNames.TEACHERCOURSES;
  teacherHelpDash = routeNames.TEACHERHELPDASH;

  /**
   * Constructs the tutorial start modal.
   * @param apiService 
   * @param authService 
   * @param alertService 
   * @param router 
   * @param modalService 
   * @param tutorialService 
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    public router: Router,
    private modalService: NgbModal,
    private tutorialService: TutorialService) { }

    user: User;

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  /**
   * Navigate to URl
   * @param url URL to navigate to
   */
  navigate(url) {
    this.router.navigateByUrl(url);
  }

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

  /**
   * Sets the tutorial status based on the selection by the user.\
   * @param status the general status of the tutorial to set
   * @param subStatus the substatus of the tutorial
   */
  onSelect(status: any, subStatus: any) {
    this.user = this.authService.getUser();
    if (status == 1 && subStatus == 1) {
      console.log(this.user["username"]+" started the tutorial at: "+new Date().toLocaleString());
      this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: "tutorialStart"}).subscribe(res => {
          if(res["success"]){
              console.log(res);
          }
      });
    } else {
      console.log(this.user["username"]+" skipped the tutorial at: "+new Date().toLocaleString());
      this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: "noTutorial"}).subscribe(res => {
          if(res["success"]){
              console.log(res);
          }
      });
    }
    this.tutorialService.setTutorialStatus(status, subStatus);
    this.tutorialService.tutorialStatus = status;
    this.tutorialService.subStatus = subStatus;
  }

}
