import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { User } from '../../models/user.model';

/**
 * Teacher account page.
 * Allows teacher to edit account information.
 * Allows teacher to edit password.
 */
@Component({
  selector: 'app-teacher-account',
  templateUrl: './teacher-account.component.html',
  styleUrls: ['./teacher-account.component.css']
})
export class TeacherAccountComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param alertService message and error handler service
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    public router: Router) {}

/**
 * Form control for teacher profile information update
 */
  teacherForm = new FormGroup({
    name: new FormControl(''),
    preferred_name: new FormControl(''),
    username: new FormControl('')
  });

/**
 * Form control for teacher password change
 */
  teacherPasswordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    newPasswordConfirm: new FormControl('')
  });

  /**
   * Current logged in teacher
   */
  user: User;

  /**
   * Toggle displaying account page or password change page
   */
  pswd = 0;

  /**
   * Load student information from local storage
   * Set account page form based on student information
   */
  ngOnInit() {
    this.user = this.authService.getUser();
    if((this.user["data"]["account_type"]) != 1){
        this.authService.logout();
        this.navigate('/');
    }
    else{
    this.teacherForm.setValue({
      preferred_name: this.user.preferred_name,
      name: this.user.name,
      username: this.user.username
    });
    }
  }

/**
 * On submit for teacher profile information change
 */
  onSubmit() {
    console.warn(this.teacherForm.value);
    this.apiService.putUser(this.teacherForm.value, this.user.id)
      .subscribe(res => {
        if (res["success"]) {
          this.alertService.setSuccessHTML(res["message"]);
          this.updateAccount();
        }
        else {
          this.alertService.setErrorHTML(res["message"]);
        }
      },
      error => {
        this.alertService.handleError(error);
      });
  }

  /**
   * Updating teacher account information
   */
  updateAccount() {
    this.apiService.getUser(this.user.id)
    .subscribe(res => {
      if (res["success"]) {
          this.authService.storeUserData(null, res["teacher"]);
      }
    });
  }

  /**
   * On submit for teacher changing password
   */
  onPasswordSubmit() {
    this.apiService.changePassword(this.teacherPasswordForm.value, this.user.id)
      .subscribe(res => {
        if (res["success"]) {
          this.alertService.setSuccessHTML(res["message"]);
        }
        else {
          this.alertService.setErrorHTML(res["message"]);
        }
      }
    );
    this.teacherPasswordForm.reset();
  }

  /**
   * Allows navigation based on url
   */
  navigate(url) {
    this.router.navigateByUrl(url);
  }
}
