console.log("this is a youtube page, so the remover works");
//console.log(Date.now());
chrome.runtime.onMessage.addListener(gotMessage);
//console.log("listener added on");
//console.log(Date.now());

function gotMessage(message, sender, sendResponse) {
    console.log("message received");
    //console.log(message, sender, sendResponse);
    //console.log(message.state);
    sendResponse({txt:"response from the content script"});
    if(message.state == "1") {
        console.log("message state is: " + message.state);
        document.getElementById("related").style.display = "none";
        setTimeout(function() {
            console.log("target: " + document.getElementById("related"));
            document.getElementById("related").style.display = "none";
            console.log("related videos removed!");
            console.log(document.getElementById("related").style.display);
        }, 800);
        document.getElementById("related").style.display = "none";
        console.log(document.getElementById("related").style.display);
    }
}