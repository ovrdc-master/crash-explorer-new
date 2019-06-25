mapboxgl.accessToken = 'pk.eyJ1Ijoib3ZyZGMiLCJhIjoiY2pjbTA2cmY3MG9naTJ3cndpYmJtbXRnNCJ9.CuHfwEKEsk2PqUJ_qFgrOQ';
var map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/ovrdc/cjv5nhgec0bur1fn0abl3z2pc',
  center: [-83.0, 39.0],
  zoom: 8.1,
  hash: true /* NOTES i added the hash so it would reload where i left off */
});
//End Mapbox Map
map.getCanvas().style.cursor = 'default';

//Popup Function
      /*var links = document.getElementById('links');
      for (let f in features) {
        links.innerHTML += features[f].properties["CRASH_YR"]
      }
      var newtypeofcoolhtml = `<h4>${feature.properties["ODPS_LOC_ROAD_NME"]}</h4>`		*/
map.on('click', function (e) {
  var bbox = [
    [e.point.x - 2, e.point.y - 2],
    [e.point.x + 2, e.point.y + 2]
  ];
  var features = map.queryRenderedFeatures(bbox, {
    layers: ['2016-2018-crash-data']
  });
  var feature = features[0];
  console.log(features)
  if (feature.length > 1) {
    var message = "<span style='color:firebrick;'>Multiple (" + feature.length + ") crashes found</span>";
    var buttons = '<button id="prev" style="float:left;display:block;" class="mdl-button mdl-js-button mdl-button--primary">Previous</button><button id="next" style="float:right;display:block;" class="mdl-button mdl-js-button mdl-button--primary">Next</button></div>';
  } else {
    var message = "";
    var buttons = "";
  };
  var html = "";
  for (var f in features) {
    var feature = features[f];
    html += '<table id="popup_content" class="mdl-data-table"><center><h5>Accident Details</h5></center>' +
      '<td><strong> Year of Crash </strong></td>' +
      '<td>' + feature.properties.CRASH_YR + '</td></tr>' +
      '<tr><td><strong> Road </strong></td>' + '<td>' +
      feature.properties.ODPS_LOC_ROAD_NME + ' ' +
      feature.properties.ODPS_LOC_ROAD_SUFFIX_CD + ' ' +
      feature.properties.ODPS_LOC_ROUTE_PREFIX_CD + ' ' +
      feature.properties.ODPS_LOC_ROUTE_ID + '</td></tr>' +
      '<tr><td><strong> Light Conditions </strong></td>' + '<td>' +
      feature.properties.LIGHT_COND_PRIMARY_CD + '</td></tr>' +
      '<tr><td><strong> Crash Type </strong></td>' + '<td>' +
      feature.properties.CRASH_TYPE_CD + '</td></tr>' +
      '<tr><td><strong> Weather </strong></td>' + '<td>' +
      feature.properties.WEATHER_COND_CD + '</td></tr>' +
      '<tr><td><strong> Road Conditions </strong></td>' + '<td>' +
      feature.properties.ROAD_COND_PRIMARY_CD + ' ' +
      feature.properties.ROAD_COND_SECONDARY_CD + '</td></tr>' +
      '<tr><td><strong> Factors </strong></td>' + '<td>' +
      feature.properties.U1_CONT_CIR_PRIMARY_CD + '</td></tr>' +
      '<tr><td><strong> Vehicle Type </strong></td>' + '<td>' +
      feature.properties.U1_TYPE_OF_UNIT_CD + '</td></tr>' +
      '<tr><td><strong> Road Contour </strong></td>' + '<td>' +
      feature.properties.ROAD_CONTOUR_CD + '</td></tr>' +
      '<tr><td><strong> Serious Injuries </strong></td>' + '<td>' +
      feature.properties.ODPS_TOTAL_FATALITIES_NBR + '</td></tr>' +
      '<tr><td><strong> Fatalities </strong></td>' + '<td>' +
      feature.properties.INCAPAC_INJURIES_NBR + '</td></tr>';
  }
    var popup = new mapboxgl.Popup({
      offset: [0, 7]
    })
    .setLngLat(feature.geometry.coordinates)
    .setHTML(message + html + buttons)
    .addTo(map);
    $("#mdl-data-table").append(message)
    $("#mdl-data-table").append(buttons)

});
console.log
//End Popup

