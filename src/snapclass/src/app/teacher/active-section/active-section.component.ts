import { Component, OnInit, OnChanges} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { routeNames } from '../../services/routing.service';
import { AlertService } from '../../services/alert.service';
import { APIService } from '../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActiveSectionService } from '../../services/active-section.service';
import { TutorialService } from 'src/app/services/tutorial.service';


@Component({
  selector: 'app-active-section',
  templateUrl: './active-section.component.html',
  styleUrls: ['./active-section.component.css']
})
export class ActiveSectionComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param alertService message and error handler service
   * @param activeSectionService active section management
   * @param router provides the navigation and url manipulation capabilities.
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    public activeSectionService: ActiveSectionService,
    public router: Router,
    private modalService: NgbModal,
    private tutorialService: TutorialService) { }

  /**
   * The current active section
   */
  activeSection: any;

  /**
   * list of sections
   */
  sectionList: any[];

  /**
   * current course object
   */
  course: any;

  /**
   * Current user of the system
   */
  user: User;

   /**
   * Close result
   */
  closeResult: string;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial sub status
   */
  tutorialSubStatus: any;

  teacherLanding = routeNames.TEACHERLANDING;

  changeSectionForm = new FormGroup({
    course: new FormControl(null),
    section: new FormControl(null)
  })

  /**
   * Initialization method
   */
  ngOnInit() {
    this.user = this.authService.getUser();
    this.getCourses();
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
   * Get active section
   */
  getSection() {
    this.apiService.getSection(this.activeSectionService.getActiveSection())
    .subscribe(res => {
      if (res["success"]) {
        this.activeSection = res["section"];
        this.getSections(this.activeSection.course_id);
        this.getCourse();
      }
      else {
        this.alertService.setErrorHTML(res["Error loading course section."]);
      }
    });
  }


  /**
   * Get sections for a given course
   * @param id is the is for the given course
   */
  getSections(id) {
    this.apiService.getSectionsForCourse(id)
      .subscribe(res => {
        if(res["success"]) {
          this.sectionList = res['sections'];
        }
      })
  }

  /**
   * Change active section
   */
  changeSection() {
    //this fix means that the default is set to the first section. Fixed bug
    //where if a user changes course, the first section can't be loaded
    //without submitting form twice.
    if(this.changeSectionForm.value.section == null){
        this.changeSectionForm.value.section = this.sectionList[0].id
    }
    //only change it if it is a valid value
    if (this.changeSectionForm.value.section) {
      this.activeSectionService.setActiveSection(this.changeSectionForm.value.section);
      this.getSection();
      if (this.router.url == "/teacher") {
        window.location.reload();
      }
      this.router.navigateByUrl(this.teacherLanding);
    }
    this.modalService.dismissAll();
  }

  /**
   * Get current course
   */
  getCourse() {
    this.apiService.getCourse(this.activeSection.course_id)
      .subscribe(res => {
        if(res["success"]) {
          this.course = res['course'];
        }
        else {
          this.alertService.setErrorHTML(res["message"]);
        }
      })
  }

  /**
   * Get Courses for teacher
   */
  getCourses() {
    this.activeSectionService.getCourses();
  }


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
   * Sets the tutorial service to indicate if it is finished.
   * @param val the number to set the status to.
   */
  setTutorialStatus(val: number) {
    this.tutorialService.setTutorialStatus(val, val);
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
  }
}
