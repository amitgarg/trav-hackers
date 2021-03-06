var users_map = {};
var itinerary_map = {};
function store_item(type,id,value){
	localStorage.setItem(type + '_' + id,JSON.stringify(value));
}
function get_item(type,id){
	return JSON.parse(localStorage.getItem(type + '_' + id));
}
$.mockjax({
	url : '/session',
	type: 'POST',
	response: function(settings) {
	    // Investigate the `settings` to determine the response...
	    var data = settings.data;
	    var unique_id = data.user.org_id+'_'+data.user.emp_id;
	    var user_info = get_item('user',unique_id);
	    // var user_info = users_map[unique_id];
	    if(!user_info){
	    	data.user.session_id = unique_id;
	    	store_item('user',unique_id,data.user);
	    	// users_map[unique_id] = data.user;
	    	user_info = data.user;
	    }
	    this.responseText = {session_id: user_info.session_id};
	  }
	
});

$.mockjax({
	url : /^\/itinerary\/([\w]+)$/,
	urlParams : ["session_id"],
	type: 'POST',
	response: function(settings) {
	    var data = settings.data;
	    var itinerary = get_item('itinerary',settings.urlParams.session_id);
	    if(!itinerary){
	    	store_item('itinerary',settings.urlParams.session_id,settings.data);
	    	// itinerary_map[settings.urlParams.session_id] = settings.data;
	    }
	    // if(!itinerary_map[settings.urlParams.session_id]){
	    // 	itinerary_map[settings.urlParams.session_id] = settings.data;
	    // }
	    this.responseText = {'status' : 'success'};
	  }
	
});

$.mockjax({
	url : /^\/itinerary\/([\w]+)$/,
	urlParams : ["session_id"],
	type: 'GET',
	response: function(settings) {
	    var itinerary = get_item('itinerary',settings.urlParams.session_id);
	    
	    // if(!itinerary_map[settings.urlParams.session_id]){
	    // 	itinerary_map[settings.urlParams.session_id] = settings.data;
	    // }
	    this.responseText = itinerary;
	  }
	
});

