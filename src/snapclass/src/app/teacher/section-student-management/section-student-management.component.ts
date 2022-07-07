import { Component, Inject, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AlertService } from '../../services/alert.service';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../../models/section.model';
import { Course } from '../../models/course.model';
import { FormGroup , FormControl } from '@angular/forms';
import { DOCUMENT, Location } from '@angular/common';
import { Router } from '@angular/router';
import { routeNames } from '../../services/routing.service';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { NavBarService } from 'src/app/services/navbar.service';
import { CourseSection } from '../../models/coursesection.model';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';

/**
 * Student management for section
 */
@Component({
  selector: 'app-section-student-management',
  templateUrl: './section-student-management.component.html',
  styleUrls: ['./section-student-management.component.css']
})
export class SectionStudentManagementComponent implements OnInit {

  /**
   * Construct dependencies
   * @param location Stores page location
   * @param authService token authorization service
   * @param alertService message and error handler service
   * @param route active route service
   * @param router router service
   */
  constructor(
    private apiService: APIService,
    private location: Location,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private sectionService: ActiveSectionService,
    private router: Router,
    private tutorialService: TutorialService,
    private navService: NavBarService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    @Inject(DOCUMENT) document: Document) {}

  /**
   * Section ID
   */
  sectionId: number;

  /**
   * Section information
   */
  section: Section;

  /**
   * List of students in section
   */
  students: any[];

  /**
   * List of potiential students
   */
  potentialStudents: any[];

  /**
   * Selected student
   */
  selectedStudent: any;

  usernameSelect: any;


  flag:any;

  /**
   * Student form
   */
  studentForm = new FormGroup({
    username: new FormControl('')
  });

  /**
   * Student form for automated accounts
   */
   studentForm1 = new FormGroup({
    name: new FormControl(''),
    username: new FormControl(''),
    preferred_name: new FormControl(''),
    email: new FormControl(''),
    pswd: new FormControl('')
  });

  

  /**
   * Section form
   */
  sectionForm = new FormGroup({
    section_number: new FormControl('')
  });

  /**
   * Course information
   */
  course: Course;

  /**
   * Toggle enable to edit section
   */
  editToggle: boolean;

  /**
   * Tutorial status
   */
  tutorialStatus: any;

  /**
   * Tutorial substatus
   */
  tutorialSubStatus: any;

  /* need a user*/
  user: User;

  activeSectionForm = new FormGroup({
    currentSection: new FormControl(''),
  })

  CourseSection: CourseSection;

  allList: any[];

  first: any;

  /**
   * Initialize section and student information
   */
  ngOnInit() {
     this.user = this.authService.getUser();
     this.studentForm.controls['username'].setValue('', {emitEvent:true});
     if((this.user["data"]["account_type"]) != 1){
        this.authService.logout();
        this.navigate('/');
     }
     else{
        this.prepareNewStudentForm();
         this.editToggle = false;
         this.route.params.subscribe(params => {
           if (params && params['id']) {
             this.sectionId = +params['id']; // (+) converts string 'id' to a number
           } else {
             this.sectionId = this.sectionService.getActiveSection();
           }
           //TRY SPINNING
           this.updateSection("FIRSTLOAD");
           //setTimeout(() => console.log(this.CourseSection), 500);

           setTimeout(() => this.getSection(), 100);
           setTimeout(() => this.oninput(), 100);
        });

        this.tutorialStatus = this.tutorialService.getTutorialStatus();
        this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
        if (this.tutorialStatus > 0) {
            this.navService.openNav();
        }
     }
  }

  prepareNewStudentForm() {
    this.studentForm1.get('email').setValue(this.user["data"]["email"]);
    
  }

