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

//  Declare the sr property of the Window object.  To be later initialized after document load.
window.sr;

// Performs the Reciepe lookup
function edamamAPI(newIngredients){

	var applicationID = "ee864bfc";
	var receipeSearchAPIKey = "bd4299ab0500d03db078800ad8bbd068";
	var ingredientQuery = newIngredients;

	// Dynamicaly build the ingredientQuery by grabbing all ingredients
	// for(var key in newIngredients){
	// 	//  Add each ingredient to the query string
	// 	// The '%20' is for a space between each ingredient
	// 	ingredientQuery += newIngredients[key] + '%20';

	// }	

		console.log("New Ingredients are " + ingredientQuery);

		// Build queryURL for Ajax call
		var queryURL = 'https://api.edamam.com/search?q=' + ingredientQuery + '&app_id=' + applicationID + '&app_key=' + receipeSearchAPIKey;

		$.ajax({
			url:queryURL,
			method:"GET"
		})
		// after data returned
		.done(function(response){
			console.log(response);
			// Limit of the number of result to be displayed.  
			var maxResultsToDisplay = 9;
			var displayCount = 0;

			var results = response.hits;

			// Limits the number of results to be displayed at one time
			if (results.length > maxResultsToDisplay)
			{
				displayCount = maxResultsToDisplay;
			}
			else if(results.length === 0){
				// To many Ingredients, no results.
				// What to do in this case?

			}
			else{
				displayCount = results.length;
			}


			// Clear out old recipe cards results before entering the for loop
			$("#recipesDiv").html('');

			//  Add Message saying no results when too many ingredients.  Instructions to click reset button!
			if(displayCount === 0){
				var noResults = $("<p>");
				noResults.text("No Results, reset!");
				cardColumn = noResults;
				console.log("No Results");
				$("#recipesDiv").html(noResults);
			}


			for (let i = 0; i < displayCount; i++) {

                    //creating and sorting a div tag
                    // var recipes = $("<div>")

                    // var totalCalories = $("<p>").text("Calories " + results[i].recipe.calories);
                    // 	console.log(results[i].recipe.calories);
                    // var servingSize = $("<p>").text("Yields " + results[i].recipe.yield + " Servings");
                    // 	console.log(results[i].recipe.yield);


                    // var recipeImage = $("<img>");

                    // recipeImage.attr("src", results[i].recipe.image);
                    // recipeImage.attr("class", "recipes-Image");
                    // console.log(results[i].recipe.image)
                
                    // recipes.append(totalCalories);
                    // recipes.append(servingSize);
                    // recipes.append(recipeImage);
                    // console.log(recipes);
					// $("#recipesDiv").prepend(recipes);

                    var cardColumn = $("<col>");
					cardColumn.addClass("col s4 m4");

					var cardDiv =  $("<div>");
					cardDiv.addClass("card recipeCard");
					cardDiv.attr("cardRecipeName", results[i].recipe.label);
        	// Needed to grab what modal Id to display.
					cardDiv.attr("data-modalId", '#modal'+i)

					// Moving main-recipe.html re-direct to click recipeCard funtion below
					var cardRef = $("<a>");
					cardRef.attr("href", '#modal' + i);
					cardRef.addClass("modal-trigger");
					//cardRef.attr("target", "_blank");

					var cardImageDiv = $("<div>");
					cardImageDiv.addClass("card-image");

					var cardImage = $("<img>");
					cardImage.attr("src", results[i].recipe.image);
					
					var cardTitleSpan = $("<span>");
					cardTitleSpan.addClass("card-title");
					cardTitleSpan.text(results[i].recipe.label);

					var cardContentDiv = $("<div>");
					cardContentDiv.addClass("card-content");

					var caloriesPerServing = parseInt((results[i].recipe.calories)/(results[i].recipe.yield));

					var caloriesParagraph = $("<p>");
					caloriesParagraph.text('Calories: ' + parseInt(caloriesPerServing));

					var yieldsParagraph = $("<p>");
					yieldsParagraph.text('Yields: ' + results[i].recipe.yield + ' Servings');

					
					// DESPERATION METHOD of BUILDING CARDS (Re-wrote in jQuery (above and below) so Dan will stop laughing at us)
                    // var html = '';

                    // //html += '<div class="row">';
                    // html += '<div class="col s4 m4">';
                    // html += '<div class="card">';
                    // html += '<div class="card-image">';
                    // html += '<img src="' + results[i].recipe.image + '">';
                    
                    // html += '<div class="card-content">';
                    // html += '<p>' + results[i].recipe.label + '</p>';
                    // html += '<p>Calories ' +  parseInt(results[i].recipe.calories) + '</p>';
                    // html += '<p>Yields ' + results[i].recipe.yield + " Servings </p>"
                    // html += '</div></div></div>'

                    // $("#recipesDiv").prepend(html);


                    // Append the divs correctly so the child elements are correct.  To make jQuery not close DIVs early,  need to build the children first (backwards?) then append to Parent DIV.

					//build card image div
					cardImageDiv.append(cardImage, cardTitleSpan)

					//build Card Content Div
					cardContentDiv.append(caloriesParagraph, yieldsParagraph);

					cardRef.append(cardImageDiv, cardContentDiv);

					//build cardDiv
					//cardDiv.append(cardImageDiv, cardContentDiv);
					cardDiv.append(cardRef);

					//finally build column
					cardColumn.append(cardDiv);

					//Recreate this dynamically!!!
					//<div id="modal1" class="modal green-text">
						//<div class="modal-content">
						//<h4>HI!!!!</h4>
						//</div>
					//</div>

					// Creates the modal content!
					var modalDiv = $("<div>");
					modalDiv.attr('id', 'modal' + i);
					//So will always appear on top
					modalDiv.css("z-index", 999);
					modalDiv.addClass("modal green-text");

					var modalContenDiv = $("<div>");
					modalContenDiv.addClass("modal-content");

					////ADD STUFF HERE!!!
					var h4Text = $("<h4>");
					h4Text.text("HI MEESO FROM DIV #" + i);

					

					var caloriesParagraphModal = $("<p>");
					caloriesParagraphModal.text('Calories: ' + parseInt(caloriesPerServing));




					var yieldsParagraphModal = $("<p>");
					yieldsParagraphModal.text('Yields: ' + results[i].recipe.yield + ' Servings');

					var cardImageModal = $("<img>");
					cardImageModal.attr("src", results[i].recipe.image);

					var dailyValueModal = $("<p>");
					var dailyValueModalDecimal = parseInt(caloriesPerServing)/2200;
					var dailyValueModalPercent = parseInt(dailyValueModalDecimal * 100);
					dailyValueModal.text('Daily Value: ' + dailyValueModalPercent + '%');

					var instructionButton = $("<a>");
					instructionButton.text("Instructions");
					instructionButton.addClass("btn");
					instructionButton.attr("href", results[i].recipe.url);

					var videoButton = $("<a>");
					videoButton.text("Video");
					videoButton.addClass("btn modal-trigger modalButtonClass");
					videoButton.attr("href", "#modal99");
					//videoButton.attr("id", "modalButton");


					var ingredientDiv = $("<div>");
					ingredientDiv.addClass("ingredientModal");
					var ingredientDivTitle = $("<h4>"); 
					ingredientDivTitle.text("Ingredients");
					ingredientDiv.append(ingredientDivTitle); 

					for (var l = 0; l < results[i].recipe.ingredientLines.length; l++){
						var ingredientLine = $("<p>");
						//console.log ("Ingredient Line" + l + "is " + results[i].recipe.ingredientLines[l]);
						ingredientLine.text(results[i].recipe.ingredientLines[l]);
						ingredientDiv.append(ingredientLine);

					}



					modalContenDiv.append(cardImageModal,ingredientDiv, yieldsParagraphModal, caloriesParagraphModal, dailyValueModal,instructionButton, videoButton);
					// ADD STUFF ABOVE

					//Footer with the close button
					var modalFooterDiv = $("<div>");
					var closeButton = $("<button>");
					closeButton.addClass("modal-action modal-close waves-effect waves-green btn-flat");
					closeButton.attr("id", "closeButton");
					closeButton.text("Close");
					modalFooterDiv.append(closeButton);


					modalDiv.append(modalFooterDiv, modalContenDiv);

					
					// Add new cards
          $("#recipesDiv").prepend(cardColumn, modalDiv);
        
        }
          sr.sync();

		})


}

