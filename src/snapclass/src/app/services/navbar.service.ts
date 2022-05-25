import {Injectable} from '@angular/core';
import {Router, NavigationEnd} from '@angular/router';
import {routeNames} from './routing.service';

/**
 * Service for managing navbar
 */
@Injectable()
export class NavBarService {

  navOpen: boolean;
  url: string;

  constructor(private router: Router) {
    this.navOpen = true;
    this.subscribeRouter();
  }

  teacherLanding = routeNames.TEACHERLANDING;
  teacherGrading = routeNames.GRADEASSIGNMENT;
  teacherLogin = routeNames.TEACHERLOGIN;
  studentLanding = routeNames.STUDENTLANDING;
  teacherAccount = routeNames.TEACHERACCOUNT;


  toggleNav() {
    const nav = document.getElementById('sidenav');
    if (nav == null) {
      return;
    }

    if (this.navOpen) {
      this.closeNav();
    } else {
      this.openNav();
    }
  }

  openNav() {
    const nav = document.getElementById('sidenav');
    if (nav == null) {
      return;
    }
    // if(!(this.router.url.includes(this.teacherLanding)) && (this.navOpen == false)) {
    //     return;
    // }
    nav.classList.remove('gs-nav-collapsed');
    nav.classList.add('gs-nav-expanded');
    nav.classList.add('col-2');
    this.navOpen = true;
  }

  closeNav() {
    const nav = document.getElementById('sidenav');
    if (nav == null) {
      return;
    }
    nav.classList.remove('gs-nav-expanded');
    nav.classList.remove('col-2');
    nav.classList.add('gs-nav-collapsed');
    this.navOpen = false;
  }

  private subscribeRouter() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (!this.navOpen && !this.router.url.includes(this.teacherLogin) && !this.router.url.includes(this.studentLanding) && !(this.router.url === '/')) {
          //this.toggleNav();
        }
        if (this.navOpen && event.url == '/' + this.teacherGrading) {
          this.toggleNav();
        }

      }
    });
  }
}