$.mockjax({
	// url : '/packages?dest=NCE&type=F&week_start=1&week_end=4&category=overall_cheapest',
	url : '/packages?category=overall_cheapest&session_id=1A_700798',
	response: function(settings) {
	    // Investigate the `settings` to determine the response...
	    var user = get_item('user',"1A_700798");
	    // var user = users_map["1A_700798"];
	    var it_info = get_item('itinerary',"1A_700798");
	    var itinerary = it_info.itinerary;
	    var f_packages = europ_packages_info.packages.filter(function(package){
	    	return package.type===user.emp_type;
	    });
	    var weeks_array = [];
	    var counter = itinerary.week_start;
	    while(counter<=itinerary.week_end){
	    	weeks_array.push(counter++);
	    }
	    var best_packages = weeks_array.map(function(week){
	    	week_packages = f_packages.filter(function(package){
	    		return package.Weekend_num==week;
	    	});
	    	week_packages = week_packages.map(function(package){
	    		var best_flight=package.flights[0];
	    		var best_hotel = package.hotels[0];
	    		package.flights.forEach(function(flight){
	    			if(flight.price< best_flight.price){
	    				best_flight = flight;
	    			} 
	    		});
	    		package.hotels.forEach(function(hotel){
	    			if(hotel.price< best_hotel.price){
	    				best_hotel = hotel;
	    			} 
	    		});
	    		package.flight_best = best_flight;
	    		package.hotel_best = best_hotel;
	    		package.best_price = calculateBestPrice(package);
	    		return package;
	    	});
	    	var week_best = week_packages[0];
	    	week_packages.forEach(function(package){
	    		if(package.best_price<week_best.best_price){
	    			week_best = package;
	    		}
	    	})
	    	return week_best;
	    })
	    this.responseText = best_packages;
	  }
	
});
$.mockjax({
	url : '/chartData',
	responseText : {
		"search_by_travel_period" : [{
			"id" : "IN_2012-01-01_2012-01-31_*-*",
			"market" : "IN",
			"onds" : [{
				"origin" : "*",
				"destination" : "*"
			}],
			"first_day" : "2012-01-01",
			"last_day" : "2012-01-31",
			"weekend_only" : false,
			"dep_day" : "",
			"ret_day" : "",
			"nb_req" : 412773,
			"top_onds" : [["BOM-DXB", 9561], ["DEL-BKK", 6977], ["DEL-DXB", 6310], ["BOM-BKK", 5265], ["BOM-DEL", 4733], ["DEL-GOI", 4458], ["DEL-BOM", 4387], ["BLR-DEL", 4087], ["BOM-SIN", 3234], ["DEL-SIN", 3121], ["BOM-GOI", 2949], ["DEL-LON", 2829], ["BLR-BOM", 2706], ["DEL-KTM", 2684], ["DEL-BLR", 2635], ["MAA-SIN", 2612], ["HYD-DEL", 2558], ["MAA-CMB", 2531], ["CCU-BKK", 2525], ["BOM-LON", 2341], ["BOM-SHJ", 2288], ["PNQ-DEL", 2255], ["BOM-BLR", 2210], ["BOM-MAA", 2152], ["DEL-CCU", 2072], ["BOM-AUH", 2057], ["SEA-LAS", 2050], ["BOM-CCU", 1929], ["DEL-PNQ", 1776], ["DEL-CMB", 1696], ["DEL-NYC", 1684], ["DEL-HKG", 1679], ["BOM-NYC", 1656], ["AMD-BOM", 1629], ["DEL-MAA", 1616], ["BLR-CCU", 1614], ["MAA-DEL", 1600], ["KUL-SIN", 1596], ["DEL-HYD", 1592], ["MAA-KUL", 1583], ["BLR-MAA", 1558], ["BLR-BKK", 1556], ["BLR-PNQ", 1554], ["BOM-AMD", 1534], ["HYD-CCU", 1496], ["CCU-DEL", 1494], ["BOM-COK", 1484], ["HYD-BOM", 1471], ["DEL-COK", 1471], ["DEL-AUH", 1432], ["BLR-DXB", 1425], ["BOM-HYD", 1373], ["DEL-SHJ", 1359], ["MAA-BOM", 1329], ["CCU-BOM", 1249], ["BOM-HKG", 1208], ["AMD-GOI", 1172], ["AMD-DEL", 1168], ["DEL-SXR", 1110], ["MAA-CCU", 1100], ["DEL-KUL", 1095], ["BOM-JAI", 1087], ["MAA-DXB", 1069], ["BLR-SIN", 1063], ["DXB-BOM", 1059], ["DEL-AMD", 1055], ["SIN-KUL", 1047], ["HYD-MAA", 1034], ["DEL-BBI", 1010], ["BLR-GOI", 982], ["MAA-IXZ", 961], ["BLR-KUL", 958], ["PNQ-DXB", 946], ["PNQ-BLR", 920], ["BLR-HYD", 901], ["BLR-JAI", 900], ["SHJ-DXB", 860], ["MAA-BKK", 844], ["PNQ-MAA", 827], ["SXR-DEL", 815], ["BOM-KUL", 814], ["BLR-AMD", 811], ["CCU-HYD", 791], ["BOM-LKO", 776], ["HYD-BLR", 771], ["DEL-PAT", 769], ["DEL-GAU", 767], ["DEL-LKO", 739], ["DEL-IXZ", 726], ["KUL-BKK", 719], ["HYD-DXB", 716], ["MAA-HYD", 716], ["BOM-BBI", 714], ["DEL-IXJ", 711], ["BLR-BBI", 706], ["AMD-DXB", 704], ["AMD-SHJ", 701], ["CCU-MAA", 695], ["BOM-IXC", 689], ["CCU-BLR", 689], ["MAA-PNQ", 688], ["HYD-GOI", 656], ["BOM-CMB", 655], ["PNQ-NAG", 647], ["CCU-SIN", 644], ["DXB-DEL", 642], ["HYD-COK", 634], ["COK-BOM", 618], ["MAA-GOI", 617], ["DEL-SYD", 614], ["IXC-BOM", 592], ["AMD-CCU", 584], ["BOM-NAG", 584], ["PNQ-AMD", 583], ["BOM-MRU", 578], ["BOM-CJB", 562], ["DEL-FRA", 562], ["DEL-MEL", 560], ["GOI-BOM", 559], ["DEL-MRU", 558], ["SIN-MAA", 555], ["DEL-TRV", 542], ["MAA-BLR", 536], ["HYD-JAI", 534], ["HYD-AMD", 531], ["CCU-IXZ", 530], ["LON-DEL", 530], ["DEL-ATQ", 527], ["HYD-KUL", 519], ["CCU-DAC", 516], ["DEL-SFO", 510], ["BLR-COK", 503], ["LON-BOM", 499], ["LKO-BOM", 496], ["JAI-BOM", 493], ["DEL-IDR", 483], ["DEL-IXU", 478], ["AMD-BLR", 467], ["BOM-IDR", 462], ["BOM-IXZ", 458], ["DEL-VNS", 458], ["LKO-DEL", 456], ["BLR-LON", 456], ["GAU-DEL", 443], ["BOM-FRA", 439], ["DEL-RPR", 438], ["BOM-UDR", 429], ["GOI-DEL", 428], ["BOM-IXE", 426], ["DEL-PAR", 405], ["COK-DEL", 405], ["HYD-VTZ", 397], ["BBI-DEL", 385], ["JAI-GOI", 370], ["AMD-HYD", 369], ["DEL-IXB", 367], ["COK-DXB", 365], ["PNQ-GOI", 365], ["HYD-BBI", 354], ["BLR-LKO", 345], ["DEL-SHA", 331], ["BLR-CMB", 328], ["MAA-CJB", 324], ["DEL-CJB", 323], ["HYD-BKK", 322], ["HYD-CJB", 319], ["MAA-LON", 318], ["DEL-KUU", 317], ["DEL-NDC", 316], ["BOM-IXJ", 315], ["CCU-GAU", 311], ["SIN-BOM", 301], ["HYD-NYC", 301], ["HYD-TIR", 299], ["BLR-PAT", 293], ["BOM-TRV", 288], ["NYC-BOM", 287], ["DEL-CHI", 284], ["PNQ-CCU", 283], ["BOM-SFO", 278], ["HYD-SIN", 261], ["CCU-KUL", 260], ["MAA-COK", 258], ["BOM-PAT", 257], ["BOM-RAJ", 247], ["NYC-DEL", 246], ["DEL-IXR", 243], ["BOM-SYD", 243], ["BLR-SHJ", 241], ["AMD-MAA", 240], ["DEL-YTO", 234], ["AMD-PNQ", 232], ["BOM-MLE", 229], ["CCU-GOI", 229], ["DEL-DPS", 228], ["BLR-IXZ", 227], ["MAA-IXM", 226], ["DEL-JAI", 222], ["BLR-AUH", 221], ["PNQ-JAI", 220], ["BLR-IDR", 218], ["MAA-JAI", 217], ["GAU-CCU", 214], ["DEL-UDR", 214], ["DEL-HKT", 214], ["DXB-MAA", 196], ["DEL-NAG", 194], ["DEL-IXM", 190], ["MAA-AUH", 186], ["IXC-GOI", 182], ["DEL-SLV", 182], ["CCU-JAI", 177], ["BOM-LAX", 170], ["BOM-NBO", 170], ["DEL-MLE", 169], ["PNQ-COK", 169], ["DEL-VTZ", 168], ["MAA-AMD", 167], ["CJB-DEL", 166], ["BLR-VTZ", 165], ["COK-SHJ", 159], ["BOM-SHA", 158], ["BLR-NAG", 152], ["CJB-MAA", 151], ["BOM-RPR", 151], ["PNQ-HYD", 146], ["MAA-NYC", 144], ["NAG-BOM", 142], ["SIN-DEL", 140], ["JAI-BLR", 136], ["BOM-HKT", 135], ["SHJ-BOM", 133], ["SXR-IXJ", 129], ["AUH-DEL", 129], ["IDR-DEL", 127], ["BOM-MEL", 126], ["BLR-TRV", 121], ["DEL-ISK", 121], ["DEL-LAX", 121], ["AMD-COK", 120], ["BLR-GAU", 120], ["BOM-BDQ", 119], ["DXB-COK", 115], ["AUH-MAA", 114], ["BOM-VNS", 113], ["BOM-VTZ", 111], ["NAG-DEL", 109], ["DEL-IXL", 106], ["BOM-IXR", 104], ["BOM-ATQ", 103], ["AUH-BOM", 101], ["RPR-DEL", 100], ["BOM-PAR", 99], ["DEL-AKL", 97], ["SHJ-COK", 96], ["SIN-CCU", 95], ["IDR-BOM", 94], ["BLR-NYC", 94], ["HYD-TRV", 93], ["MAA-TRV", 93], ["CJB-BOM", 92], ["MAA-TRZ", 91], ["BOM-CHI", 88], ["BOM-AKL", 87], ["BDQ-DEL", 85], ["MAA-VTZ", 82], ["CCU-DXB", 80], ["DEL-CAN", 80], ["BLR-FRA", 80], ["BLR-SFO", 78], ["BOM-IXB", 77], ["BKK-SIN", 76], ["DEL-SEL", 74], ["DXB-SHJ", 71], ["HYD-FRA", 67], ["DXB-CCJ", 66], ["AMD-JAI", 65], ["BLR-MLE", 63], ["DXB-HYD", 63], ["NAG-PNQ", 63], ["BOM-ZRH", 62], ["BOM-BRU", 60], ["HYD-RJA", 58], ["SIN-BLR", 57], ["KUL-MAA", 57], ["AUH-COK", 57], ["MAA-FRA", 56], ["BOM-IXM", 55], ["SIN-BKK", 55], ["BOM-KTM", 55], ["SIN-JKT", 55], ["CCU-IXB", 54], ["BOM-GAU", 54], ["BLR-HKG", 53], ["DEL-HAJ", 53], ["PNQ-LKO", 53], ["SHA-DEL", 52], ["LKO-GOI", 50], ["PAT-DEL", 49], ["KUL-BLR", 49], ["DEL-TYO", 49], ["DEL-LAS", 46], ["DEL-MIL", 45], ["DEL-BDQ", 44], ["MCT-COK", 44], ["BOM-JNB", 44], ["MAA-SHJ", 44], ["DEL-IXC", 40], ["DEL-MNL", 39], ["MCT-MAA", 39], ["COK-MAA", 38], ["SHJ-DEL", 38], ["BOM-BHO", 37], ["CCU-AMD", 36], ["HYD-VGA", 36], ["BOM-JKT", 36], ["LKO-DXB", 35], ["SHJ-MAA", 35], ["BOM-TYO", 35], ["SHJ-CCJ", 34], ["DEL-WAS", 32], ["DEL-MIA", 30], ["HYD-WAS", 30], ["BOM-MIL", 30], ["CMB-MAA", 28], ["JKT-DPS", 27], ["SHJ-TRV", 27], ["BLR-VGA", 26], ["DEL-JDH", 26], ["COK-BLR", 26], ["CCU-IXA", 24], ["HKG-DEL", 24], ["BOM-YTO", 24], ["DEL-DFW", 23], ["BOM-AMS", 23], ["ATQ-DXB", 22], ["HYD-VNS", 22], ["BOM-TIR", 22], ["SIN-TRZ", 22], ["DXB-TRZ", 22], ["BLR-VNS", 21], ["JAI-CCU", 21], ["HKG-BOM", 21], ["DEL-VGA", 21], ["SIN-HYD", 21], ["BLR-IXE", 21], ["AUH-CCJ", 20], ["DEL-BJS", 20], ["MAA-BBI", 19], ["IXJ-DXB", 19], ["DEL-JNB", 18], ["MAA-TCR", 18], ["BLR-BDQ", 18], ["BOM-VCE", 18], ["SIN-HKT", 18], ["ATQ-LON", 17], ["AUH-HYD", 17], ["KWI-MAA", 17], ["DXB-TRV", 17], ["BOM-HOU", 17], ["BOM-TLV", 17], ["BJS-DEL", 17], ["MCT-BOM", 16], ["VTZ-DEL", 16], ["IXM-DEL", 16], ["HYD-CHI", 15], ["COK-AUH", 15], ["PNQ-IDR", 15], ["DEL-CPT", 15], ["DXB-PNQ", 15], ["BOM-SAO", 15], ["SHJ-HYD", 14], ["DEL-PER", 14], ["DEL-JKT", 14], ["AUH-TRZ", 14], ["DEL-KBL", 14], ["SHJ-AMD", 14], ["AMD-SYD", 14], ["BLR-SHA", 14], ["BOM-BHU", 14], ["BOM-MAD", 14], ["AMD-CJB", 14], ["IXC-AMD", 14], ["MAA-BOS", 14], ["DEL-TAS", 13], ["BOM-TRZ", 13], ["MAA-SLC", 13], ["DXB-BLR", 13], ["SHJ-MCT", 13], ["BOM-BUD", 13], ["HYD-IXM", 13], ["PAT-CCU", 13], ["DEL-MOW", 13], ["BOM-NUE", 13], ["LKO-MAA", 13], ["AMD-AUH", 13], ["DEL-DTT", 13], ["BLR-TPA", 13], ["MAA-SEA", 13], ["BLR-LAS", 13], ["HYD-LON", 13], ["BOM-PHL", 13], ["BLR-DEN", 13], ["MAA-MAN", 13], ["MAA-SGN", 12], ["HYD-MSP", 12], ["IXA-CCU", 12], ["KUL-PKU", 12], ["BOM-POS", 12], ["TRV-DEL", 12], ["DEL-MEX", 12], ["HYD-IXL", 12], ["DEL-ZRH", 12], ["CCU-SFO", 12], ["DEL-HOU", 12], ["MAA-DPS", 12], ["BOM-FAT", 12], ["NAG-IXR", 12], ["TRZ-BKK", 12], ["DEL-LGK", 12], ["MAA-MSY", 12], ["DEL-MAN", 12], ["ATQ-YTO", 11], ["DMM-TRV", 11], ["VNS-HKG", 11], ["BLR-UDR", 11], ["YTO-DEL", 11], ["IDR-BKK", 11], ["MEL-DEL", 11], ["DEL-HNL", 11], ["DEL-TPE", 11], ["BLR-SYD", 11], ["DEL-BHO", 11], ["JAI-GAU", 11], ["GOI-BKK", 11], ["DEL-CAS", 11], ["DEL-AMS", 11], ["DEL-HBA", 11], ["BHX-DEL", 11], ["BLR-TYO", 10], ["DEL-TPA", 10], ["BOM-BHJ", 10], ["CCU-COK", 10], ["KUL-DPS", 10], ["HKT-BKK", 10], ["BLR-MRU", 10], ["HYD-IST", 10], ["CHI-SEA", 10], ["BOM-DPS", 10], ["VTZ-MAA", 10], ["HYD-PNQ", 10], ["BLL-YQG", 10], ["BWN-BKI", 9], ["BOM-LAS", 9], ["DEL-STO", 9], ["DEL-AGR", 9], ["SXR-DXB", 9], ["SXR-BOM", 9], ["COK-AGX", 8], ["IND-AUS", 8]],
			"top_destinations" : [["DEL", 34243], ["BOM", 26416], ["DXB", 24958], ["BKK", 20184], ["MAA", 14998], ["GOI", 14972], ["SIN", 14403], ["CCU", 14013], ["BLR", 13668], ["HYD", 10678], ["KUL", 8011], ["COK", 7973], ["LON", 7679], ["AMD", 7357], ["SHJ", 7200], ["PNQ", 6836], ["CMB", 6257], ["AUH", 5757], ["NYC", 5247], ["JAI", 5209], ["HKG", 4215], ["BBI", 3973], ["KTM", 3871], ["IXZ", 3837], ["TRV", 3674], ["LKO", 3338], ["CJB", 2790], ["GAU", 2729], ["NAG", 2703], ["PAT", 2550], ["IDR", 2474], ["LAS", 2454], ["IXJ", 2428], ["SXR", 2423], ["VTZ", 2350], ["FRA", 2082], ["IXC", 1898], ["VNS", 1860], ["SFO", 1832], ["SYD", 1793], ["IXE", 1726], ["MRU", 1713], ["RPR", 1652], ["MEL", 1640], ["MLE", 1611], ["ATQ", 1588], ["HKT", 1572], ["IXM", 1556], ["TIR", 1553], ["CCJ", 1550], ["IXB", 1520], ["DPS", 1417], ["IXR", 1410], ["PAR", 1356], ["BDQ", 1340], ["TRZ", 1288], ["UDR", 1285], ["SHA", 1271], ["CHI", 1268], ["BHO", 1208], ["LAX", 1199], ["MCT", 1195], ["JKT", 1096], ["DAC", 1076], ["MNL", 1074], ["IXU", 1065], ["YTO", 1023], ["JDH", 986], ["SLV", 910], ["AKL", 905], ["DOH", 892], ["WAS", 877], ["ZRH", 873], ["KUU", 812], ["AGR", 779], ["NBO", 769], ["TYO", 745], ["AMS", 728], ["NDC", 727], ["AGX", 696], ["RAJ", 693], ["HOU", 688], ["DED", 686], ["VGA", 684], ["IXA", 674], ["MIL", 672], ["JNB", 672], ["SEL", 644], ["IXL", 639], ["JED", 637], ["ISK", 592], ["IST", 586], ["KWI", 585], ["IMF", 575], ["MAN", 550], ["DFW", 540], ["BOS", 536], ["ATL", 524], ["CAN", 512], ["BJS", 506], ["JLR", 499], ["CAI", 495], ["STV", 468], ["DIB", 460], ["MOW", 455], ["RJA", 455], ["BRU", 448], ["PEN", 434], ["LGK", 412], ["IXD", 404], ["MYQ", 400], ["USM", 387], ["BAH", 385], ["SEA", 377], ["MIA", 376], ["BNE", 374], ["ROM", 366], ["IXS", 364], ["BHJ", 364], ["PER", 338], ["MUC", 330], ["KNU", 320], ["YVR", 310], ["RUH", 310], ["GOP", 304], ["TCR", 303], ["MAD", 300], ["BHX", 298], ["DUB", 288], ["TPE", 288], ["DTT", 286], ["BCN", 276], ["SGN", 273], ["CPT", 266], ["GAY", 264], ["BHU", 263], ["TAS", 263], ["DIU", 260], ["PBH", 258], ["HBX", 258], ["ORL", 257], ["AJL", 251], ["GWL", 250], ["DAR", 247], ["TLV", 245], ["GVA", 244], ["CPH", 240], ["DHM", 235], ["BER", 233], ["RGN", 232], ["JGA", 229], ["DMM", 228], ["STO", 227], ["SHL", 220], ["PKU", 220], ["JRH", 220], ["HJR", 217], ["PHL", 216], ["VIE", 212], ["MSP", 211], ["GOA", 196], ["LUH", 185], ["PHX", 183], ["DUS", 180], ["SAO", 179], ["MFM", 167], ["LOS", 167], ["THR", 162], ["VCE", 162], ["HAN", 161], ["KLH", 158], ["PBD", 157], ["EBB", 155], ["AMM", 145], ["HGH", 144], ["KBV", 142], ["KHI", 136], ["PGH", 135], ["ADD", 131], ["MKZ", 130], ["IXG", 129], ["ADL", 128], ["SEZ", 127], ["DMU", 123], ["PRG", 122], ["PNH", 120], ["DEN", 116], ["CLT", 114], ["PIT", 114], ["ATH", 113], ["OSL", 112], ["SAN", 111], ["CHC", 111], ["IXY", 105], ["HAJ", 104], ["YYC", 95], ["HAM", 87], ["HEL", 82], ["OSA", 76], ["WAW", 73], ["TPA", 72], ["ACC", 72], ["YMQ", 71], ["AUS", 71], ["IXW", 69], ["MEX", 67], ["IEV", 66], ["RDU", 62], ["BUD", 58], ["RIO", 57], ["TUS", 55], ["EDI", 54], ["BKI", 54], ["DAM", 51], ["BPN", 46], ["NCL", 45], ["STR", 44], ["HNL", 43], ["CNX", 40], ["SZX", 39], ["LIS", 38], ["REP", 37], ["BWN", 36], ["CAS", 33], ["GDL", 32], ["CEB", 29], ["LIM", 29], ["KBL", 28], ["LYS", 26], ["JSA", 26], ["LHE", 25], ["LNK", 24], ["ALC", 24], ["SLC", 23], ["TLL", 21], ["CLE", 21], ["BDO", 21], ["NUE", 19], ["IND", 19], ["GLA", 19], ["SXV", 18], ["CUN", 17], ["CTU", 16], ["YEA", 14], ["BEY", 14], ["MSY", 13], ["CVG", 13], ["REK", 13], ["OOL", 13], ["POS", 13], ["MBA", 13], ["CGP", 12], ["FAT", 12], ["FMY", 12], ["BUE", 12], ["YHZ", 11], ["HBA", 11], ["TRN", 10], ["BGW", 10], ["KCH", 10], ["YQG", 10], ["MJV", 10], ["FLR", 10], ["SVX", 10], ["LED", 10], ["ABV", 10], ["EVN", 10], ["MVD", 9], ["ALG", 9], ["CMH", 9], ["KRT", 9], ["PEE", 9], ["SIA", 9], ["AXD", 9], ["BUR", 8], ["BRE", 8], ["MEM", 8], ["LUN", 8], ["BUH", 8], ["MKC", 8], ["FNA", 8], ["DKR", 8], ["XMN", 8], ["LNZ", 8], ["SVG", 8], ["TBS", 8], ["JAX", 7], ["SCL", 7], ["BRI", 7], ["DUR", 7], ["ABZ", 7], ["TYS", 7], ["NAN", 7], ["ISB", 6], ["SSA", 6], ["FWA", 6], ["WUX", 6], ["HIR", 6], ["LCA", 6], ["FAO", 6], ["TNR", 6], ["SJO", 6], ["KOW", 6], ["IXP", 6], ["FMO", 5], ["MDC", 5], ["PDX", 5], ["SJC", 5], ["MLW", 5], ["STL", 5], ["CGN", 5], ["VRN", 5], ["ELP", 4], ["FUK", 4], ["KMG", 4], ["MPM", 4], ["WLG", 4], ["HRE", 4], ["SSH", 4], ["HFE", 4], ["YXE", 4], ["TDX", 4], ["TNA", 4], ["BZE", 4], ["SHE", 4], ["LIR", 4], ["RYK", 4], ["MSQ", 4], ["KHH", 3], ["WNZ", 3], ["DVO", 3], ["PSC", 3], ["CGO", 3], ["GNV", 3]],
			"advance_purchase" : [100859, 65554, 50359, 38113, 31196, 25260, 20467, 17106, 14840, 12428, 10396, 8746, 6879, 5084, 3128, 1634, 644, 74, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
		}]
	}
});

