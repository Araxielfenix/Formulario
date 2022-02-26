window.onload = function() {
    getLocation();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  var map = L.map('map').setView([position.coords.latitude, position.coords.longitude], 13);
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiYXJheGllbGZlbml4IiwiYSI6ImNqeHBudXRqdDBqcTAzY3F1dGNmZGcxd2UifQ.xh-aFGjDG3PMZU2WfdGaQA'
}).addTo(map);
}
function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
}

map.on('click', onMapClick);