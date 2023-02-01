window.onload = function () {

  let messageDiv = document.getElementById("messageDiv");
  let loading = document.getElementById("loading");
  let message = messageDiv.innerHTML.split(',')

  let load = false

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

  function loadingFun() {
    if (!load) {
      loading.classList.add("visually-hidden");
      site_demo.style.opacity = "100%";
    }
    else if (load) {
      loading.classList.remove("visually-hidden");
      site_demo.style.opacity = "0.15";
    }
  }

  loadingFun();

  if (message[0] === "ergebnisse") {
    fetch("http://localhost:3000/output/DI.geojson")
      .then(result => result.json())
      .then(data => {
        var diLayer = L.geoJSON(data);
        diLayer.addTo(map);
        layerCtrl.addOverlay(diLayer, "Vorschläge")})
    addDataToMap("http://localhost:3000/output/classification.tif", "Klassifikation", "demo", "nochÄndern")
    addDataToMap("http://localhost:3000/output/AOA.tif", "AOA", "demo", "nochÄndern")

  }

  function addDataToMap(URL, name, call) {
    load = true;
    loadingFun();
    fetch(URL)
      .then(response => response.arrayBuffer())
      .then(parseGeoraster)
      .then(georaster => {
        if (name == "Klassifikation") { // Klassifikation
          // Calculate count of classification classes. Initalize array.
          //var count = georaster.maxs - georaster.mins;
          let colorArray = ['#fde725','#addc30','#3b528b','#59157e', '#28ae80','#21918c', '#5ec962'];
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

        if (call === "demo") {
          //handleDOMChange(type);
          load = false
          loadingFun();
        }
      });
  }

// Legende für Klassifikation  
  var legendClass = L.control({position: 'bottomleft'});
  legendClass.onAdd = function (map) {
  
  var div = L.DomUtil.create('div', 'legend');
  labels = ['<strong>Klassifikation</strong>'];
  categories = ['Laubwald', 'Acker_bepflanzt','Fliessgewaesser','Industriegebiet','Siedlung','Mischwald', 'Gruenland'];
  
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
  return d === 'Siedlung' ? '#fde725' :
         d === 'Acker_bepflanzt' ? '#addc30' :
         d === 'Greuenland' ? '#5ec962' :
         d === 'Laubwald' ? '#28ae80' :
         d === 'Mischwald' ? '#21918c' :
         d === 'Fliessgewaesser' ? '#3b528b' :
         d === 'Industriegebiet' ? '#59157e' :
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
}

/**
 * Returns a random color
 * Source: https://stackoverflow.com/questions/1484506/random-color-generator?noredirect=1&lq=1
 * @returns 
 */
function getRandomColor() {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


