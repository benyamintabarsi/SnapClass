import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertService } from '../services/alert.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Cloud } from './cloud.service';
import { threadId } from 'worker_threads';


/**
 * Defines URL paths for all API methods
 */
@Injectable()
export class APIService {
    /**
     * Construct dependencies
     * @param http client to perform HTTP requests.
     * @param alertService message and error handler service
     */
    constructor(
        private http: HttpClient,
        private alertService: AlertService,
        private cloud: Cloud
    ) {}

    /**
     * Map HTTP response to variable
     * @param res HTTP response
     */
    private extractData(res: Response) {
        let body = res;
        return body || {};
    }

    /**
     * Base URL for API
     *
     * If using on localhost, use the first base url
     * If using on stemc, use the second base url
     */
    baseUrl = 'http://localhost:8866/';
    //baseUrl = 'http://stemc.csc.ncsu.edu:8866/';

    //--------------------------------
    // LOGGING API
    //------------------------
    logUser(logForm): Observable<any> {
        return this.http
            .post(this.baseUrl + "api/v1/logs/", logForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Logging user login"))
            );
    }

    //-----------------------------------
    // USER API
    //-----------------------------------

    /**
     * POST user: Create new user
     * @param userForm user account information
     */
    postUser(userForm): Observable<any> {
        //initialize to teacher
        var userInfo  = {user: {
            name: userForm.user.name,
            username: userForm.user.username,
            preferred_name: userForm.user.preferred_name,
            email: userForm.user.email,
            helper: 3
            }, role: {role_id: userForm.role.role_id}};
        if (userForm.role.role_id == 2) { //if student
            userInfo.user.helper = 1 //set helper to 1 (non-helper)
        }
        const ctx = this;
        return Observable.create(function(observer) {

            // Add the new user to SnapClass database
            const addUser = (existingUser) => {
                //delete userForm["user"]["pswd"]; // Don't need to store password locally
                ctx.http.post(ctx.baseUrl + 'api/v1/users', userInfo)
                .pipe(
                    map(ctx.extractData),
                    catchError(ctx.handleError<any>('Adding user'))
                ).subscribe((res) => {
                    // Pass to parent observable
                    if (existingUser) {
                        res.message = `Your new account is now connected to your existing Snap cloud account, ${userInfo["user"]["username"]}`;
                    } else {
                        res.message += ` You must verify your account by email within 3 days or it will be suspended.`
                    }
                    observer.next(res);
                    observer.complete();
                });
            }

            // Performs cloud signup and SnapClass account creation
            const performSignup = () => {
                // Ensure logged out. If not, it causes an obscure error.
                ctx.cloud.logout(function(){}, function(){});
                ctx.cloud.signup(
                    userForm["user"]["username"], 
                    userForm["user"]["pswd"], 
                    userForm["user"]["pswd"],
                    userForm["user"]["email"],
                    function() {
                        console.log("Cloud signup successful");

                        addUser(false);
                    },
                    function(data) {
                        if (data.indexOf("Duplicate") > -1) {
                            observer.next({
                                code: 400,
                                message: "User already exists.",
                                success: false
                            });
                        }
                        console.log("Cloud signup failed");
                        observer.next({
                            code: 400,
                            message: `Signup failed. ${data}`,
                            success: false
                        });
                        observer.complete();
                    }
                );
            }

            ctx.cloud.logout(function(){}, function(){});
            // First, try logging in to see if cloud account already exists
            ctx.cloud.login(
                userForm["user"]["username"],
                userForm["user"]["pswd"],
                true,
                function() {
                    // Cloud account already exists
                    addUser(true);
                },
                function(data) {
                    if (data.indexOf("password") > -1) {
                        observer.next({
                            code: 400,
                            message: `A Snap! Cloud account with username ${userForm["user"]["username"]} already exists. You entered the wrong password.`,
                            success: false
                        });
                    } else {
                        // No cloud account found
                        performSignup();
                    }
                }
            );
            
        });
    }


