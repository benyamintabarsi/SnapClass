import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';
import { routeNames } from '../../services/routing.service';
import { NavBarService } from '../../services/navbar.service';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { addAccordion } from '../../../assets/js/accordion';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CourseStatus } from '../../models/status.enum';


import {
    trigger,
    state,
    style,
    animate,
    transition,
} from '@angular/animations'



/**
 * The max number of upcoming assignments to display
 */
const NUM_ASSIGNMENTS = 12;

@Component({
  selector: 'app-teacher-landing-page',
  templateUrl: './teacher-landing-page.component.html',
  styleUrls: ['./teacher-landing-page.component.css']
})
export class TeacherLandingPageComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param alertService message and error handler service
   * @param navService provides navigation bar manipulation
   * @param router provides the navigation and url manipulation capabilities.
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    private navService: NavBarService,
    private sectionService: ActiveSectionService,
    public router: Router) {}

//variables for the all courses portion of the landing page


/**
 * List of all courses for teacher
 */
courses: any[];

/**
 * list of sections
 */
sectionList: any[];

/**
 * List of courses for teacher filtered by status
 */
viewCourses: any[];

/**
 * List of sections for course
 */
sections: any[][];


//index is the section id while the element is the course associated with that section
sectionsCopy: any[];



    /**
     * Current course status view
     */
    status: CourseStatus;

    /**
     * Course status enumeration
     */
    courseStatus: any;

//variables for the upcoming deadlines/grading portion of the landing page

  /** Route for managing section */
  sectionManagement = routeNames.TEACHERSECTION;

  /**
   * Current logged in teacher
   */
  user: User;

  /**
   * User's current course
   */
  currentCourse: any;

  /**
   * The current section of the current course
   */
  currentSection: any;

  /**
   * List of assignments for current course section
   */
  assignmentList: any[];

  /**
   * List of assignments that need to be graded
   */
  gradingList: any[];

  /**
   * Number of students
   */
  numStudents: number;

  numStudentsByAssignmentId: number[];
  numSubmissionsByAssignmentId: number[];


  /**
   * List of all of the assignments indexed by the section id
   */
  assignmentMasterList: any[][];

  //list of all the assignment ids
  assignmentListById: number[];


  //list of all the assignment ids but not duplicated
  assignmentListByIdUnique: number[];


  //list of all section ids indexed by assignment ID
  assignmentListBySectionId: number[][];

  //list of sections indexed by the assignment ID
  assignmentListBySection: any[][];

  teacherAssignments = routeNames.TEACHERASSIGNMENTS;





  ngOnInit() {
    this.user = this.authService.getUser();

    //if they are not a teacher
    if((this.user["data"]["account_type"]) != 1){
        this.authService.logout();
        this.navigate('/');
    }
    else{
       this.navService.openNav();
       this.courses = [];
       this.viewCourses = [];
       this.sections = [[],[]];
       this.sectionsCopy = [];

       this.assignmentList = [];
       this.gradingList = [];
       this.assignmentMasterList = [[],[]];
       this.assignmentListById = [];
       this.assignmentListBySectionId = [];
       this.assignmentListBySection = [];

       this.numStudentsByAssignmentId = [];
       this.numSubmissionsByAssignmentId = [];


       this.status = CourseStatus.Active;
       this.getCourses();
       this.courseStatus = CourseStatus;
       setTimeout( () => {
           this.setCourseInfo();
      }, 100);

      setTimeout( () => {
          this.testFunction(1);
     }, 300);

     setTimeout( () => {
         this.getNumStudentsForAssignment();
    }, 1000);

    }
  }


