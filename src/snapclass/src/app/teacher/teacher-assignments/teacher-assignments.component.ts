import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { FormGroup , FormControl } from '@angular/forms';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { AssignmentStatus } from 'src/app/models/status.enum';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { CourseSection } from '../../models/coursesection.model';
import { Location } from '@angular/common';
import { NavBarService } from 'src/app/services/navbar.service';

/**
 * Teacher view assignments page
 * Allows teacher to create a new assignment
 */
@Component({
  selector: 'app-teacher-assignments',
  templateUrl: './teacher-assignments.component.html',
  styleUrls: ['./teacher-assignments.component.css']
})
export class TeacherAssignmentsComponent implements OnInit {


  // current logged in teacher
  user: User;
  // list of all assignment for teacher
  assignments: any[];
  // list of assignments for teacher filtered by status
  viewAssignments: any[];
  // current assignment status view
  status: AssignmentStatus;
  // assignment status enumeration
  assignmentStatus: any;
  // students in course
  students: any;
  // number of students in course
  studentsLength: number;
  // number of current submissions for assignment
  submissions: number;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  //All of the coursessections for the current teacher
  allList: any[];

  //Active coursesection
  CourseSection: CourseSection;

  first: any;


  assignmentForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    status: new FormControl(''),
    start_date: new FormControl(null),
    due_date: new FormControl(null),
    rubric_id: new FormControl('')
  })

  sortByForm = new FormGroup({
    status: new FormControl(''),
  })

    activeSectionForm = new FormGroup({
      currentSection: new FormControl(''),
    })


  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param alertService message and error handler service
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private router: Router,
    private sectionService: ActiveSectionService,
    private tutorialService: TutorialService,
    private location: Location,) { }

  ngOnInit() {
      //this makes a check to see if they're a user
    this.user = this.authService.getUser();
    if((this.user["data"]["account_type"]) != 1){
        this.authService.logout();
        this.navigate('/');
    }
    else{
    this.assignments = [];
    this.viewAssignments = [];
    this.status = AssignmentStatus.Active;
    this.assignmentStatus = AssignmentStatus;
    this.updateSection('FIRSTLOAD');
    setTimeout(() => console.log(this.CourseSection) ,100);
    setTimeout(() => this.getAssignments() ,100);
    setTimeout(() => this.onChanges(),100);
    // this.getAssignments();
    // this.onChanges();
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
    }
  }

  updateSection(sectionId){
      console.log(sectionId);
      if(sectionId == 'FIRSTLOAD'){

          this.apiService.getAllForTeacher(this.user.id)
          .subscribe(res => {
              if(res['success']){
                  console.log(res['coursesections']);
                  console.log(res['coursesections'][0]['sectionId']);
                  this.first = res['coursesections'][0]['sectionId'];
                  this.allList = [];
                  res['coursesections'].forEach(element => {

                      // console.log(element);
                      this.allList.push(new CourseSection({CourseId: element['courseId'], SectionId: element['sectionId'],
                                            CourseName: element['name'], SectionName: element['section_number'], description: element['description'],
                                            status: element['status'], user_id: this.user.id, start_date: element['start_date'],
                                    end_date: element['end_date']}));
                  });
                  this.sectionService.setActiveSection(this.first);
                  console.log(this.allList);
                  this.CourseSection = this.allList[0]

                  this.sectionService.getAll(this.CourseSection.SectionId);
                  setTimeout(() => this.allList = this.sectionService.allList, 100);
                  this.allList.forEach(course =>{
                      if(course.SectionId == sectionId){
                          this.CourseSection = course;
                      }
                  });
                  this.getAssignments()
                  this.onChanges()

                  setTimeout(() => this.sectionService.setActiveSection(this.first), 100);
              }
          });

          // setTimeout(() => this.allList = this.sectionService.allList, 500);
          // setTimeout(() => this.CourseSection = this.allList[0], 500);
      }
      else{
          this.sectionService.setActiveSection(sectionId);
          //this.CourseSection = new CourseSection({CourseId: 1, SectionId: 1, CourseName: 'first', SectionName: 'section1', description: 'N/A', status: 1, user_id: 1, start_date: new Date('2019-08-15T04:00:00.000Z'), end_date: new Date('2019-12-15T05:00:00.000Z')});

          this.sectionService.getAll(sectionId);
          setTimeout(() => this.allList = this.sectionService.allList, 100);
          this.allList.forEach(course =>{
              if(course.SectionId == sectionId){
                  this.CourseSection = course;
              }
          });

          setTimeout(() => this.onChanges(), 100);
          setTimeout(() => this.getAssignments(), 100);

      }
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

  getGradingInfo() {
    var gradebook = null;
    var percentgraded = 0;
    this.apiService.getSectionGrades(this.CourseSection.SectionId)
      .subscribe(res => {
        if (res['success']) {
          gradebook = res['gradebook'];
          this.viewAssignments.forEach(assignment => {
            var graded = 0;
            assignment.graded = graded;
            assignment.percentgraded = percentgraded;
            gradebook.forEach(gradeEntry => {
              gradeEntry = Array.from(new Set(gradeEntry.grades.map(a => a.assignment)))
                .map(assignment => {
                  return {
                    assignment: assignment,
                    grade: gradeEntry.grades.find(a => a.assignment === assignment).grade
                  };
                })
              gradeEntry.forEach(grade => {
                if((assignment.id == grade.assignment) && grade.grade != null) {
                  assignment.graded += 1;
                  assignment.percentgraded = (assignment.graded / assignment.submission) * 100;
                  if(assignment.percentgraded >= 100) {
                      assignment.percentgraded = 100;
                  }
                }
             })
            })
          })
        }
      })
  }

  getSubmissionInfo(assignment) {
    var submissions = 0;
    assignment.submission = submissions;
    this.students.forEach(student => {
      this.apiService.getSubmission(student.id, assignment.id)
      .subscribe(res => {
        if (res['success'] && res.submission.is_submitted == 1) {
          submissions = submissions + 1;
          assignment.submission = submissions;
        } else {
          //
        }
      })
    })
    this.getGradingInfo();
  }

  getNumStudents() {
    this.apiService.getStudentsForSection(this.CourseSection.SectionId)
      .subscribe( res => {
        if (res['success']) {
          this.students = res['students'];
          this.studentsLength = res['students'].length;
          for (let assignment of this.viewAssignments) {
            this.getSubmissionInfo(assignment);
          }
        }
      })
  }


  /**
   * Get assignments for teacher
   */
  getAssignments() {
    var _this = this;
    _this.apiService.getAssignmentsForSection(this.CourseSection.SectionId)
      .subscribe(res => {
        if (res["success"]) {
          _this.assignments = [];
          res["assignments"].forEach(assignment => {
            _this.assignments.push(assignment);
          });
          _this.viewAssignments = _this.assignments.filter(function(assignment) {
            return assignment.status = _this.status;
          });
          this.getNumStudents();
        }
      });
  }

  /**
   * Bind event to status form
   * On change update current status and assignment to display
   */
  onChanges() {
    this.sortByForm.valueChanges.subscribe(val => {
      this.status = val.status;
      this.viewAssignments = this.assignments.filter(function(assignment) {
        return assignment.status == val.status;
      });
    });
  }

  /**
   * Update list of assignments when new assignment is added
   * @param event Update assignments event
   */
  updateAssignmentList(event: any) {
    this.getAssignments();
  }

  goToAssignment(assignmentID) {
    this.router.navigateByUrl('teacher/assignments/' + assignmentID);
  }

  onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
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
  /**
   * Allows navigation based on url
   */
  navigate(url) {
    this.router.navigateByUrl(url);
  }
}
