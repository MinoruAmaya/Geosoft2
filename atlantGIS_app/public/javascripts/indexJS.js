document.getElementById('navbarStart').classList.add('active');


//Leaflet & Leaflet-Draw

window.onload=function(){//  w w w  . j  ava  2 s  .c  o m
  var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
              osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
              osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib }),
              map = new L.Map('map', { center: new L.LatLng(49.845363, 9.905964), zoom: 5 }),
              drawnItems = L.featureGroup().addTo(map);
      L.control.layers({
          'osm': osm.addTo(map),
          "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
              attribution: 'google'
          })
      }, { 'drawlayer': drawnItems }, { position: 'topleft', collapsed: false }).addTo(map);
      map.addControl(new L.Control.Draw({
          edit: {
              featureGroup: drawnItems
          },
          draw: {
              polyline: false,
              circle: false,
              marker: false,
              polygon: false,
              rectangle: {
                  showArea: true
              }
          }
      }));
      map.on(L.Draw.Event.CREATED, function (event) {
          var layer = event.layer;
          drawnItems.addLayer(layer);
      });
      map.on('draw:deleted    ', function (e) {
          var deletedLayers = e.layers._layers;
          for (var layer in deletedLayers) {
             console.log(deletedLayers[layer]);
          }
       });
      }



