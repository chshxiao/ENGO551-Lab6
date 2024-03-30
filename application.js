
document.addEventListener('DOMContentLoaded', function() {

  // create the map
  let map = L.map('map').setView([51.02, -114.05], 11);
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);


  // FeatureGroup to store editable layers
  var drawnItems = new L.FeatureGroup();
  map.addLayer(drawnItems);


  // add editable layers to map
  var options = {
    draw:{
      polyline: true,
      polygon: false,
      rectangle: false,
      circle: false,
      marker: false,
      polyline: {
        shapeOptions: {
          weight: 4,
          color: '#e68c32',
        }
      },
    },
    edit: {
      featureGroup: drawnItems,
      remove: true
    }
  }


  // add control handler to the map
  var drawControl = new L.Control.Draw(options);
  map.addControl(drawControl);


  // layer group to store all the created layers
  var layer_group = L.layerGroup();


  // function to hide simplify button
  function hide_simplify() {
    var bt = document.getElementById('simplifyButton');
    bt.setAttribute('style', 'z-index: 0;');
  }


  // create new draw event
  map.on("draw:created", function(e) {
    // hide the old simplify button
    hide_simplify();


    var type = e.layerType,
        layer = e.layer;


    // store all new layers in layer group
    layer.addTo(layer_group);


    // if the user clicks on the simplify button
    document.querySelector('#simplifyButton').onclick = function () {
      // get the geospatial information of the lines
      coor = layer.toGeoJSON();

      // simplify the polyline
      var simplified_line = turf.simplify(coor);

      // draw simplified polyline
      var latlng = simplified_line.geometry.coordinates;
      latlng.forEach((e) => { e.reverse(); });
      var line = L.polyline(latlng, { color: 'red' }).addTo(layer_group);
      layer_group.addTo(map);

      // hide simplify button
      hide_simplify();
    }


    map.addLayer(layer);
  })


  // the drawing is finished
  map.on('draw:drawstop', function(e) {
    // move the simplify buttom and delete button
    document.addEventListener('click', function(e) {
      var pageX = e.pageX;
      var pageY = e.pageY;

      var bt = document.getElementById('simplifyButton');
      bt.setAttribute('style', `top: ${pageY-20}px; left: ${pageX}px; width: 60px; z-index: 2;`);
    }, {once: true})

  })


  // refresh the map
  document.querySelector('#refreshButton').onclick = function () {
    // remove layers except the control and the base map
    layer_group.clearLayers();
    layer_group.addTo(map);

    // hide simplify button
    hide_simplify();

    // set the default view
    map.setView([51.02, -114.05], 11, {
      animate: true,
      duration: 0.5
    });
  }
})
