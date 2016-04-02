google.load('visualization', '1', {
	packages : ['corechart', 'imagechart'],
	"callback" : function() {
		// new AgencyLocalizationRouter();
		// // new SearchAnalysisRouter();
		// new PatternAnalysisRouter();
		// Backbone.history.start();
		var options = {
			container : $('#map_canvas'),
			centerLattitude : 45,
			centerLongitude : 15,
			zoom : 2,
		};

		$.ajax({
			url: '/packages?dest=NCE&type=F&week_start=1&week_end=4&category=overall_cheapest',
			success:function(response){
				response.forEach(function(place){
					markPackage(place);
				});
			},
			error:function(error){

			}
		})

		drawMap(options);

		// markPackage({
  //           "id": "pack_1",
  //           "name": "2N/3D to Paris",
  //           "Weekend_num": 1,
  //           "year": "2016",
  //           "destination_name": "Paris",
  //           "destination_code": "PAR",
  //           "type": "F",
  //           "image": "images/par_1.jpg",
  //           "flight_best": {"type":"E", "price":8000},
  //           "hotel_best": {"type":"B", "price":5000},
  //           "events": [{"type":"Eiffel Tower Pass", "price":2800}, {"type":"Access Louvre", "price":1400}, {"type":"Metro Pass", "price":1200}],
  //           "Currency": "INR",
  //           "latitude": 48.85059207,
  //           "longitude": 2.40642274
  //       });

		
		// drawSlider(2013);
		
		(function($) {
			$.fn.drags = function(opt) {

				opt = $.extend({
					handle : "",
					cursor : "move"
				}, opt);

				if (opt.handle === "") {
					var $el = this;
				} else {
					var $el = this.find(opt.handle);
				}

				return $el.css('cursor', opt.cursor).on("mousedown", function(e) {
					if (opt.handle === "") {
						var $drag = $(this).addClass('draggable');
					} else {
						var $drag = $(this).addClass('active-handle').parent().addClass('draggable');
					}
					var z_idx = $drag.css('z-index'), drg_h = $drag.outerHeight(), drg_w = $drag.outerWidth(), pos_y = $drag.offset().top + drg_h - e.pageY, pos_x = $drag.offset().left + drg_w - e.pageX;
					$drag.css('z-index', 1000).parents().on("mousemove", function(e) {
						$('.draggable').offset({
							top : e.pageY + pos_y - drg_h,
							left : e.pageX + pos_x - drg_w
						}).on("mouseup", function() {
							$(this).removeClass('draggable').css('z-index', z_idx);
						});
					});
					e.preventDefault();
					// disable selection
				}).on("mouseup", function() {
					if (opt.handle === "") {
						$(this).removeClass('draggable');
					} else {
						$(this).removeClass('active-handle').parent().removeClass('draggable');
					}
				});

			};
		})($);
	}
});

