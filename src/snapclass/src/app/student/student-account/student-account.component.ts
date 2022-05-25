import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { User } from '../../models/user.model';

/**
 * Student account page.
 * Allows students to edit account information.
 * Allows students to edit password.
 */
@Component({
  selector: 'app-student-account',
  templateUrl: './student-account.component.html',
  styleUrls: ['./student-account.component.css']
})
export class StudentAccountComponent implements OnInit {

  /**
   * Construct dependencies
   * @param apiService API routes definition service
   * @param authService token authorization service
   * @param alertService message and error handler service
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService) {}

  /**
   * Student account form
   */
  studentForm = new FormGroup({
    username: new FormControl(''),
    name: new FormControl(''),
    preferred_name: new FormControl(''),
    email: new FormControl(''),
    yob: new FormControl(null)
  });

  /**
   * Update student password form
   */
  studentPasswordForm = new FormGroup({
    oldPassword: new FormControl(''),
    newPassword: new FormControl(''),
    newPasswordConfirm: new FormControl('')
  });

  /**
   * Current logged in student
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
    this.studentForm.setValue({
      username: this.user.username,
      name: this.user.name,
      preferred_name: this.user.preferred_name,
      email: this.user.email,
      yob: this.user.yob
    });
  }

  /**
   * Update student account using student form
   */
  onSubmit() {
    console.warn(this.studentForm.value);
    this.apiService.putUser(this.studentForm.value, this.user.id)
      .subscribe(res => {
        if (res["success"]) {
          this.updateAccount();
          this.alertService.setSuccessHTML(res["message"]);
        }
        else {
          this.alertService.setErrorHTML(res["message"]);
        }
      }
    );
  }

  /**
   * Update local storage information when account is changed
   */
  updateAccount() {
    this.apiService.getUser(this.user.id)
      .subscribe(res => {
        if (res["success"]) {
          this.authService.storeUserData(null, res["student"]);
        }
      }
    );
  }

  /**
   * Change student password using password form
   */
  onPasswordSubmit() {
    this.apiService.changePassword(this.studentPasswordForm.value, this.user.id)
      .subscribe(res => {
        if (res["success"]) {
          this.alertService.setSuccessHTML(res["message"]);
        }
        else {
          this.alertService.setErrorHTML(res["message"]);
        }
      }
    );
    this.studentPasswordForm.reset();
  }
}
