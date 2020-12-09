$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var searchInput = $("#search-input");
  var searchSubmit = $("#search-submit")

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  searchSubmit.on("click", function(event){
    event.preventDefault();
    let school = searchInput.val().trim();

    $.get("results/:school", function(data){
      
    }).then(function(data){
      window.location.replace("/results/:school")
    }).catch(function(err){
      console.log(err);
    })
  });


});