  /**
   * Get all students for section
   */
  getStudents() {
    this.apiService.getStudentsForSection(this.CourseSection.SectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.students = res["students"];
      }
      else {
        this.students = [];
      }
    });
  }

  /**
   * Add student to section
   * @param studentId student ID
   */
  addStudentToSection(studentId) {
    //studentId = document.getElementById('username');
    const _this = this;
    this.studentForm.reset();
    this.studentForm1.reset();
    this.prepareNewStudentForm();
    //this.selectedStudent = null;
    if(this.CourseSection)
      this.apiService.postStudentToSection(studentId, this.CourseSection.SectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.alertService.setSuccessHTML(res["message"]);
        this.getStudents();

        //When a new student is added they need the starter code for all of the assignments in the section
        //which is what this block of text creates.
        _this.apiService.getAssignmentsForSection(this.CourseSection.SectionId)
          .subscribe(res => {
            if (res["success"]) {
              res["assignments"].forEach(assignment => {
                
                _this.apiService.getSubmission(_this.user.id, assignment.id)
                  .subscribe(res => {
                    if (res['success']) {
                      let sub = res['submission'];
                      if (sub) {

                        _this.apiService.getSubmission(studentId, assignment.id)
                          .subscribe(res => {
                            if (res['success']) {
                              let subStudent = res['submission'];
                              if (subStudent) {
                                _this.apiService.putSubmission(subStudent.id, { submission_code: sub["submission_code"], is_submitted: 0})
                                  .subscribe(res => {
                                  });
                              }
                            }
                          }, err => {
                            let subStudent = {
                              submission_code: sub["submission_code"],
                              assignment_id: sub["assignment_id"],
                              user_id: studentId,
                              is_submitted: 0
                            }
                            _this.apiService.postSubmission(subStudent)
                            .subscribe(res => {
                            });
                          })
                      }
                    }
                  })

              });
            }
          });

      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
  }


  /**
   * Delete student from section
   * @param studentId student ID
   */
  deleteStudentFromSection(studentId) {
    this.apiService.deleteStudentFromSection(studentId, this.CourseSection.SectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.alertService.setSuccessHTML(res["message"]);
        this.getStudents();
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
  }

  /**
   * Create student account using student form (automating account creation for a single student)
   */
   onSubmit() {
    console.log("hello hi") 
    var bool = false;

    var  studentForm1 = {user: this.studentForm1.value, role: {role_id: 2}};
    this.spinner.show();
    this.apiService.postUser(studentForm1)
      .subscribe(
        res => {
          this.spinner.hide();
          document.getElementById('close-modal-button').click();
          if (res["success"]) {
            this.alertService.setSuccessHTML(res["message"]);
            bool = true;

            // Show newly added user in the search
            const newUsername = this.studentForm1.get('username').value
            this.studentForm.controls['username'].setValue(newUsername, {emitEvent:true});
            this.searchForStudent(newUsername);

            // Clear new student form
            console.log(this.studentForm1.get('username').value);
            this.studentForm1.reset();
            this.prepareNewStudentForm();
           
          }
          else {
            this.alertService.setErrorHTML(res["message"]);
          }
        }
      );
      
  }

  

  /**
   * Get section information
   */
  getSection() {
    if(this.CourseSection)
      this.apiService.getSection(this.CourseSection.SectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.section = new Section(res["section"]);
        this.getCourse();
        this.getStudents();
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
    
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
                  this.getSection()
                  this.oninput()

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

          setTimeout(() => this.oninput(), 100);
          setTimeout(() => this.getStudents(), 100);

      }


      // console.log(this.sectionService.allList);
      // console.log(this.sectionService.CourseSection);
      // setTimeout(function(){
      //     this.allList = this.sectionService.allList;
      //     this.CourseSection = this.sectionService.CourseSection;
      // }
      // , 3000);

      // console.log(this.allList);
  }

  /**
   * Fetch list of students with partial username
   */
  fetchStudents(username, callback) {
    this.apiService.fetchStudents({username})
    .subscribe(res => {
      if (res["success"]) {
        this.potentialStudents = res["students"];
      }
      else {
        this.potentialStudents = null;
      }
      callback();
    });
  }

  /**
   * Get course information for section
   */
  getCourse() {
    this.apiService.getCourse(this.CourseSection.CourseId)
    .subscribe(res => {
      if (res["success"]) {
        this.course = new Course(res["course"]);
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
  }

  searchForStudent(username) {
    this.fetchStudents(username, () => {
      this.selectedStudent = null;
      if(this.potentialStudents) {
        this.potentialStudents.forEach(s => {
          if (s.username == username) {
            this.selectedStudent = s;
          }
        })
      }
    });
  }

  /**
   * Bind event to student form
   * On change update current selected student
   */
  oninput() {
    this.studentForm.valueChanges.subscribe(val => {
      this.searchForStudent(val.username);
    });

  }

  /**
   * Redirect to previous URL
   */
  back() {
    this.router.navigateByUrl(routeNames.TEACHERCOURSES);
  }

  /**
   * Enable edit section information
   */
  toggleEdit() {
    this.editToggle =  !this.editToggle;
  }

  /**
   * Submit section edits
   */
  editSection() {
    this.apiService.putSection(this.sectionForm.value, this.section.id)
    .subscribe(res => {
      if (res["success"]) {
        this.apiService.getSection(this.sectionId)
        .subscribe(res => {
          if (res["success"]) {
            this.section = new Section(res["section"]);
            this.toggleEdit();
          }
        });
      }
      else {
        this.alertService.setErrorHTML(res["message"]);
      }
    });
  }

  /**
   * Delete section
   */
  deleteSection() {
    this.apiService.deleteSection(this.section.id)
    .subscribe(res => {
      if (res["success"]) {
        this.back();
      }
    });
  }

  setStudentTo(username) {
    console.log(username)
    console.log(document.getElementById("helper-type").click)
  }

  /**
   * Sets the status of the tutorial.
   */
  setTutorialStatus(status, subStatus) {
    this.tutorialService.setTutorialStatus(status, subStatus);
    this.tutorialStatus = this.tutorialService.getTutorialStatus();
    this.tutorialSubStatus = this.tutorialService.gettutorialSubStatus();
  }

  /**
   * Gets the current status of the tutorial
   */
  getTutorialStatus(): any {
    return this.tutorialStatus;
  }

  /**
   * Gets the current substatus of the tutorial
   */
  getTutorialSubStatus(): any {
    return this.tutorialSubStatus;
  }

  /**
   * Nagivates to the given url
   */
  navigate(url) {
    this.router.navigateByUrl(url);
  }
}