//console.log(cardRecipeName);




var queryString ='';
// Populate the rows
database2.ref().on("child_added", function(snapshot){
	console.log(snapshot.val());
	//console.log(Object.keys(snapshot.val()));

	// "For each loop" to populate the ingredient rows every one contributes
	// snapshot.forEach(function(child){
	// 	console.log("FOR LOOP");
	// 	var nameFirebase = snapshot.val().Object.keys(child);
	// 	var ingredientFirebase = child.val();
		
	// 	console.log("Firebase Name " + nameFirebase);
	// 	console.log("IngredientName " + ingredientFirebase);
	// });
	

	for(var key in snapshot.val()){
		console.log(key);
		var nameRow = key;
		var ingredientValue = snapshot.val()[key];
		queryString += ingredientValue + '%20';

		nameRow = nameRow.substring(0, nameRow.length - 1);
		console.log(nameRow)
		console.log(ingredientValue);



		var newRow = $("<tr>");
		var newNameColumn = $("<td>");
		newNameColumn.text(nameRow);

		var newIngredientColumn = $("<td>");
		newIngredientColumn.text(ingredientValue);

		newRow.append(newNameColumn,newIngredientColumn);
		$("#ingredientsTable").append(newRow);

	}


	//var queryString ='';
	edamamAPI(queryString);


})

