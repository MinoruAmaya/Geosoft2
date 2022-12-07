let navElement = document.getElementById('navbarTrain');
let btn_trainData = document.getElementById('btn_trainData');
let btn_save = document.getElementById('btn_save');
let btn_digitalization = document.getElementById('btn_digitalization');
let in_trainData = document.getElementById('training');
let in_label = document.getElementById('label');
let in_klassenID = document.getElementById('klassenID');
btn_trainData.addEventListener('click', function(){addTrainData(); activateDigitalization();})
btn_save.addEventListener('click', function(){getNewTrainData(); activateDigitalization(); clearInputs();});
btn_digitalization.addEventListener('click', function(){/* add here the function to save the data */; window.location="./area"});
navElement.classList.remove('disabled');
navElement.classList.remove('text-white-50');
navElement.classList.add('text-white');
let counter = 0;
let currentLayer;
let currentLabel;
let currentID; 
let trainData = '';
let style = function (feature) {
    switch (feature.properties.Label) {
      case "See":
        return { color: "#0a1cb1" };
      case "Siedlung":
        return { color: "#e57423" };
      case "FLiessgewaesser":
        return { color: "#23c3e5" };
      case "Laubwald":
        return { color: "#2aa43d" };
      case "Mischwald":
        return { color: "#11671e" };
      case "Gruenland":
        return { color: "#92e597" };
      case "Industriegebiet":
        return { color: "#696969" };
      case "Acker_bepflanzt":
        return { color: "#70843a" };
      case "Offenboden":
        return { color: "#472612" };
    }
  };
// functions
/**
 * After the first train Data got digitialized
 * the "Weiter" button should be activated
 */
function activateDigitalization(){
    if(counter === 0){
        btn_digitalization.classList.remove('btn-secondary');
        btn_digitalization.classList.remove('disabled');
        btn_digitalization.classList.add('btn-primary');
    }
    counter++;
}
/**
 * Adds the trainData that was uploaded
 * to the Data and to the map
 */
function addTrainData(){
    if(trainData === ''){
        var reader = new FileReader();
        reader.onload = (event) => {
            trainData = JSON.parse(event.target.result);
            L.geoJSON(trainData, {
                style: style
              }).addTo(map)
        };
        reader.readAsText(in_trainData.files[0]);
    }
    else{
        return;
    }
}
/**
 * Creates an geoJSON Object with the 
 * given properties or adds the newly 
 * added trainData to the given geoJSON
 */
function getNewTrainData(){
    currentLabel = in_label.value;
    currentID = parseInt(in_klassenID.value);
    var coordinates = [[[]]];
    for(var i = 0; i < currentLayer._latlngs[0].length; i++){
        coordinates[0][0].push([currentLayer._latlngs[0][i].lng , currentLayer._latlngs[0][i].lat])
    };
    if (trainData === ''){
        trainData = {
            "type" : "FeatureCollection",
            "features" : [{ 
                "type" : "Feature", 
                "properties" : {  
                    "Label" : currentLabel, 
                    "ClassID" : currentID
                }, 
                "geometry" : { 
                    "type" : "MultiPolygon", 
                    "coordinates" : coordinates
                }
            }]
        }
    }
    else{
        var newSpot = trainData.features.length
        trainData.features[newSpot] = {
            "type" : "Feature", 
                "properties" : {  
                    "Label" : currentLabel, 
                    "ClassID" : currentID
                }, 
                "geometry" : { 
                    "type" : "MultiPolygon", 
                    "coordinates" : coordinates
                }
        }
    }
    map.removeLayer(currentLayer)
    L.geoJSON(trainData, {
        style: style
      }).addTo(map)
}
/**
 * Clear out the input fields,
 * so you can add a new data
 */
function clearInputs(){
    in_label.value = '';
    in_klassenID.value = '';
}

