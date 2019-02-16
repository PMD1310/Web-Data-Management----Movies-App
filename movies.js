function initialize () {
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
          var str = JSON.stringify(json,undefined,2);
          
		  var i;
		  var moviedata;
		for(i=0; i< json.results.length; i++)
	   //moviedata +=  json.results[i]["original_title"] +  "<br> " + json.results[i]["release_date"] + "<br>" +"<br><p>********</p>";
	   {
		 document.getElementById("output").innerHTML += "<pre><a href = '#' onclick = 'searchbyID("+ json.results[i]["id"] + ")'>" + "<br>" + json.results[i]["original_title"] + "<br>" + json.results[i]["release_date"] + "</pre>";  
		 console.log(json.results[i]["id"]);
	   }
		 
       }
   };
   xhr.send(null);
}

function searchbyID (id)
{
	var xhr2 = new XMLHttpRequest();
   xhr2.open("GET", "proxy.php?method=/3/movie/" + id);
   xhr2.setRequestHeader("Accept","application/json");
   xhr2.onreadystatechange = function () {
       if (this.readyState == 4) {
          var json = JSON.parse(this.responseText);
		 
		 var CinemaPoster = json["poster_path"];
		 var MovieTitle = json["title"];
		 var FilmGenre = json["genres"];
		 var FilmOverview = json["overview"];
		 var AllGenres = "";
		 
		 for (i in FilmGenre)
		 {
	
			 AllGenres = AllGenres + FilmGenre[i]["name"] + ",";

			 
			 
		 }
		 	secondResult = "<img src = 'http://image.tmdb.org/t/p/w185/" + CinemaPoster+ "' style = 'width:400px;height:450px'" + "<br>"
			
			
				secondResult = secondResult + "<h3> Genres: " + AllGenres + "</h3>"
			
	
				secondResult = secondResult + "<p>" + FilmOverview + "</p>"
			
			
			document.getElementById("SearchID").innerHTML = secondResult;
			
	   }
   };
   xhr2.send(null);
}

