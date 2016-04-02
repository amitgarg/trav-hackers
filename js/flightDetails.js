
function displayFlightDetails(){
	var test =
{
    "recommendations": [
        {
            "origin":"Bangalore",
            "originCode":"BLR",
            "destination":"Nice",
            "destinationCode":"NCE",
            "departureDate":"01JUL16",
            "ReturnDate":"05AUG16",
            "outboundFlights":[{"airlineName": "Air France", "flightCode":"AF191","departureTime":"0140", "arrivalTime":1355, "duration":"15:45", "noOfSeatsLeft":3, "price": 33217},{"airlineName": "Turkish Airlines", "flightCode":"TK8479","departureTime":2120, "arrivalTime":1735, "duration":"23:25", "noOfSeatsLeft":2, "price":36000},{"airlineName": "Emirates", "flightCode":"EK569","departureTime":"0430", "arrivalTime":1340, "duration":"12:40", "noOfSeatsLeft":3, "price": 42000}, {"airlineName": "British Airways", "flightCode":"BA118","departureTime":"0700", "arrivalTime":1845, "duration":"15:15", "noOfSeatsLeft":1, "price":40000} ],
            "inboundFlights":[{"airlineName": "Air France", "flightCode":"AF192","departureTime":"0700", "arrivalTime":2345, "duration":"13:55", "noOfSeatsLeft":3, "price": 27165},{"airlineName": "Turkish Airlines", "flightCode":"TK8492","departureTime":1130, "arrivalTime":1100, "duration":"20:20", "noOfSeatsLeft":2, "price":25515},{"airlineName": "Emirates", "flightCode":"EK564","departureTime":1535, "arrivalTime":"0905", "duration":"14:10", "noOfSeatsLeft":3, "price": 28000}, {"airlineName": "British Airways", "flightCode":"BA119","departureTime":1155, "arrivalTime":"0440", "duration":"13:15", "noOfSeatsLeft":1, "price":43756} ]
        }
        
     ]
     
};

	var details_json = test["recommendations"][0];
	var originCode = details_json["originCode"];
	var destinationCode = details_json["destinationCode"];
	

	var content_div = document.getElementById("content"); 
	var content = "";

	content += "<div style='height:50px; font-size:25px;'> Outbound " + details_json["origin"] + " to " + details_json["destination"] + " (" + details_json["departureDate"]  + ") </div>";
	content += createTable(originCode, destinationCode, details_json["outboundFlights"], "out");
	content += "<br>";
	content += "<br>";
	content += "<br>";
	content += "<div style='height:50px; font-size:25px;'> Inbound " + details_json["destination"] + " to " + details_json["origin"] + " (" + details_json["ReturnDate"]  + ") </div>";
	content += createTable(destinationCode, originCode, details_json["inboundFlights"], "in");
	
	content += "<br>";
	content += "<div class='wrapper'>";
	content += "<span style='height:50px; margin-right:100px' class=\"right relative\"><a style='height:40px;' href=\"Confirm.html\" class=\"button1\"><strong style='text-align:middle; font-size:25px'>Book Now</strong></a></span>";
	content += "</div>";
												
	content_div.innerHTML = content;
}

function createTable(originCode, destinationCode, flightDetailsList, inOrOut){
	var content = "<table style='width:100%;'>";
	
	content += "	<tr style='height:40px; font-size:20px;'>";
	content += "		<th class='col-sm-2' style='text-align:center;'>Depart (" + originCode + ")</th>";
	content += "		<th class='col-sm-2' style='text-align:left;'>Arrive (" + destinationCode + ")</th>";
	content += "		<th class='col-sm-2' style='text-align:left;'>Duration</th>";
	content += "		<th style='text-align:right; '>Fare</th>";
	content += "		<th class='col-sm-3' style='text-align:left;'></th>";
	content += "	</tr>";
	
	for(var index in flightDetailsList){
		var flightDetails = flightDetailsList[index];
		content += "	<tr style='height:75px; background-color:#00BFFF; font-size:18px;'>";
		content += "		<th class='col-sm-2' style='text-align:center; vertical-align:middle'>" + String(flightDetails["departureTime"]) + "</th>";
		content += "		<th class='col-sm-2' style='text-align:left; vertical-align:middle'>" + String(flightDetails["arrivalTime"]) + "</th>";
		content += "		<th class='col-sm-2' style='text-align:left; vertical-align:middle'>" + flightDetails["duration"] + "</th>";
		content += "		<th style='text-align:right; vertical-align:middle'>" + flightDetails["price"] + " (" + flightDetails["flightCode"] + ")</th>";
		content += "		<th class='col-sm-3' style='margin-left:25px; vertical-align:middle'><input type='radio' name='" + inOrOut + "'/></th>";
		content += "	</tr>";
	}
	content += "</table>";
	return content;
}