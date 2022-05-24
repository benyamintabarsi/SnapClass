import {Component, OnInit} from '@angular/core';
import {APIService} from 'src/app/services/api.service';
import {AlertService} from 'src/app/services/alert.service';
import {ActivatedRoute} from '@angular/router';
import {FormGroup, FormControl} from '@angular/forms';
import {AuthService} from 'src/app/services/auth.service';
import {loadSnap, newSnap} from '../../../assets/js/snap';
import {ActiveSectionService} from 'src/app/services/active-section.service';
import {TutorialService} from 'src/app/services/tutorial.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {NavBarService} from 'src/app/services/navbar.service';
import {Assignment} from '../../models/assignment.model';
import {Rubric} from '../../models/rubric.model';

@Component({
  selector: 'app-grade-assignment',
  templateUrl: './grade-assignment.component.html',
  styleUrls: ['./grade-assignment.component.css']
})
export class GradeAssignmentComponent implements OnInit {

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
  private grader: User;

  /**
   * current position in student list
   */
  private currentStudentIndex: number;

  /**
   * Current assignment being graded
   */
  private assignment: Assignment;

  /**
   * Current rubric being used for grading
   */
  private rubric: Rubric;

  /**
   * Categories for the current active rubric
   */
  private rubricCategories: any[];

  /**
   * student list (expected to be submitted)
   */
  private students: any[];

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
   * points id list
   * TODO: what is this?
   */
  private pointsList: any[];

  /**
   * Grade object for the current submission.
   * Consists of:
   *  - id
   *  - grade_total
   *  - assignment_feedback
   *  - points
   */
  private grade: any;

