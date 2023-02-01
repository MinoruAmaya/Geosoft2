//code für area.pug

// Variablen erstellen 
let helpvar = document.getElementById('helpvar')
let counter = 0;
let layer;
let btn_weiter = document.getElementById('btn_weiter');
let loading = document.getElementById('loading');
let site = document.getElementById('site');
let area = document.getElementById('area');
let load = false;
let shape;
let shape_for_db;
let rectangle;
var self = this;


btn_trainMod.addEventListener("click", function () { load = true; loadingFun(); })
btn_untrainMod.addEventListener("click", function () { load = true; loadingFun(); })


switch (Number(helpvar.innerHTML)) {
  case 1:
    addDataToMap("http://localhost:3000/input/satelliteimage.tif", "Satellitenbild");
    break;
  case 2:
    addDataToMap("http://localhost:3000/input/satelliteimage.tif", "Satellitenbild")
    addGeoJSONToMap("http://localhost:3000/input/area.geojson", "Area")
    break;
}

/**
 * add Tiff to Leaflet
 * @param {*} URL 
 * @param {*} name 
 */
function addDataToMap(URL, name) {
  load = true;
  loadingFun();
  fetch(URL)
    .then(response => response.arrayBuffer())
    .then(parseGeoraster)
    .then(georaster => {

      let ranges = georaster.ranges;
      let mins = georaster.mins;
      var layer = new GeoRasterLayer({
        georaster: georaster,
        resolution: 256,
        // Source: https://github.com/GeoTIFF/georaster-layer-for-leaflet/issues/16
        pixelValuesToColorFn: values => {
          return `rgb(${Math.round(((values[0] - mins[0]) / ranges[0]) * 255)},
                        ${Math.round(((values[1] - mins[1]) / ranges[1]) * 255)},
                        ${Math.round(((values[2] - mins[2]) / ranges[2]) * 255)})`
        }
      });
      layer.addTo(map);

      layerCtrl.addOverlay(layer, name);

      map.fitBounds(layer.getBounds());
      map.addControl(drawControlFull);

      load = false
      loadingFun();
    });
};

/**
 * add geoJSON to Leaflet
 * @param {*} URL 
 * @param {*} name 
 */
function addGeoJSONToMap(URL, name) {
  fetch(URL)
    .then(response => response.json())
    .then(data => {
      var layer = L.geoJSON().addTo(map);
      layer.addData(data);
      layerCtrl.addOverlay(layer, name);
    })
}


function loadingFun() {
  if (!load) {
    loading.classList.add("visually-hidden");
    site.style.opacity = "100%";
  }
  else if (load) {
    loading.classList.remove("visually-hidden");
    site.style.opacity = "0.15";
  }
}

// Create the map
var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
  map = new L.Map('map', { center: new L.LatLng(49.845363, 9.905964), zoom: 5 });
let layerCtrl = L.control.layers({
  'osm': osm.addTo(map),
  "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
    attribution: 'google'
  })
})/*, { position: 'topleft', collapsed: false })*/.addTo(map);

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


map.on('draw:created', function (e) {
  var type = e.layerType,
    layer = e.layer;
  layer.setStyle({ fillColor: '#FF00FF', color: '#FF00FF' });

  //Entfernt Toolbar nachdem ein Rechteck gezeichnet wurde 
  self.drawControlFull.remove();
  self.drawControlEdit.addTo(map);

  //Speichert Geometrieeigenschaften als JSON
  var shape = layer.toGeoJSON();
  var shape_for_db = JSON.stringify(shape);

  // save area data in textfield for frontend
  area.value = shape_for_db;
 
 

  editableLayers.addLayer(layer);
  activateDigitalization();

});



//Function to delete drawn Rectangle automatically
L.EditToolbar.Delete.include({
  enable: function () {
    this.options.featureGroup.clearLayers()
    enableDraw();
  }
})

//Edit Toolbar gets activated after Rectangle is deleted
function enableDraw() {
  self.drawControlEdit.remove();
  self.drawControlFull.addTo(map);
  deactivateDigitalization();
}



/**
 * After the area got digitialized
 * the "weiter" button should be activated.
 */
function activateDigitalization() {

  if (counter === 0) {
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
function deactivateDigitalization() {
  if (counter != 0) {
    btn_weiter.classList.remove('btn-primary');
    btn_weiter.classList.add('btn-primary');
    btn_weiter.classList.add('disabled');
  }
  counter--;
}



//code für trainModel.pug
$(document).ready(function () {
  $('input[type="radio"]').click(function () {
    var inputValue = $(this).attr("value");
    var targetBox = $("." + inputValue);
    $(".box").not(targetBox).hide();
    $(targetBox).show();
  });
});