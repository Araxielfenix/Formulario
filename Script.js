window.onload = generarMapa();

function generarMapa(){
      var map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
      })
    });
    //Generar mapa centrado en la ubicación del usuario.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = [position.coords.longitude, position.coords.latitude];
        map.getView().setCenter(ol.proj.fromLonLat(pos));
        map.getView().setZoom(12);
      });
    }
}