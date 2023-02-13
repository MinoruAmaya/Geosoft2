2//Das sind Beispieldaten um Layer hinzuzufügen 
//Müssen anhand der AOA, Klassifikation,.... ersetzt werden sobald sie berechnet wurden.
//Für Traindata liegt kein Beispieldatensatz vor weshalb nichts passiert.

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


  let loading = document.getElementById('loading');
  let site = document.getElementById('site');
  let message = document.getElementById('message');
  let noData = document.getElementById('noData');

selId = null;

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

  function addDataToMap(URL, name, call, type) {
    load = true;
    loadingFun();
    fetch(URL)
      .then(response => response.arrayBuffer())
      .then(parseGeoraster)
      .then(georaster => {
        if (name == "Klassifikation") { // Klassifikation
          // Calculate count of classification classes. Initalize array.
          //var count = georaster.maxs - georaster.mins;
          let colorArray = ['#28ae80','#addc30','#3b528b','#59157e', '#fde725','#21918c', '#5ec962'];
          // let randomColorArray = Array();
          // Fill array with colors. Every color has to be unique.
          //for (i = 0; i < count; i++) {
            //randomColor = getRandomColor();
            //if (!(randomColorArray.includes(randomColor))) {
             // randomColorArray[i] = randomColor;
            //} else {
             // i--;
            //}
          //}
        
          var layer = new GeoRasterLayer({
            georaster: georaster,
            resolution: 256,
            pixelValuesToColorFn: values => {
              return colorArray[values[0] - georaster.mins[0]]
            }
          });
        }else if(name=="AOA"){ // AOA
          // Georaster
          var layer = new GeoRasterLayer({
            georaster: georaster,
            resolution: 256,
            pixelValuesToColorFn: values => {
              if(values[0]==0){
                return `rgb(0,0,0)`; // black
              }else{
                return `rgb(255,255,255)`; // white
              }
            }
          });
        }
        else if(name=="AOA-Vergleich"){
          var layer = new GeoRasterLayer({
            georaster: georaster,
            resolution: 256,
            pixelValuesToColorFn: values => {
              if(values[0]==0){
                return null // leer
              }
              else if(values[0]==-1){
                return `rgb(123,90,130)` // purple (better) 
              }
              else{
                return `rgb(240,240,37)`; // yellow (worse)
              }
            }
          });
        }
        else if(name=="Vorschläge"){
          var layer = new GeoRasterLayer({
            georaster: georaster,
            resolution: 256,
            pixelValuesToColorFn: values => {
              if(values[0]==0){
                return null // leer
              }
              else if(values[0]==1){
                return `rgb(123,90,130)` // purple (better) 
              }
            }
          });
        }
        layer.addTo(map);

        layerCtrl.addOverlay(layer, name);

        map.fitBounds(layer.getBounds());

        load = false
        loadingFun();
      });
  }

// Legende für Klassifikation  
  var legendClass = L.control({position: 'bottomleft'});
  legendClass.onAdd = function (map) {
  
  var div = L.DomUtil.create('div', 'legend');
  labels = ['<strong>Klassifikation</strong>'];
  categories = ['Gruenland','Siedlung', 'Acker_bepflanzt','Laubwald','Mischwald', 'Fliessgewaesser','Industriegebiet'];
  
  for (var i = 0; i < categories.length; i++) {
  
          div.innerHTML += 
          labels.push(
              '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
          (categories[i] ? categories[i] : '+'));
  
      }
      div.innerHTML = labels.join('<br>');
  return div;
  };
  legendClass.addTo(map);

// Legende für Vorschläge  
var legendVorschläge = L.control({position: 'bottomleft'});
legendVorschläge.onAdd = function (map) {

var div = L.DomUtil.create('div', 'legend');
labels = ['<strong>Vorschläge</strong>'];
categories = ['Trainigs Vorschläge'];

for (var i = 0; i < categories.length; i++) {

        div.innerHTML += 
        labels.push(
            '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
        (categories[i] ? categories[i] : '+'));

    }
    div.innerHTML = labels.join('<br>');
return div;
};
legendVorschläge.addTo(map);

