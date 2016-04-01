var flights = {
	"E" : "Economy",
	"P" : "Economy Premium",
	"B" : "Business"
};

var hotels = {
	"B": "Budget",
	"L" : "Luxury",
	"S" : "Super Luxury"
}

var currencies = {
	"INR" : "₹",
	"EUR" : "€"
}

Handlebars.registerHelper('flightClass', function(flight) {
  return flights[flight.type];
});

Handlebars.registerHelper('hotelClass', function(hotel) {
  return hotels[hotel.type];
});

Handlebars.registerHelper('currencyDisplay', function(package) {
  return currencies[package.Currency]+calculateBestPrice(package);
});

function calculateBestPrice(package){
	return package.flight_best.price+package.hotel_best.price+package.events.map(e => e.price).reduce(function(p1,p2){ return p1+p2;})
}

Handlebars.registerHelper('inclusions', function(inclusions) {
  return inclusions.map(a => a.type).join(',  ');
});