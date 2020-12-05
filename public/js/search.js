$(() => {

  $("#search-input").click((event) => {
      event.preventDefault();
      let schoolName = $("#input").val().split(" ").join("%20");
      findSchool(schoolName);
  });

  function findSchool(schoolName) {

      var cscAPI = "https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=rowan%20university&fields=id,school.name,school.locale,location.lat,location.lon,school.school_url,latest.programs.cip_4_digit,latest.cost.avg_net_price.overall,latest.completion.completion_rate_4yr_200nt_pooled,latest.aid.median_debt.completers.overall&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb"

      //"https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=" + schoolName + "&fields=id,school.name,school.locale,location.lat,location.lon,school.school_url,latest.programs.cip_4_digit,latest.cost.avg_net_price.overall,latest.completion.completion_rate_4yr_200nt_pooled,latest.aid.median_debt.completers.overall&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb";

      console.log(cscAPI);
      console.log(schoolName);

      $.ajax({
          url: cscAPI,
          method: "GET"
      }).then((response) => {
          console.log(response);
          //after response I want to: 
          console.log(response.results[0]["school.name"]);
          let instName = response.results[0]["school.name"];
          let instHeader = $("<h1>");
          instHeader.text(instName);
          $(".school-name").append(instHeader);
          // keep for now -> console.log(response.results[0]["latest.programs.cip_4_digit"][100].earnings);
          //append the website of the school
          console.log(response.results[0]["school.school_url"]);
          let instWebsite = response.results[0]["school.school_url"];
          let instLink = $("<a>");
          instLink.attr("href", instWebsite);
          instLink.attr("title", "Institution Website");
          instLink.text("Visit Site");
          instLink.addClass("Link");
          $(".school-site").append(instLink);
          //append the average completion rate of the school
          
          //append the 
        });

  }
});

"https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=rowan%20university&fields=id,school.name,school.locale,location.lat,location.lon,school.school_url,latest.programs.cip_4_digit,latest.cost.avg_net_price.overall,latest.completion.completion_rate_4yr_200nt_pooled,latest.aid.median_debt.completers.overall&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb"
// classes so far:
//school-name
//school-site