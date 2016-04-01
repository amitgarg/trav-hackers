function ChartMarker(options) {
	this.setValues(options);

	this.$inner = $('<div>').css({
		position : 'relative',
		width : options.width,
		height : options.height,
		// left : '-50%',
		// top : '-50%',

		fontSize : '1px',
		lineHeight : '1px',
		cursor : 'default'
	});

	this.$div = $('<div>', {
		title : options.entity,
		'class' : 'chartDiv'
	}).append(this.$inner).css({
		position : 'absolute',
		display : 'none'
	});

};

ChartMarker.prototype = new google.maps.OverlayView;

ChartMarker.prototype.onAdd = function() {
	$(this.getPanes().overlayMouseTarget).append(this.$div);
};

ChartMarker.prototype.onRemove = function() {
	this.$div.remove();
};

ChartMarker.prototype.draw = function() {
	var marker = this;
	var projection = this.getProjection();
	var position = projection.fromLatLngToDivPixel(this.get('position'));
	var diameter;
	;
	if (zoom < ZoomLevels.CountryThreshold) {
		diameter = zoom * 20;
	} else if (zoom < ZoomLevels.AirportThreshold) {
		diameter = (zoom - 2) * 20;
	} else {
		diameter = (zoom - 4) * 20;
	}
	this.$inner.css({
		width : diameter + 'px',
		height : diameter + 'px',
	});
	this.$div.css({
		left : position.x - diameter / 2,
		top : position.y - 20,
		display : 'block'
	});

	this.$inner.html('<img src="' + this.get('image') + '"/>').click(function(event) {
		var events = marker.get('events');
		events && events.click(event);
	});

	this.chart = new google.visualization.PieChart(this.$inner[0]);
	this.chart.draw(this.get('chartData'), this.get('chartOptions'));
};

var chartOptions = {
	fontSize : 8,
	backgroundColor : 'transparent',
	legend : 'none'
};

var GDSData = ["1A", "1S", "1G", "1P", "1V"];

function drawChart(options) {
	var chartData = new google.visualization.arrayToDataTable(options.data);
	var marker = new ChartMarker({
		map : map,
		position : options.position,
		width : '40px',
		height : '40px',
		chartData : chartData,
		chartOptions : chartOptions,
		events : {
			click : function(event) {
			}
		},
		entity : options.title
	});
	return marker;
}