// Variablen erstellen 
let counter = 0;
let currentLayer;
let currentLabel;
let currentID; 
let trainData = '';

// Leaflet 
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
        currentLayer.setStyle({fillColor: '#FF00FF', color: '#FF00FF'});
        drawnItems.addLayer(currentLayer);
        var type = event.layerType;


        if (type === "polygon") {
          drawnItem = currentLayer;
          drawnItems.addLayer(currentLayer);
          console.log("created polygon");
          // Popup mit verschiedenen Eingabefeldern erstellen
          var popupString = `
            <div class="active-form" id="form_div">
              <div id="form_div_popup"><label class="col-md-4 col-form-label fw-bolder" for="label">Label</label><input class="form-control" id="label" type="text" name="label" /></div>
              <div id="form_div_popup"><label class="col-md-4 col-form-label fw-bolder" for="klassenID">Klassen ID</label><input class="form-control" id="klassenID" type="number" name="klassenID" /></div>
              <div id="form_div_popup"><button class="btn btn-primary mb-2 d-grid gap-2 col-10 mx-auto" id="btn_save">Trainingsdaten speichern </button><span class="text-danger text-center" id="warning"></span></div>
            </div>
          `;
          currentLayer.bindPopup(popupString).openPopup();
          formListenerErstellen();
        }
    });

    map.on('draw:deleted', function (e) {
        var deletedLayers = e.layers._layers;
        for (var layer in deletedLayers) {
           console.log(deletedLayers[layer]);
        }
     });



let navElement = document.getElementById('navbarTrain');
let btn_addData = document.getElementById('btn_addData');
let btn_digitalization = document.getElementById('btn_digitalization');
let in_trainData = document.getElementById('training');
btn_addData.addEventListener('click', function(){addTrainData(); activateDigitalization();})
btn_digitalization.addEventListener('click', function(){/* add here the function to save the data */; window.location="./area"});
navElement.classList.remove('disabled');
navElement.classList.remove('text-white-50');
navElement.classList.add('text-white');

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

function formListenerErstellen(){
  let label = document.getElementById('label');
  let klassenID = document.getElementById('klassenID');
  let btn_save = document.getElementById('btn_save');
  btn_save.addEventListener('click', function(){getNewTrainData(label, klassenID); activateDigitalization();});
}

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
            L.geoJSON(trainData).addTo(map);
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
 * @param {Element} in_label 
 * @param {Element} in_klassenID 
 */ 
function getNewTrainData(in_label, in_klassenID){
    currentLabel = in_label.value;
    currentID = parseInt(in_klassenID.value)
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
};