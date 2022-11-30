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