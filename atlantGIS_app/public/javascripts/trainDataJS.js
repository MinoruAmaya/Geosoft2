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

// Leaflet
var map = L.map("map").setView([49.845363, 9.905964], 5);

L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);