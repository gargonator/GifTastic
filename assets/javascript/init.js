$(document).ready(function() {
	
	// add food buttons
	addTopics();

	// add listener to food buttons
	$('.food-button').on('click', getGifs);

	// add listener to submit button
	$('#submit-button').on('click', addSubmittedTopic);

});