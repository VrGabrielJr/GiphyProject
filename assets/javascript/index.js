/*1. Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
  * We chose animals for our theme, but you can make a list to your own liking.

2. Your app should take the topics in this array and create buttons in your HTML.
  * Try using a loop that appends a button for each string in the array.

3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

5. Under every gif, display its rating (PG, G, so on).
  * This data is provided by the GIPHY API.
  * Only once you get images displaying with button presses should you move on to the next step.

6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

7. Deploy your assignment to Github Pages.

8. **Rejoice**! You just made something really cool. 
*/

       $(document).ready(function() {
       
       //-----------------------------
       //----------BUTTONS------------
       //-----------------------------
             // This function handles events where the add movie button is clicked
           $("#addGame").on("click", function(event) {
               event.preventDefault();
               // This line of code will grab the input from the textbox
               var gameName = $("#gaming-input").val().trim();
               // The game from the textbox is then added to our array
               
               if (gameName.length > 0 ) {
               topics.push(gameName);
               // Calling Create which handles the processing of our topics array
               CreateButtons();
               }
           }); 

           // When a Game button is clicked
           $(document.body).on("click", ".games-input", function() {
           var apiKey = "gZG2NENwZbPReJeFIAsHALBe8PcyLuBr";
           var game = $(this).attr("data-name");
           var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + " video game" + "&api_key=" + apiKey;
           console.log(game);

           // Creates AJAX call for the specific game button being clicked
           $.ajax({
           url: queryURL,
           method: "GET"
           }).then(function(response) {
               var results = response.data;

               for (var i = 0; i < 10; i++) {

                   if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                   console.log(response.data[i].images.fixed_height_still.url);
                   var rating = results[i].rating;
                   var p = $("<p>").html("Rating: " + rating);
                   var gameDiv = $("<div>");
                   var gameGif = $("<img>");
                   gameGif.addClass("gifs");
                   gameGif.attr("src", response.data[i].images.fixed_height_still.url);
                   gameGif.attr("data-still", response.data[i].images.fixed_height_still.url);
                   gameGif.attr("data-animate", response.data[i].images.fixed_height.url);
                   gameGif.attr("data-state", "still");
                   gameGif.attr("width","200px");
                   gameGif.attr("height","200px");
               
                   gameDiv.append(p);
                   gameDiv.append(gameGif);
                   $("#games").prepend(gameDiv);
                   
                   }
               }
               console.log(response);
               });
           });

           $(document.body).on("click", ".gifs", function() {
               var state = $(this).attr('data-state');

               if (state === "still") {
                   $(this).attr('src', $(this).attr("data-animate"));
                   $(this).attr('data-state', 'animate');
               }
               else {
                   $(this).attr('src', $(this).attr("data-still"));
                   $(this).attr('data-state', 'still');
           }
           });
       
       //-----------------------------
       //-------END OF BUTTONS--------
       //-----------------------------
       
       //-----------------------------
       //-------FUNCTION CALLS--------
       //-----------------------------
       CreateButtons();

       //-----------------------------
       //----END OF FUNCTION CALLS----
       //-----------------------------
       }); // End of Document.Ready
       
       var topics = ["Overwatch", "Harry Potter", "Portal", "Minecraft", "Roblox", "Pokemon"]

        // Create a Loop to make buttons per item in topics variable
        function CreateButtons() {

           $("#gamingButtons").empty();
           for (var i = 0; i < topics.length; i++) {
           var g = $("<button>");
           g.addClass("games-input");
           g.attr("data-name", topics[i]);
           g.text(topics[i]);
           $("#gamingButtons").append(g);
           }
       }