/*
//Leaflet & Leaflet-Draw
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
            osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
            map = new L.Map('map', { center: new L.LatLng(49.845363, 9.905964), zoom: 5 }),
            drawnItems = L.featureGroup().addTo(map);
    L.control.layers({
        'osm': osm.addTo(map),
        "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'google'
        })
    }, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
    map.addControl(new L.Control.Draw({
        edit: {
            featureGroup: drawnItems
        },
        draw: {
            polyline: false,
            circle: false,
            marker: false,
            polygon: true,
            rectangle: false
        }
    }));
    map.on(L.Draw.Event.CREATED, function (event) {
        currentLayer = event.layer;
        drawnItems.addLayer(currentLayer);
    });
    map.on('draw:deleted', function (e) {
        var deletedLayers = e.layers._layers;
        for (var layer in deletedLayers) {
           console.log(deletedLayers[layer]);
        }
     });
   */  

// Option 2

/*
// Map center
var center = [-32.692825, -62.104689];

// Map creation
var map = L.map('map').setView(center, 14);

// Map tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Initialise the FeatureGroup to store editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

// Draw plugin options
var drawPluginOptions = {
  position: 'topleft',
  draw: {
    polygon: {
      allowIntersection: false, // Restricts shapes to simple polygons
      drawError: {
        color: '#e1e100', // Color the shape will turn when intersects
        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
      },
      shapeOptions: {
        color: '#97009c'
      }
    },
    // disable toolbar item by setting it to false
    polyline: false,
    circle: false, // Turns off this drawing tool
    rectangle: false,
    marker: false,
  },
  edit: {
    featureGroup: editableLayers,
    polygon: {
      allowIntersection: false
    } //REQUIRED!!
  }
};

// Initialise the draw control and pass it the FeatureGroup of editable layers
var drawControl = new L.Control.Draw(drawPluginOptions);
map.addControl(drawControl);

var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

var template = '<form id="popup-form">\
  <label for="input-speed">New speed:</label>\
  <input id="input-speed" class="popup-input" type="number" />\
  <button id="button-submit" type="button">Save Changes</button>\
</form>';

var createdPolygonTemplate = '<form id="popup-form">\
   <label for="input-speed">Name:</label>\
   <input id="name" type="text" />\
</form>';

// draw created event handler
function polygonCreateHandler(e) {

  var type = e.layerType;
  var layer = e.layer;

  if (type != 'polygon') {
    alert("ESTO NO ES UN POLIGONO");
    return;
  }

  editableLayers.addLayer(layer);

  layer.bindPopup(createdPolygonTemplate).openPopup()
}

// draw created event

map.on('draw:created', function(e) {
  polygonCreateHandler(e);
});

//Ignore this

/*jshint multistr: true */


/*
** fetch geojson example
let geojson_url = "https://raw.githubusercontent.com/delineas/leaflet-flyto-webpack-bulma/master/src/data/arboles_singulares_en_espacios_naturales.geojson"
fetch(
  geojson_url
).then(
  res => res.json()
).then(
  data => {
    let geojsonlayer = L.geoJson(data, {
      onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties['arbol_nombre'])
        layer.setIcon(treeMarker)
      }
    }).addTo(map) 
    map.fitBounds(geojsonlayer.getBounds())
  }
)

** layer polygon example

var geojson_msjz_polygon = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": { "name": "Test Distrito electoral"},
      "geometry": {
        "type": "Polygon",
        "coordinates": [
          [
            [
              -62.103266716003425,
              -32.687209099455636
            ],
            [
              -62.13047504425048,
              -32.68211618935444
            ],
            [
              -62.133564949035645,
              -32.693746380985395
            ],
            [
              -62.106142044067376,
              -32.698838627713116
            ],
            [
              -62.103266716003425,
              -32.687209099455636
            ]
          ]
        ]
      }
    }
  ]
};

let geojsonlayer = L.geoJson(geojson_msjz_polygon, {
      onEachFeature: function(feature, layer) {
        let text = L.tooltip({
          permanent: true,
          direction: 'center',
          className: 'text'
        })
        .setContent(feature.properties.name)
        .setLatLng(layer.getBounds().getCenter());
        text.addTo(map);
      }
    }).addTo(map);

map.fitBounds(geojsonlayer.getBounds())
*/


