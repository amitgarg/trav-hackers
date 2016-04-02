google.load('visualization', '1', {
	packages : ['corechart', 'imagechart'],
	"callback" : function() {
		// new AgencyLocalizationRouter();
		// // new SearchAnalysisRouter();
		// new PatternAnalysisRouter();
		// Backbone.history.start();
		
		var options = {
			container : $('#map_canvas'),
			centerLattitude : 43.66532403,
			centerLongitude : 7.219268219,
			zoom : 3,
		};

		drawMap(options);
		var center = new google.maps.LatLng(43.66532403, 7.219268219); 
		var marker = new google.maps.Marker({
		    position: center,
		    map: map,
		    animation: google.maps.Animation.BOUNCE,
		    icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
		    title: "Nice"
		  });
		  
		$.ajax({
			url : '/session',
			type : 'POST',
			data: {user: {emp_id: '700798', org_id: '1A', name: "Amit Kumar Garg", emp_type: "F"}},
			success:function(response){
				session_id = response.session_id;
				console.log(session_id);
				$.ajax({
					url : '/itinerary/'+session_id,
					type : 'POST',
					data: {itinerary: {week_start: 1, week_end: 4, dest: "NCE"}},
					success:function(){
						$.ajax({
							url: '/packages?category=overall_cheapest&session_id='+session_id,
							success:function(response){
								console.log(response);
									markPackages(response,center);
							},
							error:function(error){

							}
						});
					}
				
				});
			},
			error:function(error){

			}
		});

		
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

