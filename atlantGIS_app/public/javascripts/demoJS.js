//leaflet

window.onload = function () {//  w w w  . j  ava  2 s  .c  o m
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
  
    var btn = document.getElementById("demo_btn");
    btn.addEventListener("click", function(){addPredictionAndAoaToMap("http://localhost:3000/output/AOA.tif", "AOA"); addPredictionAndAoaToMap("http://localhost:3000/output/classification.tif", "Klassifikation")});
  
    function addPredictionAndAoaToMap(aoaUrl, name) {
      fetch(aoaUrl)
        .then(response => response.arrayBuffer())
        .then(parseGeoraster)
        .then(georaster => {
          console.log("georaster:", georaster);
  
          var layer = new GeoRasterLayer({
            georaster: georaster,
            resolution: 256 /**,
            // Source: https://github.com/GeoTIFF/georaster-layer-for-leaflet/issues/16
            pixelValuesToColorFn: values => values[0] === 255 ? null : `rgb(${values[0]},${values[1]},${values[2]})`
            */
          });
          layer.addTo(map);
  
          layerCtrl.addOverlay(layer, name);
  
          map.fitBounds(layer.getBounds());
        });
    };
  
  };