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



    soundMap.on(
      'load',
      function() {
        soundMap.addSource(
          'points',
          {
            'type': 'geojson',
            'data': concap
          }
        )
      }
    );

    concap.features.forEach(
      function(marker) {
        // create a DOM element for the marker
        var el = document.createElement('div');
        el.className = 'marker';
          // el.style.width = marker.properties.iconSize[20] + 'px';
          // el.style.height = marker.properties.iconSize[20] + 'px';

          // el.addEventListener('click', function() {
          // window.alert(marker.properties.message);
        new mapboxgl.Marker(el)
          .setLngLat(marker.geometry.coordinates)
          .addTo(soundMap);
      }
    );


    soundMap.on("zoom", function() {
      const diameter = (15*(soundMap.getZoom()-1)) + 'px';
      let markers = document.getElementsByClassName('marker');
      console.log(markers);
      for (let marker of markers)
                    {
                     marker.style.height = diameter;
                     marker.style.width = diameter;
                 }
               });


    // document.getElementsByClassName('marker').forEach(
    //           () => {
    //               let newZoomLevel
    //               const diameter = 'calculation'; // replace this
    //               marker.style.height = diameter;
    //               marker.style.width = diameter;
    //           }
    //       );
        // let mapId = sketch.createDiv();
        // mapId.id("mapid");
        // mapId.size(sketch.windowWidth, sketch.windowHeight-200);
        // mapId.position(0, 0)
        // let mymap = L.map('mapid', {
        //     preferCanvas: true,
        //     maxZoom: 18,
        //     minZoom: 3,
        //     zoomSnap: 0.5
        // }).setView([0, 0], 2.5)
        // mymap.doubleClickZoom.disable();
        // //Loading tiles from mapbox
        // var customTiles = L.mapboxGL({
        //     attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">© MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">© OpenStreetMap contributors</a>',
        //     accessToken: 'pk.eyJ1Ijoib3NrYXItcXVpcmluLWthY2tlYmFydCIsImEiOiJjazV4b2EyM2UyMWdtM2VtbG0wdzFvM2p2In0.SrMgYWTBUYDq3f703br1aQ',
        //     style: 'https://api.maptiler.com/maps/c23fe784-9f8d-40de-82e4-0238451aa38c/style.json?key=f4Vpi9EErFczVwoJ8sDW'
        // }).addTo(mymap);
        //
        // //  id: 'mapbox/streets-v11',
        // let southWest = L.latLng(-89.98155760646617, -180),
        // northEast = L.latLng(89.99346179538875, 180);
        // let bounds = L.latLngBounds(southWest, northEast);
        // mymap.setMaxBounds(bounds);
        // mymap.on('drag', function() {
        //     mymap.panInsideBounds(bounds, { animate: false });
        // });
        //
        // let playButton = new L.icon({
        //     iconUrl: 'img/play-button.png',
        //     iconSize:     [15, 15], // size of the icon
        //     popupAnchor:  [-3, -76],  // point from which the popup should open relative to the iconAnchor
        // });
        //
        //
        //
        // let markers = L.geoJson(concap, {
        //     pointToLayer: function (concap, latlng) {
        //         return L.marker(latlng, {
        //             icon: playButton,
        //             riseOnHover: true
        //         })
        //     },
        //     bubblingMouseEvents : false,
        //     //onEachFeature: getData(data)
        // }).addTo(soundMap);

        /*zoomLevel = mymap.getZoom();
        m *ymap.on("zoomend", function() {
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
    };

    sketch.draw = () => {
        //sketch.background(0);
    };
});


function touchStarted() {
    if (getAudioContext().state !== 'running') {
        getAudioContext().resume();
    }
}
