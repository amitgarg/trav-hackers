var test = {
    "bookingData":
        {
            "passengerDetails":{"firstName": "Gurjyot", "lastName":"Singh", "dob":[{"month":"March", "day":10, "Year":1986}], "userid":1675487650},
            "tripSummary":
            	{"origin":"Bangalore", "originCode":"BLR", "destination":"Nice", "destinationCode":"NCE", "currency":"Rs", 
            	"fares":"34563", "airportFee":"4387", "passengerServiceFee":"6702", "userDevelopmentFee":"7000", "swatchBharathCess":"580", "indianServiceTax":"16702", "totalPrice":"69934",
            	"departureDetails":{"flightNum":"AF191", "departDate":"01Jul2016", "arrivalDate":"01Jul2016", "departTime":"01:40", "arrivalTime":"10:20"},
            	"arrivalDetails":{"flightNum":"AF192", "departDate":"05Aug2016", "arrivalDate":"06Aug2016", "departTime":"23:45", "arrivalTime":"05:20"}
            }
        }     
};

function getBookingDetails(){
	var tripSummary = test["bookingData"]["tripSummary"];
	document.getElementById("origin").innerHTML = tripSummary["origin"] + " (" + tripSummary["originCode"] + ") ";
	document.getElementById("destination").innerHTML = " " + tripSummary["destination"] + " (" + tripSummary["destinationCode"] + ") ";
	document.getElementById("originCode").innerHTML = tripSummary["originCode"];
	document.getElementById("destinationCode").innerHTML = tripSummary["destinationCode"];
	document.getElementById("originCodee").innerHTML = tripSummary["originCode"];
	document.getElementById("destinationCodee").innerHTML = tripSummary["destinationCode"];

	document.getElementById("depFlightNum").innerHTML = tripSummary["departureDetails"]["flightNum"];
	document.getElementById("depDepartDate").innerHTML = tripSummary["departureDetails"]["departDate"];
	document.getElementById("depArrivaldate").innerHTML = tripSummary["departureDetails"]["arrivalDate"];
	document.getElementById("depDepartTime").innerHTML = tripSummary["departureDetails"]["departTime"];
	document.getElementById("depArrivalTime").innerHTML = tripSummary["departureDetails"]["arrivalTime"];

	document.getElementById("arrFlightNum").innerHTML = tripSummary["arrivalDetails"]["flightNum"];
	document.getElementById("arrDepartDate").innerHTML = tripSummary["arrivalDetails"]["departDate"];
	document.getElementById("arrArrivaldate").innerHTML = tripSummary["arrivalDetails"]["arrivalDate"];
	document.getElementById("arrDepartTime").innerHTML = tripSummary["arrivalDetails"]["departTime"];
	document.getElementById("arrsArrivalTime").innerHTML = tripSummary["arrivalDetails"]["arrivalTime"];

	document.getElementById("currency").innerHTML = tripSummary["currency"] + " ";
	document.getElementById("fares").innerHTML = tripSummary["fares"];
	document.getElementById("airportFee").innerHTML = tripSummary["airportFee"];
	document.getElementById("passengerServiceFee").innerHTML = tripSummary["passengerServiceFee"];
	document.getElementById("userDevelopmentFee").innerHTML = tripSummary["userDevelopmentFee"];
	document.getElementById("swatchBharathCess").innerHTML = tripSummary["swatchBharathCess"];
	document.getElementById("indianServiceTax").innerHTML = tripSummary["indianServiceTax"];
	document.getElementById("totalPrice").innerHTML = tripSummary["totalPrice"];
}