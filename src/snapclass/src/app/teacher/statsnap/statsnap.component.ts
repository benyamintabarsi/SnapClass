import { Component, OnInit } from '@angular/core';
import { APIService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import { Router } from '@angular/router';
import { NavBarService } from '../../services/navbar.service';
import { ActiveSectionService } from 'src/app/services/active-section.service';
import { routeNames } from 'src/app/services/routing.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-statsnap',
  templateUrl: './statsnap.component.html',
  styleUrls: ['./statsnap.component.css']
})

export class StatsnapComponent implements OnInit {
  constructor(
  private apiService: APIService,
  private authService: AuthService,
  private alertService: AlertService,
  private navService: NavBarService,
  private sectionService: ActiveSectionService,
  public router: Router) {}

  ngOnInit() {
      this.user = this.authService.getUser();
      if((this.user["data"]["account_type"]) != 1){
          this.authService.logout();
          this.navigate('/');
      }
  }
  /* Needed to detect if the correct user accesses this */
  user: User;
  /*Setting route names for pages in StatSnap! */
  gradedist = routeNames.GRADEDIST;
  variables = routeNames.VARIABLES;

  /* Function to navigate to these pages */

  navigate(url) {
    this.router.navigateByUrl(url);
  }

}