//Toggle Heatmap Layer
document.getElementById('heatmap')
  .addEventListener('change', function (e) {
    if (!e.target.checked) {
      map.setLayoutProperty('2016-2018 Crash Data Heatmap', 'visibility', 'none');
    } else {
      map.setLayoutProperty('2016-2018 Crash Data Heatmap', 'visibility', 'visible');
    }
  });


map.on('load', function (e) {
  map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'none');
});

//Toggle Alcohol
document.getElementById('alcdrugs')
  .addEventListener('change', function (e) {
    console.log('changed') //NOTES working
    if (!e.target.checked) {
      console.log("not checked")//NOTES working
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'ODPS_ALCOHOL_IND', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'ODPS_ALCOHOL_IND', 'Yes']);
    }
  });
//Toggle Animal
document.getElementById('animal')
  .addEventListener('change', function (e) {
    console.log('changed') //NOTES working
    if (!e.target.checked) {
      console.log("not checked")//NOTES working
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'CRASH_TYPE_CD', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'CRASH_TYPE_CD', 'Animal']);
    }
  });
//Toggle Intersections
document.getElementById('intersec')
  .addEventListener('change', function (e) {
    if (!e.target.checked) {
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'ODOT_CRASH_LOCATION_CD', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['in', 'ODOT_CRASH_LOCATION_CD', 'Four-Way Intersection', 'T-Intersection', 'Y-Intersection', 'Traffic Circle/Roundabout', '5 Or More Point Intersection']);
    }
  });

//Toggle local Roads
document.getElementById('locowned')
  .addEventListener('change', function (e) {
    if (!e.target.checked) {
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'MAINTENANCE_AUTHORITY_CD', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['in', 'MAINTENANCE_AUTHORITY_CD', 'Town or Township Highway Agency', 'County Highway Agency', 'City or Municipal Highway Agency']);
    }
  });
//Toggle Pedestrians
document.getElementById('bikeped')
  .addEventListener('change', function (e) {
    if (!e.target.checked) {
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'CRASH_TYPE_CD', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'CRASH_TYPE_CD', 'Pedestrian']);
    }
  });
//Toggle Roadway Departure
document.getElementById('rwdepart')
  .addEventListener('change', function (e) {
    if (!e.target.checked) {
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'FHWA_RDWY_DEPARTURE_IND', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'FHWA_RDWY_DEPARTURE_IND', 'Yes']);
    }
  });
//Toggle Speeding
document.getElementById('ovrspeed')
  .addEventListener('change', function (e) {
    if (!e.target.checked) {
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'ODPS_SPEED_IND', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'ODPS_SPEED_IND', 'Yes']);
    }
  });        
//Toggle Teen Involved
document.getElementById('teen')
  .addEventListener('change', function (e) {
    if (!e.target.checked) {
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'ODOT_YOUNG_DRIVER_IND', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'ODOT_YOUNG_DRIVER_IND', 'Yes']);
    }
  });
//Toggle All Injury
document.getElementById('allinj')
  .addEventListener('change', function (e) {
    if (!e.target.checked) {
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'SEVERITY_BY_TYPE_CD', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['in', 'SEVERITY_BY_TYPE_CD', 'Visible Injury', 'Serious Injury', 'Fatal Injury']);
    }
  }); 
//Toggle distracted Driving
document.getElementById('distracted')
  .addEventListener('change', function (e) {
    if (!e.target.checked) {
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'DISTRACTED_DRIVER_IND', '']);
    } else {
      map.setLayoutProperty('2016-2018-crash-data-highlight', 'visibility', 'visible'); //NOTES the layer has to be visible to be filtered - that's why just keep it visible always
      map.setFilter('2016-2018-crash-data-highlight', ['==', 'DISTRACTED_DRIVER_IND', 'Yes']);
    }
  }); 
