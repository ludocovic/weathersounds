var weather;
var api = "http://api.openweathermap.org/data/2.5/weather?", latQuery = "lat=", lngQuery = "&lon=", lat = 0, lon = 0, unitsFormat = "&units=metric", apiKey = "&APPID=12017341921d23d6cf61feb2c3143682";
var weatherCon;
var popUpWeather;
var temp, tempMidi, tempMollTerz, tempDurTerz;



function getData(e){
  markers = e.target;
    let latT = this.feature.properties.Latitude
    let lngT = this.feature.properties.Longitude
    var url = api + latQuery + latT + lngQuery + lngT + unitsFormat + apiKey;
    fetch(url)
    .then(response =>{
      return response.json()
    }).then(data => {
      weather = data;
        for (weatherCon of weather.weather){
          popUpWeather = weather.name.toString()+"<br />"+weatherCon.description.toString()+"<br />"+ weather.main.temp.toString()+"°C"+"<br />"+"windspeed: "+weather.wind.speed.toString()
        }
        markers.bindPopup()
        markers.setPopupContent(popUpWeather)
        markers.openPopup()
        /*temp = map(weather.main.temp, -30, 40, 36, 83);
        tempMidi = midiToFreq(temp);
        tempMollTerz = midiToFreq(temp +3);
        tempDurTerz = midiToFreq(temp +4);
        tempSept = midiToFreq(temp +7);
        cloudfreq=0;
        cloudres= 0;
        cloudgain = 0;*/
      })

      };