// Legende für AOA
  var legendAOA = L.control({position: 'bottomleft'});
  legendAOA.onAdd = function (map) {
  
  var div = L.DomUtil.create('div', 'legend');
  labels = ['<strong>AOA</strong>'];
  categories = ['Geeignet','Ungeeignet'];
  
  for (var i = 0; i < categories.length; i++) {
  
          div.innerHTML += 
          labels.push(
              '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
          (categories[i] ? categories[i] : '+'));
  
      }
      div.innerHTML = labels.join('<br>');
  return div;
  };
  legendAOA.addTo(map);  

// Legende für AOA Verbesserung
var legendAOAbetter = L.control({position: 'bottomleft'});
legendAOAbetter.onAdd = function (map) {

var div = L.DomUtil.create('div', 'legend');
labels = ['<strong>AOA Verbersserung</strong>'];
categories = ['Verbessert','Verschlechtert'];

for (var i = 0; i < categories.length; i++) {

        div.innerHTML += 
        labels.push(
            '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
        (categories[i] ? categories[i] : '+'));

    }
    div.innerHTML = labels.join('<br>');
return div;
};
legendAOAbetter.addTo(map);    

// Farben für Legende
function getColor(d) {
  return d === 'Siedlung' ? '#fde725' :
         d === 'Acker_bepflanzt' ? '#addc30' :
         d === 'Greuenland' ? '#5ec962' :
         d === 'Laubwald' ? '#28ae80' :
         d === 'Mischwald' ? '#21918c' :
         d === 'Fliessgewaesser' ? '#3b528b' :
         d === 'Industriegebiet' ? '#59157e' :
         d === 'Geeignet' ? '#fff' :
         d === 'Ungeeignet' ? '#010101' :
         d === 'Verbessert' ? '#A020F0' :
         d === 'Verschlechert' ? '#FFFF00' :
         '#FFEDA0';
} 
map.on('overlayadd', function (eventLayer) {
  // Switch to the classification legend...
  if (eventLayer.name === 'Klassifikation') {
      this.removeControl(legendAOA);
      this.removeControl(legendAOAbetter);
      this.removeControl(legendVorschläge);
      legendClass.addTo(this);
}
  else if (eventLayer.name === 'AOA') {
    this.removeControl(legendClass);
    this.removeControl(legendAOAbetter );
    this.removeControl(legendVorschläge);
    legendAOA.addTo(this);
  } 
  else if (eventLayer.name === 'AOA-Vergleich') {
    this.removeControl(legendClass);
    this.removeControl(legendAOA);
    this.removeControl(legendVorschläge);
    legendAOAbetter.addTo(this);
  }
  else if (eventLayer.name === 'Vorschläge') {
    this.removeControl(legendClass);
    this.removeControl(legendAOAbetter );
    this.removeControl(legendAOA);
    legendVorschläge.addTo(this);
  }else { // Or switch to the aoa legend...
      this.removeControl(legendClass);
      this.removeControl(legendAOA);
      this.removeControl(legendVorschläge);
  }
});

var fileClass;
load = true;
loadingFun();
fetch("http://localhost:3000/output/AOA.tif")
  .then(data => {
    if(data.status === 200){
      addDataToMap("http://localhost:3000/output/classification.tif", "Klassifikation")
      addDataToMap("http://localhost:3000/output/AOA.tif", "AOA")
      addDataToMap("http://localhost:3000/output/DI.tif", "Vorschläge")
      //fetch("http://localhost:3000/output/DI.geojson")
      //  .then(result => result.json())
      //  .then(data => {
      //    var diLayer = L.geoJSON(data);
      //    diLayer.addTo(map);
      //    layerCtrl.addOverlay(diLayer, "Vorschläge")})
      if(message.innerHTML[0] === "0"){
        addDataToMap("http://localhost:3000/output/AOA_Vergleich.tif", "AOA-Vergleich")
      }
    }
    else{
      load = false;
      loadingFun();
      site.style.opacity = "0.15";
      noData.classList.remove('visually-hidden')
    }
  });


function processCheck(checkbox) {
  var checkId = checkbox.id;

  if (checkbox.checked) {
    layers[checkId - 1].addTo(map);
    selId = checkId;
    }
  else {
    map.removeLayer(layers[checkId - 1]);
    selId = null;
  }
}