    /**
     * GET user account information
     * @param id user ID
     */
    getUser(id): Observable<any> {
        return this.http
            .get(this.baseUrl + "api/v1/users/" + id)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Getting user"))
            );
    }

    /**
     * PUT user: Update account information (NOT for changing passwords)
     * @param userForm new user account information
     * @param id user ID
     */
    putUser(userForm, id): Observable<any> {
        console.warn(userForm);
        return this.http
            .put(this.baseUrl + "api/v1/users/" + id, userForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Updating user account"))
            );
    }

    /**
     * Change password for user
     * @param userForm user account information (only the password parts are used for this)
     * @param id user ID
     */
    changePassword(userForm, id): Observable<any> {
        console.warn(userForm);
        const ctx = this;

        return new Observable<any>(subscriber => {
            this.cloud.changePassword(
                userForm.oldPassword,
                userForm.newPassword,
                userForm.newPasswordConfirm,
                function () {
                    subscriber.next({
                        code: 200,
                        message: "Password changed successfully!",
                        success: true
                    });
                },
                function() {
                    subscriber.next({
                        code: 400,
                        message: "There was an error changing your password. Make sure both passwords match.",
                        success: false
                    });
                }
            );
            
        });
    }

    /**
     * Login user
     * @param userLoginForm user username and password
     */
    loginUser(userLoginForm): Observable<any> {
        const ctx = this;
        return Observable.create(function(observer) {
            // Cloud login on frontend
            ctx.cloud.login(
                userLoginForm["username"],
                userLoginForm["pswd"],
                true,
                function (data) {
                    console.log("Cloud login successful");
                    // alert("Cloud login successful");

                    // Cloud login on backend
                    ctx.http
                        .post(ctx.baseUrl + "api/v1/users/login", userLoginForm)
                        .pipe(
                            map(ctx.extractData),
                            catchError(ctx.handleError("Login"))
                        )
                        .subscribe(
                            res => {
                                observer.next(res);
                                observer.complete();
                            }
                        );
                },
                function () {
                    // Cloud login failed
                    console.log("Cloud login failed");
                    observer.next({
                        code: 400,
                        message: "Invalid login.",
                        success: false
                    });
                }
            );
        });
    }

    /**
     * Post help request
     * @param helpForm  help request information
     */
     postHelp(helpForm): Observable<any> {
        var userInfo  = {
            id: helpForm.id,
            username: helpForm.username,
            preferred_name: helpForm.preferred_name,
            account_type: helpForm.role,
            email: helpForm.email,
            helper: helpForm.helper
        };

        const ctx = this;
        return Observable.create(function(observer) {
            // Add help request to table
            const addHelpReq = (existingUser) => {
                ctx.http.post(ctx.baseUrl + 'api/v1/help', userInfo)
                .pipe(
                    map(ctx.extractData),
                    catchError(ctx.handleError("Posting help"))
                ).subscribe((res) => {
                    observer.next(res);
                    observer.complete();
                });
            }
            addHelpReq(true);
        });
    }


    //-----------------------------------
    // COURSE API
    //-----------------------------------

    /**
     * GET course: get course information
     * @param id course ID
     */
    getCourse(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/courses/${id}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Getting course"))
            );
    }

    /**
     * POST course: add new course and section
     * @param courseForm course information
     */
    postCourse(courseForm) {
        return this.http
            .post(this.baseUrl + "api/v1/courses", courseForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Adding course"))
            );
    }

    /**
     * GET courses for teacher
     * @param id teacher ID
     */
    getCoursesForTeacher(id) {
        return this.http
            .get(this.baseUrl + "api/v1/teachers/" + id + "/courses")
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Getting courses for teacher"))
            );
    }

    /**
     * PUT course information
     * @param courseForm course information
     * @param id course ID
     */
    putCourse(courseForm, id) {
        return this.http
            .put(this.baseUrl + "api/v1/courses/" + id, courseForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Getting course"))
            );
    }

    //-----------------------------------
    // SECTION API
    //-----------------------------------

    /**
     * GET sections for course
     * @param id course ID
     */
    getSectionsForCourse(id) {
        return this.http
            .get(this.baseUrl + "api/v1/courses/" + id + "/sections")
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Getting sections for course"))
            );
    }

    /**
     * GET section information
     * @param id section ID
     */
    getSection(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/sections/${id}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Getting section"))
            );
    }

    /**
     * POST section: add new section to course
     * @param sectionForm section information
     */
    postSection(sectionForm) {
        return this.http
            .post(this.baseUrl + "api/v1/sections/", sectionForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Adding section"))
            );
    }

    /**
     * PUT section: edit section
     * @param sectionForm section information
     * @param id section ID
     */
    putSection(sectionForm, id) {
        return this.http
            .put(this.baseUrl + "api/v1/sections/" + id, sectionForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Editing section"))
            );
    }

    /**
     * DELETE section: delete section
     * @param id section ID
     */
    deleteSection(id) {
        return this.http
            .delete(this.baseUrl + "api/v1/sections/" + id)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Deleting section"))
            );
    }

    /**
     * GET students for section
     * @param id section ID
     */
    getStudentsForSection(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/sections/${id}/students`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Getting students for section"))
            );
    }

    //
    /* Get Courses and Section in CourseSection format for a teacher
        /*
        */

    getAllForTeacher(id) {
        return this.http
            .get(this.baseUrl + "api/v1/sections/all/" + id)
            .pipe(
                map(this.extractData),
                catchError(
                    this.handleError<any>("Getting courses and sections for teacher")
                )
            );
    }

    //-----------------------------------
    // ASSIGNMENT API
    //-----------------------------------

    /**
     * GET assignments by id
     * @param id assignment ID
     */
    getAssignment(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/assignments/${id}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Getting assignment by id"))
            );
    }

    /**
     * POST assignment
     * @param assignmentForm has submitted data from form
     */
    postAssignment(assignmentForm) {
        return this.http
            .post(this.baseUrl + "api/v1/assignments/", assignmentForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Posting assignment"))
            );
    }

    /**
     * PUT assignment by id
     * @param id assignment ID
     * @param assignmentForm
     */
    putAssignment(id, assignmentForm) {
        return this.http
            .put(this.baseUrl + "api/v1/assignments/" + id, assignmentForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Updating assignments by id"))
            );
    }

    /**
     * DELETE assignments for section
     * @param id assignment ID
     */
    deleteAssignment(id) {
        return this.http
            .delete(this.baseUrl + "api/v1/assignments/" + id)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Deleting assignment"))
            );
    }

    /**
     * GET assignments for section
     * @param id section ID
     */
    getAssignmentsForSection(id) {
        return this.http
            .get(this.baseUrl + "api/v1/sections/" + id + "/assignments")
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Getting assignments for section"))
            );
    }

    getSectionByAssignment(assignmentId) {
        return this.http
            .get(this.baseUrl + "api/v1/sections/a2s/" + assignmentId)
            .pipe(
                map(this.extractData),
                catchError(
                    this.handleError<any>("Getting section id from assignment id")
                )
            );
    }

    /**
         * POST assignments for section
         * @param id section ID
         * @param assignmentForm
         *
        postAssignmentsForSection(id) {
                return this.http.post(this.baseUrl + 'api/v1/sections/' +id + 'assignments', assignmentForm)
                .pipe(
                        map(this.extractData),
                        catchError(this.handleError<any>('POSTING assignments for section'))
                );
        }
        */

    /**
     * POST: add student to section
     * @param studentId student ID
     * @param sectionId section ID
     */
    postStudentToSection(studentId, sectionId) {
        return this.http
            .post(`${this.baseUrl}api/v1/sections/${sectionId}/students`, {
                user_id: studentId,
            })
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Adding student to section"))
            );
    }

    /**
     * DELETE: remove student from section
     * @param studentId student ID
     * @param sectionId section ID
     */
    deleteStudentFromSection(studentId, sectionId) {
        return this.http
            .delete(
                `${this.baseUrl}api/v1/sections/${sectionId}/students/${studentId}`
            )
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>("Deleting student from section"))
            );
    }

    //-----------------------------------
    // STUDENT API
    //-----------------------------------

    /**
     * GET students by partial username
     * @param username partial username
     */
    fetchStudents(username) {
        return this.http
            .post(`${this.baseUrl}api/v1/students/fetchByUsername`, username)
            .pipe(
                map(this.extractData),
                catchError(
                    this.handleError<any>(`Getting students with username: ${username}`)
                )
            );
    }

    /**
     * GET course sections for student
     * @param id student ID
     */
    getCoursesForStudent(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/students/${id}/courses`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting courses for student`))
            );
    }

    /**
     * GET course information for student
     * @param id section ID
     */
    getCourseForStudent(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/students/courses/${id}`)
            .pipe(
                map(this.extractData),
                catchError(
                    this.handleError<any>(`Getting course information for student`)
                )
            );
    }

    /**
     * GET upcoming assignments for student in section
     * @param id student ID
     */
    getUpcomingAssignmentsForStudentSection(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/students/section/${id}/upcoming/assignments`)
            .pipe(
                map(this.extractData),
                catchError(
                    this.handleError<any>(`Getting upcoming assignments for student`)
                )
            );
    }

    /**
     * GET past assignments for student in section
     * @param id student ID
     */
    getPastAssignmentsForStudentSection(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/students/section/${id}/past/assignments`)
            .pipe(
                map(this.extractData),
                catchError(
                    this.handleError<any>(`Getting past assignments for student`)
                )
            );
    }

    //-----------------------------------
    // ACTIVE SECTION API
    //-----------------------------------

    /**
     * GET active section for teacher
     * @param id user ID
     */
    getActiveSectionForTeacher(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/teachers/${id}/active/section`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting active section for teacher`))
            );
    }

    /**
     * POST active section for teacher
     * @param userId user ID
     * @param sectionId section ID
     */
    addActiveSectionForTeacher(userId, sectionId) {
        return this.http
            .post(`${this.baseUrl}api/v1/teachers/${userId}/active/section`, {
                section_id: sectionId,
            })
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Adding active section for teacher`))
            );
    }

    /**
     * PUT active section for teacher
     * @param userId user ID
     * @param sectionId section ID
     */
    putActiveSectionForTeacher(userId, sectionId) {
        return this.http
            .put(`${this.baseUrl}api/v1/teachers/${userId}/active/section`, {
                section_id: sectionId,
            })
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Updating active section for teacher`))
            );
    }

    //-----------------------------------
    // RUBRIC API
    //-----------------------------------

    /**
     * Get rubric information
     * @param id rubric ID
     */
    getRubric(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/rubrics/${id}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting rubric`))
            );
    }

    /**
     * Add new rubric
     * @param rubricForm rubric information
     */
    postRubric(rubricForm) {
        return this.http
            .post(`${this.baseUrl}api/v1/rubrics`, rubricForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Adding rubric`))
            );
    }

    /**
     * Update rubric by ID
     * @param id rubric ID
     * @param rubricForm rubric information
     */
    putRubric(id, rubricForm) {
        return this.http
            .put(`${this.baseUrl}api/v1/rubrics/${id}`, rubricForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Updating rubric`))
            );
    }

    /**
     * Delete rubric
     * @param id rubric ID
     */
    deleteRubric(id) {
        return this.http
            .delete(`${this.baseUrl}api/v1/rubrics/${id}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Deleting rubric`))
            );
    }

    /**
     * Get all template rubrics
     */
    getTemplateRubrics() {
        return this.http
            .get(`${this.baseUrl}api/v1/rubrics/templates`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting template rubrics`))
            );
    }

    /**
     * Get all rubrics for teacher
     * @param id user ID
     */
    getRubricsForTeacher(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/teachers/${id}/rubrics`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting rubrics for teacher`))
            );
    }

    /**
     * Get all rubric categories
     * @param id rubric ID
     */
    getRubricsCategories(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/rubrics/${id}/categories`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting rubric categories`))
            );
    }

    //-----------------------------------
    // CATEGORY AND POINTS API
    //-----------------------------------

    /**
     * Get category and points information
     * @param id category ID
     */
    getCategory(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/categories/${id}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting category`))
            );
    }

    /**
     * Add new category
     * @param categoryForm category information
     */
    postCategory(categoryForm) {
        return this.http
            .post(`${this.baseUrl}api/v1/categories`, categoryForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Adding category`))
            );
    }

    /**
     * Update category information by ID
     * @param id category ID
     * @param categoryForm category information
     */
    putCategory(id, categoryForm) {
        return this.http
            .put(`${this.baseUrl}api/v1/categories/${id}`, categoryForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Updating category`))
            );
    }

    /**
     * Delete category
     * @param id category ID
     */
    deleteCategory(id) {
        return this.http
            .delete(`${this.baseUrl}api/v1/categories/${id}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Deleting category`))
            );
    }

    /**
     * Get all categories for teacher
     * @param id user ID
     */
    getCategoriesForTeacher(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/teachers/${id}/categories`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting categories for teacher`))
            );
    }

    /**
     * Add point to category
     * @param pointForm point information
     */
    postPointsForCategory(pointForm) {
        return this.http
            .post(`${this.baseUrl}api/v1/points`, pointForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Adding point for category`))
            );
    }

    /**
     * Update point for category
     * @param id point ID
     * @param pointForm point information
     */
    putPointsForCategory(id, pointForm) {
        return this.http
            .put(`${this.baseUrl}api/v1/points/${id}`, pointForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Updating point for category`))
            );
    }

    /**
     * Delete point for category
     * @param id point ID
     */
    deletePointsForCategory(id) {
        return this.http
            .delete(`${this.baseUrl}api/v1/points/${id}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Deleting point for category`))
            );
    }

    /**
     * Get point for category
     * @param id point ID
     */
    getPointForCategory(id) {
        return this.http
            .get(`${this.baseUrl}api/v1/points/${id}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Deleting point for category`))
            );
    }

    //-----------------------------------
    // SUBMISSION API
    //-----------------------------------

    /**
     * Get submission information
     * @param userID user ID
     * @param assignmentID assignment ID
     */

    getSubmission(userID, assignmentID) {
        return this.http
            .get(
                `${this.baseUrl}api/v1/submissions/students/${userID}/assignments/${assignmentID}`
            )
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting submission`))
            );
    }

    /**
     * Update submission by submission ID
     * @param submissionID submission ID
     * @param submission submission code
     */
    putSubmission(submissionID, submission) {
        return this.http
            .put(`${this.baseUrl}api/v1/submissions/${submissionID}`, submission)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Updating submission`))
            );
    }

    /**
     * Add submission for student assignment
     * @param submissionForm submission information
     */
    postSubmission(submissionForm) {
        return this.http
            .post(`${this.baseUrl}api/v1/submissions`, submissionForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Adding submission`))
            );
    }

    //-----------------------------------
    // GRADING API
    //-----------------------------------

    /**
     * Get assignment grade for student
     * @param assignmentID assignment ID
     * @param studentID user ID
     */
    getGrade(assignmentID, studentID) {
        return this.http
            .get(
                `${this.baseUrl}api/v1/grading/assignments/${assignmentID}/students/${studentID}`
            )
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting student's assignment grade`))
            );
    }

    /**
     * Get assignment grades for all students
     * @param sectionID section ID
     * @param assignmentID assignment ID
     */
    getAssignmentGrades(sectionID, assignmentID) {
        return this.http
            .get(
                `${this.baseUrl}api/v1/grading/sections/${sectionID}/assignments/${assignmentID}`
            )
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting assignment grades`))
            );
    }

    /**
     * Get all grades for all assignments in section
     * @param sectionID section ID
     */
    getSectionGrades(sectionID) {
        return this.http
            .get(`${this.baseUrl}api/v1/grading/sections/${sectionID}`)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Getting section grades`))
            );
    }

    postGrade(gradeForm) {
        return this.http
            .post(`${this.baseUrl}api/v1/grading`, gradeForm)
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Adding assignment grade`))
            );
    }

    putGrade(assignmentID, studentID, gradeForm) {
        return this.http
            .put(
                `${this.baseUrl}api/v1/grading/assignments/${assignmentID}/students/${studentID}`,
                gradeForm
            )
            .pipe(
                map(this.extractData),
                catchError(this.handleError<any>(`Updating assignment grade`))
            );
    }

    //-----------------------------------
    // ERROR HANDLER
    //-----------------------------------

    /**
     * Error handler
     * @param operation name of operation where error was thrown
     * @param result error result
     */
    private handleError<T>(operation = "operation", result?: T) {
        return (error: any): Observable<T> => {
            if (error.error) this.alertService.setErrorHTML(error.error.message);
            else this.alertService.setErrorHTML("Please try again later");

            // TODO: send the error to remote logging infrastructure
            //console.error(error); // log to console instead

            const msg = error.error ? error.error.message : error.message;

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${msg}`);

            // Let the app keep running by returning an empty result.
            return throwError(msg);
        };
    }
}