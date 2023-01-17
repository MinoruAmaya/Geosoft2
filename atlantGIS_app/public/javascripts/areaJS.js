let counter = 0;
let layer;
var trainData;

//Leaflet & Leaflet-Draw

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
            layer.setStyle({fillColor: '#FF00FF', color: '#FF00FF'});
            drawnItems.addLayer(layer);
            var type = event.layerType;


            if (type === "rectangle") {
                drawnItem = layer;
                drawnItems.addLayer(layer);
                console.log("created rectangle");
                var popupString = `
                  <div id="saveArea">
                    <div id="form_div_popup"><button class="btn btn-primary mb-12 col-10 mx-auto" id="btn_save">Bereich speichern </button><span class="text-danger text-center" id="warning"></span></div>
                  </div>
                `;
                layer.bindPopup(popupString).openPopup();
                formListenerErstellen();
            }
            //Speichert Geometrieeigenschaften als JSON
            var shape = layer.toGeoJSON()
            trainData = JSON.stringify(shape);
            console.log(trainData)
    
            });
                

        map.on('draw:deleted    ', function (e) {
            var deletedLayers = e.layers._layers;
            for (var layer in deletedLayers) {
               console.log("test" + deletedLayers[layer]);
            }
         });
        


// add train Data to map (funktioniert noch nicht)
let btn_addData = document.getElementById('btn_addData');
let in_trainData = document.getElementById('training');
let btn_weiter = document.getElementById('btn_weiter')
btn_addData.addEventListener('click', function(){addTrainData();})


/**
 * After area got digitialized
 * the "Weiter" button should be activated.
 */

function formListenerErstellen(){
    let btn_save = document.getElementById('btn_save');
    btn_save.addEventListener('click', function(){activateWeiterButton();});
  }

function activateWeiterButton(){
    if(counter === 0){
        btn_weiter.classList.remove('btn-secondary');
        btn_weiter.classList.remove('disabled');
        btn_weiter.classList.add('btn-primary');
    }
    counter++;
}

let style = function (feature) {
    switch (feature.properties.Label) {
        case "See":
        return { color: "#0a1cb1" };
        case "Siedlung":
        return { color: "#e57423" };
        case "FLiessgewaesser":
        return { color: "#23c3e5" };
        case "Laubwald":
        return { color: "#2aa43d" };
        case "Mischwald":
        return { color: "#11671e" };
        case "Gruenland":
        return { color: "#92e597" };
        case "Industriegebiet":
        return { color: "#696969" };
        case "Acker_bepflanzt":
        return { color: "#70843a" };
        case "Offenboden":
        return { color: "#472612" };
    }
    };

    

/**
 * Adds the trainData that was uploaded
 * to the Data and to the map
 */
function addTrainData(){
    if(trainData === ''){
        var fs = new FileReader();
        fs.onload = (event) => {
            trainData = JSON.parse(event.target.result);
            L.geoJSON(trainData).addTo(map);
            L.geoJSON(trainData, {
                style: style
                }).addTo(map)
        };
        fs.readAsText(in_trainData.files[0]);
    }
    else{
        return;
    }
}
        

// trainModell
$(document).ready(function(){
    $('input[type="radio"]').click(function(){
        var inputValue = $(this).attr("value");
        var targetBox = $("." + inputValue);
        $(".box").not(targetBox).hide();
        $(targetBox).show();
    });
});