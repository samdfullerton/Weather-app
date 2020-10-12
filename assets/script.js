
let cityName;
let apiKey = "0124c81271bbe811af6bc4da8a0f7f56"
// let apiKey2 = "463d4ae3285b92cf201f3374fdcb0340"
let humidity;
let uv;
let temp;
let wind;
let icon;
let date;
let timeZone;
let condition;
let cities = "";
localStorage.setItem("cityList", cities);

function getWeather(city){
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  fetch(url)
  .then(data=> {
      return data.json();
  })
  .then(res => {
      console.log(res);
      temp = (res.main.temp - 273.15) * 9/5 + 32;
      humidity = res.main.humidity;
      wind = res.wind.speed;
      condition = res.weather[0].main
      icon = res.weather[0].icon
      timeZone = res.timezone;
      date = new Date()
      cityName = res.name;
      
      return cityName
  })
  .then(res => {
      let newList;
      if(localStorage.getItem("cityList") === ""){
          newList = res;
      } else {
         newList = localStorage.getItem("cityList") + "," + res 
      }
  
   localStorage.setItem("cityList", newList)
      console.log(res)
      addCurrent()
      return
  })
  .then(()=>{
      addCities()
  })
}

function addCities(){
    let cities = localStorage.getItem("cityList").split(",");
     for ( var i = 0; i < cities.length; i++) {
        let anchor = $("<a></a>")
        anchor.text(cities[i])
        anchor.attr("href", "#")
        anchor.addClass("city-link")
        $("#content").append(anchor)

     }
}
function addCurrent(){
    $("#content").empty()
    var h1 = $("<h1></h1>").text(cityName)
    $("#content").append(h1)

    var ptemp = $("<p></p>").text(`Temperature: ${temp.toFixed(0)} F`)
    $("#content").append(ptemp)
    var phumidity = $("<p></p>").text(`Humidity: ${humidity}%`)
    $("#content").append(phumidity)
    var  pwind = $("<p></p>").text(`Wind: ${wind} mph`)
    $("#content").append(pwind)
    var  pcondition = $("<p></p>").text(`Condition: ${condition}`)
    $("#content").append(pcondition)
    // var  picon = $("<img>").attr("src",`https://api.openweathermap.org/data/2.5/weather/${icon}.png`)
    // $("#content").append(picon)
    // var pTimeZone = $("<p></p>").text(`Time Zone: ${timeZone}`)
    // $("#content").append(pTimeZone)
    // var pCityName = $("<p></p>").text(`City Name: ${cityName}`)
    // $("#content").append(pCityName)
}

// eventlisteners in this section
$("#submit").on("click", () => {
 var searchCity = $("#searchUser").val()
  getWeather(searchCity)
  
})


