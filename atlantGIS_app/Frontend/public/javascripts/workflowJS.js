let btn_satellite = document.getElementById("btn_satellite");
let btn_trainMod = document.getElementById('btn_trainMod');
let btn_untrainMod = document.getElementById('btn_untrainMod');
let in_satellitenbild = document.getElementById('satellitenbild');
let in_trainMod = document.getElementById('trainMod');
let formdiv_sat = document.getElementById('form_div_sat');
let formdiv_train = document.getElementById('form_div_train');
let formdiv_untrain = document.getElementById('form_div_untrain');

btn_satellite.addEventListener('click', function(){changeActiveForm() /* funtion to get the data here */});
//btn_trainMod.addEventListener('click', function(){/* funtion to get the data here */; window.location = "./area"});
//btn_untrainMod.addEventListener('click', function(){/* funtion to get the data here */; window.location = "./trainData"});


/**
 * Changes the active form, so the one that currently
 * needs to be filled is higlited and the others are 
 * disabled
 */
 function changeActiveForm(){
    // change satellitenbild form to inactive
    formdiv_sat.classList.remove('active-form');
    in_satellitenbild.disabled = true;
    btn_satellite.classList.remove('btn-primary');
    btn_satellite.classList.add('disabled');
    btn_satellite.classList.add('btn-secondary');
    // change trained Modell form to active
    formdiv_train.classList.add('active-form');
    btn_trainMod.classList.remove('disabled');
    btn_trainMod.classList.remove('btn-secondary');
    btn_trainMod.classList.add('btn-primary');
    in_trainMod.disabled = false;
    // change untrained Modell form to active
    formdiv_untrain.classList.add('active-form');
    btn_untrainMod.classList.remove('disabled');
    btn_untrainMod.classList.remove('btn-secondary');
    btn_untrainMod.classList.add('btn-primary');
}

/**
 // Dark-Mode:

 function addDarkmodeWidget() {
    new Darkmode().showWidget();
  }
  window.addEventListener('load', addDarkmodeWidget);

  import Darkmode from 'darkmode-js';

  new Darkmode().showWidget();

  const options = {
    bottom: '64px', // default: '32px'
    right: 'unset', // default: '32px'
    left: '32px', // default: 'unset'
    time: '0.5s', // default: '0.3s'
    mixColor: '#fff', // default: '#fff'
    backgroundColor: '#fff',  // default: '#fff'
    buttonColorDark: '#100f2c',  // default: '#100f2c'
    buttonColorLight: '#fff', // default: '#fff'
    saveInCookies: false, // default: true,
    label: '🌓', // default: ''
    autoMatchOsTheme: true // default: true
  }
  
  const darkmode = new Darkmode(options);
  darkmode.showWidget();

   */