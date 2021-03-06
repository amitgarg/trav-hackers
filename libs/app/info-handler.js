var source   = $("#entry-template").html();

var template = Handlebars.compile(source);


function markPackages(packages,center,session_id){
  var status = {};
  packages.forEach(function(place){
    place.session_id = session_id;
    markPackage(place,center,status);
  });
}

function markPackage(package,center,status){
  var contentString = template(package);

  var infowindow = new google.maps.InfoWindow({
    content: contentString,
    maxWidth: 293
  });

  var marker = new google.maps.Marker({
    position: {lat: package.latitude, lng: package.longitude},
    map: map,
    title: package.name
  });
  marker.addListener('mouseover', function() {
    if(status.current_info){
      status.current_info.close();
    }
    infowindow.open(map, marker);
    status.current_info = infowindow;
  });
  google.maps.event.addListener(infowindow, 'closeclick', function(){
    map.setCenter(center);   
    status.current_info = null; 
  }); 

  var flightPlanCoordinates = [center,{lat: package.latitude, lng: package.longitude}];

  var flightPath = new google.maps.Polyline({
    path: flightPlanCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });
flightPath.setMap(map);
}

  
