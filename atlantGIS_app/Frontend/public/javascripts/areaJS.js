//code für area.pug

// Variablen erstellen 
let counter = 0;
let layer;
let btn_weiter = document.getElementById('btn_weiter');
let shape;
let shape_for_db;
let rectangle;
var self = this;


// center of the map
var center = [49.845363, 9.905964];
// Create the map
var map = L.map('map').setView(center, 6);

// Set up the OSM layer
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);

// Initialise the FeatureGroup to store editable layers
var editableLayers = new L.FeatureGroup();
map.addLayer(editableLayers);

self.drawControlFull = new L.Control.Draw({
  draw: {
    polyline: false,
    circle: false,
    marker: false,
    polygon: false,
    rectangle: true
}
});

self.drawControlEdit = new L.Control.Draw({
  edit: {
    featureGroup: editableLayers,
    edit: false
  },
  draw: {
    polyline: false,
    circle: false,
    marker: false,
    polygon: false,
    rectangle: false
}
});
map.addControl(drawControlFull);

map.on('draw:created', function(e) {
  var type = e.layerType,
  layer = e.layer;
  layer.setStyle({fillColor: '#FF00FF', color: '#FF00FF'});

  //Entfernt Toolbar nachdem ein Rechteck gezeichnet wurde 
	self.drawControlFull.remove();
	self.drawControlEdit.addTo(map);
  
  //Speichert Geometrieeigenschaften als JSON
  var shape = layer.toGeoJSON();
  var shape_for_db = JSON.stringify(shape);
  console.log(shape_for_db);

  

  editableLayers.addLayer(layer);
  activateDigitalization();
     
});


map.on('draw:deleted', function (e) {
    var deletedLayers = e.layers._layers;
        for (var layer in deletedLayers) {
           console.log(deletedLayers[layer]);
        }
  //Fügt Toolbar wieder hinzu, falls Rechteck gelöscht wird.
	self.drawControlEdit.remove();
	self.drawControlFull.addTo(map);
  deactivateDigitalization();
});



/**
 * After the area got digitialized
 * the "weiter" button should be activated.
 */
function activateDigitalization(){
    if(counter === 0){
        btn_weiter.classList.remove('btn-secondary');
        btn_weiter.classList.remove('disabled');
        btn_weiter.classList.add('btn-primary');
    }
    counter++;
}

/**
 * If the area gets deleted
 * the "weiter" button should be deactivated
 */
function deactivateDigitalization(){
  if(counter != 0){
    btn_weiter.classList.remove('btn-primary');
    btn_weiter.classList.add('btn-primary');
    btn_weiter.classList.add('disabled');
}
counter--;
}

 

//code für trainModel.pug
$(document).ready(function(){
    $('input[type="radio"]').click(function(){
        var inputValue = $(this).attr("value");
        var targetBox = $("." + inputValue);
        $(".box").not(targetBox).hide();
        $(targetBox).show();
    });
});