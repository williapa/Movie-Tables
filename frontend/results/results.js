$(function(){
	var dataTable,
		tr = "<tr><td>",
		tre = "</td></tr>",
		td = "</td><td>",
		rn = "\r\n",
		setup = "chrome-extension://moimboceefbncokpfbkckbhmdooggkhc/frontend/setup/setup.html";

	function allStorage() {
	    var values = [],
	        keys = Object.keys(localStorage),
	        i = keys.length;
	    while ( i-- ) {
	        values.push( JSON.parse(localStorage.getItem(keys[i])) );
	    }
	    return values;
	}

	function funct(actors) {
		var keys = Object.keys(actors);
		i = keys.length;
		while( i -- ) {
			var appearances = actors[keys[i]].length;
			var row = tr + keys[i] + td + appearances + tre;
			$("#appearances table tbody").append(row);
		}
	}

	function buildMovieRow(title, rating, year) {
		return tr + $.trim(title) + td + rating + td + year + tre
	}

	function buildActorRow(actor, name, movie) {
		return tr + actor + td + name + td + movie + tre;
	}

	var storageItems = allStorage(),
	    m = [],
	    movies = "",
	    actors = {},
	    actorArray = [];

	for(var i = 0; i <  storageItems.length; i++) {
		var item = storageItems[i];
		console.log(item);
		m.push({title: item.title, year: item.year});
		movies = movies + buildMovieRow(item.title, item.rating, item.year);
		var actorRow = "";
		for(var j = 0; j < item.actors.length; j++) {
			if(actors[item.actors[j]] == undefined) {
				actors[item.actors[j]] = [];
			}
			actors[item.actors[j]].push(item.names[j]);
			actorArray.push({actor: item.actors[j], name: $.trim(item.names[j]), title: item.title});
			actorRow = actorRow + buildActorRow(item.actors[j], item.names[j], item.title);
		}
		$("#actors table tbody").append(actorRow);
	}

	$("#movies table tbody").append(movies);

	funct(actors);

	$(".tablinks").click(function(evt) {
		if($(evt.target).hasClass("bts")) {
			return;
		} else if(evt.target.getAttribute("data-attr-tab") !== "popup") {
			openTab(evt, evt.target.getAttribute("data-attr-tab"));
		}
	});

	$(".download").click(function(evt) {
		var csvString = "";
		var id = evt.target.parentNode.parentNode.id;
		var csvString = "data:text/csv;charset=utf-8,";
		if(id == "appearances") {
			var keys = Object.keys(actors);
			csvString = csvString + "Actors,Appearances" + rn;
			for(var i = 0; i < keys.length; i++) {
				csvString = csvString + keys[i] + "," + actors[keys[i]].length + rn;
			}
		} else if (id == "movies") {
			csvString = csvString + "Title,Year" + rn;
			for(var i = 0; i < storageItems.length; i++) {
				csvString = csvString + storageItems[i].title + "," +  storageItems[i].rating + "," + storageItems[i].year + rn;
			}
		} else {
			csvString = csvString + "Actor,Name,Movie" + rn;
			for(var i = 0; i < actorArray.length; i++) {
				var act = actorArray[i];
				csvString = csvString + act.actor + "," + act.name + "," + act.title + rn;
			}
		}
		console.log("csv string: ", csvString);
		var encodedUri = encodeURI(csvString);
		var link = document.createElement("a");
		link.setAttribute("href", encodedUri);
		link.setAttribute("download", id + ".csv");
		//document.body.appendChild(link); // Required for FF
		link.click(); 
	})

	$("#movies").click();

	function openTab(evt, tabName) {
    	// Declare all variables
	    var i, tabcontent, tablinks;

	    // kill the old datatable
	    if(dataTable !== undefined && dataTable !== null) {
	    	//dataTable.destroy();
	    }

	    // Get all elements with class="tabcontent" and hide them
	    tabcontent = document.getElementsByClassName("tabcontent");
	    for (i = 0; i < tabcontent.length; i++) {
	        tabcontent[i].style.display = "none";
	    }

	    // Get all elements with class="tablinks" and remove the class "active"
	    tablinks = document.getElementsByClassName("tablinks");
	    for (i = 0; i < tablinks.length; i++) {
	        tablinks[i].className = tablinks[i].className.replace(" active", "");
	    }

	    // Show the current tab, and add an "active" class to the button that opened the tab
	    var tab = document.getElementById(tabName);
	    if(tab !== null) {
	    	tab.style.display = "block";
	    }

	    evt.currentTarget.className += " active";

	    // activate the new table
	    dataTable = $("#" + tabName + " table").dataTable();
	}

});