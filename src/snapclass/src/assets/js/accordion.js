/**
 * This script is for the course listing page to ensure html
 * elements are loaded before the page script runs.
 */
function waitForElement(elementId, callBack){
    window.setTimeout(function(){
      var element = document.getElementById(elementId);
      if(element){
        callBack(elementId, element);
      }else{
        waitForElement(elementId, callBack);
      }
    },500)
  }

/**
 * Add toggle to accordion once HTML loads to page
 */
export function addAccordion() {
  // waitForElement("courseAccordion",function() {
  //     var acc = document.getElementsByClassName("accordion");
  //     var i;
  //
  //     for (i = 0; i < acc.length; i++) {
  //         acc[i].removeEventListener("click", toggle); // function gets call twice in some instances
  //         acc[i].addEventListener("click", toggle);
  //     }
  // });
  waitForElement("rubricAccordion",function() {
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].removeEventListener("click", toggle); // function gets call twice in some instances
        acc[i].addEventListener("click", toggle);
    }
});

    waitForElement("categoryAccordion",function() {
        var acc = document.getElementsByClassName("accordion");
        var i;

        for (i = 0; i < acc.length; i++) {
            acc[i].removeEventListener("click", toggle); // function gets call twice in some instances
            acc[i].addEventListener("click", toggle);
        }
    });
}

 /**
  * Toggle between adding and removing the "active" class,
  * to highlight the button that controls the panel
  */
function toggle() {
  // this.classList.toggle("active");
  //
  // /* Toggle between hiding and showing the active panel */
  // var panel = this.nextElementSibling;
  // if (panel.style.display === "flex") {
  //     panel.style.display = "none";
  // } else if (panel.style.display === "none") {
  //     panel.style.display = "flex";
  // } else {
  //     panel.style.display = "flex";
  // }
}
