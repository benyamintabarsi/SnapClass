import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
/** import { MatSliderModule } from '@angular/material/slider'; */
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { APIService } from "./services/api.service";
import { AuthGuard } from "./guards/auth.guards";
import { TeacherLoginComponent } from "./teacher/teacher-login/teacher-login.component";
import { StudentLoginComponent } from "./student/student-login/student-login.component";
import { TeacherAccountComponent } from "./teacher/teacher-account/teacher-account.component";
import { GuestPageComponent } from "./guest-page/guest-page.component";
import { AuthService } from "./services/auth.service";
import { StudentAccountComponent } from "./student/student-account/student-account.component";
import { StudentHeaderComponent } from "./student/student-header/student-header.component";
import { AlertService } from "./services/alert.service";
import { StudentNavbarComponent } from "./student/student-navbar/student-navbar.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { TeacherHeaderComponent } from "./teacher/teacher-header/teacher-header.component";
import { TeacherCoursesComponent } from "./teacher/teacher-courses/teacher-courses.component";
import { AddCourseComponent } from "./teacher/teacher-courses/add-course.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { SectionStudentManagementComponent } from "./teacher/section-student-management/section-student-management.component";
import { TeacherLandingPageComponent } from "./teacher/teacher-landing-page/teacher-landing-page.component";
import { TeacherAssignmentsComponent } from "./teacher/teacher-assignments/teacher-assignments.component";

import { TeacherAssignmentsCodeComponent } from './teacher/teacher-assignments/assignment-code/teacher-assignment-code.component';

import { AddAssignmentComponent } from "./teacher/teacher-assignments/add-assignment/add-assignment.component";
import { StudentLandingComponent } from "./student/student-landing/student-landing.component";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { TokenInterceptor } from "./services/token.interceptor";
import { ViewAssignmentComponent } from "./teacher/teacher-assignments/view-assignment/view-assignment.component";
import { StudentCourseViewComponent } from "./student/student-course-view/student-course-view.component";
import { RubricManagementComponent } from "./teacher/rubric-management/rubric-management.component";
import { RubricPageComponent } from "./teacher/rubric-page/rubric-page.component";
import { GradeAssignmentComponent } from "./teacher/grade-assignment/grade-assignment.component";
import { AddRubricComponent } from "./teacher/rubric-management/add-rubric/add-rubric.component";
import { AddRubricToAssignmentComponent } from "./teacher/teacher-assignments/add-rubric-to-assignment/add-rubric-to-assignment.component";
import { AddCategoryComponent } from "./teacher/add-category/add-category.component";
import { EditCategoryComponent } from "./teacher/edit-category/edit-category.component";
import { StudentAssignmentComponent } from "./student/student-assignment/student-assignment.component";
import { ActiveSectionComponent } from "./teacher/active-section/active-section.component";
import { NavBarService } from "./services/navbar.service";
import { ActiveSectionService } from "./services/active-section.service";
import { TeacherFooterComponent } from "./teacher/teacher-footer/teacher-footer.component";
import { GradebookComponent } from "./teacher/gradebook/gradebook.component";
import { SelectAssignmentToGradeComponent } from "./teacher/select-assignment-to-grade/select-assignment-to-grade.component";
import { TeacherHelpDashComponent } from "./teacher/teacher-help-dash/teacher-help-dash.component";
import { CourseHelpComponent } from "./teacher/teacher-help-dash/course-help/course-help.component";
import { AssignmentHelpComponent } from "./teacher/teacher-help-dash/assignment-help/assignment-help.component";
import { GradeHelpComponent } from "./teacher/teacher-help-dash/grade-help/grade-help.component";
import { NgxPopperModule } from "ngx-popper";
import { NgxSpinnerModule } from 'ngx-spinner';
import { TutorialStartComponent } from "./teacher/tutorial-start/tutorial-start.component";
import { StatsnapComponent } from "./teacher/statsnap/statsnap.component";
import { GradeDistComponent } from "./teacher/statsnap/gradedist/gradedist.component";
import { VariablesComponent } from "./teacher/statsnap/variables/variables.component";
import { Cloud } from "./services/cloud.service";

import * as $ from "jquery";
import { SafePipe } from "./core/safe.pipe";
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AppComponent,
    TeacherLoginComponent,
    StudentLoginComponent,
    TeacherAccountComponent,
    GuestPageComponent,
    StudentAccountComponent,
    StudentHeaderComponent,
    StudentNavbarComponent,
    SectionStudentManagementComponent,
    NavbarComponent,
    TeacherHeaderComponent,
    TeacherCoursesComponent,
    AddCourseComponent,
    TeacherLandingPageComponent,
    StudentLandingComponent,
    SectionStudentManagementComponent,
    TeacherAssignmentsComponent,
    TeacherAssignmentsCodeComponent,
    AddAssignmentComponent,
    StudentLandingComponent,
    ViewAssignmentComponent,
    StudentCourseViewComponent,
    RubricManagementComponent,
    RubricPageComponent,
    GradeAssignmentComponent,
    AddRubricComponent,
    AddRubricToAssignmentComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    StudentAssignmentComponent,
    ActiveSectionComponent,
    TeacherFooterComponent,
    GradebookComponent,
    SelectAssignmentToGradeComponent,
    TeacherHelpDashComponent,
    CourseHelpComponent,
    AssignmentHelpComponent,
    GradeHelpComponent,
    TutorialStartComponent,
    StatsnapComponent,
    GradeDistComponent,
    VariablesComponent,
    SafePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    /**MatSliderModule,*/
    NgxPopperModule.forRoot({
      styles: {
        "background-color": "#c92d39",
        "z-index": 9999999,
        color: "white",
        "border-radius": "25px",
      },
      applyClass: "animated slideInUp justify-content-center",
    }),
    NgxSpinnerModule
  ],
  providers: [
    APIService,
    AuthService,
    AuthGuard,
    AlertService,
    ActiveSectionService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    NavBarService,
    Cloud
  ],
  bootstrap: [AppComponent],
  entryComponents: [AddCourseComponent, AddAssignmentComponent],
  exports: [
    /**MatSliderModule*/
  ],
})
export class AppModule {}