//following methods are for displaying all the courses the teacher has

  /**
   * Get courses for teacher
   * Get sections for course
   * Set courses to display based on current status
   */
  getCourses() {
    var _this = this;
    _this.apiService.getCoursesForTeacher(this.user.id)
    .subscribe(res => {
      if(res["success"]) {
        _this.courses = [];
        _this.sectionsCopy = [];
        res["courses"].forEach(course => {
          _this.courses.push(course);
          this.getSectionsForCourse(course.id);
        });
        _this.viewCourses = _this.courses.filter(function(course) {
          return course.status == _this.status;
        });
        addAccordion();
      }
    });
  }

  /**
   * Get all sections for specific course
   * @param courseId course ID
   */
  getSectionsForCourse(courseId) {
    var _this = this;
    this.apiService.getSectionsForCourse(courseId)
    .subscribe(res => {
      if(res["success"]) {
        _this.sections[courseId] = [];

        res["sections"].forEach(section => {


          _this.sections[courseId].push(section);

          this.apiService.getCourse(courseId)
          .subscribe(resp => {
              if(resp["success"]) {
                  _this.sectionsCopy[section.id] = resp["course"];
              }

          });

        });
      }
    });


  }


  /**
   * Update list of courses when new course is added
   * @param event Update course event
   */
  updateCourseList(event: any) {
    this.getCourses();
  }



