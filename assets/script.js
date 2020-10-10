
let cityName;
let apiKey = "463d4ae3285b92cf201f3374fdcb0340"
let humidity;
let uv;
let temp;
let wind;
let icon;
let date;
let timeZone;


function getWeather(city){
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

  fetch(url)
  .then(data=> {
      return data.json();
  })
  .then(res => {
      console.log(res);
      temp = res.main.temp;
      humidity = res.main.humidity;
      wind = res.wind.speed;
      timeZone = res.timezone;
      date = new Date()
      cityName = res.name;
      return cityName
  })
  .then(res => {
      console.log(res)
      addContent()
  })
}

function addContent(){
    var h1 = $("<h1></h1>").text(cityName)
    $("#content").append(h1)

    var ptemp = $("<p></p>").text(`Temperature: ${temp}`)
    $("#content").append(ptemp)
    var phumidity = $("<p><p>").text(`Humidity: ${humidity}`)
    $("#content").append(phumidity)
    var  pwind = $("<p><p>").text(`Wind: ${speed}`)
    $("#content").append(pwind)
    var pTimeZone = $("<p><p>").text(`Time Zone: ${timezone}`)
    $("content").append(pTimeZone)
    var pCityName = $("<p><p>").text(`City Name: ${name}`)
    $("content").append(pCityName)
}

// eventlisteners in this section
$("#submit").on("click", () => {
 var searchCity = $("#searchUser").val()
  getWeather(searchCity)
  
})


