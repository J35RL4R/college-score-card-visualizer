$(() => {

  $("#search-input").click((event) => {
      event.preventDefault();
      let schoolName = $("#input").val().split(" ").join("%20");
      findSchool(schoolName);
  });

  function findSchool(schoolName) {

      var cscAPI = "https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=rowan%20university&fields=id,school.name,school.locale,location.lat,location.lon,school.school_url,latest.programs.cip_4_digit.counts.ipeds_awards2,latest.programs.cip_4_digit.title,latest.programs.cip_4_digit.credential,latest.cost.avg_net_price.overall,latest.completion.completion_rate_4yr_200nt_pooled,latest.aid.median_debt.completers.overall&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb"

      //"https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=" + schoolName + "&fields=id,school.name,school.locale,location.lat,location.lon,school.school_url,latest.programs.cip_4_digit,latest.cost.avg_net_price.overall,latest.completion.completion_rate_4yr_200nt_pooled,latest.aid.median_debt.completers.overall&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb";

      console.log(cscAPI);
      console.log(schoolName);

      $.ajax({
          url: cscAPI,
          method: "GET"
      }).then(function (response) {
      console.log(response)
      //after response I want to:
      //append school name 
      console.log(response.results[0]["school.name"]);
      let instName = response.results[0]["school.name"];
      let instHeader = $("<h1>");
      instHeader.text(instName);
      $(".school-name").append(instHeader);
      
      //append the website of the school
      console.log(response.results[0]["school.school_url"]);
      let instWebsite = response.results[0]["school.school_url"];
      let instLink = $("<a>");
      instLink.attr("href", instWebsite);
      instLink.attr("title", "Institution Website")
      instLink.text("Visit Site")
      instLink.addClass("Link");
      $(".school-site").append(instLink)
      
      //append long & lat  (for use with bing maps api. leaving blank for now.)

      //append locale of the school
      console.log(response.results[0]["school.locale"])
      let locale = response.results[0]["school.locale"]
      let instLocale
      switch(locale){
        case 11:
        case 12:
        case 13:
        instLocale = "City";
        break;
        case 21:
        case 22:
        case 23:
        instLocale = "Suburb";
        break;
        case 31:
        case 32:
        case 33:
        instLocale = "Town";
        break;
        case 41:
        case 42:
        case 43:
        instLocale = "Rural";
        break;   
      };
      instLocaleAppend = $("<p>");
      instLocaleAppend.text(instLocale);
      $(".locale").append(instLocaleAppend);

      //append the average completion rate of the school
      console.log(response.results[0]["latest.completion.completion_rate_4yr_200nt_pooled"]);
      let instCompRate = response.results[0]["latest.completion.completion_rate_4yr_200nt_pooled"];
      let instCompRateAppend = $("<p>");
      instCompRateAppend.text(instCompRate);
      $(".completion-rate").append(instCompRateAppend);
     
      // append average tuition and fees
      console.log(response.results[0]["latest.cost.avg_net_price.overall"])
      let avgNetPrice = response.results[0]["latest.cost.avg_net_price.overall"];
      let avgPriceAppend = $("<p>");
      avgPriceAppend.text(avgNetPrice);
      $(".average-price").append(avgPriceAppend);
      
      // append average debt after graduation
      console.log(response.results[0]["latest.aid.median_debt.completers.overall"])
      let avgDebt = response.results[0]["latest.aid.median_debt.completers.overall"];
      let avgDebtAppend = $("<p>");
      avgDebtAppend.text(avgDebt);
      $(".average-debt").append(avgDebtAppend);

      //append average income after x years
      
      //then sort top 10 most awarded programs
      console.log(response.results[0]["latest.programs.cip_4_digit"]);
      let degreeArray = response.results[0]["latest.programs.cip_4_digit"]
      degreeArray.sort((a, b) => parseFloat(b.counts.ipeds_awards2) - parseFloat(a.counts.ipeds_awards2));
      console.log(degreeArray);
      let sortedDegreeArray = degreeArray.slice(0,5);
      console.log(sortedDegreeArray);
      console.log(sortedDegreeArray[0].counts.ipeds_awards2);
      console.log(sortedDegreeArray[0].credential.title);
      console.log(sortedDegreeArray[0].title);
      });

  }
});

"https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=rowan%20university&fields=id,school.name,school.locale,location.lat,location.lon,school.school_url,latest.programs.cip_4_digit,latest.cost.avg_net_price.overall,latest.completion.completion_rate_4yr_200nt_pooled,latest.aid.median_debt.completers.overall&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb"
// classes so far:
//school-name
//school-site
//locale
//completion-rate
//average-price
//average-debt