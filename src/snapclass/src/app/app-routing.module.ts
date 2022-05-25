import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestPageComponent }      from './guest-page/guest-page.component';
import { TeacherLoginComponent }      from './teacher/teacher-login/teacher-login.component';
import { TeacherLandingPageComponent }      from './teacher/teacher-landing-page/teacher-landing-page.component';
import { TeacherAccountComponent }      from './teacher/teacher-account/teacher-account.component';
import { StudentLoginComponent }      from './student/student-login/student-login.component';
import { StudentAccountComponent }      from './student/student-account/student-account.component';
import { StudentLandingComponent }      from './student/student-landing/student-landing.component';
import { StudentCourseViewComponent }      from './student/student-course-view/student-course-view.component';
import { AuthGuard } from './guards/auth.guards';
import { TeacherCoursesComponent } from './teacher/teacher-courses/teacher-courses.component';
import { SectionStudentManagementComponent } from './teacher/section-student-management/section-student-management.component';
import { TeacherAssignmentsComponent } from './teacher/teacher-assignments/teacher-assignments.component';
import { TeacherAssignmentsCodeComponent } from './teacher/teacher-assignments/assignment-code/teacher-assignment-code.component';
import { ViewAssignmentComponent } from './teacher/teacher-assignments/view-assignment/view-assignment.component';
import { RubricManagementComponent } from './teacher/rubric-management/rubric-management.component';
import { GradeAssignmentComponent } from './teacher/grade-assignment/grade-assignment.component';
import { StudentAssignmentComponent } from './student/student-assignment/student-assignment.component';
import { routeNames } from './services/routing.service';
import { RubricPageComponent } from './teacher/rubric-page/rubric-page.component';
import { GradebookComponent } from './teacher/gradebook/gradebook.component';
import { TeacherHelpDashComponent } from './teacher/teacher-help-dash/teacher-help-dash.component';
import { StatsnapComponent } from './teacher/statsnap/statsnap.component';
import { GradeDistComponent } from './teacher/statsnap/gradedist/gradedist.component';
import { VariablesComponent } from './teacher/statsnap/variables/variables.component';

/**
 * A collection of different routes/paths within system TEACHERASSIGNMENTCODE: 'teacher/assignments/code/:id',
 */
const routes: Routes = [
  { path: routeNames.GUESTLANDING, component: GuestPageComponent },
  { path: routeNames.TEACHERLOGIN, component: TeacherLoginComponent },
  { path: routeNames.TEACHERACCOUNT, component: TeacherAccountComponent, canActivate: [AuthGuard] },
  { path: routeNames.STUDENTLOGIN, component: StudentLoginComponent },
  { path: routeNames.GRADEASSIGNMENT, component: GradeAssignmentComponent },
  { path: routeNames.STUDENTACCOUNT, component: StudentAccountComponent, canActivate: [AuthGuard] },
  { path: routeNames.TEACHERCOURSES, component: TeacherCoursesComponent, canActivate: [AuthGuard] },
  { path: routeNames.TEACHERASSIGNMENTS, component: TeacherAssignmentsComponent, canActivate: [AuthGuard] },
  { path: routeNames.TEACHERASSIGNMENTCODE, component: TeacherAssignmentsCodeComponent, canActivate: [AuthGuard] },
  { path: routeNames.TEACHERASSIGNMENT, component: ViewAssignmentComponent, canActivate: [AuthGuard] },
  { path: routeNames.TEACHERSECTION, component: SectionStudentManagementComponent, canActivate: [AuthGuard] },
  { path: routeNames.TEACHERACTIVESECTION, component: SectionStudentManagementComponent, canActivate: [AuthGuard] },
  { path: routeNames.STUDENTLANDING, component: StudentLandingComponent, canActivate: [AuthGuard] },
  { path: routeNames.STUDENTCOURSE, component: StudentCourseViewComponent, canActivate: [AuthGuard] },
  { path: routeNames.RUBRICMANAGEMENT, component: RubricManagementComponent, canActivate: [AuthGuard] },
  { path: routeNames.TEACHERLANDING, component: TeacherLandingPageComponent, canActivate: [AuthGuard]},
  { path: routeNames.RUBRICPAGE, component: RubricPageComponent, canActivate: [AuthGuard]},
  { path: routeNames.GRADEBOOK, component: GradebookComponent, canActivate: [AuthGuard]},
  { path: routeNames.STUDENTASSIGNMENT, component: StudentAssignmentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: routeNames.GUESTLANDING, pathMatch: "prefix" },
  { path: routeNames.TEACHERHELPDASH, component: TeacherHelpDashComponent, canActivate: [AuthGuard] },
  { path: routeNames.STATSNAP, component: StatsnapComponent},
  { path: routeNames.GRADEDIST, component: GradeDistComponent},
  { path: routeNames.VARIABLES, component: VariablesComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
