var apikey = 'e27fa347f5134d05d053b02acb00c1153f892615'; // Put your API key here
var userSearch;
var games;
// Use this function to do stuff with your results. 
// It is called after 'search' is executed.


$(document).ready(function() {
	$(".btn").on("click", function(){
		userSearch = $("#search").val();
		search(userSearch);
		console.log()
	});

	$(".searchResults").on("click", "img",function(){

		$(this).siblings().toggleClass("bonus");
	})

});

// HELPER FUNCTION
// Executes a search using 'query' and runs searchCallback on the results of a success.
function search(query){

	$.ajax ({
	    type: 'GET',
	    dataType: 'jsonp',
	    crossDomain: true,
	    jsonp: 'json_callback',
	    url: 'http://www.giantbomb.com/api/search/?format=jsonp&resources=game&api_key=' + apikey +'&query=' + encodeURI(query),
	    complete: function() {
	        console.log('ajax complete');
	    },
	    success: function(data) {
	        searchCallback(data.results);
	    }
	});

}

function searchCallback(results) {
	var count = 1;
	var cell = '';
	for (var i = 0; i < results.length; i++){
	    var games = results[i];
	    var hiddenInfo = '<div class="bonus">' + games.deck + '<br>'  + games.original_release_date + '</div>'
	    cell += '<div class="col-md-2"><img src="' + games.image.thumb_url + '"class="movieImage"/><br>'  + games.name + hiddenInfo +'</div>';
		count++
		if (count == 6){
			$(".searchResults").append('<div class="row">' + cell + '</div>');
			count = 0;
			cell = '';
		}
		};
	};


