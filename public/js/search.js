$(document).ready(function() {
  let url = (window.location.href);
  console.log(url);
  let schoolName = url.substring(30);

  console.log(schoolName);
  findSchool(schoolName);


  function findSchool(schoolName) {

      let cscAPI = "https://api.data.gov/ed/collegescorecard/v1/schools.json?school.name=" + schoolName + "&fields=id,school.name,school.locale,location.lat,location.lon,school.school_url,latest.programs.cip_4_digit.counts.ipeds_awards2,latest.programs.cip_4_digit.title,latest.programs.cip_4_digit.credential,latest.cost.avg_net_price.overall,latest.completion.completion_rate_4yr_200nt_pooled,latest.aid.median_debt.completers.overall,latest.earnings.6_yrs_after_entry.median,latest.admissions.admission_rate.overall,latest.admissions.sat_scores.midpoint.critical_reading,latest.admissions.sat_scores.midpoint.writing,latest.admissions.sat_scores.midpoint.math&api_key=hDvhnFr1dwbR1ItiqY6TL9Epf3Isbcd1QHHZq9Sb";

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
          // converting from decimal to percentage
          let percent = {
            style: 'percent'
          
          };
          let formatter = new Intl.NumberFormat("en-US", percent);
          let percentInstRate = formatter.format(instCompRate);
          let instCompRateAppend = $("<p>");
          instCompRateAppend.text(percentInstRate);
          $(".completion-rate").append(instCompRateAppend);

          // append average tuition and fees
          console.log(response.results[0]["latest.cost.avg_net_price.overall"]);
          //converting to dollar amount
          let avgNetPrice = response.results[0]["latest.cost.avg_net_price.overall"];
          let USD = {
            style: "currency",
            currency: "USD"
          
          };
          let usdFormatter = new Intl.NumberFormat("en-US", USD);
          let dollarNetPrice = usdFormatter.format(avgNetPrice);
          let avgPriceAppend = $("<p>");
          avgPriceAppend.text(dollarNetPrice);
          $(".average-price").append(avgPriceAppend);

          // append average debt after graduation
          console.log(response.results[0]["latest.aid.median_debt.completers.overall"]);
          let avgDebt = response.results[0]["latest.aid.median_debt.completers.overall"];
          let avgDebtAppend = $("<p>");
          avgDebtAppend.text(avgDebt);
          $(".average-debt").append(avgDebtAppend);
          
          //append overall admissions rate
          console.log(response.results[0]["latest.admissions.admission_rate.overall"]);
          let allAdmissions = response.results[0]["latest.admissions.admission_rate.overall"]
          let adminFormatter = new Intl.NumberFormat("en-US", percent);
          let percentAdminRate = adminFormatter.format(allAdmissions);
          let instAdminAppend = $("<p>");
          instAdminAppend.text(percentAdminRate);
          $(".admissions-rate").append(instAdminAppend);

          
          //append middle math, writing and critical reading scores
          console.log(response.results[0]["latest.admissions.sat_scores.midpoint.critical_reading"]);
          console.log(response.results[0]["latest.admissions.sat_scores.midpoint.math"]);
          console.log(response.results[0]["latest.admissions.sat_scores.midpoint.writing"]);


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
          //table for top programs
          //define data array
let tabledata = [
  {Program:sortedDegreeArray[0].title,  Level:sortedDegreeArray[0].credential.title, awards:sortedDegreeArray[0].counts.ipeds_awards2},
  {Program:sortedDegreeArray[1].title,  Level:sortedDegreeArray[1].credential.title, awards:sortedDegreeArray[1].counts.ipeds_awards2},
  {Program:sortedDegreeArray[2].title,  Level:sortedDegreeArray[2].credential.title, awards:sortedDegreeArray[2].counts.ipeds_awards2},
  {Program:sortedDegreeArray[3].title,  Level:sortedDegreeArray[3].credential.title, awards:sortedDegreeArray[3].counts.ipeds_awards2},
  {Program:sortedDegreeArray[4].title,  Level:sortedDegreeArray[4].credential.title, awards:sortedDegreeArray[4].counts.ipeds_awards2}, 
  {Program:sortedDegreeArray[5].title,  Level:sortedDegreeArray[5].credential.title, awards:sortedDegreeArray[5].counts.ipeds_awards2},
  {Program:sortedDegreeArray[6].title,  Level:sortedDegreeArray[6].credential.title, awards:sortedDegreeArray[6].counts.ipeds_awards2},
  {Program:sortedDegreeArray[7].title,  Level:sortedDegreeArray[7].credential.title, awards:sortedDegreeArray[7].counts.ipeds_awards2},
  {Program:sortedDegreeArray[8].title,  Level:sortedDegreeArray[8].credential.title, awards:sortedDegreeArray[8].counts.ipeds_awards2},
  {Program:sortedDegreeArray[9].title,  Level:sortedDegreeArray[9].credential.title, awards:sortedDegreeArray[9].counts.ipeds_awards2}
];

//initialize table
let table = new Tabulator("#top-programs-table", {
  data:tabledata, //assign data to table
  autoColumns:true, //create columns from data field names
});         
          //formatting Top Degree Programs for pie chart
          let chartFormDegree1 =  sortedDegreeArray[0].credential.title.concat(" in ", sortedDegreeArray[0].title);
          let chartFormDegree2 =  sortedDegreeArray[1].credential.title.concat(" in ", sortedDegreeArray[1].title);
          let chartFormDegree3 =  sortedDegreeArray[2].credential.title.concat(" in ", sortedDegreeArray[2].title);
          let chartFormDegree4 =  sortedDegreeArray[3].credential.title.concat(" in ", sortedDegreeArray[3].title);
          let chartFormDegree5 =  sortedDegreeArray[4].credential.title.concat(" in ", sortedDegreeArray[4].title);

          let ctx = document.getElementById('myChart').getContext('2d');
          let myChart = new Chart(ctx, {
              type: 'bar',
              data: {
                  labels: ['Average Debt After Completion', 'Average Income 6 Years After Completion'],
                  datasets: [{
                      label: '',
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
                legend: {
                  display: false
                },
                  scales: {
                      yAxes: [{
                          ticks: {
                            callback: function(value, index, values) {
                              return '$' + value;
                          }
                        }
                      }]
                  }
              }
          }); 
          let ctx2 = document.getElementById('myChart2').getContext('2d');
          let myChart2 = new Chart(ctx2, {
            type: 'pie',
            data: {
                labels: [chartFormDegree1, chartFormDegree2, chartFormDegree3, chartFormDegree4, chartFormDegree5,],
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
              legend: {
                display: false
              },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function() {return ""},
                            backdropColor: "rgba(0, 0, 0, 0)"
                        }
                    }]
                }
            }
        });
        let ctx3 = document.getElementById('myChart3').getContext('2d');
        let myChart3 = new Chart(ctx3, {
            type: 'polarArea',
            data: {
                labels: ['Math', 'Writing', 'Critical Reading'],
                datasets: [{
                    label: '',
                    data: [ response.results[0]["latest.admissions.sat_scores.midpoint.math"], response.results[0]["latest.admissions.sat_scores.midpoint.writing"], response.results[0]["latest.admissions.sat_scores.midpoint.critical_reading"]],
                    backgroundColor: [
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)',
                      'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
              legend: {
                display: false
              },
                scales: {
                    yAxes: [{
                        ticks: {
                            callback: function() {return ""},
                            backdropColor: "rgba(0, 0, 0, 0)"
                        }
                    }]
                }
            }
        }); 
        });
  };
});



// classes so far:
//school-name
//school-site
//locale
//completion-rate
//average-price
//average-debt
//average