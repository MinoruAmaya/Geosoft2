if(localStorage.getItem('theme') == 'dark'){
  activateDarkMode();

  if(document.getElementbyId('switchDark').checked){
      localStorage.setItem('switchDark', true)
  }
}

function activateDarkMode() {
  let isDark = document.body.classList.toggle('darkMode');

  if(isDark){
      activateDarkMode.checked = true;
      localStorage.setItem('theme','dark');
      document.getElementById('switchDark').setAttribute('checked', 'checked');

  }
  else{
      activateDarkMode.checked = false;
      localStorage.removeItem('theme', 'dark')
  }
}



// ######################################################################
/**
* Darkmode version 2 inaktiv
*/

const darkSwitch = document.getElementById('darkSwitch');
window.addEventListener('load', () => {
if (darkSwitch) {
  initTheme();
  darkSwitch.addEventListener('change', () => {
  resetTheme();
  });
}
});

function initTheme() {
const darkThemeSelected =
  localStorage.getItem('darkSwitch') !== null &&
  localStorage.getItem('darkSwitch') === 'dark';
darkSwitch.checked = darkThemeSelected;
darkThemeSelected ? document.body.setAttribute('data-theme', 'dark') :
  document.body.removeAttribute('data-theme');
}

function resetTheme() {
if (darkSwitch.checked) {
  document.body.setAttribute('data-theme', 'dark');
  localStorage.setItem('darkSwitch', 'dark');
} else {
  document.body.removeAttribute('data-theme');
  localStorage.removeItem('darkSwitch');
}
}