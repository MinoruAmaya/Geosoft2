let navElement = document.getElementById('navbarTrain');
let btn_label = document.getElementById('btn_label');
let btn_klassenID = document.getElementById('btn_klassenID');
let btn_save = document.getElementById('btn_save');
let label = document.getElementById('label');
let klassenID = document.getElementById('klassenID');
let form_div_l = document.getElementById('form_div_l');
let form_div_k = document.getElementById('form_div_k');

btn_label.addEventListener('click', function() {changeActiveForm('label');});
btn_klassenID.addEventListener('click', function() {changeActiveForm('klasse');});
btn_save.addEventListener('click', function() {});

navElement.classList.remove('disabled');
navElement.classList.remove('text-white-50');
navElement.classList.add('text-white');

/**
 * Changes the active form, so the one that currently
 * needs to be filled is higlited and the others are 
 * disabled
 * @param {String} form 
 */
function changeActiveForm(form){
    if(form === 'label'){
        form_div_l.classList.remove('active-form');
        btn_label.classList.remove('btn-primary');
        btn_klassenID.classList.remove('disabled');
        btn_klassenID.classList.remove('btn-secondary');
        btn_klassenID.classList.add('btn-primary');
        btn_label.classList.add('disabled');
        btn_label.classList.add('btn-secondary');
        form_div_k.classList.add('active-form');
        label.disabled = true;
        klassenID.disabled = false;
    }
    else if (form === 'klasse'){
        form_div_k.classList.remove('active-form');
        btn_klassenID.classList.remove('btn-primary');
        btn_save.classList.remove('disabled');
        btn_save.classList.remove('btn-secondary');
        btn_save.classList.add('btn-primary');
        btn_klassenID.classList.add('disabled');
        btn_klassenID.classList.add('btn-secondary');
        klassenID.disabled = true;
    }
}

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