window.onload = function () {
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
  var contador = 0;
  var puntoOrigen;
  var puntoDestino;
  map.on('click', function (e) {
    //Si el contador es 0, se crea un marcador con el nombre origen.
    if (contador == 0) {
      map.removeLayer(origen);
      var marker = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(map);
      puntoOrigen = marker.getLocation;
      marker.bindPopup("<b>Origen</b>").openPopup();
      contador++;
    }
    //Si el contador es 1, se crea un marcador con el nombre destino.
    else if (contador == 1) {
        map.removeLayer(destino);
      var marker = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(map);
      puntoDestino = marker.getLocation;
      marker.bindPopup("<b>Destino</b>").openPopup();
      contador = 0;
    }
    getDireccion(e.latlng.lat, e.latlng.lng);
  });
  trazarRuta();
}
//Traza la ruta entre los puntos origen y destino.
function trazarRuta() {
  var url = 'https://api.mapbox.com/directions/v5/mapbox/driving/' + puntoOrigen + ';' + puntoDestino + '?geometries=geojson&access_token=pk.eyJ1IjoiYXJheGllbGZlbml4IiwiYSI6ImNqeHBudXRqdDBqcTAzY3F1dGNmZGcxd2UifQ.xh-aFGjDG3PMZU2WfdGaQA';
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var coords = data.routes[0].geometry.coordinates;
      var line = L.polyline(coords).addTo(map);
      map.fitBounds(line.getBounds());
    }
  });
}
// Funcion para obtener la dirección de una latitud y longitud.
function getDireccion(lat, lng) {
  var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + lat + ',' + lng + '.json?access_token=pk.eyJ1IjoiYXJheGllbGZlbml4IiwiYSI6ImNqeHBudXRqdDBqcTAzY3F1dGNmZGcxd2UifQ.xh-aFGjDG3PMZU2WfdGaQA';
  $.ajax({
    url: url,
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      var address = data.features[0].place_name;
      var direccion = address.split(',');
      var direccionFinal = direccion[0];
      document.getElementById('direccion').innerHTML = direccionFinal;
    }
  });
}