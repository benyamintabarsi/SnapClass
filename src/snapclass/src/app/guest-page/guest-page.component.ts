import { Component, OnInit } from '@angular/core';
import { FormGroup , FormControl } from '@angular/forms';
import { APIService } from 'src/app/services/api.service';
import { Router }  from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';
import { routeNames } from 'src/app/services/routing.service';
import { NgxSpinnerService } from 'ngx-spinner';


/**
 * Guest landing page
 */
@Component({
  selector: 'app-guest-page',
  templateUrl: './guest-page.component.html',
  styleUrls: ['./guest-page.component.scss']
})
export class GuestPageComponent implements OnInit {

    /**
     * Construct dependencies
     * @param apiService API routes definition service
     * @param authService token authorization service
     * @param router provides the navigation and url manipulation capabilities.
     * @param alertService message and error handler service
     * @param cloud cloud service for Berkley Snap!
     */


  constructor(
  private apiService: APIService,
  private authService: AuthService,
  private router: Router,
  private spinner: NgxSpinnerService,
  private alertService: AlertService) { }

  teacherLanding = routeNames.TEACHERLANDING;
  studentLanding = routeNames.STUDENTLANDING;



  teacherSignUp = new FormGroup({
    name: new FormControl(''),
    preferred_name: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    pswd: new FormControl(''),
    account_type: new FormControl(1),
});

studentSignUp = new FormGroup({
  name: new FormControl(''),
  username: new FormControl(''),
  preferred_name: new FormControl(''),
  email: new FormControl(''),
  yob: new FormControl(null),
  pswd: new FormControl(''),
  account_type: new FormControl(2),

});

loginForm = new FormGroup({
  username: new FormControl(''),
  pswd: new FormControl('')
});

user: User;

login: number;

toggle: number;

  /**
   * Define image URL
   */
  ngOnInit() {
    const myImgUrl=  "www.freelogodesign.org/Content/img/logo-ex-7.png";
    this.login = 0;
    this.toggle = 0;
  }

//logic for signing up for an account
  selectTeach() {
      console.log("Login is: " + this.login);
      if(this.login == 2){
          console.log("Here");
          $("#studentSelect").css({"background-color": "white", "color": "#808080"});
      }
      this.login = 1;
      $("#teacherSelect").css({"background-color": "var(--teacher-primary-color)", "color": "white"});


  }

  selectStud(){
      console.log("Login is: " + this.login);
      if(this.login == 1){
          console.log("Here");
          $("#teacherSelect").css({"background-color": "white", "color": "#808080"});
      }
      this.login = 2;
      $("#studentSelect").css({"background-color": "var(--primary-student-color)", "color": "white"});

  }

  deselectBoth() {
      $("#teacherSelect").css({"background-color": "white", "color": "#808080"});
      $("#studentSelect").css({"background-color": "white", "color": "#808080"});
  }

  onSubmitTeacher() {
      this.spinner.show();
      var userForm = {user: this.teacherSignUp.value, role: {role_id: 1}};
      this.apiService.postUser(userForm)
        .subscribe(
          res => {
            this.spinner.hide();
            if(res["success"]) {
              this.alertService.setSuccessHTML(res["message"]);
              this.login=4;
              this.deselectBoth();
            }
            else {
              this.alertService.setErrorHTML(res["message"]);
            }
          }
        );
        this.teacherSignUp.reset();

  }

  onSubmitStudent() {
      this.spinner.show();
      var userForm = {user: this.studentSignUp.value, role: {role_id: 2}};
      this.apiService.postUser(userForm)
        .subscribe(
          res => {
            this.spinner.hide();
            if(res["success"]) {
              this.alertService.setSuccessHTML(res["message"]);
              this.login= 4;
              this.deselectBoth();
            }
            else {
              this.alertService.setErrorHTML(res["message"]);
            }
          }
        );
        this.studentSignUp.reset();
  }

  //logic for logging into an account


  toggleTeach() {
      if(this.toggle == 2){
          $("#studentLoginButton").css({"background-color": "white", "color": "#808080"});
      }
      this.toggle = 1;
      $("#teacherLoginButton").css({"background-color": "var(--teacher-primary-color)", "color": "white"});


  }

  toggleStud(){
      if(this.toggle == 1){
          $("#teacherLoginButton").css({"background-color": "white", "color": "#808080"});
      }
      this.toggle = 2;
      $("#studentLoginButton").css({"background-color": "var(--primary-student-color)", "color": "white"});

  }

  onLoginSubmit() {
    this.spinner.show();
    //logouts previous user before logging in.
    this.user = this.authService.getUser();
    if(this.user){
        this.authService.logout();
    }

    this.apiService.loginUser(this.loginForm.value)
      .subscribe(
        res => {
            this.spinner.hide();
            //checks if the current login page is for teacher, and if the account
            //logged in is also a teacher account, only then it works
            if (res != null && res["success"]) {
                this.authService.storeUserData(res["token"], res["user"]);
                this.alertService.setSuccessHTML(res["message"]);

                this.user = this.authService.getUser();
                // This information must be stored in session storage so that cellular can access.\
                let role_id = this.user["role_id"];
                let roleS = "student";
                if (role_id == 1) {
                  roleS = "teacher"; 
                } else if (role_id == 3) {
                  roleS = "admin";
                }
                let userW = { user_id : this.user["username"], username : this.user["username"], user_type : roleS, display_name : this.user["username"] };

                //window.user = userW
                sessionStorage.username = this.user["username"];
                sessionStorage.user = JSON.stringify(userW);

                $('#loggingInButton').after('<div></div><div>Hello</div>');
                if(res["user"].account_type == 1) {
                    console.log(this.user["username"]+" logged in at: "+new Date().toLocaleString());
                    this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: 'login'}).subscribe(res => {
                        if(res["success"]){
                            console.log(res);
                        }
                    });

                    $("#loginModal").remove();
                    $('.modal-backdrop').remove();
                    $('body').removeClass( "modal-open" );
                    setTimeout( () => {
                        this.router.navigateByUrl(this.teacherLanding);
                    }, 100);

                } else {
                    console.log(this.user["username"]+" logged in at: "+new Date().toLocaleString());
                    this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: 'login'}).subscribe(res => {
                        if(res["success"]){
                            console.log(res);
                        }
                    });

                    $("#loginModal").remove();
                    $('.modal-backdrop').remove();
                    $('body').removeClass( "modal-open" );
                    setTimeout( () => {
                        this.router.navigateByUrl(this.studentLanding);
                    }, 100);

                }
                  // console.time("Tutorial test");
                  this.loginForm.reset();
            } else {
              this.alertService.setErrorHTML(res["message"]);
            }
        });



    this.loginForm.reset();

  }



  /**
   * Allows navigation based on url
   */
  navigate(url) {
    this.router.navigateByUrl(url);
  }

}
