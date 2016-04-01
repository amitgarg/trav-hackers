var map;
var bounds;
var ZoomLevels = {
	Min : 2,
	Max : 10,
	CountryThreshold : 4,
	AirportThreshold : 6
};
var zoom = ZoomLevels.Min;

function drawMap(options) {
	var mapCenter = new google.maps.LatLng(options.centerLattitude, options.centerLongitude);
	if (map) {
		map.setCenter(mapCenter);
		map.setZoom(options.zoom);
	} else {
		map = new google.maps.Map(options.container[0], {
			zoom : options.zoom,
			minZoom : ZoomLevels.Min,
			maxZoom : ZoomLevels.Max,
			center : mapCenter,
			mapTypeId : google.maps.MapTypeId.ROADMAP
		});

		google.maps.event.addListener(map, 'zoom_changed', function() {
			bounds = map.getBounds();
			function handleZoomChange(levelView, zoom) {
				$('#levelType').text(levelView);
				options.mapChanged(zoom);
			}

			if (zoom == ZoomLevels.CountryThreshold && this.zoom == ZoomLevels.CountryThreshold - 1) {
				handleZoomChange('Region', this.zoom);
			} else if (zoom == ZoomLevels.CountryThreshold - 1 && this.zoom == ZoomLevels.CountryThreshold) {
				handleZoomChange('Country', this.zoom);
			} else if (zoom == ZoomLevels.AirportThreshold && this.zoom == ZoomLevels.AirportThreshold - 1) {
				handleZoomChange('Country', this.zoom);
			} else if (zoom == ZoomLevels.AirportThreshold - 1 && this.zoom == ZoomLevels.AirportThreshold) {
				handleZoomChange('Airport', this.zoom);
			}
			zoom = this.zoom;
			return false;
		});
		google.maps.event.addListener(map, 'dragend', function() {
			bounds = map.getBounds();
			options.mapChanged(this.zoom);
		});
		options.container.on("click", ".chartDiv", function() {
			if (zoom >= ZoomLevels.CountryThreshold && zoom < ZoomLevels.AirportThreshold){
				Backbone.trigger('countrySelected', $(this).attr('title'));
			}else{
				alert('Please select a country');
			}
		});

	}
}

function getPositionObject(lattitude, longitude) {
	return new google.maps.LatLng(lattitude, longitude);
}

function positionIsViewable(position) {
	if (!bounds) {
		return true;
	}
	return bounds.contains(position);
	// return true;
}
