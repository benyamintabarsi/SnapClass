import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { NavBarService } from '../../services/navbar.service';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { CourseSection } from '../../models/coursesection.model';
import { FormGroup , FormControl } from '@angular/forms';

@Component({
  selector: 'app-gradebook',
  templateUrl: './gradebook.component.html',
  styleUrls: ['./gradebook.component.css']
})
export class GradebookComponent implements OnInit {

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

  user: User;

  gradebook: any;

  section: any;

  sectionID: any;

  assignments: any;

  activeSectionForm = new FormGroup({
    currentSection: new FormControl(''),
  })

  CourseSection: CourseSection;

  allList: any[];

  first: any;

  ngOnInit() {
    this.user = this.authService.getUser();
    if((this.user["data"]["account_type"]) != 1){
      this.authService.logout();
      this.navigate('/');
    }
    else{
       //  this.sectionID = this.sectionService.getActiveSection();
       // this.getSectionInformation();
       // this.getGradebook();
        this.updateSection('FIRSTLOAD');

        setTimeout(() => console.log(this.CourseSection), 100);

        setTimeout(() => this.getSectionInformation(), 100);
        setTimeout(() => this.getGradebook(), 100);
        setTimeout(() => this.sectionID = this.CourseSection.SectionId, 100);



    }

  }

  updateSection(sectionId){
      console.log(sectionId);
      if(sectionId == 'FIRSTLOAD'){
          //need to get the teachers sections
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

              }
          });
          //
          // this.getSectionInformation();
          // this.getGradebook();
          // setTimeout(() => this.sectionService.setActiveSection(this.first), 100);
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
          setTimeout(() => this.getSectionInformation(), 100);
          setTimeout(() => this.getGradebook(), 100);
          setTimeout(() => this.sectionID = this.sectionService.getActiveSection(), 100);


      }
  }


  getSectionInformation() {
    this.apiService.getSection(this.CourseSection.SectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.section = res["section"];
      }
    });

    this.apiService.getAssignmentsForSection(this.CourseSection.SectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.assignments = res["assignments"];
      }
    })
  }

  getGradebook() {
    this.apiService.getSectionGrades(this.CourseSection.SectionId)
    .subscribe(res => {
      if (res["success"]) {
        this.gradebook = res["gradebook"];
        console.log(res["gradebook"]);
      }
    })
  }

  getGrade(student, assignment) {
    if (student.grades) {
      var value = null;
      student.grades.forEach(grade => {
        if (grade.assignment == assignment.id && grade.grade) {
          value = grade.grade + "%";
        }
      });
      if (value) return value;
      else return "Not Graded";
    }
    else return "Not Graded";
  }

  /**
   * Navigate to URL
   * @param url URL to navigate to
   */
  navigate(url) {
    this.router.navigateByUrl(url);
  }

}