//Reset Firebase database
$("#resetButton").on("click", resetFirebase);

function resetFirebase(){
    database2.ref().remove();
    console.log("Firebase Database Reset!");
}

// function recipeCardClicked(event) {
// 	event.preventDefault();
// 	console.log("Chosen card number: " + blogURL);	
// 	var recipeBlog = $("<div>").attr("href", blogURL);

// 	$("#mainRecipe").append(recipeBlog); 
// };

// $(document.body).on("click", ".recipeCard", function() {
// 	recipeCardClicked();
//   });


$('.modal').modal({
	dismissible: true, // Modal can be dismissed by clicking outside of the modal
	opacity: .5, // Opacity of modal background
	inDuration: 300, // Transition in duration
	outDuration: 200, // Transition out duration
	startingTop: '4%', // Starting top style attribute
	endingTop: '4%', // Ending top style attribute
  }
);

function playVideo(event) {
	event.preventDefault();
	//var test = ["tomato", "cheese", "pesto"]
	// Pulls the recipe name from local storage and used for YouTube search term.
	console.log("I AM HERE@!!!!!!!");
	$("#modal99").css("display", "block");
	

	var searchTerm = localStorage.getItem("recipeLabelName");

	var ytAPIKey = 'AIzaSyD6PlwA6w_Ek0A8IBNNE2rBEkXKXzr2hhE';
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=' + ytAPIKey + '&maxResults=20&videoEmbeddable=true&relevanceLanguage=en&q=' + searchTerm,
		type: 'GET'
	  })
	  .done(function(response) {
		console.log("video upload success");
		var videoDiv = $('<div class="videoDiv">');
		videoDiv.append('<iframe width="1102" height="620" src="https://www.youtube.com/embed/' + response.items[0].id.videoId + '" frameborder="0" allowfullscreen></iframe>')
		$('.video-container').append(videoDiv);
		// $('.video-container').html('<iframe width="1102" height="620" src="https://www.youtube.com/embed/' + response.items[0].id.videoId + '" frameborder="0" allowfullscreen></iframe>')
	  })
	  .fail(function() {
		console.log("video error");
	  });
}

// $("#modalButton").on("click", playVideo); // Needs to link to Firebase
$(".modalButtonClass").on("click", playVideo); // Needs to link to Firebase

$(document).on("click", "#closeButton", function() {
	$(".video-container").empty();
	$("#modal1").css("display", "none");
	console.log("video closed")
})



// function goToMainRecipe(){

// 	var recipeNameForMainRecipePage = $(this).attr("cardRecipeName");
// 	console.log($(this).attr("cardRecipeName"));
// 	localStorage.setItem("recipeLabelName", recipeNameForMainRecipePage);


// // 	// Actually open a new tab for Main-Recipe.html
// // 	window.open("main-recipe.html",'_blank');
// }

// $(document).on('click', '.recipeCard', goToMainRecipe);
//disable redirect since trying to utilize modal
//$(document).on('click', '.recipeCard', goToMainRecipe);

var modalTarget;
function displayBigRecipeModal(){
	var recipeNameForMainRecipePage = $(this).attr("cardRecipeName");
	localStorage.setItem("recipeLabelName", recipeNameForMainRecipePage);


	console.log("Modal id is " + $(this).attr("data-modalId"));
	modalTarget = $(this).attr("data-modalId");
// 	$(modalTarget).modal({
// 	dismissible: true, // Modal can be dismissed by clicking outside of the modal
// 	opacity: .5, // Opacity of modal background
// 	inDuration: 300, // Transition in duration
// 	outDuration: 200, // Transition out duration
// 	startingTop: '4%', // Starting top style attribute
// 	endingTop: '4%', // Ending top style attribute
//   }
// );
	$(modalTarget).css("display", "block");


}

$(document).on('click', '.recipeCard', displayBigRecipeModal);


function closeModal(){
	$(modalTarget).css("display", "none");
}


$(document).on("click", "#closeButton", closeModal);





$( document ).ready(function() {
	console.log( "document loaded" );
	//  Wait until document loaded before initializing Scroll Reveal object.
	sr = ScrollReveal({reset:true});
	//  Bind reveal animation to the recipeCard class
	sr.reveal('.recipeCard',{opacity:0.2,duration:3000});
	console.log("Scroll Reveal loaded");
});
 