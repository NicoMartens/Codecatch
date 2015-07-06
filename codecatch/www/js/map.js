

	var mapMinZoom = 4;
	var mapMaxZoom = 6;
	
	var map;

function mapInit(){
	
	map = L.map('map', {
		maxZoom: mapMaxZoom,
		minZoom: mapMinZoom,
		crs: L.CRS.Simple
	});
	


	var pointW = new L.point(5651.5,4298.5);      // is an arbitrarily setted point in the map, only for development
	var pointWInLocalCoords = map.unproject(pointW, mapMaxZoom);        //projects pointW in the local used coordinate system
  
	map.setView(pointWInLocalCoords, mapMinZoom);     //sets window center and initial zoom level

	var dif = 1000; 
	var mapBounds = new L.LatLngBounds(         //have to set by hand, it doesn't set automatically!!!
	map.unproject([0+dif, 8192-dif], mapMaxZoom),     //south-west corner
	map.unproject([11264-dif, 0+dif], mapMaxZoom));     //north-east corner
  
	map.setMaxBounds(mapBounds);      //we have to adjust the min zoom level to this bounds!!!


	L.tileLayer('{z}/{x}/{y}.png', {			
		minZoom: mapMinZoom, maxZoom: mapMaxZoom,
		bounds: mapBounds,
		noWrap: true          
	}).addTo(map);
	

	//for development only:

	//from here...

	var popup = L.popup();     

	function onMapClick(e) {
		popup.setLatLng(e.latlng)
		.setContent("Koordinaten aus dem Originalbild: " + map.project(e.latlng, mapMaxZoom).toString())
		.openOn(map);
	}

	map.on('click', onMapClick);

	// until here



	/***  little hack starts here ***/
	L.Map = L.Map.extend({
		openPopup: function(popup) {
			//        this.closePopup();  // just comment this
			this._popup = popup;
			return this.addLayer(popup).fire('popupopen', {
				popup: this._popup
			});
		}
	}); /***  end of hack ***/
}
