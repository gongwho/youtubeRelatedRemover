var global = this;
var state = null;

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
		let timeNow = new Date();
		console.log(timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds() + ":" + timeNow.getMilliseconds());
		//chrome.tabs.executeScript({code:"console.log('hello! from the background page');"}) ;
		chrome.runtime.getPackageDirectoryEntry(function(root) {
			root.getFile("state.txt", {}, function(fileEntry) {
				fileEntry.file(function(file) {
					var reader = new FileReader();
					reader.onloadend = function(e) {
						//console.log(this.result);
						global.state = this.result;
						chrome.tabs.sendMessage(tabId, {state: global.state}, function(response) {
							if (!window.chrome.runtime.lastError) {
								console.log("response: " + response.txt);
							}
							else {
								console.log("not a youtube page");
							}
						});
					};
					reader.readAsText(file);
				});
			});
		});
	}
});


chrome.tabs.onActivated.addListener(function(activeInfo) {
	console.log("tab activated");
    let timeNow = new Date();
	console.log(timeNow.getHours() + ":" + timeNow.getMinutes() + ":" + timeNow.getSeconds() + ":" + timeNow.getMilliseconds());
	//chrome.tabs.executeScript({code:"console.log('hello! from the background page');"}) ;
	chrome.runtime.getPackageDirectoryEntry(function(root) {
		root.getFile("state.txt", {}, function(fileEntry) {
			fileEntry.file(function(file) {
				var reader = new FileReader();
				reader.onloadend = function(e) {
					console.log("loaded!!");
					global.state = this.result;
					chrome.tabs.sendMessage(activeInfo.tabId, {state: global.state}, function(response) {
						if (!window.chrome.runtime.lastError) {
							console.log("response: " + response.txt);
						}
						else {
							console.log("not a youtube page");
						}
					});
				};
				reader.readAsText(file);
			});
		});
	});
});