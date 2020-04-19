// creating the map

var eMap = L.map("map", {
    center: [39.8283, -98.5795],
    zoom: 4
  });
  
  // adding the tile layer
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: "pk.eyJ1Ijoiam10cml0bGUiLCJhIjoiY2s4amM4aDhrMDFqYTNmcGZvN29xdGs5OCJ9.vhznuyA0w5Yc__sf_JKlew"
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
        }).bindPopup("<h3>Location: " + place + "</h3> <h3>Magnitude: " + magnitude + "</h3>").addTo(eMap);
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