//following methods are for the later half of the page (upcoming deadlines and grading/at a glance)

  getSubmissionInfo(assignment, students) {
    var submissions = 0;
    assignment.submission = submissions;
    students.forEach(student => {
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
  }

  getStudents() {
    var students;
    this.apiService.getStudentsForSection(this.sectionService.getActiveSection())
    .subscribe(res => {
      if (res['success']) {
        students = res['students'];
        this.numStudents = res['students'].length;
        for (let assignment of this.gradingList) {
          this.getSubmissionInfo(assignment, students);
        }
      }
    })
  }

  setCourseInfo() {
    this.apiService.getSection(this.sectionService.getActiveSection())
    .subscribe(res => {
      if (res["success"]) {
        this.currentSection = res["section"];
        this.setCurrentCourse();
        this.setAssignments();
      }
      else {
        this.alertService.setErrorHTML("Error loading course section");
      }
    });

  }

  setCurrentCourse() {
    this.apiService.getCourse(this.currentSection.course_id)
    .subscribe(res => {
      if (res["success"]) {
        this.currentCourse = res["course"];
      }
      else {
        this.alertService.setErrorHTML("Error loading course info");
      }
    });
  }

  setAssignments() {
      var _this = this;
      _this.assignmentListById = [];

      _this.courses.forEach( function(course) {
              _this.sections[course.id].forEach( function(section) {


                  _this.apiService.getAssignmentsForSection(section.id)
                  .subscribe(res => {
                      if(res["success"]) {

                          _this.assignmentMasterList[section.id] = [];
                          res["assignments"].forEach(assignment => {
                              _this.assignmentMasterList[section.id].push(assignment);
                              _this.assignmentListById.push(assignment.id);


                          });


                      }
                  });

              });




      });


      setTimeout( () => {
          var uniqueAssignments = new Set();

          _this.assignmentListById.forEach(val => {
              uniqueAssignments.add(val);
          });

          _this.assignmentListByIdUnique = [];
          uniqueAssignments.forEach(v => {
              _this.assignmentListByIdUnique.push(v);

          });

      }, 100);

      setTimeout( () => {
          for(var i = 0; i < _this.assignmentListByIdUnique.length; i++) {
              console.log("assignment ids: " + _this.assignmentListByIdUnique[i]);
              _this.apiService.getAssignment(_this.assignmentListByIdUnique[i])
              .subscribe(resp => {
                  if(resp["success"]) {
                      _this.assignmentList.push(resp["assignment"]);
                      _this.gradingList.push(resp["assignment"]);

                  }
              });
          }

          _this.initAssignmentList();
          _this.getStudents();

     }, 220);



  }

  initAssignmentList() {
    this.assignmentList.sort((a,b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
    this.assignmentList = this.assignmentList.filter(function (value, index, arr) {
      return value.due_date && value.start_date;
    });

    this.gradingList.sort((a,b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
    this.gradingList = this.gradingList.filter(function (value, index, arr) {
      return value.due_date && value.start_date;
    });
  }

//change active section

changeSection(section) {
    this.sectionService.setActiveSection(section.id);
    setTimeout( () => {
        this.getSection();
   }, 100);

    setTimeout( () => {
        this.router.navigateByUrl(this.teacherAssignments);
   }, 300);
}

getSection() {
  this.apiService.getSection(this.sectionService.getActiveSection())
  .subscribe(res => {
    if (res["success"]) {
      this.currentSection = res["section"];
      this.getCourse();
    }
    else {
      this.alertService.setErrorHTML(res["Error loading course section."]);
    }
  });
}

/**
 * Get current course
 */
getCourse() {
  this.apiService.getCourse(this.currentSection.course_id)
    .subscribe(res => {
      if(res["success"]) {
        this.currentCourse = res['course'];
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    })
}





/**
 * Get sections for a given course
 * @param id is the is for the given course
 */



  //used to navigate
  navigate(url) {
    this.router.navigateByUrl(url);
  }

  testFunction(assignmentId) {


      this.apiService.getSectionByAssignment(assignmentId)
      .subscribe(res => {
          if(res["success"]) {
              this.assignmentListBySectionId = [];
              this.assignmentListBySection = [];

              this.assignmentListByIdUnique.forEach(val => {
                  this.assignmentListBySectionId[val] = [];
                  this.assignmentListBySection[val] = [];

                  res["sections"].forEach(item => {
                      if(val == item.assignment_id) {
                          this.sections.forEach(bigElement => {
                              bigElement.forEach(smallElement => {
                                  if(smallElement.id == item.section_id) {
                                      this.assignmentListBySectionId[val].push(item.section_id);
                                      this.apiService.getSection(item.section_id)
                                      .subscribe(resp => {
                                          if(resp["success"]) {
                                              this.assignmentListBySection[val].push(resp["section"]);
                                          }
                                      })
                                  }

                              });



                          });


                      }
                  });


                  setTimeout( () => {
                      var tempSet = new Set();

                      this.assignmentListBySectionId[val].forEach(value => {
                          tempSet.add(value);
                      });

                      this.assignmentListBySectionId[val] = [];
                      tempSet.forEach(v => {
                          this.assignmentListBySectionId[val].push(v);
                      });

                  }, 100);

              });

          }

      });

    //   setTimeout( () => {
    //       console.log("The length of assignmentListById: " + this.assignmentListById.length);
    //       for(var i = 0; i < this.assignmentListById.length; i++) {
    //           console.log("In Test function 1: " + this.assignmentListById[i]);
    //       }
    //
    //  }, 300);
    //  setTimeout( () => {
    //
    //      console.log("The length of assignmentListBySectionId: " + this.assignmentListBySectionId.length);
    //      for(var i = 0; i < this.assignmentListBySectionId.length; i++) {
    //          if(this.assignmentListBySectionId[i] != undefined) {
    //
    //              for(var j = 0; j < this.assignmentListBySectionId[i].length; j++) {
    //                  console.log("In Test function 2: " + this.assignmentListBySectionId[i][j]);
    //
    //              }
    //
    //          }
    //
    //      }
    // }, 400);

  }

  getNumStudentsForAssignment() {

      var _this = this;
      _this.numStudentsByAssignmentId = [];
      _this.numSubmissionsByAssignmentId = [];
      _this.assignmentListByIdUnique.forEach(assignmentId => {
          if(assignmentId !== undefined) {
              var number = 0;
              var submissions = 0;
              _this.assignmentListBySection[assignmentId].forEach(element => {

                  if(element !== undefined) {
                      _this.apiService.getStudentsForSection(element.id)
                      .subscribe(res => {
                          if(res["success"]) {
                             console.log("length of students " + res["students"].length);
                             number = number + res["students"].length;
                             console.log("number is " + number);

                             _this.numStudentsByAssignmentId[assignmentId] = number;
                             console.log("array at index" + assignmentId + " is " +  _this.numStudentsByAssignmentId[assignmentId]);
                             res["students"].forEach(student => {
                                 this.apiService.getSubmission(student.id, assignmentId)
                                 .subscribe(resp => {
                                     if(resp["success"] && resp.submission.is_submitted == 1) {
                                         submissions = submissions + 1;
                                         _this.numSubmissionsByAssignmentId[assignmentId] = submissions;

                                     }

                                 });

                             });

                          }

                      });

                  }


              })

          }



      })

      setTimeout( () => {
          _this.numStudentsByAssignmentId.forEach(val => {
              console.log("elements in the array: " + val);
          })

      }, 300);
  }




}
