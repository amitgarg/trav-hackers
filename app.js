google.load( 'visualization', '1', { packages:['corechart'] });

function ChartMarker( options ) {
    this.setValues( options );
    
    this.$inner = $('<div>').css({
        position: 'relative',
        left: '-50%', top: '-50%',
        width: options.width,
        height: options.height,
        fontSize: '1px',
        lineHeight: '1px',
        backgroundColor: 'transparent',
        cursor: 'default'
    });

    this.$div = $('<div>')
        .append( this.$inner )
        .css({
            position: 'absolute',
            display: 'none'
        });
};

ChartMarker.prototype = new google.maps.OverlayView;

ChartMarker.prototype.onAdd = function() {
    $( this.getPanes().overlayMouseTarget ).append( this.$div );
};

ChartMarker.prototype.onRemove = function() {
    this.$div.remove();
};

ChartMarker.prototype.draw = function() {
    var marker = this;
    var projection = this.getProjection();
    var position = projection.fromLatLngToDivPixel( this.get('position') );

    this.$div.css({
        left: position.x,
        top: position.y,
        display: 'block'
    })

    this.$inner
        .html( '<img src="' + this.get('image') + '"/>' )
        .click( function( event ) {
            var events = marker.get('events');
            events && events.click( event );
        });
        
    this.chart = new google.visualization.PieChart( this.$inner[0] );
    this.chart.draw( this.get('chartData'), this.get('chartOptions') );
};

function initialize() {
	var point = airports['BLR'];
    var latLng1 = new google.maps.LatLng( point[1], point[2] );
    var latLng2 = new google.maps.LatLng( 40.708762, -4.006731 );
    var latLng3 = new google.maps.LatLng( 51.708762, 9.006731 );
    var latLng4 = new google.maps.LatLng( 42.708762, 12.006731 );
    var latLng5 = new google.maps.LatLng( 64.708762, -26.006731 );

    var mapCenter = new google.maps.LatLng(45, 15 );

    map = new google.maps.Map( $('#map_canvas')[0], {
        zoom: 2,
        center: mapCenter,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    
    var data = google.visualization.arrayToDataTable([
        [ 'AgencyType', 'Qty' ],
        [ 'AgencyType 1', 11 ],
        [ 'AgencyType 2', 2 ],
        [ 'AgencyType 3' , 2 ],
        [ 'AgencyType 4', 2 ],
        [ 'AgencyType 5', 7 ]
    ]);
    
    var options = {
        fontSize: 8,
        backgroundColor: 'transparent',
        legend: 'none'
    };
    
    var marker = new ChartMarker({
        map: map,
        position: latLng1,
        width: '80px',
        height: '80px',
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
      var marker = new ChartMarker({
        map: map,
        position: latLng2,
        width: '80px',
        height: '80px',
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
        var marker = new ChartMarker({
        map: map,
        position: latLng3,
        width: '80px',
        height: '80px',
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
          var marker = new ChartMarker({
        map: map,
        position: latLng4,
        width: '80px',
        height: '80px',
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
            var marker = new ChartMarker({
        map: map,
        position: latLng5,
        width: '80px',
        height: '80px',
        chartData: data,
        chartOptions: options,
        events: {
            click: function( event ) {
                alert( 'Clicked marker' );
            }
        }
    });
};

$(document).ready(initialize);
