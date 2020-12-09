$(document).ready(function() {
  let url = (window.location.href);
  console.log(url);
  let schoolName = url.substring(30);

  console.log(schoolName);
  findSchool(schoolName);


  function findSchool(schoolName) {

      var cscAPI = "https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=" + schoolName + "&fields=id,school.name,school.locale,location.lat,location.lon,school.school_url,latest.programs.cip_4_digit.counts.ipeds_awards2,latest.programs.cip_4_digit.title,latest.programs.cip_4_digit.credential,latest.cost.avg_net_price.overall,latest.completion.completion_rate_4yr_200nt_pooled,latest.aid.median_debt.completers.overall,latest.earnings.6_yrs_after_entry.median&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb";

      console.log(cscAPI);
      console.log(schoolName);

      $.ajax({
          url: cscAPI,
          method: "GET"
      }).then((response) => {
          console.log(response);
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
          instLink.attr("alt", "Institution Website");
          instLink.text("Visit Site");
          instLink.addClass("Link");
          $(".school-site").append(instLink);

          //append long & lat  (for use with bing maps api. leaving blank for now.)
          //append locale of the school
          console.log(response.results[0]["school.locale"]);
          let locale = response.results[0]["school.locale"];
          let instLocale;
          switch (locale) {
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
          console.log(response.results[0]["latest.cost.avg_net_price.overall"]);
          let avgNetPrice = response.results[0]["latest.cost.avg_net_price.overall"];
          let avgPriceAppend = $("<p>");
          avgPriceAppend.text(avgNetPrice);
          $(".average-price").append(avgPriceAppend);

          // append average debt after graduation
          console.log(response.results[0]["latest.aid.median_debt.completers.overall"]);
          let avgDebt = response.results[0]["latest.aid.median_debt.completers.overall"];
          let avgDebtAppend = $("<p>");
          avgDebtAppend.text(avgDebt);
          $(".average-debt").append(avgDebtAppend);

          //append average income after x years
          console.log(response.results[0]["latest.earnings.6_yrs_after_entry.median"]);
          let avgIncome = response.results[0]["latest.earnings.6_yrs_after_entry.median"];
          let avgIncomeAppend = $("<p>");
          avgIncomeAppend.text(avgIncome);
          $(".average-income").append(avgIncomeAppend);
          
          //then sort top 10 most awarded programs
          console.log(response.results[0]["latest.programs.cip_4_digit"]);
          let degreeArray = response.results[0]["latest.programs.cip_4_digit"];
          degreeArray.sort((a, b) => parseFloat(b.counts.ipeds_awards2) - parseFloat(a.counts.ipeds_awards2));
          console.log(degreeArray);
          let sortedDegreeArray = degreeArray.slice(0, 10);
          console.log(sortedDegreeArray);
          console.log(sortedDegreeArray[0].counts.ipeds_awards2);
          console.log(sortedDegreeArray[0].credential.title);
          console.log(sortedDegreeArray[0].title);

          let ctx = document.getElementById('myChart').getContext('2d');
          let myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: ['Average Debt', 'Average Income After 6 Years'],
                  datasets: [{
                      label: 'Dollar Amount:',
                      data: [ avgDebt, avgIncome ],
                      backgroundColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(75, 192, 192, 1)'
                      ],
                      borderColor: [
                          'rgba(255, 99, 132, 1)',
                          'rgba(75, 192, 192, 1)',
                      ],
                      borderWidth: 1
                  }]
              },
              options: {
                  scales: {
                      yAxes: [{
                          ticks: {
                              beginAtZero: true
                          }
                      }]
                  }
              }
          }); 
          let ctx2 = document.getElementById('myChart2').getContext('2d');
          let myChart2 = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: [sortedDegreeArray[0].title, sortedDegreeArray[1].title, sortedDegreeArray[2].title, sortedDegreeArray[3].title, sortedDegreeArray[4].title,],
                datasets: [{
                    label: 'Dollar Amount:',
                    data: [ sortedDegreeArray[0].counts.ipeds_awards2, sortedDegreeArray[1].counts.ipeds_awards2, sortedDegreeArray[2].counts.ipeds_awards2,sortedDegreeArray[3].counts.ipeds_awards2,sortedDegreeArray[4].counts.ipeds_awards2, ],
                     backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        });
  }
});



// classes so far:
//school-name
//school-site
//locale
//completion-rate
//average-price
//average-debt
//average