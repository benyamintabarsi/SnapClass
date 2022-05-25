import { Injectable } from "@angular/core";
import { APIService } from './api.service';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';
import { CourseSection } from '../models/coursesection.model';
/**
 * Service for managing active section
 */
@Injectable()
export class ActiveSectionService {

  /**
   * list of courses for teacher
   */
  courseList: any[];

  CourseSection: CourseSection;
  allList: CourseSection[];

  /**
   * Current user of the system
   */
  user: User;

  /**
   * Current active section
   */
  activeSection: any;



  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService) {
      this.getUser();
    }

  setActiveSection(sectionId) {
    const user = JSON.parse(localStorage.getItem('user'));
    user.activeSection = sectionId;
    localStorage.setItem('user', JSON.stringify(user));
    this.apiService.putActiveSectionForTeacher(this.user.id, sectionId).subscribe();
  }

  /**
   * Get Courses for teacher
   */
  getCourses() {
    this.user = this.authService.getUser();
    this.apiService.getCoursesForTeacher(this.user.id)
      .subscribe(res => {
        if(res["success"]) {
          this.courseList = res['courses'];
          if (this.courseList.length == 1) {
            this.initSection();
          }
        }
      })
  }

  getAll(sectionId){
      this.allList = [];
      this.user = this.authService.getUser();
      this.apiService.getAllForTeacher(this.user.id)
      .subscribe(res => {
          if(res['success']){
              // console.log(res['coursesections']);

              res['coursesections'].forEach(element => {
                  // console.log(element);
                  this.allList.push(new CourseSection({CourseId: element['courseId'], SectionId: element['sectionId'],
                                        CourseName: element['name'], SectionName: element['section_number'], description: element['description'],
                                        status: element['status'], user_id: this.user.id, start_date: element['start_date'],
                                end_date: element['end_date']}));
              });

              this.allList.forEach(course =>{
                  if(course.SectionId == sectionId){
                      this.CourseSection = course;
                  }
              });
              console.log(this.CourseSection);



          }
      });
  }

  initSection() {
    this.apiService.getSectionsForCourse(this.courseList[0].id)
      .subscribe (res => {
        if (res['success']) {
          this.setActiveSection(res['sections'][0].id);
        }
      })
  }

  getUser() {
    const user = localStorage.getItem('user');
    this.user = new User(JSON.parse(user));
    this.activeSection = this.user.activeSection;
  }

  getActiveSection() {
    this.getUser();
    return this.activeSection;
  }
}