  /**
   * Tutorial status
   */
  private tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  private tutorialSubStatus: any;

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
    this.grader = this.authService.getUser();
    this.grade = {
      'grade_total': 0,
      'assignment_feedback': '',
      'points_for_category': '',
      'assignment_id': null,
      'user_id': null
    };
    this.pointsList = [];
    this.rubricCategories = [];
    this.students = [];
    if ((this.grader['data']['account_type']) !== 1) {
      this.authService.logout();
      this.navigate('/');
    } else {
      this.route.params.subscribe(params => {
        this.loadAssignment(+params['id']);
      });
      this.tutorialStatus = this.tutorialService.getTutorialStatus();
      this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
    }
    window.setTimeout(function() {
      $('.snap-fullscreen-toggle').addClass('show');
    }, 2000)
  }

  private loadTutorialStatus(): any {
    return this.tutorialService.getTutorialStatus();
  }

  private loadTutorialSubStatus(): any {
    return this.tutorialService.gettutorialSubStatus();
  }

  private currentStudent(): any {
    return this.students[this.currentStudentIndex];
  }

  private possiblePoints(): number {
    let sum = 0;
    for (const category of this.rubricCategories) {
      sum += category['max_point'];
    }
    return sum;
  }

  private earnedPoints(): number {
    let sum = 0;
    for (const point of this.pointsList) {
      sum += point.points;
    }
    return sum;
  }

  private earnedPointsForCategory(categoryId): number {
    for (const point of this.pointsList) {
      if (point.category_id === categoryId) {
        return point.points;
      }
    }
    return 0;
  }

  private isCategoryOptionSelected(categoryId, optionId): boolean {
    for (const point of this.pointsList) {
      if (point.category_id === categoryId && point.id === optionId) {
        return true;
      }
    }
    return false;
  }

  /**
   * Load submission for current student
   */
  private loadSubmission() {
    console.log('loadSubmission()');
    const _this = this;
    this.apiService.getSubmission(_this.currentStudent().id, _this.assignment.id)
      .subscribe(res => {
        if (res['success']) {
          _this.submission = res['submission'];
          console.log('Submission:', _this.submission);
          loadSnap(_this.submission.submission_code);
          _this.loadCurrentStudentGrade();
        } else {
          newSnap();
          _this.submission = null;
          _this.loadCurrentStudentGrade();
        }
      });
  }

  /**
   * Retrieve current students grade
   */
  private loadCurrentStudentGrade() {
    console.log('loadCurrentStudentGrade()');
    const _this = this;
    _this.pointsList = [];
    _this.apiService.getGrade(_this.assignment.id, _this.currentStudent().id)
      .subscribe(res => {
        if (res['success']) {
          console.log('Grade:', res['grade']);
          _this.grade = res['grade'][0];
          _this.initializePointList(_this.grade.points.split(','));
          _this.assignmentFeedbackForm.patchValue({
            user_id: _this.currentStudent().id,
            assignment_feedback: _this.grade.assignment_feedback,
            grade_total: _this.grade.grade_total,
            assignment_id: _this.assignment.id,
            point_for_category: _this.grade.points
          });
        } else {
          console.log('Grade could not be retrieved...Why?');
          _this.assignmentFeedbackForm.patchValue({
            user_id: _this.currentStudent().id,
            assignment_feedback: '',
            grade_total: 0,
            assignment_id: _this.assignment.id,
            point_for_category: ''
          });
        }
      });
  }

  /**
   * Manage current points for categories
   * @param newPoint is point to be added/updated
   */
  private managePointList(newPoint) {
    console.log('managePointList(', newPoint, ')');
    let place = 0;
    let present = false;
    for (const point of this.pointsList) {
      if (point.category_id === newPoint.category_id && point.points === newPoint.points) {
        present = true;
        point.selected = false;
        newPoint.selected = false;
        this.pointsList.splice(place, 1);
        break;
      } else if (point.category_id === newPoint.category_id && point.points !== newPoint.points) {
        present = true;
        point.selected = false;
        newPoint.selected = true;
        this.pointsList.splice(place, 1);
        this.pointsList.push(newPoint);

        break;
      }
      place += 1;
    }
    if (!present) {
      newPoint.selected = true;
      this.pointsList.push(newPoint);
    }
    console.log('New Points List:', this.pointsList);
    this.updateTotalGrade();
  }

  /**
   * reset selected category points for each student
   */
  private resetList() {
    console.log('refreshList()');
    this.pointsList = [];
    this.rubricCategories.forEach(category => {
      category.points.forEach(point => {
        point.selected = false;
      });
    });
  }

  /**
   * Initialize point list of current student
   */
  private initializePointList(pointsString) {
    console.log('initializePointList(', pointsString, ')');
    this.resetList();
    pointsString.forEach(id => {
      this.apiService.getPointForCategory(id)
        .subscribe(res => {
          if (res['success']) {
            console.log('Point for category returned:', res['point']);
            this.managePointList(res['point']);
          }
        });
    });
  }

  /**
   * Calculate and update total grade in assignmentFeedbackForm
   */
  private updateTotalGrade() {
    console.log('updateTotalGrade()');
    let currentGrade = 0;
    this.pointsList.forEach(point => {
      currentGrade += point.points;
    });
    currentGrade /= this.possiblePoints();
    currentGrade *= 100;
    currentGrade = Math.round(currentGrade * 100) / 100;
    this.assignmentFeedbackForm.patchValue({
      grade_total: currentGrade,
      assignment_feedback: this.grade.assignment_feedback,
    });
    console.log('Setting grade_total to:', currentGrade);
  }

  /**
   * Submit current student
   * @param num determines whether to increment/decrement list of students
   */
  private submitCurrentStudent(num) {
    console.log('submitCurrentStudent()');
    const _this = this;
    if (_this.pointsList) {
      const list = [];
      _this.pointsList.forEach(point => {
        list.push(point.point_id);
      });
      if (list.length == 0 || !list[0]) {
        if (num < 0) {
          _this.assignmentFeedbackForm.reset();
          _this.loadPrevStudent();
        } else if (num > 0) {
          _this.assignmentFeedbackForm.reset();
          _this.loadNextStudent();
        }
        return;
      }
      _this.assignmentFeedbackForm.patchValue({
        point_for_category: list.toString(),
        assignment_feedback: _this.grade.assignment_feedback,
      });
    }
    if (_this.grade.id) {
      _this.apiService.putGrade(_this.assignment.id, _this.assignmentFeedbackForm.value.user_id, _this.assignmentFeedbackForm.value)
        .subscribe(res => {
          if (res['success']) {
            _this.alertService.setSuccessHTML(res['message']);
          } else {
            _this.alertService.setSuccessHTML(res['message']);
          }
        });
    } else {
      _this.apiService.postGrade(_this.assignmentFeedbackForm.value)
        .subscribe(res => {
          if (res['success']) {
            _this.loadCurrentStudentGrade();
            _this.alertService.setSuccessHTML(res['message']);
          } else {
            _this.alertService.setSuccessHTML(res['message']);
          }
        });
    }
    if (num < 0) {
      _this.assignmentFeedbackForm.reset();
      _this.loadPrevStudent();
    } else if (num > 0) {
      _this.assignmentFeedbackForm.reset();
      _this.loadNextStudent();
    }
  }

  /**
   * load next student in list
   */
  private loadNextStudent() {
    const _this = this;
    _this.currentStudentIndex += 1;
    this.loadSubmission();
  }

  /**
   * load previous student in list
   */
  private loadPrevStudent() {
    const _this = this;
    _this.currentStudentIndex -= 1;
    this.loadSubmission();
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
          console.log(_this.students);
          _this.currentStudentIndex = 0;
          _this.loadSubmission();
        }
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
          console.log(_this.assignment);
          _this.loadRubric();
        }
      });
  }

  /**
   * Load rubric information
   */
  private loadRubric() {
    console.log('loadRubric()');
    const _this = this;
    _this.apiService.getRubric(_this.assignment.rubric_id)
      .subscribe(res => {
        if (res['success']) {
          _this.rubric = res['rubric'];
          console.log(_this.rubric);
          _this.loadRubricCategories();
        }
      });
  }

  /**
   * Get categories for rubric
   */
  private loadRubricCategories() {
    console.log('loadRubricCategories()');
    const _this = this;
    this.apiService.getRubricsCategories(_this.rubric.id)
      .subscribe(res => {
        if (res['success']) {
          _this.rubricCategories = res['categories'];
          console.log(_this.rubricCategories);
          _this.loadStudents();
        }
      });
  }

  /**
   * Sets the new status for the tutorial.
   * @param status the number indicating the status of the tutorial
   * @param subStatus the number indicating the substatus of the tutorial
   */
  private setTutorialStatus(status, subStatus) {
    this.tutorialService.setTutorialStatus(status, subStatus);
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
  }

  /**
   * Navigate to URL
   * @param url URL to navigate to
   */
  private navigate(url) {
    this.router.navigateByUrl(url);
  }

  /**
   * Calculates which student of the full student list the teacher is currently grading.
   */
  private currentStudentIndexAsPercentage() {
    return ((this.currentStudentIndex + 1) * 100.00 / this.students.length);
    // TODO Calculate which student the teacher is currently on out of how many student submissions there were for the assignment
  }

  toggleFullscreen() {
    $('#snapframe').toggleClass('fullscreen');
  }

  /**
   * Calculates the percentage of completed graded submissions for a particular assignment.
   */
  private percentGradedOfStudentList() {
    //  TODO
  }
}
