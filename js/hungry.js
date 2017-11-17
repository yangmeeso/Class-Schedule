// Put our shared code here!











function edamamAPI(newIngredients){

	var applicationID = "ee864bfc";
	var receipeSearchAPIKey = "bd4299ab0500d03db078800ad8bbd068";
	var ingredientQuery = '';

	for(var key in newIngredients){
		//  Add each ingredient to the query string
		// The '%20' is for a space between each ingredient
		ingredientQuery += newIngredients[key] + '%20';

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


		})
	}

}






function addNewIngredients(){
	console.log("Feast Button Clicked!");

	

	// assign new ingredient 
	var newIngredientName1 =$("#ingredient1").val();
	console.log(newIngredientName1);

	// clear out the form text fields to be ready for the next input
	$("#ingredient1").val("");
	$("#yourName").val("");

	// Crate object to be pushed into firebase
	var ingredientObject = {
		ingredient1:newIngredientName1
	}

	console.log(ingredientObject);


	edamamAPI(ingredientObject);

}





$("#feastButton").on("click", addNewIngredients)