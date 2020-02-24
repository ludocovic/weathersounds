import 'p5/lib/addons/p5.sound';
import p5 from 'p5';

import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';

import concap from './concap.js';

import { getData } from './get_weatherdata.js';

import mapKeyToTon from './keyboard.js';
import keyPressed from './keyboard.js';
import keyReleased from './keyboard.js';

import playSound from './soundcontrol.js';
import stopSound from './soundcontrol.js';

import './css/style.css';


var api = "http://api.openweathermap.org/data/2.5/weather?", latQuery = "lat=", lngQuery = "&lon=", lat = 0, lon = 0, unitsFormat = "&units=metric", apiKey = "&APPID=12017341921d23d6cf61feb2c3143682";

let p5Instance = new p5(( sketch ) => {
  sketch.setup = () => {
    sketch.createCanvas(sketch.windowWidth, sketch.windowHeight);
    sketch.background(0);
    sketch.line(0, 0, sketch.width, sketch.height);

    let mapId = sketch.createDiv();
    mapId.id("mapid");
    mapId.size(sketch.windowWidth, sketch.windowHeight-200);
    mapId.position(0, 0);

const bounds = [
  [-180, -85],
  [180, 85]
]

    let soundMap = new mapboxgl.Map({
      container: 'mapid',
      center: [0, 0],
      zoom: 2,
      style: 'https://api.maptiler.com/maps/c23fe784-9f8d-40de-82e4-0238451aa38c/style.json?key=f4Vpi9EErFczVwoJ8sDW',
      maxBounds: bounds
    });



    soundMap.on('load', function() {
      soundMap.addSource(
        'points',
        {
          'type': 'geojson',
          'data': concap
        }
      )
    });

    concap.features.forEach(
      function(marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(soundMap)
    });



    document.addEventListener('mousedown', function(event) {
      if (event.target.classList.contains("marker")) {
        resizeMarker(event.target, true);
      }
    });
    soundMap.on('mouseup', function() {
      resizeAllMarkersByZoomLevel(soundMap);
    });


      // const markers = document.getElementsByClassName('marker')
      // for (let marker of markers) {
      //   marker.on('mousedown', function(event) {
      //     resizeMarker(event.target, true);
      //   })
      //   marker.on('mouseup', function(event) {
      //     resizeMarker(event.target, false);
      //   })
      // };


  soundMap.on("zoom", function() {
    resizeAllMarkersByZoomLevel(soundMap);
  });
}

    sketch.draw = () => {
        //sketch.background(0);
    };
});


function touchStarted() {
  if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
  }
}

function resizeMarker(marker, shouldMakeSmaller) {
  const resizeFactor = 0.8;
  const currentSize = parseInt(marker.computedStyleMap().get("height"));
  const newSize = shouldMakeSmaller ? currentSize * resizeFactor : currentSize / resizeFactor;
  marker.style.height = (newSize) + "px";
  marker.style.width = (newSize) + "px";
}

function resizeAllMarkersByZoomLevel(soundMap) {
  const diameter = (15*(soundMap.getZoom()-1)) + 'px';
  let markers = document.getElementsByClassName('marker');
  for (let marker of markers) {
     marker.style.height = diameter;
     marker.style.width = diameter;
  }
}
