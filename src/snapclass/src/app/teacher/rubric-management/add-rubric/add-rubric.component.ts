import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { APIService } from '../../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../../models/user.model';
import { AlertService } from '../../../services/alert.service';
import {NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-rubric',
  templateUrl: './add-rubric.component.html',
  styleUrls: ['./add-rubric.component.css']
})
export class AddRubricComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param alertService message and error handler service
   */
  constructor(
    private apiService: APIService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private tutorialService: TutorialService) {}
  
  /**
   * output update function
   */ 
  @Output() update = new EventEmitter();

  /**
   * input user
   */ 
  @Input() user: User;

  /**
   * Close result
   */
  closeResult: string;

  /**
   * Modal view status
   */
  modalView = 0;

  /**
   * List of rubric templates
   */
  rubrics: any[];

  /**
   * Selected template rubric
   */
  selectedRubric: any;


  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  /**
   * Form for adding a rubric
   */
  addRubricForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    is_template: new FormControl(0),
    user_id: new FormControl(null)
  });

  /**
   * initializes the add rubric component
   */
  ngOnInit() {
    this.modalView = 0;
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
   * Gets the current status of the tutorial
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
   * Update rubrics
   */
  updateRubrics() {
    this.update.emit();
  }
  
  /**
   * Open current modal
   * @param content content of the modal
   */
  open(content: any) {
    this.modalView = 0;
    this.selectedRubric = null;
    this.addRubricForm.reset();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * On submit for adding a rubric
   */
  onSubmit() {
    this.addRubricForm.controls['user_id'].setValue(this.user.id);
    this.addRubricForm.controls['is_template'].setValue(0);
    console.warn(this.addRubricForm.value);
    this.apiService.postRubric(this.addRubricForm.value)
      .subscribe(
        res => {
          if (res["success"]) {
            this.alertService.setSuccessHTML(res["message"]);
            this.updateRubrics(); 
            this.modalService.dismissAll();

          } else {
            this.alertService.setErrorHTML(res["message"]);
          }
        }
      );
      
    this.addRubricForm.reset();
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
   * Change modal view
   * @param view view ID
   */
  toggleView(view: number) {
    this.modalView = view;
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
  useTemplate() {
    this.addRubricForm.controls['name'].setValue(this.selectedRubric.name);
    this.addRubricForm.controls['description'].setValue(this.selectedRubric.description);
    this.modalView = 1;
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
