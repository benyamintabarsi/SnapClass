import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';


/**
 * Message alert and error alert handler service
 */
@Injectable()
export class AlertService {

    setAlertResponseText(text) {
        const els = document.getElementsByClassName("alert-response");
        if (!els || els.length === 0) return; // no matching elements
        Array.prototype.forEach.call(els, function (el) {
            el.innerHTML = text;
        });
    }

    /**
     * Set time to only display alert for 5 seconds
     */
    setTimer() {
        var t = timer(5000); // 5000 millisecond means 5 seconds
        t.subscribe(() => {
            // set response html to empty to hide div from view after 5 seconds
            this.setAlertResponseText("");
        });
    }

    /**
     * Return standard HTML for success message
     * @param bodyText success message
     * @param headerText success header
     */
    setSuccessHTML(bodyText, headerText = "Well Done!") {
        this.setAlertResponseText(
            `<div class="alert alert-success" role="alert">
                <h4 class="alert-heading">` + headerText + `</h4>
                <hr>
                <p>` + bodyText + `</p>
            </div>`
        );
        this.setTimer();
    }

    /**
     * Return standard HTML for error message
     * @param bodyText error messager
     * @param headerText error header
     */
    setErrorHTML(bodyText, headerText = "Something Went Wrong!") {
        this.setAlertResponseText(
            `<div class="alert alert-danger" role="alert">
                <h4 class="alert-heading">` + headerText + `</h4>
                <hr>
                <p>` + bodyText + `</p>
            </div>`
        );
        this.setTimer();
    }

    /**
     * Logs error and creates error alert
     * @param error http error response
     */
    handleError(error: HttpErrorResponse, html = "Please try again later") {
        if (error.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          console.error('An error occurred:', error.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.error(
            `Backend returned code ${error.status}, ` +
            `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        this.setErrorHTML(html);
    }
}