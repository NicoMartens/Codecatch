

var CodeCatchApp = angular.module('Codecatch', ['ui.bootstrap']);
//var markerStack = [];
//JsonDataController
  CodeCatchApp.controller('jsonCtrl', function ($scope, $http){

    var latlngs = Array();
    var temp = Array();
    var marker3 = null;
    var marker4 = 1;
    $scope.deleteLocateMarker = function(){
      map.removeLayer($scope.marker3);
    };
    //used in Poi
    //sets Marker to x,y with description z
    $scope.locateMap = function (x, y, z) {

      //var i = markerStack.pop();
      if(marker3 == null){
        
        marker3 = L.marker(map.unproject([x,y],mapMaxZoom)).addTo(map); //marker erzeugen und an map hängen
        marker3.bindPopup(z); //popup mit beschreibung anhängen
        map.panTo(new L.latLng(map.unproject([x,y*1.03],mapMaxZoom))); //map auf point einstellen
        marker3.openPopup(); //Popup anzeigen

        map.removeLayer(marker4);
        maker4=null;


        };
      if(maker4==null){
        
        marker4 = L.marker(map.unproject([x,y],mapMaxZoom)).addTo(map); //marker erzeugen und an map hängen
        marker4.bindPopup(z); //popup mit beschreibung anhängen
        map.panTo(new L.latLng(map.unproject([x,y*1.03],mapMaxZoom))); //map auf point einstellen
        marker4.openPopup(); //Popup anzeigen

        map.removeLayer(marker3);
        marker3 = null;
        
      }

    } ;

    $scope.oneAtATime = true;

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

    $http.get('json/jsonData.json')
    .success(function (response)
    {
      $scope.pois=response.poi;
      $scope.positions=response.position;
    });

    //used in Position - input=PositionCode
    //sets Marker to position of input
    $scope.getPosition = function(input){
      console.log(input);

      angular.forEach ($scope.positions, function(value, key){
        if (value.posCode==input){
          var marker3 = L.marker(map.unproject([value.x,value.y],mapMaxZoom)).addTo(map);
          marker3.bindPopup("You Are Here!");
          map.panTo(new L.latLng(map.unproject([value.x,value.y*1.03],mapMaxZoom)));
          marker3.openPopup();
          latlngs.push(marker3.getLatLng());

        } //end of if
      }) //end of forEach
    } //end of getPosition function
    
    $scope.drawWay = function(x,y,z){

      var marker3 = L.marker(map.unproject([x,y],mapMaxZoom)).addTo(map);
      marker3.bindPopup(z);
      map.panTo(new L.latLng(map.unproject([x,y*1.06],mapMaxZoom)));
      marker3.openPopup();
      latlngs.push(marker3.getLatLng());
      var polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);

  // zoom the map to the polyline
  map.fitBounds(polyline.getBounds());
};


  });//end of jsonCtrl


