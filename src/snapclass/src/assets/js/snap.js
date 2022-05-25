function waitForElement(elementId, callBack){
    window.setTimeout(function(){
        var element = document.getElementById(elementId);
        if (element && getIDE()) {
            callBack(elementId, element);
        } else {
            waitForElement(elementId, callBack);
        }
    }, 100);
}

/**
 * Gets IDE from contentWindow (either called 'worldIDE' or just 'ide')
 * Depends whether Snap or Cellular is being used as the environment.
 * @returns IDE object from current Snap environment
 */
function getIDE() {
    let el = document.getElementById("snap-canvas");
    let cw = el ? el.contentWindow : null;
    if (!cw) return null;
    return cw.worldIDE || cw.ide
}

/**
 * Load student submission in snap window
 * @param project submission code xml 
 */
export function loadSnap(project) {
    waitForElement("snap-canvas", function() {
        getIDE().openProjectString(project);
    });
}

export function saveSnap() {
    var IDE = getIDE();
    return IDE.serializer.serialize(IDE.stage);
}

export function sendMessage(message) {
    getIDE().showMessage(message, 2);
}

export function newSnap() {
    waitForElement("snap-canvas", function() {
        getIDE().newProject();
    });
}
