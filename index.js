document.onreadystatechange = function () {
    if (document.readyState === 'complete') {
        console.log("this is a youtube page, so the remover works");
        //console.log(Date.now());
        chrome.runtime.onMessage.addListener(gotMessage);
        //console.log("listener added on");
        //console.log(Date.now());

        function gotMessage(message, sender, sendResponse) {
            console.log("message received");
            //console.log(message, sender, sendResponse);
            sendResponse({txt:"response from the content script"});
            //console.log(message.state);
            if(message.state == "1") {
                console.log("message state is: " + message.state);
                setTimeout(function() {
                    console.log("target: " + document.getElementById("related"));
                    document.getElementById("related").style.display = "none";
                    console.log("related videos removed!");
                }, 800);
            }
        }
    }
}