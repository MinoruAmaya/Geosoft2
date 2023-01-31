//Das sind Beispieldaten um Layer hinzuzufügen 
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
          let colorArray = ['#0a1cb1', '#e57423', '#23c3e5', '#2aa43d', '#696969', '#70843a','#472612'];
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
        }else if(name=="AOA" || name=="Trainigsempfehlung"){ // AOA
          // Georaster
          var layer = new GeoRasterLayer({
            georaster: georaster,
            resolution: 256,
            pixelValuesToColorFn: values => {
              if(values[0]==0){
                return null; // no color
              }else{
                return `rgb(230,0,230)`; // pink
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
  categories = ['See','Siedlung','Fliessgewaesser','Laubwald','Mischwald', 'Gruenland', 'Industriegebiet', 'Acker_bepflanzt', 'Offenboden'];
  
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

// Farben für Legende
function getColor(d) {
  return d === 'See' ? '#0a1cb1' :
         d === 'Siedlung' ? '#e57423' :
         d === 'Fliessgewaesser' ? '#23c3e5' :
         d === 'Laubwald' ? '#2aa43d' :
         d === 'Mischwald' ? '#11671e' :
         d === 'Greuenland' ? '#92e597' :
         d === 'Industriegebiet' ? '#696969' :
         d === 'Acker_bepflanzt' ? '#70843a' :
         d === 'Offenboden' ? '#472612' :
         d === 'Geeignet' ? '#fff' :
         d === 'Ungeeignet' ? '#010101' :
         '#FFEDA0';
} 
map.on('overlayadd', function (eventLayer) {
  // Switch to the classification legend...
  if (eventLayer.name === 'Klassifikation') {
      this.removeControl(legendAOA);
      legendClass.addTo(this);
}
  else if (eventLayer.name === 'AOA') {
    this.removeControl(legendClass);
    legendAOA.addTo(this);
  } else { // Or switch to the aoa legend...
      this.removeControl(legendClass);
      this.removeControl(legendAOA);
  }
});

addDataToMap("http://localhost:3000/output/AOA.tif", "AOA")
addDataToMap("http://localhost:3000/output/classification.tif", "Klassifikation")
fetch("http://localhost:3000/output/DI.geojson")
  .then(result => result.json())
  .then(data => {
    var diLayer = L.geoJSON(data);
    diLayer.addTo(map);
    layerCtrl.addOverlay(diLayer, "Vorschläge")})
if(message.innerHTML === "0"){
  addDataToMap("http://localhost:3000/output/AOA_vergleich.tif", "AOA-Vergleich")
}



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