var latlngs = [];

window.onload = function () {
  ScrollReveal().reveal('div', { delay: 1000 , interval: 200, reset: true });
  getLocation();
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Tu navegador no soporta la geolicalización.");
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
      puntoOrigen = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(map);
      latlngs.push([e.latlng.lat, e.latlng.lng]);
      var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + e.latlng.lng + ',' + e.latlng.lat + '.json?access_token=pk.eyJ1IjoiYXJheGllbGZlbml4IiwiYSI6ImNqeHBudXRqdDBqcTAzY3F1dGNmZGcxd2UifQ.xh-aFGjDG3PMZU2WfdGaQA';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function () {
        if (this.status == 200) {
          var data = JSON.parse(this.response);
          var direccion = data.features[0].place_name;
          //Escribe la dirección en el campo de texto Origen.
          document.getElementById("Origen").value = direccion;
          puntoOrigen.bindPopup("<b>Origen: </b>" + direccion).openPopup();
        }
      };
      xhr.send();
      contador++;
    }
    //Si el contador es 1, se crea un marcador con el nombre destino.
    else if (contador == 1) {
      puntoDestino = L.marker([e.latlng.lat, e.latlng.lng], { draggable: true }).addTo(map);
      latlngs.push([e.latlng.lat, e.latlng.lng]);
      contador++;
      var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + e.latlng.lng + ',' + e.latlng.lat + '.json?access_token=pk.eyJ1IjoiYXJheGllbGZlbml4IiwiYSI6ImNqeHBudXRqdDBqcTAzY3F1dGNmZGcxd2UifQ.xh-aFGjDG3PMZU2WfdGaQA';
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);
      xhr.onload = function () {
        if (this.status == 200) {
          var data = JSON.parse(this.response);
          var direccion = data.features[0].place_name;
          document.getElementById("Destino").value = direccion;
          puntoDestino.bindPopup("<b>Destino: </b>" + direccion).openPopup();
          var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
        }
      };
      xhr.send();
    }
  });
}

L.polyline.on('drag', function(e){
  var url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + e.latlng.lng + ',' + e.latlng.lat + '.json?access_token=pk.eyJ1IjoiYXJheGllbGZlbml4IiwiYSI6ImNqeHBudXRqdDBqcTAzY3F1dGNmZGcxd2UifQ.xh-aFGjDG3PMZU2WfdGaQA';
  latlngs.push([e.latlng.lat, e.latlng.lng]);  
  var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function () {
      if (this.status == 200) {
        var data = JSON.parse(this.response);
        var direccion = data.features[0].place_name;
        var polyline = L.polyline(latlngs, { color: 'red' }).addTo(map);
      }
    };
    xhr.send();
  //latlngs.push([e.latlng.lat, e.latlng.lng]);
  // Si bindpopup contiene la cadena "Origen", se escribe en el textbox de Origen.
  if (marker.bindPopup.includes("Origen")) {
    document.getElementById("Origen").value = direccion;
    puntoDestino.bindPopup("<b>Origen: </b>" + direccion).openPopup();
  }
  // Si bindpopup contiene la cadena "Destino", se escribe en el textbox de Destino.
  if (marker.bindPopup.includes("Destino")) {
    document.getElementById("Destino").value = direccion;
    puntoDestino.bindPopup("<b>Destino: </b>" + direccion).openPopup();
  }
});
