// Initialize Firebase
var config = {
	apiKey: "AIzaSyApCZANinnru-gKDVNacC9nm35ynKKQGTs",
	authDomain: "we-re-so-hungry.firebaseapp.com",
	databaseURL: "https://we-re-so-hungry.firebaseio.com",
	projectId: "we-re-so-hungry",
	storageBucket: "we-re-so-hungry.appspot.com",
	messagingSenderId: "146172848851"
};
firebase.initializeApp(config);

//  Assign the reference to the database to a variable named 'database'
var database2 = firebase.database();




// // Performs the Reciepe lookup
// function edamamAPI(newIngredients){

// 	var applicationID = "ee864bfc";
// 	var receipeSearchAPIKey = "bd4299ab0500d03db078800ad8bbd068";
// 	var ingredientQuery = ["tomato", "onion", "basil", "mozzarella"];

// 	// Dynamicaly build the ingredientQuery by grabbing all ingredients
// 	// for(var key in newIngredients){
// 	// 	//  Add each ingredient to the query string
// 	// 	// The '%20' is for a space between each ingredient
// 	// 	ingredientQuery += newIngredients[key] + '%20';

// 	// }	

// 		console.log("Ingredients for test: " + ingredientQuery);

// 		// Build queryURL for Ajax call
// 		var queryURL = 'https://api.edamam.com/search?q=' + ingredientQuery + '&app_id=' + applicationID + '&app_key=' + receipeSearchAPIKey;

// 		$.ajax({
// 			url:queryURL,
// 			method:"GET"
// 		})
// 		// after data returned
// 		.done(function(response){
// 			console.log(response);

// 			var results = response.hits;
// 			//response.hits[0].recipe.image
// 			//response.hits[0].recipe.url

// 		})
// }


//Function when Recipe card on page 2 is clicked
function recipeCardClicked() {
	console.log("Recipe Card Clicked!");
}



$(".card").on("click", function recipeCardClicked() {
	mainRecipe.preventDefault();

	$("#mainRecipe").

	


})

$(document).ready(function(){
    // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
    $('.modal').modal(function videoPlay() {
		video.preventDefault();
		
		var recipeName = "<p>how to " + string(result[i].recipe.label) + "</p>";
		console.log(userInput)
		$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=AIzaSyD6PlwA6w_Ek0A8IBNNE2rBEkXKXzr2hhE&order=viewCount&q=' + recipeName,
		type: 'GET'
		})
		.done(function(response) {
		console.log("success");
		console.log(response);
		$('.video').html('<iframe width="560" height="315" src="https://www.youtube.com/embed/' + response.items[0].id.videoId + '" frameborder="0" allowfullscreen></iframe>')
		})
		.fail(function() {
		console.log("error");
		});
	});
  });
