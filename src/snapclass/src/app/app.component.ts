import { Component, AfterViewInit } from '@angular/core';
import { routeNames } from './services/routing.service';
import { Router, RouterOutlet } from '@angular/router';
import { NavBarService}  from  './services/navbar.service';
import {routeAnimations} from './core/route-animations';
import * as $ from 'jquery';


import {
    Event,
    NavigationCancel,
    NavigationEnd,
    NavigationError,
    NavigationStart,
} from '@angular/router';
import {Subscription} from "rxjs";

/**
 * App root component
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  /**
   * Project title
   */
  title = 'snapclass-ui';
  loading;

  teacherLogin = routeNames.TEACHERLOGIN;
  teacherLanding = routeNames.TEACHERLANDING;
  studentLanding = routeNames.STUDENTLANDING;
  studentLogin = routeNames.STUDENTLOGIN;

  /**
   * Construct dependencies
   * @param router provides the navigation and url manipulation capabilities.
   */
  constructor(public router: Router, public navService: NavBarService) {

      this.loading = true;

     }

     ngAfterViewInit() {

         this.router.events.subscribe((event) => {
             if(event instanceof NavigationStart) {
                 // this.navService.closeNav();
                this.loading = true;
             } else if (
                 event instanceof NavigationEnd || event instanceof NavigationCancel
             ) {
                 setTimeout( () => {
                     this.loading = false;
                 }, 1500);

             }
         });
     }

     prepareRoute(outlet: RouterOutlet) {
         return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
     }

}
