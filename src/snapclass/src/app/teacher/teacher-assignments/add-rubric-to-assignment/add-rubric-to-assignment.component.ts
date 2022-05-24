import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { User } from '../../../models/user.model';
import { AlertService } from '../../../services/alert.service';
import {NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { TutorialService } from 'src/app/services/tutorial.service';


@Component({
  selector: 'app-add-rubric-to-assignment',
  templateUrl: './add-rubric-to-assignment.component.html',
  styleUrls: ['./add-rubric-to-assignment.component.css']
})
export class AddRubricToAssignmentComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param alertService message and error handler service
   * @param authService token authorization service
   */
  constructor(
    private apiService: APIService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private authService: AuthService,
    private tutorialService: TutorialService) {}
  
  /**
   * output update function
   */ 
  @Output() update = new EventEmitter();

  /**
   * Assignment ID
   */
  @Input() assignmentID: number;

  /**
   * Close result
   */
  closeResult: string;

  /**
   * List of rubric templates
   */
  rubrics: any[];

  /**
   * Selected template rubric
   */
  selectedRubric: any;

  /**
   * Current user
   */
  user: User;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  /**
   * initializes the add courses component
   */
  ngOnInit() {
    this.user = this.authService.getUser();
    this.getRubrics();
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
   * Get rubrics for teacher
   * Get all template rubrics
   * Set rubrics to display based on current status
   */
  getRubrics() {
    var _this = this;
    this.rubrics = [];
    this.apiService.getRubricsForTeacher(this.user.id)
    .subscribe(res => {
      if(res["success"]) {
        res["rubrics"].forEach(rubric => {
          _this.rubrics.push(rubric);
        });
      }
      this.getTemplateRubrics();
    });
  }

  /**
   * Get template rubrics
   */
  getTemplateRubrics() {
    var _this = this;
    this.apiService.getTemplateRubrics()
    .subscribe(res => {
      if(res["success"]) {
        res["rubrics"].forEach(rubric => {
          _this.rubrics.push(rubric);
        });
      }
    });
  }

  /**
   * Update assignment
   */
  updateAssignment() {
    this.update.emit();
  }
  
  /**
   * Open current modal
   * @param content content of the modal
   */
  open(content: any) {
    this.selectedRubric = null;
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
   * Set selected rubric
   * @param r selected rubric
   */
  selectRubric(r: any) {
    this.selectedRubric = r;
  }

  /**
   * Use template rubric to create new rubric
   */
  useRubric() {
    this.apiService.putAssignment(this.assignmentID, {rubric_id: this.selectedRubric.id})
    .subscribe(res => {
      if(res["success"]) {
        this.alertService.setSuccessHTML(res["message"]);
        this.updateAssignment();
        this.modalService.dismissAll();
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
        this.modalService.dismissAll();
      }
    });
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
