import { browser, by, element } from 'protractor';

/**
 * Application controller
 */
export class AppPage {
  /**
   * Initial page
   */
  navigateTo() {
    return browser.get('/') as Promise<any>;
  }

  /**
   * Returns title of page
   */
  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
