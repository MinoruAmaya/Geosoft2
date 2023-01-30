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
    addDataToMap("http://localhost:3000/output/classification.tif", "Klassifikation", "demo", "nochÄndern")
    addDataToMap("http://localhost:3000/output/AOA.tif", "AOA", "demo", "nochÄndern")
    addDataToMap("http://localhost:3000/output/DI.tif", "Trainigsempfehlung", "demo", "nochÄndern")
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
          var count = georaster.maxs - georaster.mins;
          let colorArray = Array();
          // Fill array with colors. Every color has to be unique.
          for (i = 0; i < count; i++) {
            randomColor = getRandomColor();
            if (!(colorArray.includes(randomColor))) {
              colorArray[i] = randomColor;
            } else {
              i--;
            }
          }
          // Georaster
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

  var legend = L.control({position: 'bottomleft'});
  legend.onAdd = function (map) {
  
  var div = L.DomUtil.create('div', 'info legend');
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
  legend.addTo(map);

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
         '#FFEDA0';
}  


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


