import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { APIService } from '../../services/api.service';
import { FormGroup, FormControl, FormArray, FormBuilder } from '@angular/forms';
import { User } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TutorialService } from 'src/app/services/tutorial.service';
import { NavBarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param alertService message and error handler service
   */
  constructor(
    private apiService: APIService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private tutorialService: TutorialService,
    private navService: NavBarService) { }
      

  /**
   * output update function
   */
  @Output() update = new EventEmitter();

  /**
   * input user
   */
  @Input() user: User;

  /**
   * input category
   */
  @Input() category: any;

  /**
   * input rubric
   */
  @Input() rubric: any;

  /**
   * Close result
   */
  closeResult: string;

  /**
   * Points List
   */
  pointsList: any[];

  /**
   * Modal view status
   */
  modalView = 0;

  /**
   * Points form
   */
  pointsForm: FormGroup;

  /**
   * Points array
   */
  pointsArray: FormArray;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  /**
   * Form for editing a point
   */
  editPointsForm = new FormGroup({
    id: new FormControl(''),
    points: new FormControl(''),
    description: new FormControl('')
  })

  /**
   * Form for editing category and points
   */
  editCategoryPointsForm : FormGroup;

  /**
   * Form for editing a category
   */
  editCategoryForm = new FormGroup({
    name: new FormControl(''),
    learning_objective: new FormControl(''),
    min_point: new FormControl(null),
    max_point: new FormControl(null),
    point_scale: new FormControl(null),
  });

  /**
   * Initializes the edit category component
   */
  ngOnInit() {
    this.modalView = 0;
    this.initCategory();
    this.editCategoryPointsForm = new FormGroup({
      name: new FormControl(''),
      learning_objective: new FormControl(''),
      pointsArray: new FormArray([])
    });
    this.initPoints();
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
    if (this.tutorialStatus > 0) {
      this.navService.openNav();
     }
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

  initCategory() {
    this.editCategoryForm.setValue({
      name: this.category.name,
      learning_objective: this.category.learning_objective,
      min_point: this.category.min_point,
      max_point: this.category.max_point,
      point_scale: this.category.point_scale
    })
  }

  initPoints() {
    var _this = this;
    _this.pointsList = _this.category.points
    this.pointsArray = this.editCategoryPointsForm.get('pointsArray') as FormArray;
    _this.pointsList.forEach(points => {
      this.pointsArray.push(
        this.formBuilder.group({
          id: points.point_id,
          points: points.points,
          description: points.description,
      }));
    });
  }

  /**
   * On submit for editing a category
   */
  onSubmit() {
    for (let points of this.editCategoryPointsForm.controls.pointsArray.value) {
      this.updatePoints(points.id, points);
    }
    this.setCategoryInfo();
    this.apiService.putCategory(this.category.id, this.editCategoryForm.value)
      .subscribe(
        res => {
          if (res["success"]) {
            this.alertService.setSuccessHTML(res["message"]);
            this.updateCategories();
            this.modalService.dismissAll();

          } else {
            this.alertService.setErrorHTML(res["message"]);
          }
        }
      )
  }

  /**
   * Update points within system
   * @param id points id
   * @param points points object
   */
  updatePoints(id, points) {
    console.log(id, points);
    this.apiService.putPointsForCategory(id, points)
    .subscribe(
      res => {
        if (res["success"]) {
          this.alertService.setSuccessHTML(res["message"]);
        } else {
          this.alertService.setErrorHTML(res["message"]);
        }
      }
    )
  }
  /**
   * Set form information for editing category
   */
  setCategoryInfo() {
    if (this.editCategoryPointsForm.value.name && (this.editCategoryForm.value.name != this.editCategoryPointsForm.value.name)) {
      this.editCategoryForm.patchValue({
        name: this.editCategoryPointsForm.value.name,
      });
    }
    if (this.editCategoryPointsForm.value.learning_objective && (this.editCategoryForm.value.learning_objective != this.editCategoryPointsForm.value.learning_objective)) {
      this.editCategoryForm.patchValue({
        learning_objective: this.editCategoryPointsForm.value.learning_objective,
      });
    }
    this.editCategoryForm.patchValue({
      min_point: this.category.min_point,
      max_point: this.category.max_point,
      point_scale: this.category.point_scale
    })
  }

  /**
   * Update categories
   */
  updateCategories() {
    this.update.emit();
  }

  /**
   * Change modal view
   * @param view view ID
   */
  toggleView(view: number) {
    this.modalView = view;
  }

  /**
   * Open current modal
   * @param content content of the modal
   */
  open(content: any) {
    this.modalView = 0;
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
    this.editCategoryPointsForm.reset();
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
