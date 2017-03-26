

var model = {
  watchlistItems: [],
  browseItems: []
}


var api = {
  root: "https://api.themoviedb.org/3",
  token: "da2dc060a7b4163be20b57521ff33478" // TODO 0 put your api key here
}


/**
 * Makes an AJAX request to themoviedb.org, asking for some movies
 * if successful, updates the model.browseItems appropriately, and then invokes
 * the callback function that was passed in
 */
function discoverMovies(callback) {
	$.ajax({
		url: api.root + "/discover/movie",
		data: {
			api_key: api.token,
		},
		success: function(response) {
			console.log("We got a response from The Movie DB!");
			console.log(response);

			// TODO 2
			// update the model, setting its .browseItems property equal to the movies we recieved in the response
            model.browseItems = response.results;
			// invoke the callback function that was passed in.
			callback();
		}
	});

}


/**
 * re-renders the page with new content, based on the current state of the model
 */
function render() {
  // TODO 7
  // clear everything from both lists
  $("ul").empty();

  // TODO 6
  // for each movie on the user's watchlist, insert a list item into the <ul> in the watchlist section
  model.watchlistItems.forEach(function(movie) {
      var watchlistitem = $("<li></li>").text(movie.title);
      $("#section-watchlist ul").append(watchlistitem);
  });
  // for each movie on the current browse list,
  model.browseItems.forEach(function(movie) {
		// TODO 3
		// insert a list item into the <ul> in the browse section
        var listitem = $("<li></li>").text(movie.title);
        $("#section-browse ul").append(listitem);
		// TODO 4
		// the list item should include a button that says "Add to Watchlist"
        var button = $("<button>Add to Watchlist</button>");
        $("#section-browse ul").append(button);
		// TODO 5
		// when the button is clicked, this movie should be added to the model's watchlist and render() should be called again
        button.click(function(){
            console.log("Anything");
            model.watchlistItems.push(movie);
            console.log(model.watchlistItems);
            console.log("Its working");
            render();
        });
  });

}

// When the HTML document is ready, we call the discoverMovies function,
// and pass the render function as its callback
$(document).ready(function() {
  discoverMovies(render);
});
