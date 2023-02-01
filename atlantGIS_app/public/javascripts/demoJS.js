window.onload = function () {//  w w w  . j  ava  2 s  .c  o m

  let btn_start = document.getElementById("btn_start");
  let btn_satellite = document.getElementById("btn_satellite");
  let btn_area = document.getElementById("btn_area");
  let btn_trainData = document.getElementById("btn_trainData");
  let btn_trainModell = document.getElementById("btn_trainModell");
  let demo_info = document.getElementById("demo_info");
  let form_div = document.getElementById("form_div")
  let form_div_sat = document.getElementById("form_div_sat");
  let form_div_trainData = document.getElementById("form_div_trainData");
  let form_div_trainModell = document.getElementById("form_div_trainModel");
  let messageDiv = document.getElementById("messageDiv");
  let loading = document.getElementById("loading");
  let site_demo = document.getElementById("site_demo");

  let message = messageDiv.innerHTML.split(',')

  function loadingFun(){
    if(message[0] === "normal"){
      loading.classList.add("visually-hidden");
      site_demo.style.opacity = "100%";
    }
    else{
      loading.classList.remove("visually-hidden");
      site_demo.style.opacity = "0.15";
    }
  }
  loadingFun();

  btn_start.addEventListener("click", function(){handleDOMChange("start")});
  btn_satellite.addEventListener("click", function(){message = []; loadingFun();addDataToMap("http://localhost:3000/input/RGB_demo.tif", "Satellitenbild", "demo", "satellite")});
  btn_area.addEventListener("click", function(){handleDOMChange("area"); addArea();});
  btn_trainData.addEventListener("click", function(){handleDOMChange("traindata")});
  btn_trainModell.addEventListener("click", function(){message = []; loadingFun();window.location = "/demo/startAnalyse";});
  
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

  function addArea(){
    var latlngs = [[51.98732690226854, 7.760461205936437], [51.97465210773462, 7.806045063875838]];
    var rectOptions = {color: '#FF00FF', weight: 1};
    var rectangle = L.rectangle(latlngs, rectOptions);
    rectangle.addTo(map);
  }

  function addDataToMap(URL, name, call, type) {
    fetch(URL)
      .then(response => response.arrayBuffer())
      .then(parseGeoraster)
      .then(georaster => {
        
        let ranges = georaster.ranges;
        let mins = georaster.mins;
        var layer = new GeoRasterLayer({
          georaster: georaster,
          resolution: 256 ,
          // Source: https://github.com/GeoTIFF/georaster-layer-for-leaflet/issues/16
            pixelValuesToColorFn: values => {
              return `rgb(${Math.round(((values[0]-mins[0])/ranges[0])*255)},
                          ${Math.round(((values[1]-mins[1])/ranges[1])*255)},
                          ${Math.round(((values[2]-mins[2])/ranges[2])*255)})`
          }
        });
        layer.addTo(map);

        layerCtrl.addOverlay(layer, name);

        map.fitBounds(layer.getBounds());

        if(call === "demo"){
          handleDOMChange(type);
          message = messageDiv.innerHTML.split(',');
          loadingFun();
        }
      });
  };

  function handleDOMChange(type){
    if(type === "start"){
      form_div_sat.classList.add("active-form");
      btn_start.classList.add("visually-hidden");
      btn_satellite.classList.remove("visually-hidden")
      demo_info.innerHTML = '<label class="col-form-label fw-bolder">Satelliten Bild </label><br />In diesem Schritt müssen Sie Ihr Satelliten Bild hochladen. '
        + '<br /><br /><br />Dieses soll das Format ".tif" haben. Außerdem sollten die Kanäle '
        + '"B02", "B03", "B04", "B08", "B05", "B06", "B07", "B11", "B12", "B8A" '
        + 'vorhanden sein (Diese Reihenfolge muss gegeben sein).<br /><br />Sobald Sie dieses hochgeladen haben (und gespeichert haben) '
        + 'wird das Satellitenbild auf der Karte als RGB angezeigt. <br /><br /><br /><br /><br /><br />';
    }
    else if(type === "satellite"){
      form_div_sat.classList.remove("active-form");
      form_div.classList.add("active-form");
      btn_satellite.classList.add("visually-hidden");
      btn_area.classList.remove("visually-hidden")
      demo_info.innerHTML = '<label class="col-form-label fw-bolder">Bereich auswählen </label><br />In diesem Schritt müssen Sie den Bereich auswählen, für den die Klassifikation durchgeführt werden soll. '
      + '<br /><br /><br />Beachten Sie hierbei, dass sich der Bereich innerhalb des Satellitenbild befinden muss. '
      + '<br /><br />Sobald Sie einen Bereich ausgewählt (und gespeichert haben), '
      + 'werden Sie zu dem nächsten Schritt weitergeleitet. <br /><br /><br /><br /><br /><br />';
    }
    else if(type === "area"){
      form_div.classList.remove("active-form");
      form_div_trainData.classList.add("active-form");
      btn_area.classList.add("visually-hidden");
      btn_trainData.classList.remove("visually-hidden")
      demo_info.innerHTML = '<label class="col-form-label fw-bolder">Trainingsdaten </label><br />In diesem Schritt müssen Sie Trainingsdaten hochladen. '
      + '<br /><br /><br />Die Trainingsdaten müssen das Format ".geojson" oder ".gpkg" haben. Die Daten müssen nicht unbedingt innerhalb des angegebenen '
      + 'Bereichs sein, jedoch führt dies zu besseren Ergebnissen. '
      + '<br />Nachdem die erste Klassifikation erstellt wurde, bekommen Sie die Möglichkeit, neue Trainingsdaten hochzuladen oder direkt auf der Website welche zu erstellen. '
      + '<br /><br />Sobald Sie die Trainigsdaten hochgeladen (und gespeichert haben), '
      + 'werden Sie zu dem nächsten Schritt weitergeleitet. <br /><br />';
    }
    else if(type === "traindata"){
      form_div_trainData.classList.remove("active-form");
      form_div_trainModell.classList.add("active-form");
      btn_trainData.classList.add("visually-hidden");
      btn_trainModell.classList.remove("visually-hidden")
      demo_info.innerHTML = '<label class="col-form-label fw-bolder">(Un-)Trainiertes Modell </label><br />In diesem Schritt haben Sie zwei Optionen. Zum einen '
      + 'können Sie ein trainiertes Modell hochladen, zum anderen können Sie angeben, dass Sie kein trainiertes Modell haben.'
      + '<br /><br /><br />Haben Sie ein trainiertes Modell, so wird nachdem Sie dies hochgeladen (und gespeichert) haben, direkt die Klassifikation (und AOA) berechnet. '
      + 'Dies führt dazu, dass der Prozess etwas schneller durchgeführt werden kann.'
      + '<br /><br />Haben Sie kein trainiertes Modell, so wird nachdem Sie dies bestätigt haben, noch zunächst ein trainiertes Modell erstellt. '
      + '<br /><br /><br />';
    }
  }

};
