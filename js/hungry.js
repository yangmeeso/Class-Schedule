// Put our shared code here!

// Counter used to track the new ingredient rows.
// Initialize to "1" here because the original row is row 0 
var newIngredientNameAndRow = 1;

//Place holder for the provided name
var nameProvided = '';


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
var database = firebase.database();



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


		})


}

//  Clear out the values of the 
function resetIngredientRow(){
	// Set New Ingredient row counter back to 1;
	newIngredientNameAndRow = 1;

	// Reset back to just the original name and ingredient row
	var originalRowString = '<div class="input-field col s6"><input id="yourName0" type="text" class="validate"><label for="yourName0">Your Name</label></div><div class="input-field col s6"><input id="ingredient0" type="text" class="validate">	<label for="ingredient0">Ingredient</label></div>';
	$("#ingredientRows").html(originalRowString);
}



//  Shoud push the ingredientObject into firebase
function addNewIngredients(){
	console.log("Feast Button Clicked!");

	
	//initialize ingredientObject
	var ingredientObject = {};

	// Loop to grab Ingredients
	for(var i=0; i < newIngredientNameAndRow; i++){
		// Using the same name each time
		var objNameValue = $("#yourName0").val();
		
		//var objNameValue = nameProvided;
		var objIngredientValue = $("#ingredient"+ i).val();
		
		// "i" added to object name to force name to be unique
		// Handles the use case where same name is entered more than once, overwriting the previous ingredient names
		//  name:ingredient
		ingredientObject[objNameValue + i] = objIngredientValue;
	}


	console.log(ingredientObject);

	// Uncomment to actually call the API
	//edamamAPI(ingredientObject);

	// Uncomment the below to actually push ingredientObject into the 
	database.ref().push(ingredientObject);

	// Reset after hitting feast button
	resetIngredientRow();


}

var queryString ='';
// Populate the rows
database.ref().on("child_added", function(snapshot){
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



// Adds a new line when the #newIngredientButton is pressed
function createIngredientLine(){
	console.log("Another Ingredient Button CLicked!");

	// Create newName div
	var newNameDiv = $("<div>");
	newNameDiv.addClass("input-field col s6");

	var newNameInput = $("<input>");
	newNameInput.attr({"id":"yourName" + newIngredientNameAndRow, "type":"text"});
	newNameInput.addClass("validate");

	var newNameLabel = $("<label>");
	newNameLabel.attr("for", "yourName" + newIngredientNameAndRow);
	newNameLabel.text("Your Name");

	newNameDiv.append(newNameInput, newNameLabel);

	//Make this new div hidden.  Will take space col 6
	newNameDiv.css("visibility","hidden");


	// Create newIngredient div
	var newIngredientDiv = $("<div>");
	newIngredientDiv.addClass("input-field col s6");

	var newIngredientInput = $("<input>");
	newIngredientInput.attr({"id":"ingredient" + newIngredientNameAndRow, "type":"text"});
	newIngredientInput.addClass("validate");

	var newIngredientLabel = $("<label>");
	newIngredientLabel.attr("for", "ingredient" + newIngredientNameAndRow);
	newIngredientLabel.text("Ingredient");

	newIngredientDiv.append(newIngredientInput, newIngredientLabel);


	// Finally append the new row to #ingredientRows
	$("#ingredientRows").append(newNameDiv,newIngredientDiv);


	// Increment the ingredient counter
	newIngredientNameAndRow++;

}



// Button click events
$("#feastButton").on("click", addNewIngredients);
$("#newIngredientButton").on("click", createIngredientLine);
