
var api = "http://api.openweathermap.org/data/2.5/weather?", latQuery = "lat=", lngQuery = "&lon=", lat = 0, lon = 0, unitsFormat = "&units=metric", apiKey = "&APPID=12017341921d23d6cf61feb2c3143682";
var weatherCon;



function getData(data){
    markers.on("click", function (data){
    let latT = this.feature.properties.Latitude
    let lngT = this.feature.properties.Longitude
    let url = api + latQuery + latT + lngQuery + lngT + unitsFormat + apiKey;
    fetch(url)
    .then(response =>{
      return response.json()
    }).then(data => {
      let weather = data;
        for (weatherCon of weather.weather){
          let popUpWeatherInfo = weather.name.toString()+"<br />"+weatherCon.description.toString()+"<br />"+ weather.main.temp.toString()+"°C"+"<br />"+"windspeed: "+weather.wind.speed.toString()
        }
        return popUpWeatherInfo;
      })
    })
  };
