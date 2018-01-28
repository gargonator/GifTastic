// adds initial food buttons
function addTopics() {
	topics = ['apple pie','pizza','chocolate cake','banana','ice cream','popsicle','steak',
		'foie gras','coffee','lasagna'];
	topics.forEach(function(topic) {
		var food_button = $("<button class='food-button'></button>").text(topic);
		$('#buttons').append(food_button);
	});
};

// add new food button based on form submission
function addSubmittedTopic(event) {
	var food_button = $("<button class='food-button'/>").text($("input[name*='food-input']").val());
	food_button.on('click', getGifs); // add event listener to newly created button
	$('#buttons').append(food_button); // append new food button
};

// makes API call to get GIFs based on button that is clicked
function getGifs(event) {
	// API parameters
	var APIkey = '5TlWFC3KHJxPDM4UZqKgoPJ0doDKUUMR';
	var limit = 10;
	// build query URL to search for food item
	var queryURL = 'http://api.giphy.com/v1/gifs/search?'
	+ '&q=' + $(event.target).text()
	+ '&limit=' + limit 
	+ '&api_key=' + APIkey;

	// make AJAX query!
	$.ajax({
		method: 'GET',
		url: queryURL,
	}).done(function(response) {
		// remove all previous gifs
		$('.single-gif').remove();
		// loop through each gif and append the image and the rating caption
		response.data.forEach(function(image)  {
			// store image URL and image rating
			var imageURL_still = image.images.fixed_height_still.url;
			var imageURL_dynamic = image.images.fixed_height.url;
			var rating = image.rating;
			// create image container with gif and caption
			var image_container = $("<div class='single-gif'></div>");
			var image = $('<img>').attr({'src':imageURL_still,'alt':'food_gif', 'state':'still'});
			var caption = $("<div class='caption'></div>").text('Rating: ' + rating);
			image_container.append(caption);
			image_container.append(image);
			// add listener to change image from still to dynamic and vice versa
			image.on('click', changeState);
			// append image container to DOM
			$('#images').append(image_container);
			// helper function to change image state
			function changeState(event) {
				if($(event.target).attr('state') === 'still') {
					$(event.target).attr({'src':imageURL_dynamic, 'state':'dynamic'});
				} else {
					$(event.target).attr({'src':imageURL_still, 'state':'still'});
				}
			}
		})
	});
};
