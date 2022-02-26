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
    //Colocar dos marcadores para trazar la ruta.
    var marker1 = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([37.41, 8.82]))
    });
    marker1.setStyle(new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.75,
        src: 'https://openlayers.org/en/v4.0.1/examples/data/icon.png'
      }))
    }));
    var marker2 = new ol.Feature({
      geometry: new ol.geom.Point(ol.proj.fromLonLat([37.41, 8.82]))
    });
    marker2.setStyle(new ol.style.Style({
      image: new ol.style.Icon(({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 0.75,
        src: 'https://openlayers.org/en/v4.0.1/examples/data/icon.png'
      }))
    }));
    var vectorSource = new ol.source.Vector({
      features: [marker1, marker2]
    });
    var vectorLayer = new ol.layer.Vector({
      source: vectorSource
    });
    map.addLayer(vectorLayer);
    //Crear una ruta entre los dos marcadores.
    var ruta = new ol.Feature({
      geometry: new ol.geom.LineString([ol.proj.fromLonLat([37.41, 8.82]), ol.proj.fromLonLat([37.41, 8.82])])
    });
    var rutaSource = new ol.source.Vector({
      features: [ruta]
    });
    var rutaLayer = new ol.layer.Vector({
      source: rutaSource
    });
    map.addLayer(rutaLayer);
    //Crear una animación para la ruta.
    var animacion = new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    });
    var animacionSource = new ol.source.Vector({
      features: [ruta]
    });
    var animacionLayer = new ol.layer.Vector({
      source: animacionSource
    });
    map.addLayer(animacionLayer);
    //Crear una animación para el marcador.
    var animacion2 = new ol.View({
      center: ol.proj.fromLonLat([37.41, 8.82]),
      zoom: 4
    });
    var animacionSource2 = new ol.source.Vector({
      features: [marker1]
    });
    var animacionLayer2 = new ol.layer.Vector({
      source: animacionSource2
    });
    map.addLayer(animacionLayer2);
}