import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { APIService } from '../../services/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Section } from '../../models/section.model';
import { User } from '../../models/user.model';
import { Course } from '../../models/course.model';
import { CourseStatus } from '../../models/status.enum';
import { AlertService } from '../../services/alert.service';
import { NgbModal,  ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ActiveSectionService } from '../../services/active-section.service';
import { TutorialService } from 'src/app/services/tutorial.service';

/**
 * Add course modal
 * Allows teacher to add new course
 */
@Component({
    selector: 'add-course',
    templateUrl: './add-course.component.html',
    styleUrls: ['./add-course.component.css']
})

/**
 * Component for adding a course
 */
export class AddCourseComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param activeSectionService active section management
   * @param alertService message and error handler service
   */
  constructor(
    private apiService: APIService,
    public activeSectionService: ActiveSectionService,
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
   * Initial section information
   */
  section: Section;

  /**
   * Course description
   */
  description: Course["description"];

  /**
   * Course status
   */
  status: CourseStatus;

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
   * Form for adding a course with section
   */
  addCourseSectionForm = new FormGroup({
    name: new FormControl(''),
    section_number: new FormControl(''),
    start_date: new FormControl(null),
    end_date: new FormControl(null),
    status: new FormControl(''),
    description: new FormControl('')
  });

  /**
   * Form for adding a course
   */
  addCourseForm = new FormGroup({
    user_id: new FormControl(''),
    name: new FormControl(''),
    start_date: new FormControl(null),
    end_date: new FormControl(null),
    status: new FormControl(''),
    description: new FormControl('')
  })

  /**
   * Form for adding a section
   */
  addSectionForm = new FormGroup({
    section_number: new FormControl(''),
  })


  /**
   * initializes the add courses component
   */
  ngOnInit() {
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
   * Update courses
   */
  updateCourses() {
    this.update.emit();
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
     * Set Course and Section form information
     */
    setCourseSection() {
      this.addCourseForm.setValue({
        user_id: this.user.id,
        name: this.addCourseSectionForm.value.name,
        start_date: this.addCourseSectionForm.value.start_date,
        end_date: this.addCourseSectionForm.value.end_date,
        status: this.addCourseSectionForm.value.status,
        description: this.addCourseSectionForm.value.description
      });

      this.addSectionForm.setValue({
        section_number: this.addCourseSectionForm.value.section_number
      })
    }

    /**
     * On submit for adding a course
     */
    onSubmit() {
      this.setCourseSection();
      if (this.addSectionForm.value.section_number == "") {
        this.addSectionForm.value.section_number = "001";
      }
      const courseSection = {
        course: this.addCourseForm.value,
        section: this.addSectionForm.value
      }

      // Error checking
      if (this.addCourseSectionForm.value.name == "") {
        this.alertService.setErrorHTML("Please enter a course name");
        return
      }
      if (this.addCourseSectionForm.value.start_date == null) {
        this.alertService.setErrorHTML("Please enter a start date");
        return;
      }
      if (this.addCourseSectionForm.value.end_date == null) {
        this.alertService.setErrorHTML("Please enter an end date");
        return;
      }
      if (this.addCourseSectionForm.value.end_date < this.addCourseSectionForm.value.start_date) {
        this.alertService.setErrorHTML("End date cannot be before start date");
        return;
      }


      console.warn(this.addCourseSectionForm.value);
      this.apiService.postCourse(courseSection)
        .subscribe(
          res => {
            if (res["success"]) {
              this.alertService.setSuccessHTML(res["message"]);
              this.activeSectionService.getCourses();
              this.updateCourses();
              this.modalService.dismissAll();
            } else {
              this.alertService.setErrorHTML(res["message"]);
            }
          }
        );

      this.addCourseSectionForm.reset();
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
