import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router }  from '@angular/router';
import { AlertService } from '../../services/alert.service';

/**
 * Student login page
 * Allows students to login to existing account
 * Allows students to create a new account
 */
@Component({
  selector: 'app-student-login',
  templateUrl: './student-login.component.html',
  styleUrls: ['./student-login.component.css']
})

export class StudentLoginComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param router provides the navigation and url manipulation capabilities.
   * @param alertService message and error handler service
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService) {}

  /**
   * Student create account form
   */
  studentForm = new FormGroup({
    student_id: new FormControl(''),
    name: new FormControl(''),
    preferred_name: new FormControl(''),
    email: new FormControl(''),
    yob: new FormControl(null),
    pswd: new FormControl('')
  });

  /**
   * Student login form
   */
  studentLoginForm = new FormGroup({
    username: new FormControl(''),
    pswd: new FormControl('')
  });


  /**
   * Empty method
   */
  ngOnInit() {
  }

  /**
   * Create student account using student form
   */
  onSubmit() {
    var userForm = {user: this.studentForm.value, role: {role_id: 2}};
    this.apiService.postUser(userForm)
      .subscribe(
        res => {
          if (res["success"]) {
            this.alertService.setSuccessHTML(res["message"]);
          }
          else {
            this.alertService.setErrorHTML(res["message"]);
          }
        }
      );
      this.studentForm.reset();
  }

  /**
   * Login student account using student login form
   * Add user and token to client-side local storage
   */
  onLoginSubmit() {
      this.apiService.loginUser(this.studentLoginForm.value)
      .subscribe(
        res => {
      //check if account is student type and if login page is student type
      if((window.location.href).includes("student") && ((res["user"].account_type) == 2)){
          if (res["success"]) {
            this.authService.storeUserData(res["token"], res["user"]);
            this.alertService.setSuccessHTML(res["message"]);
            this.router.navigateByUrl('/student');
            this.studentLoginForm.reset();
          }

      }
      else{
          //logout user, since they technically logged in correctly, and then
          //they can't manually change the page to the logged in page and get in
          this.authService.logout();

      }

        });
          this.studentLoginForm.reset();
          setTimeout( () => {
              this.alertService.setErrorHTML("Invalid Username or Password");
          }, 1000);



    }
}
