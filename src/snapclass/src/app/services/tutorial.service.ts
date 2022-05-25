import { Injectable } from '@angular/core';
import { TutorialStatus, tutorialSubStatus } from '../models/tutorial.enum';

@Injectable({
  providedIn: 'root'
})
export class TutorialService {

  /** 
   * Tutorial status enumeration
   */
  tutorialStatus: any;

  /** 
   * Tutorial substatus enumeration
   */
  subStatus: any;

  constructor() { }

  /**
   * Returns the current status of the tutorial.
   */
  getTutorialStatus() {
    return this.tutorialStatus;
  }
  /**
   * Returns the current status of the course help tutorial.
   */
  gettutorialSubStatus() {
    return this.subStatus;
  }

  /**
   * Sets the tutorial status with the given parameters
   * @param tutorialStatus overall status of the tutorial
   * @param subStatus sub status of the tutorial
   */
  setTutorialStatus(tutorialStatus: any, subStatus: any) {
    this.tutorialStatus = tutorialStatus;
    this.subStatus = subStatus;
  }

}