// Option 3
/*
var map = L.map('map', {
    center: [18.9, -71.2],
    zoom: 8,
});
const tileURL = 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
L.tileLayer(tileURL).addTo(map);

drawnItems = L.featureGroup().addTo(map);
var drawControl = new L.Control.Draw({
    draw: {
        polyline: false,
        circle: false,
        marker: false,
        polygon: true,
        rectangle: false
    },
    edit: {
        featureGroup: drawnItems,
    },
});

var getData = function(layer) {
    var label = prompt('please, enter the geometry label', 'geometry label');
    var classID = prompt('please, enter the geometry classID', 'geometry id');
    return label, classID;
};

map.addControl(drawControl);
map.on(L.Draw.Event.CREATED, function(e) {
    var layer = e.layer; 
    var trainData = getData(layer);
    if (trainData == 'geometry label' || trainData == 'geometry id') {
        layer.bindPopup('-- no data provided --');
    } else if (trainData == '' || trainData == '') {
        layer.bindPopup('-- no data provided --');
    } else {
        layer.bindTooltip(trainData, {permanent:true, direction:'top'})
    };
    drawnItems.addLayer(layer);
    console.log(trainData)
});
*/

//Option 4 

/** Class containing all methods for handling the map display on page */
class MapInterface {
    constructor(params) {
      //initialise the map view from the given coordinates
      if (params.mapid === undefined ||
        params.baseMap === undefined ||
        params.baseMap.tileLayer === undefined
      ) {
        console.log("couldn't initialise map-interface. invalid parameters");
        return false;
      }
      
      let mapid = params.mapid;
      let view = params.view || [0, 0];
      let zoom = params.zoom || 6;
      let baseMap = params.baseMap;
      
  
      this.map = L.map(mapid).setView(view, zoom);
  
      //add basemaps
      this.baseMapLayer = L.tileLayer(
        baseMap.tileLayer, {
        maxZoom: baseMap.maxZoom || 15,
        attribution: baseMap.attribution || ""
      }
      );
      this.baseMapLayer.addTo(this.map);
  
      this.drawnItem = false;
      this.drawnItems = new L.FeatureGroup().addTo(this.map);
  
      this.addDrawControls();
      this.addDrawEvents();
  
    }
  
    /**
    * @desc function adds leaflet Draw draw controls to the map
    */
    addDrawControls() {
      this.drawControl = new L.Control.Draw({
        draw: {
          polyline: false,
          marker: false,
          circle: false,
          rectangle: false,
          circlemarker: false,
        },
        edit: {
          featureGroup: this.drawnItems
        }
      });
      this.map.addControl(this.drawControl);
    }
  
    /**
    * @desc function adds leaflet Draw Events.
    */
   addDrawEvents() {
      let drawnItems = this.drawnItems;
      let mapInterface = this;
      this.map.on(L.Draw.Event.CREATED, function (e) {
        var type = e.layerType;
        var layer = e.layer;
        
        //Speichert Geometrieeigenschaften als JSON
        var shape = layer.toGeoJSON()
        var shape_for_db = JSON.stringify(shape);
        console.log(shape_for_db)
      

        if (type === "polygon") {
          this.drawnItem = layer;
          drawnItems.addLayer(layer);
          console.log("created polygon");
          // Popup mit verschiedenen Eingabefeldern erstellen
          var popupString = `
            <form name="createTrainData" onsubmit="return addTrainData()">
              <input id="label" name="label" value="" placeholder="label">
              <input id="classID" name="classID" value="" placeholder="classID">
              <input type="submit" value="Submit">
            </form>
          `;
          layer.bindPopup(popupString).openPopup();
        }
    
      });
      }
  }

  
  mainMapInterface = new MapInterface(
    {
      mapid: "map",
      view: [54.508, 7.5],
      zoom: 3.5,
      baseMap: {
        tileLayer: 'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
        maxZoom: 18,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    }
  );