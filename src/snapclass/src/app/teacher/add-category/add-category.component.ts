import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { APIService } from '../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { User } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

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
   * input rubric
   */ 
  @Input() rubric: any;

  /**
   * input category
   */
  @Input() category: any;

  /**
   * Close result
   */
  closeResult: string;

  /**
   * Modal view status
   */
  modalView = 0;

  /**
   * List of categories
   */
  categories: any[];

  /**
   * Selected category
   */
  selectedCategory: any;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  /**
   * Form for adding a category
   */
  addCategoryForm = new FormGroup({
    name: new FormControl(''),
    learning_objective: new FormControl(''),
    min_point: new FormControl(null),
    max_point: new FormControl(null),
    point_scale: new FormControl(null),

  });

  /**
   * initializes the add category component
   */
  ngOnInit() {
    this.modalView = 0;
    this.getCategories();
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
   * Get categories for teacher
   */
  getCategories() {
    var _this = this;
    this.categories = [];
    this.apiService.getCategoriesForTeacher(this.user.id)
    .subscribe(res => {
      if(res["success"]) {
        _this.categories = res["categories"];
      }
    });
  }

  /**
   * Update categories
   */
  updateCategories() {
    this.update.emit();
  }
  
  /**
   * Open current modal
   * @param content content of the modal
   */
  open(content: any) {
    this.modalView = 0;
    this.selectedCategory = null;
    this.addCategoryForm.reset();
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  /**
   * On submit for adding a category
   */
  onSubmit() {
    var min_point = this.addCategoryForm.get('min_point').value;
    var max_point = this.addCategoryForm.get('max_point').value;
    var point_scale = this.addCategoryForm.get('point_scale').value;
    if (min_point || max_point || point_scale) {
      if (min_point == null || max_point == null || point_scale == null || min_point > max_point || max_point - min_point <= 0 || (max_point - min_point) % point_scale != 0) {
        this.alertService.setErrorHTML("Incorrect point range");
        return;
      }
    }
    var categoryForm = {
      category: this.addCategoryForm.value,
      category_for_teacher: {'user_id': this.user.id},
      category_for_rubric: {'rubric_id': this.rubric.id}
    }
    console.warn(categoryForm);
    this.apiService.postCategory(categoryForm)
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
      );
    this.getCategories();
    this.addCategoryForm.reset();
    this.updateCategories();
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
   * Set selected category
   * @param c selected category
   */
  selectCategory(c: any) {
    this.selectedCategory = c;
  }

  /**
   * Use template category to create new category
   */
  useTemplate() {
    this.addCategoryForm.controls['name'].setValue(this.selectedCategory.name);
    this.addCategoryForm.controls['learning_objective'].setValue(this.selectedCategory.learning_objective);
    this.addCategoryForm.controls['min_point'].setValue(this.selectedCategory.min_point);
    this.addCategoryForm.controls['max_point'].setValue(this.selectedCategory.max_point);
    this.addCategoryForm.controls['point_scale'].setValue(this.selectedCategory.point_scale);
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
