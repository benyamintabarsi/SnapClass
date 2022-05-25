import { Component, OnInit } from '@angular/core';
import { APIService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service'
import { AlertService } from 'src/app/services/alert.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { routeNames } from '../../services/routing.service';
import { NavBarService } from '../../services/navbar.service';
import { TutorialService } from 'src/app/services/tutorial.service';


@Component({
  selector: 'app-teacher-help-dash',
  templateUrl: './teacher-help-dash.component.html',
  styleUrls: ['./teacher-help-dash.component.css']
})
export class TeacherHelpDashComponent implements OnInit {


  /**
   * Constructs the teacher help dashboard component
   * @param apiService
   * @param authService
   * @param alertService
   * @param router
   * @param tutorialService
   * @param navService
   */
  constructor(
    private apiService: APIService,
    private authService: AuthService,
    private alertService: AlertService,
    public router: Router,
    private tutorialService: TutorialService,
    private navService: NavBarService) { }

    user: User;

  ngOnInit() {
    this.user = this.authService.getUser();
  }

  /**
   * Sets the tutorial status based on the selection by the user.\
   * @param status the general status of the tutorial to set
   * @param subStatus the substatus of the tutorial
   */
  onSelect(status: any, subStatus: any) {
    if (status == 1 && subStatus == 1) {
      this.user = this.authService.getUser();
      console.log(this.user["username"]+" started the tutorial from dashboard at: "+new Date().toLocaleString());
      this.apiService.logUser({username: this.user["username"], time: new Date().toLocaleString(), event_type: "tutorialStart"}).subscribe(res => {
          if(res["success"]){
              console.log(res);
          }
      });
    }
    this.tutorialService.setTutorialStatus(status, subStatus);
  }

  /**
   * Navigate to URl
   * @param url URL to navigate to
   */
  navigate(url) {
    this.router.navigateByUrl(url);
  }
}
