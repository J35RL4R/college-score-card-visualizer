$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var searchInput = $("#search-input");
  var searchSubmit = $("#search-submit")

  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

  // searchSubmit.on("submit", function(event){
  //   event.preventDefault();
  //   let school = {
  //     school: searchInput.val().trim()
  //   };
  // searchSchool(school);
  // });

  // function searchSchool(school){
  //   $.get("search/"+school, function(data){
  //     console.log(data);
  //   });
  // }
});


