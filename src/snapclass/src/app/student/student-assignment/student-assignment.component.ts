import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { loadSnap, saveSnap, sendMessage, newSnap } from '../../../assets/js/snap';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NavBarService } from '../../services/navbar.service';

@Component({
  selector: 'app-student-assignment',
  templateUrl: './student-assignment.component.html',
  styleUrls: ['./student-assignment.component.css']
})
export class StudentAssignmentComponent implements OnInit {

  helpRequested: boolean;

  assignment: any;

  assignmentID: number;

  user: User;

  submission: any;

  isSubmit: number;

  closeResult: string;

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param alertService message and error handler service
   * @param navService provides navigation bar manipulation
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private router: ActivatedRoute,
    private navService: NavBarService) {}

  ngOnInit() {
    this.user = this.authService.getUser();
    this.navService.openNav();
    this.router.params.subscribe(params => {
    this.assignmentID = +params['id']; // (+) converts string 'id' to a number
    this.getAssignment();
    this.getSubmission();
    window.setTimeout(function() {
      $('.snap-fullscreen-toggle').addClass('show');
    }, 2000)
    

   });
   this.helpRequested = false;
  }

  /**
   * Get assignment information
   */
  getAssignment() {
    this.apiService.getAssignment(this.assignmentID)
    .subscribe(res => {
      if (res["success"]) {
        this.assignment = res["assignment"];
      }
    });
  }

  /**
   * Get submission information
   */
  getSubmission() {
    var _this = this;
    this.apiService.getSubmission(this.user.id, this.assignmentID)
    .subscribe(res => {
      if (res["success"]) {
        _this.submission = res["submission"];
        loadSnap(_this.submission.submission_code);
      }
      else {
        _this.submission = null;
        newSnap();
      }
    })
  }


  saveAssignment() {
    var code = saveSnap();
    if (this.submission) {
      this.apiService.putSubmission(this.submission.id, { submission_code: code, is_submitted: 0})
      .subscribe(res => {
        if (res["success"]) {
          sendMessage("Successfully saved!");
        }
      });

    }
    else {
      var sub = {
        submission_code: code,
        assignment_id: this.assignmentID,
        user_id: this.user.id,
        is_submitted: 0
      }
      this.apiService.postSubmission(sub)
      .subscribe(res => {
        if (res["success"]) {
          sendMessage("Successfully saved!");
        }
      });
    }
  }

  submitAssignment() {
    var code = saveSnap();
    if (this.submission) {
      this.apiService.putSubmission(this.submission.id, { submission_code: code, is_submitted: 1 })
      .subscribe(res => {
        if (res["success"]) {
          sendMessage("Successfully submitted!");
        }
      });
    }
    else {
      var sub = {
        submission_code: code,
        assignment_id: this.assignmentID,
        user_id: this.user.id,
        is_submitted: 1
      }
      this.apiService.postSubmission(sub)
      .subscribe(res => {
        if (res["success"]) {
          sendMessage("Successfully submitted!");
        }
      });
    }
  }
  
  /**
   * Post help request
   */
  submitHelp(event: any) {
      this.helpRequested = true;
      this.apiService.postHelp(this.user)
      .subscribe(
        res => {
          if (res["success"]) {
            this.alertService.setSuccessHTML(res["message"]);
          }
          else {
            this.alertService.setErrorHTML(res["message"]);
          }
        }
      );
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  toggleFullscreen() {
    $('#snapframe').toggleClass('fullscreen');
  }

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
