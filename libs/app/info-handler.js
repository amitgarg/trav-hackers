var source   = $("#entry-template").html();
var template = Handlebars.compile(source);

function markPackage(package){
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
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

  
