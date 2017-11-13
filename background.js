var urls = [],
    closed = 0,
    chromeExtensionUrl = "chrome-extension://moimboceefbncokpfbkckbhmdooggkhc/frontend/results/results.html";

chrome.browserAction.onClicked.addListener(function(tab) {
	chrome.windows.create({url:"frontend/setup/setup.html", type: "popup"/*, state: "fullscreen"*/});
});

function onItem(item, sender, sendResponse) {
	localStorage.setItem(item.title, JSON.stringify(item));
  	var url = sender.url;
  	chrome.tabs.query({url: url}, function(tabs) {
  		for(var i = 0; i < tabs.length; i++) {
  			chrome.tabs.remove(tabs[i].id);
  		}
  	});
  	closed++;
  	chrome.runtime.sendMessage({reminder: "reduce-tabs-left", url: url});
  	if(closed == urls.length) {
  		console.log("reduce tabs left");
  		chrome.tabs.create({url: chromeExtensionUrl});
  	}
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if(request.item !== undefined) {
		onItem(request.item, sender, sendResponse);
	}  else if (request.greeting == "scrape") {
		urls = request.links;
		chrome.windows.create({ url: urls }, function(win) {
       		chrome.windows.update(win.id, { focused: false });
    	});
	}
});
