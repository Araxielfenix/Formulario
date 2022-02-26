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
//Enables dragging marker
var contador = 0;
var puntoOrigen;
var puntoDestino;
map.on('click', function(e) {
   //Si el contador es 0, se crea un marcador con el nombre origen.
    if (contador == 0) {
        var marker = L.marker([e.latlng.lat, e.latlng.lng], {draggable: true}).addTo(map);
        puntoOrigen = marker.getLocation;
        marker.bindPopup("<b>Origen</b>").openPopup();
        contador++;
    }
    //Si el contador es 1, se crea un marcador con el nombre destino.
    else if (contador == 1) {
        var marker = L.marker([e.latlng.lat, e.latlng.lng], {draggable: true}).addTo(map);
        puntoDestino = marker.getLocation;
        marker.bindPopup("<b>Destino</b>").openPopup();
        contador++;
    }
});
}