$(function(){
	var dataTable;
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
			var row = "<tr><td>" + keys[i] + "</td><td>" + appearances + "</td></tr>";
			$("#appearances table tbody").append(row);
		}
	}

	function buildMovieRow(title, year) {
		return "<tr><td>" + $.trim(title) + "</td><td>" + year + "</td></tr>";
	}

	function buildActorRow(actor, name, movie) {
		return "<tr><td>" + actor  + "</td><td>" + name + "</td><td>" + movie + "</td></tr>";
	}

	var storageItems = allStorage();
	var m = [];
	var movies = "";
	var actors = {};
	var actorArray = [];
	for(var i = 0; i <  storageItems.length; i++) {
		var item = storageItems[i];
		console.log(item);
		m.push({title: item.title, year: item.year});
		movies = movies + buildMovieRow(item.title, item.year);
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
		if(evt.target.getAttribute("data-attr-tab") !== "popup") {
			openTab(evt, evt.target.getAttribute("data-attr-tab"));
		}
	});

	$(".download").click(function(evt) {
		var csvString = "";
		var id = evt.target.parentNode.parentNode.id;
		var csvString = "data:text/csv;charset=utf-8,";
		if(id == "appearances") {
			var keys = Object.keys(actors);
			csvString = csvString + "Actors,Appearances\r\n";
			for(var i = 0; i < keys.length; i++) {
				csvString = csvString + keys[i] + "," + actors[keys[i]].length + "\r\n";
			}
		} else if (id == "movies") {
			csvString = csvString + "Title,Year\r\n";
			for(var i = 0; i < storageItems.length; i++) {
				csvString = csvString + storageItems[i].title + "," + storageItems[i].year + "\r\n";
			}
		} else {
			csvString = csvString + "Actor,Name,Movie\r\n";
			for(var i = 0; i < actorArray.length; i++) {
				var act = actorArray[i];
				csvString = csvString + act.actor + "," + act.name + "," + act.title + "\r\n";
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

	document.getElementById("movies").click();

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