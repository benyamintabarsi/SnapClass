import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../services/alert.service';
import {NgbModal,  ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { APIService } from '../../services/api.service';
import { ActiveSectionService } from '../../services/active-section.service'
import { Router } from '@angular/router';
import { NavBarService } from '../../services/navbar.service'

@Component({
  selector: 'app-select-assignment-to-grade',
  templateUrl: './select-assignment-to-grade.component.html',
  styleUrls: ['./select-assignment-to-grade.component.css']
})
export class SelectAssignmentToGradeComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param alertService message and error handler service
   * @param sectionService active section handler service
   * @param router provides the navigation and url manipulation capabilities.
   * @param modalService service to allow modal manipulation
   */
  constructor(
    private apiService: APIService,
    public navService: NavBarService,
    private sectionService: ActiveSectionService,
    private modalService: NgbModal,
    public router: Router) { }


  /**
   * Close result
   */
  closeResult: string;

  /**
   * list of assignments
   */
  assignments: any[];

  /**
   * Selected assignment to grade
   */
  selectedAssignment: any;

  ngOnInit() {
    this.getAssignments();
  }

  /**
   * Get all assignments for teacher
   */
  getAssignments() {
    var _this = this;
    this.assignments = [];
    this.apiService.getAssignmentsForSection(this.sectionService.getActiveSection())
      .subscribe(res => {
        if (res['success']) {
          res['assignments'].forEach(assignment => {
            _this.assignments.push(assignment);
          })
        }
      })
  }

  /**
   * Set selected assignment
   * @param a selected assignment
   */
  selectAssignment(a: any) {
    this.selectedAssignment = a;
  }

  /**
   * Navigate to URl
   * @param url URL to navigate to
   */
  navigate(url) {
    this.navService.closeNav();
    this.router.navigateByUrl(url);
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

}
