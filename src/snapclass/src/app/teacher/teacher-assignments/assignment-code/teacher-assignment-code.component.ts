import {Component, OnInit} from '@angular/core';
import {APIService} from 'src/app/services/api.service';
import {AlertService} from 'src/app/services/alert.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {loadSnap, newSnap, saveSnap, sendMessage} from '../../../../assets/js/snap';
import {ActiveSectionService} from 'src/app/services/active-section.service';
import {TutorialService} from 'src/app/services/tutorial.service';
import {User} from '../../../models/user.model';
import {Router} from '@angular/router';
import {NavBarService} from 'src/app/services/navbar.service';
import {Assignment} from '../../../models/assignment.model';
import {Rubric} from '../../../models/rubric.model';

@Component({
  selector: 'app-assignment-code',
  templateUrl: './teacher-assignment-code.component.html',
  styleUrls: ['./teacher-assignment-code.component.css']
})
export class TeacherAssignmentsCodeComponent implements OnInit {

  constructor(
    private apiService: APIService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private sectionService: ActiveSectionService,
    private alertService: AlertService,
    private tutorialService: TutorialService,
    public router: Router,
    public navService: NavBarService) { }

  /**
   * The current logged in user that is grading the assignment.
   */
  private user: User;

  /**
   * Current assignment being graded
   */
  private assignment: Assignment;

  /**
   * The submission currently being graded
   * There does not seem to be a model class for the submission, but it contains the following fields: // TODO: these are guesses...
   *  - id: Unique ID for this submission?
   *  - submission_code: XML data representing SNAP code?
   *  - assignment_id: Unique ID for the Assignment corresponding to this submission
   *  - user_id: Unique ID of the user (student) that owns the submission
   *  - is_submitted: Whether the submission has been submitted (1), or is in progress (0)
   */
  private submission: any;

  /**
   * student list (expected to be submitted)
   */
   private students: any[];

  /**
   * Form for assignment feedback
   */
  assignmentFeedbackForm = new FormGroup({
    user_id: new FormControl(null),             // TODO: ???
    assignment_feedback: new FormControl(''),   // Text feedback from grader
    grade_total: new FormControl(null),         // TODO: Sum of rubric points?
    assignment_id: new FormControl(null),       // Unique identifier for the assignment
    point_for_category: new FormControl('')     // TODO: ???
  });

  ngOnInit() {
    this.user = this.authService.getUser();
    this.students = [];
    this.loadStudents();
    if ((this.user['data']['account_type']) !== 1) {
      this.authService.logout();
      this.navigate('/');
    } else {
      this.route.params.subscribe(params => {
        this.loadAssignment(+params['id']);
      });
    }
    window.setTimeout(function() {
      $('.snap-fullscreen-toggle').addClass('show');
    }, 2000)
  }

  saveStarterCode() {
    var code = saveSnap();
    const _this = this;
    if (this.submission) {
      // A submission already exists. Update it
      const confirmation = confirm('Are you sure you want to overwrite your starter code? If any students have already submitted, they will be overwritten.');
      if (confirmation) {
        this.apiService.putSubmission(this.submission.id, { submission_code: code, is_submitted: 0})
          .subscribe(res => {
            if (res["success"]) {
              sendMessage("Successfully saved!");
              _this.studentSubmissions(code);
            }
          });
      }
      
    }
    else {
      // Create a new submission
      var sub = {
        submission_code: code,
        assignment_id: this.assignment.id,
        user_id: this.user.id,
        is_submitted: 0
      }
      this.apiService.postSubmission(sub)
      .subscribe(res => {
        if (res["success"]) {
          sendMessage("Successfully saved!");
          //_this.loadSubmission();
          _this.studentSubmissions(code);
        }
      });
    }
  }

  private studentSubmissions(code) {
    const _this = this;
    let sub;
    _this.students.forEach(element => {
      
      _this.apiService.getSubmission(element.id, _this.assignment.id)
        .subscribe(res => {
          if (res['success']) {
            sub = res['submission'];
            if (sub) {
              // A submission already exists (possibly just starter code). Will be updated.
              _this.apiService.putSubmission(sub.id, { submission_code: code, is_submitted: 0})
                .subscribe(res => {
                });
            }
          }
        }, err => {
          // No submission exists for student. Make a new one.
          sub = {
            submission_code: code,
            assignment_id: _this.assignment.id,
            user_id: element.id,
            is_submitted: 0
          }
          _this.apiService.postSubmission(sub)
            .subscribe(res => {});
        })


        
    });
  }

  /**
   * Load assignment information
   */
  private loadAssignment(assignmentId) {
    console.log('loadAssignment()');
    const _this = this;
    _this.apiService.getAssignment(assignmentId)
      .subscribe(res => {
        if (res['success']) {
          _this.assignment = res['assignment'];
          _this.loadSubmission();
        }
      });
  }

  /**
 * Load submission for current student
 */
  private loadSubmission() {
    const _this = this;
    this.apiService.getSubmission(_this.user['data'].id, _this.assignment.id)
      .subscribe(res => {
        if (res['success']) {
          _this.submission = res['submission'];
          loadSnap(_this.submission.submission_code);
        } else {
          newSnap();
          _this.submission = null;
        }
      });
  }

  /**
   * Load student list for active section
   */
  private loadStudents() {
    console.log('loadStudents()');
    const _this = this;
    this.apiService.getStudentsForSection(_this.sectionService.getActiveSection())
      .subscribe(res => {
        if (res['success']) {
          _this.students = res['students'];
        }
      });
  }

  /**
   * Navigate to URL
   * @param url URL to navigate to
   */
  private navigate(url) {
    this.router.navigateByUrl(url);
  }

  toggleFullscreen() {
    $('#snapframe').toggleClass('fullscreen');
  }
}
