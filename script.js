var apikey = 'e27fa347f5134d05d053b02acb00c1153f892615'; // Put your API key here
var userSearch;

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
	$(".searchResults").empty();
	var count = 0;
	var cell = '';
	for (var i = 0; i < results.length; i++){
	    var games = results[i];
	    if (games.image.hasOwnProperty('icon_url')){
	    	var hiddenInfo = '<br><div class="bonus"><br><strong>Game Description: </strong>' + games.deck + '<br><strong>Game Release Date: </strong>'  + games.original_release_date + '</div>'
	    	cell += '<div class="col-md-2"><img class="img-thumbnail" src="' + games.image.icon_url + '"/><br><h3>'  + games.name + '</h3>' + hiddenInfo +'</div>';
			count++
			if (count == 6){
				$(".searchResults").append('<div class="row">' + cell + '</div>');
				count = 0;
				cell = '';
			}
		};
	}
	$(".searchResults").append('<div class="row">' + cell + '</div>');
};


