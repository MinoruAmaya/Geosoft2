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


selId = null;

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