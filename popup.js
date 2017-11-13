$(function() {
	var tabsLeft = 10;
	var links = [];
	chrome.runtime.onMessage.addListener(
	    function(request, sender, sendResponse) {
	        if (request.reminder == "reduce-tabs-left") {
	           tabsLeft = tabsLeft - 1;
	           var index = links.indexOf(request.url);
	           console.log("request url: ", request.url);
	           if(index > -1) {
	               links.splice(index, 1);
	               $( "li:contains('" + request.url + "')" ).remove();
	           }
	           document.querySelector("#number").innerHTML = tabsLeft;
	        }
	    }
	);

	$("#add").click(function(evt) {
		var link = "http://www.imdb.com/title/" + $("input").val() + "/";
		links.push(link);
		var html = "<li class='del'>" + link + "</li>";
		$(".links").append(html);
		$("input").val("");
		$("#number").html(links.length);
	});

	$(document).on("click", ".del", function(evt) {
		var item = evt.target.innerHTML;
		var index = links.indexOf(item);
		if (index > -1) {
		    links.splice(index, 1);
		}
		evt.target.parentNode.removeChild(evt.target);
		$("#number").html(links.length);
	});

	$("#clear").click(function(evt) {
		if(confirm("are you sure?")) {
			localStorage.clear();	
		}
	});

	$("#start").click(function(evt) {
		tabsLeft = links.length;
		$("#number").html(tabsLeft);
		chrome.runtime.sendMessage({greeting: 'scrape', links: links});
	});
});
