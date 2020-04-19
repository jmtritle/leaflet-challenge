// creating the map

var eMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4
  });
  
  // adding the tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.dark",
    accessToken: API_KEY
  }).addTo(eMap);
  
  // storing the earthquake data as a link
  var quakeLink = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// looping time! filling variables with the appopriate info from the json data taken from the reference link
d3.json(quakeLink, function(data) {
    var jsonData = data;
    console.log(data.features)
    data.features.forEach(item => {
        var latitude = item.geometry.coordinates[1];
        var longitude = item.geometry.coordinates[0];
        var magnitude = item.properties.mag;
        var place = item.properties.place;

        // adding circles!
        L.circle([latitude, longitude], {
            color: colorPicker(magnitude),
            fillColor: colorPicker(magnitude),
            fillOpacity: .80,
            radius: magnitude * 20000
        }).bindPopup("<b>Location:</b> " + place + "<br><b>Magnitude:</b> " + magnitude).addTo(eMap);
    });
});

// setting it up to pick colors based on the magnitude
function colorPicker(d) {
    return d > 5 ? '#ff584c':
           d > 4 ? '#f4815b':
           d > 3 ? '#e9995a':
           d > 2 ? '#dfb25a':
           d > 1 ? '#d4ca59':
                   '#cae359';
};

// constructing the legend and placing it accordingly

var mapLegend = L.control({
    position: 'bottomright'
});

mapLegend.onAdd = function(map) {
    var addDiv = L.DomUtil.create('div', 'legend'),
    levels = [0, 1, 2, 3, 4, 5],
    tags = [];

    for (var i = 0; i < levels.length; i++) {
        addDiv.innerHTML +=
        '<i style="background:' + colorPicker(levels[i] + 1) + '">' + '<b>Mag - ' + levels[i] + ' > ' + (levels[i + 1] ? + levels[i + 1] + '</b> ||' : '+');
    }
    return addDiv;
};

mapLegend.addTo(eMap);