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
			zoom : 4,
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

		function getUrlVars() {
		    var vars = {};
		    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi,    
		    function(m,key,value) {
		      vars[key] = value;
		    });
		    return vars;
		  };
		  var session_id = getUrlVars()["session_id"];

		  var source2 = $("#entry-template2").html();
		  var template2 = Handlebars.compile(source2);

		  $.ajax({
			url : '/itinerary/'+session_id,
			type : 'GET',
			success:function(response){
				$.ajax({
					url: '/packages?category=overall_cheapest&session_id='+session_id,
					success:function(response){
						console.log(response);
							markPackages(response,center);
							response.forEach(function(package){
								$('.pkg-list').append(template2(package));
							});
							
					},
					error:function(error){

					}
				});
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

