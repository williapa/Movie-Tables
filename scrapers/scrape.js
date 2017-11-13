var it = {};
it.actors = [];
document.querySelectorAll("#titleCast .itemprop[itemprop='actor']").forEach(function(item) {
	it.actors.push($.trim($(item).text()));
});
it.names = [];
document.querySelectorAll("#titleCast td.character").forEach(function(item) {
	it.names.push($.trim($(item).text()));
});
it.title = $(".title_wrapper h1").text();
it.year = $("#titleYear").text();
it.rating = $("[itemprop='ratingValue']").text();
chrome.runtime.sendMessage({item: it});
