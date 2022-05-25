import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { Router }  from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { routeNames } from 'src/app/services/routing.service';

/**
 * Teacher login page
 * Allows teachers to login to existing account
 * Allows teachers to create a new account
 */
@Component({
  selector: 'app-teacher-login',
  templateUrl: './teacher-login.component.html',
  styleUrls: ['./teacher-login.component.css']
})

export class TeacherLoginComponent implements OnInit {

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
   * teacher landing page url
   */
  teacherLanding = routeNames.TEACHERLANDING;
  /**
   * Form control for teacher registration
   */
  teacherForm = new FormGroup({
    name: new FormControl(''),
    preferred_name: new FormControl(''),
    username: new FormControl(''),
    pswd: new FormControl(''),
    account_type: new FormControl(1),
  });

  /**
   * Form control for teacher login
   */
  teacherLoginForm = new FormGroup({
    username: new FormControl(''),
    pswd: new FormControl('')
  });

  /**
   * Toggle displaying login or create account page
   */
  login = 1;



  /**
   * Empty method
   */
  ngOnInit() {

  }

  /**
   * On submit for teacher registration
   */
  onSubmit() {
    var userForm = {user: this.teacherForm.value, role: {role_id: 1}};
    this.apiService.postUser(userForm)
      .subscribe(
        res => {
          if(res["success"]) {
            this.alertService.setSuccessHTML(res["message"]);
          }
          else {
            this.alertService.setErrorHTML(res["message"]);
          }
        }
      );


      this.teacherForm.reset();
  }

/**
 * On submit for teacher login
 */
  onLoginSubmit() {
    this.apiService.loginUser(this.teacherLoginForm.value)
    .subscribe(
      res => {
        //checks if the current login page is for teacher, and if the account
        //logged in is also a teacher account, only then it works
        if((window.location.href).includes("teacher") && ((res["user"].account_type) == 1)){
            if (res["success"]) {
                this.authService.storeUserData(res["token"], res["user"]);
                this.alertService.setSuccessHTML(res["message"]);
                  this.router.navigateByUrl(this.teacherLanding);
                  this.teacherLoginForm.reset();
                  return true;
            }
        }
        else{
            //logout user, since they technically logged in correctly, and then
            //they can't manually change the page to the logged in page and get in
            this.authService.logout();
        }


      });

      this.teacherLoginForm.reset();
      setTimeout( () => {
          this.alertService.setErrorHTML("Invalid Username or Password");
      }, 1000);
  }
}
