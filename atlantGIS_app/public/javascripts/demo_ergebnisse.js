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
 
  function loadingFun(){
    if(!load){
      loading.classList.add("visually-hidden");
      site_demo.style.opacity = "100%";
    }
    else if(load){
      loading.classList.remove("visually-hidden");
      site_demo.style.opacity = "0.15";
    }
  }
  loadingFun();
  if(message[0] === "ergebnisse"){
    addDataToMap("http://localhost:3000/output/classification.tif", "Klassifikation", "demo", "nochÄndern")
    addDataToMap("http://localhost:3000/output/AOA.tif", "AOA", "demo", "nochÄndern")
  }


  function addDataToMap(URL, name, call, type) {
    load = true;
    loadingFun();
    fetch(URL)
      .then(response => response.arrayBuffer())
      .then(parseGeoraster)
      .then(georaster => {
        console.log("georaster:", georaster);

        var layer = new GeoRasterLayer({
          georaster: georaster,
          resolution: 256 ,/**
          // Source: https://github.com/GeoTIFF/georaster-layer-for-leaflet/issues/16
          pixelValuesToColorFn: values => values[0] === 255 ? null : `rgb(${values[0]},${values[1]},${values[2]})`
          */
          //pixelValuesToColorFn: (values) => {
          //  let maxs = georaster.maxs;
          //  let mins = georaster.mins;
//
          //  values[0] = Math.round(
          //    (255 / (4000 - mins[0])) * (values[0] - mins[0])
          //  );
          //  values[1] = Math.round(
          //    (255 / (4000 - mins[1])) * (values[1] - mins[1])
          //  );
          //  values[2] = Math.round(
          //    (255 / (4000 - mins[2])) * (values[2] - mins[2])
          //  );
//
          //  // make sure no values exceed 255
          //  values[0] = Math.min(values[0], 255);
          //  values[1] = Math.min(values[1], 255);
          //  values[2] = Math.min(values[2], 255);
//
          //  // treat all black as no data
          //  if (values[0] === 0 && values[1] === 0 && values[2] === 0)
          //    return null;
//
          //  return `rgb(${values[2]}, ${values[1]}, ${values[0]})`;
          //},
        });
        layer.addTo(map);

        layerCtrl.addOverlay(layer, name);

        map.fitBounds(layer.getBounds());

        if(call === "demo"){
          //handleDOMChange(type);
          load = false
          loadingFun();
        }
    });
  }

}