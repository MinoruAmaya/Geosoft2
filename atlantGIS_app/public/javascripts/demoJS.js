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
    btn.addEventListener("click", function(){addPredictionAndAoaToMap("http://127.0.0.1:8000/classificationAoa"/*, "database/output/AOA_muenster.tif"*/)});
  
    function addPredictionAndAoaToMap(predUrl, /*aoaUrl*/) {
      fetch(predUrl)
        .then(response => response.arrayBuffer())
        .then(parseGeoraster)
        .then(georaster => {
          console.log("georaster:", georaster);
  
          var layer = new GeoRasterLayer({
            georaster: georaster,
            resolution: 256 /**,
             pixelValuesToColorFn: (values) => {
               let maxs = georaster.maxs;
               let mins = georaster.mins;
               values[0] = Math.round(
                 (255 / (4000 - mins[0])) * (values[0] - mins[0])
               );
               values[1] = Math.round(
                 (255 / (4000 - mins[1])) * (values[1] - mins[1])
               );
               values[2] = Math.round(
                 (255 / (4000 - mins[2])) * (values[2] - mins[2])
               );
               // make sure no values exceed 255
               values[0] = Math.min(values[0], 255);
               values[1] = Math.min(values[1], 255);
               values[2] = Math.min(values[2], 255);
               // treat all black as no data
               if (values[0] === 0 && values[1] === 0 && values[2] === 0)
                 return null;
               return `rgb(${values[2]}, ${values[1]}, ${values[0]})`;
             },*/,
          });
          layer.addTo(map);
  
          layerCtrl.addOverlay(layer, "Klassifikation");
  
          map.fitBounds(layer.getBounds());
        });
    };
  
  };
  
  
  
  // functions
  
  
  
  
  /*fetch(aoaUrl)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      parseGeoraster(arrayBuffer).then((georaster) => {
        console.log("georaster:", georaster);
   
        var layer = new GeoRasterLayer({
          georaster: georaster,
          resolution: 256 /**,
          pixelValuesToColorFn: (values) => {
            let maxs = georaster.maxs;
            let mins = georaster.mins;
            values[0] = Math.round(
              (255 / (4000 - mins[0])) * (values[0] - mins[0])
            );
            values[1] = Math.round(
              (255 / (4000 - mins[1])) * (values[1] - mins[1])
            );
            values[2] = Math.round(
              (255 / (4000 - mins[2])) * (values[2] - mins[2])
            );
            // make sure no values exceed 255
            values[0] = Math.min(values[0], 255);
            values[1] = Math.min(values[1], 255);
            values[2] = Math.min(values[2], 255);
            // treat all black as no data
            if (values[0] === 0 && values[1] === 0 && values[2] === 0)
              return null;
            return `rgb(${values[2]}, ${values[1]}, ${values[0]})`;
          },,
        });
        layer.addTo(map);
   
        layerControl.addOverlay(layer, "AOA");
   
        map.fitBounds(layer.getBounds());
      });
    });*/