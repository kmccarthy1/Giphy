
var foodArray = ["Lasagna", "Linguini", "Carbonara", "Meatballs", "Bratwurst", "Sauerkraut", "Potatoes", "Dumplings", "Stir-Fry", "Waffles", "Quesadillas", "Cinnamon Rolls", "Muffins"];

// Function for displaying initial data
function renderButtons() {

    // (this is necessary otherwise will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through array
    for (var i = 0; i < foodArray.length; i++) {
      
        var b = $("<button class='btn btn-info'>");
     
        b.addClass("food-btn");
        b.attr("data-name", foodArray[i]);
        b.text(foodArray[i]);
        
        $("#buttons-view").append(b);
    }
};    
  
// displayRatingInfo function re-renders the HTML to display the appropriate content
function displayRatingInfo() {

    var h = $(this).attr('data-name');
    let giphykey = "GI1pI1MGLn9asxU97K9yx3v7WJDl107W";
    // console.log(this);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + h + "&api_key=" + giphykey + "&limit=10";
    // console.log(queryURL);
    // Creating an AJAX call for the specific hero button being clicked
    $.ajax({
        url:queryURL, 
        method: 'GET'
    }).then(function(response) {
        var results = response.data;
        // console.log(results);

        $('#food-view').empty();

            for(var i=0; i < results.length; i++) {
            // Creating a div to hold the heroes-form
                var foodDiv = $("<div class='foodH'>"); 
                var rating = results[i].rating;
                // console.log(rating);
                var p = $("<p>").text("Rating: " + rating);
                var foodImage = $("<img>");

                foodImage.attr("src", results[i].images.fixed_height_still.url);
                foodImage.attr("data-still", results[i].images.fixed_height_still.url);
                foodImage.attr("data-animate", results[i].images.fixed_height.url);
                foodImage.attr("data-state", "still")
                foodImage.attr("class", "pause")

                foodDiv.prepend(p);
                foodDiv.prepend(foodImage);

                $('#food-view').prepend(foodDiv);

                // $('#food-view').prepend("<p>Rating: " + response.data[i].rating + "</p>");
                // $('#food-view').prepend("<img src='" + response.data[i].images.fixed_width_still.url + "'>");
            }
        });
};

// $('#buttons-view').on('click', '.gif', displayRatingInfo) 

// This function handles events when the submit button is clicked
$('#add-food').on('click', function(event) {
    // alert("Button Clicked!");

    // event.preventDefault() prevents the form from trying to submit itself.
    // We're using a form so that the user can hit enter instead of clicking the button if they want
    event.preventDefault();

    // This line will grab the text from the input box
    var food = $("#food-input").val().trim();
    // console.log(hero);

    // The superhero entered from the textbox is then added to our array
    foodArray.push(food);

    // Putting the entire form above the previous gifs
    // $("#heroes-form").prepend(heroesDiv);

    // calling renderButtons which handles the processing of our superHeroes array
    renderButtons();
});

$('#food-view').on('click', '.pause', function() {
    // alert("button clicked!")
   // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
   var state = $(this).attr("data-state");
//    console.log(state);
   // If the clicked image's state is still, update its src attribute to what its data-animate value is.
   // Then, set the image's data-state to animate
   // Else set src to the data-still value
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
 });

// ================EVENTS=================================
// $(document).on('click', '#add-hero');

// Added a click event listener to all elements with a class of "hero-btn"
$(document).on('click', '.food-btn', displayRatingInfo);


// calling the renderButtons function
renderButtons();
