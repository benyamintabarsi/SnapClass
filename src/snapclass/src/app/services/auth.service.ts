import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpRequest } from '@angular/common/http';
import { APIService } from './api.service';
import { User } from '../models/user.model';

/**
 * Token authorization service
 */
@Injectable()
export class AuthService {
  /** 
   * User authorization token
   */
  authToken: any;

  /** 
   * User information
   */ 
  user: User;

  /** 
   * Helper for determing if token is expired
   */ 
  helper = new JwtHelperService();

  /**
   * Log of failed requests
   */
  cachedRequests: Array<HttpRequest<any>> = [];

  /** 
   * Construct dependencies
   * @param apiService API routes definition service
   */
  constructor(
    private apiService: APIService) { }

  /**
   * Store user token and information in local storage
   * @param token user token
   * @param user user information 
   */
  storeUserData(token, user) {
    if (token) {
      localStorage.setItem('id_token', token);
      this.authToken = token;
    }
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      this.user = new User(user);
    }
  }

  /**
   * Load user's token from local storage
   */
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  /**
   * Load user's information from local storage
   */
  loadUser() {
    const user = localStorage.getItem('user');
    this.user = new User(JSON.parse(user));
  }

  /**
   * Get user information
   */
  getUser() {
    this.loadUser();
    return this.user;
  }

  /**
   * Get token information
   */
  getToken() {
    this.loadToken();
    return this.authToken;
  }

  /**
   * Return if current user is logged in with valid token
   */
  loggedIn() {
    this.loadToken();
    if (this.authToken) {
      return !this.helper.isTokenExpired(this.authToken);
    }
    else return false;
  }

  /**
   * Logout current user
   */
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

/**
 * Store failed requests
 * @param request failed request
 */
  public collectFailedRequest(request): void {
    this.cachedRequests.push(request);
  }

  /**
   * Update active section for teacher
   * @param sectionId section ID
   */
  updateActiveSection(sectionId) {
    const user = JSON.parse(localStorage.getItem('user'));
    user.activeSection = sectionId;
    localStorage.setItem('user', JSON.stringify(user));
    this.apiService.putActiveSectionForTeacher(user.id, sectionId).subscribe();
  }

  /**
   * Get active section for teacher
   */
  getActiveSection() {
    this.loadUser();
    return this.user.activeSection;
  }
}