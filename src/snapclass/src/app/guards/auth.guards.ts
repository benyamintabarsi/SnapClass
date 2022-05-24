import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * Route guarding service.
 * Verifies user is logged in
 */
@Injectable()
export class AuthGuard implements CanActivate {

  /**
   * Construct dependencies
   * @param authService token authorization service
   * @param router provides the navigation and url manipulation capabilities.
   */
  constructor (private authService:AuthService, private router:Router){
  }

  /**
   * Return true if user is logged in.
   * Else redirect to guest landing page
   */
  canActivate() {
    if(this.authService.loggedIn()) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}