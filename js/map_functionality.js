var mymap;
var mapId;
var api = "http://api.openweathermap.org/data/2.5/weather?", latQuery = "lat=", lngQuery = "&lon=", lat = 0, lon = 0, unitsFormat = "&units=metric", apiKey = "&APPID=12017341921d23d6cf61feb2c3143682";
var circles = []; // Use this array to store the created circles
var cvs;
var zoomLevel;
var newZoomLevel;
var icSize = 15;
var playButton;
var osc, env;
var tempMidi
var rainSound;
var rainFader,rainLevel;
var cloudeffect, cloudFreq, cloudfader, cloudRes, cloudgain;
var ton, keydentifier;
var midiTon;
function setup() {




  createCanvas(windowWidth, windowHeight);
   background(0);
   line(0, 0, width, height);

   /*let key1 = createButton("white");
   key1.size(50,200);
   key1.position(0,windowHeight-200);
   key1.mousePressed(playSound)
   key1.mouseReleased(stopSound)*/


mapId = createDiv();
mapId.id("mapid");
mapId.size(windowWidth, windowHeight-200);
mapId.position(0, 0)
mymap = L.map('mapid', {
  preferCanvas: true,
  maxZoom: 18,
  minZoom: 3,
  zoomSnap: 0.5
}).setView([0, 0], 2.5)
mymap.doubleClickZoom.disable();
//Loading tiles from mapbox
var customTiles = L.mapboxGL({
 attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
 accessToken: 'pk.eyJ1Ijoib3NrYXItcXVpcmluLWthY2tlYmFydCIsImEiOiJjazV4b2EyM2UyMWdtM2VtbG0wdzFvM2p2In0.SrMgYWTBUYDq3f703br1aQ',
 style: 'https://api.maptiler.com/maps/c23fe784-9f8d-40de-82e4-0238451aa38c/style.json?key=f4Vpi9EErFczVwoJ8sDW'
}).addTo(mymap);

//  id: 'mapbox/streets-v11',
var southWest = L.latLng(-89.98155760646617, -180),
northEast = L.latLng(89.99346179538875, 180);
var bounds = L.latLngBounds(southWest, northEast);
mymap.setMaxBounds(bounds);
mymap.on('drag', function() {
    mymap.panInsideBounds(bounds, { animate: false });
});

playButton = new L.icon({
      iconUrl: 'images/play-button.png',
      iconSize:     [icSize, icSize], // size of the icon
      popupAnchor:  [-3, -76],  // point from which the popup should open relative to the iconAnchor

  });



markers = L.geoJson(concap, {
  pointToLayer: function (concap, latlng) {
        return L.marker(latlng, {
        icon: playButton,
        riseOnHover: true
      })
    },
     bubblingMouseEvents : false,
  //   onEachFeature: controls
}).addTo(mymap);

/*zoomLevel = mymap.getZoom();
mymap.on("zoomend", function() {
  newZoomLevel = mymap.getZoom();
  if (newZoomLevel>zoomLevel){
    icSize = icSize + ((newZoomLevel-zoomLevel)*5)
    markers.removeFrom(mymap)
    zoomLevel = newZoomLevel;
    playButton.options.iconSize = [icSize,icSize]
    markers.addTo(mymap);
   }
   if (newZoomLevel<zoomLevel){
    icSize = icSize - ((zoomLevel-newZoomLevel)*5)
     markers.removeFrom(mymap)
         zoomLevel = newZoomLevel;
     playButton.options.iconSize = [icSize,icSize]
     markers.addTo(mymap);
    }
});*/
}


/*function controls(feature, markers){
  markers.on({
    mouseover: getData,
    mousedown: playSound,
    mouseup: stopSound
  })
}*/


function draw(){
//background(0);


}



function touchStarted() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }
}
