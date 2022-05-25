import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { APIService } from '../../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { AlertService } from '../../../services/alert.service';
import { User } from '../.././../models/user.model';
import {NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { Router } from '@angular/router';


/**
 * Add assignment modal
 * Allows a teacher to add a new assignment
 */
@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})

/**
 * Component for adding an assignment
 */
export class AddAssignmentComponent implements OnInit {

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
    private tutorialService: TutorialService,
    private router: Router) {}

  /**
   * input user
   */
  @Input() user: User;

  /**
   * input user
   */
  @Input() assignments: any[];

  /**
   * ouput update function
   */
  @Output() update = new EventEmitter();


  /**
   * Close result
   */
  closeResult: string;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;



  /**
   * Form for adding an assignment
   */
  addAssignmentForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    start_date: new FormControl(null),
    due_date: new FormControl(null),
    rubric_id: new FormControl(null),
    environment: new FormControl('')
  })

  /**
   * Form for getting active_section
   */
  activeSectionForm = new FormGroup({
    section_id: new FormControl('')
  })

  ngOnInit() {
    this.activeSectionForm.setValue({
     section_id: this.sectionService.getActiveSection()
    })
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
   * Gets the current substatus of the tutorial
   */
  getTutorialSubStatus(): any {
    return this.tutorialService.gettutorialSubStatus();
  }

  /**
   * On submit for adding an assignment
   */
  onSubmit() {
    console.warn(this.addAssignmentForm.value);
    // Error checking
    if (this.addAssignmentForm.value.start_date > this.addAssignmentForm.value.due_date) {
      this.alertService.setErrorHTML("Start date must be before due date");
      return;
    }

    const assignment = {
      assignment: this.addAssignmentForm.value,
      section: this.activeSectionForm.value
    }
    this.apiService.postAssignment(assignment)
      .subscribe(
        res => {
          if (res["success"]) {
            this.alertService.setSuccessHTML(res["message"]);
            this.updateAssignments();
            this.getAssignments(assignment.section.section_id);
          } else {
            this.alertService.setErrorHTML(res["message"]);
          }
        });
    this.addAssignmentForm.reset();
    this.modalService.dismissAll();
  }
  /**
   * Update assignments
   */
  updateAssignments() {
    this.update.emit();
  }

  /**
   * Get assignments for teacher
   */
  getAssignments(section: any) {
    var _this = this;
    setTimeout(() => {
      _this.apiService.getAssignmentsForSection(section)
      .subscribe(res => {
        if (res["success"]) {
          let id = 0;
          for (let i = 0; i < res["assignments"].length; i++) {
            if (res["assignments"][i].id > id) {
              id = res["assignments"][i].id;
            }
          }
          if (id > 0) {
            _this.router.navigateByUrl("teacher/assignments/code/" + id);
          }
        }
      });
    }, 1000);
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
   * Sets the new status for the tutorial.
   * @param status the number indicating the status of the tutorial
   * @param subStatus the number indicating the substatus of the tutorial
   */
  setTutorialStatus(status, subStatus) {
    this.tutorialService.setTutorialStatus(status, subStatus);
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
  }
}
