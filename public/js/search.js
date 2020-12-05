$(function () {

    $("#search-input").click((event) => {
        event.preventDefault();
        let schoolName = $("#input").val();
        findSchool(schoolName);
        $('div').removeClass('hide');
  
  
      })
    function findSchool(schoolName) {
  
      var cscAPI = "https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=" + schoolName; "&fields=latest&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb";
  
      var pokeGif = "https://api.giphy.com/v1/gifs/search?api_key=I4lc5z5Pjva79mvZq3suogFUfDYu5RbM&q=" + schoolName; "&limit=1&offset=0&rating=g&lang=en";
  
      console.log(cscAPI);
      console.log(schoolName);
  
      $.ajax({
        url: cscAPI,
        method: "GET"
      })
  
        .then(function (response) {
        console.log(response);
        });
    
    }
  });
  
  //https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=rowan%20university&fields=id,school.name,school.locale,location.lat,location.lon,school.school_url,latest.programs.cip_4_digit,latest.cost.avg_net_price.overall,latest.completion.completion_rate_4yr_200nt_pooled,latest.aid.median_debt.completers.overall&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb
  