

var CodeCatchApp = angular.module('Codecatch', ['ui.bootstrap']);

//JsonDataController
  CodeCatchApp.controller('jsonCtrl', function ($scope, $http){

    var latlngs = Array();
    var temp = Array();
    var marker3 = null;
    var marker4 = 1;
    var marker1;
    var marker2;
    var polyline;

    $scope.showAcc = false;
    $scope.showPos = false;
    $scope.showPoi = false;
    $scope.showFalseInput=false;

    
    $scope.removeAllMarkers = function(){
      if(marker3!=null){
        map.removeLayer(marker3);
        marker3=null;
      };
      if(marker4!=null){
        map.removeLayer(marker4);
        marker4=null;
      };
      if(marker1!=null){
        map.removeLayer(marker1);
        marker1=null;
      };
      if(marker2!=null){
        map.removeLayer(marker2);
        marker2=null;
      };
      if(polyline!=null){
        map.removeLayer(polyline);
        polyline=null;
      };
      map.setZoom(0);
    };

    $scope.deleteLocateMarker = function(){
      map.removeLayer($scope.marker3);
    };
    //used in Poi
    //sets Marker to x,y with description z
    $scope.locateMap = function (x, y, z, name) {
      $scope.showPoi=false;
      $scope.$apply;
      if(marker3 == null){
        
        marker3 = L.marker(map.unproject([x,y],mapMaxZoom)).addTo(map); //marker erzeugen und an map hängen
        
        marker3.bindPopup(
        "<img src=logo/" + name + " height=20 width=20 /> " + z
        ); //popup mit beschreibung anhängen
        map.panTo(new L.latLng(map.unproject([x,y*1.03],mapMaxZoom))); //map auf point einstellen
        marker3.openPopup(); //Popup anzeigen

        map.removeLayer(marker4);
        marker4=null;
        };//end if marker3

      if(marker4==null){
        
        marker4 = L.marker(map.unproject([x,y],mapMaxZoom)).addTo(map); //marker erzeugen und an map hängen
        marker4.bindPopup(z); //popup mit beschreibung anhängen
        map.panTo(new L.latLng(map.unproject([x,y*1.03],mapMaxZoom))); //map auf point einstellen
        marker4.openPopup(); //Popup anzeigen

        map.removeLayer(marker3);
        marker3 = null;
      } //end if marker4

    } ; //end of locateMap

    $scope.oneAtATime = true;

    $scope.status = {
      isFirstOpen: true,
      isFirstDisabled: false
    };

    $http.get('json/jsonData.json')
    .success(function (response)
    {
      $scope.pois=response.poi;
      $scope.pois2=response.poi;
      $scope.positions=response.position;
    });

    //used in Position - input=PositionCode
    //sets Marker to position of input
    //if i=0 Nur Position zeigen ohne Poi auswahl und div schließen
    //if i=1 Position zeigen und Poi auswahl für navigation öffnen
    $scope.getPosition = function(input, asdf){
      console.log(input);
      var temp = 0;

      var redMarkerIcon = new L.icon({
        iconUrl: 'marker_red.png',

        iconSize:     [65, 65], // size of the icon
        shadowSize:   [50, 64], // size of the shadow
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor:  [10, -76] // point from which the popup should open relative to the iconAnchor
    });

      
      angular.forEach ($scope.positions, function(value, key){
        if (value.posCode==input){
          marker1 = L.marker(map.unproject([value.x,value.y],mapMaxZoom, {icon: redMarkerIcon})).addTo(map);
          marker1.bindPopup("You Are Here!");
          map.panTo(new L.latLng(map.unproject([value.x,value.y*1.06],mapMaxZoom)));
          marker1.openPopup();
          latlngs.push(marker1.getLatLng());
          if(asdf==1){
            $scope.showAcc=true;
          };
          if(asdf==0){
          $scope.showPos=false;
          $scope.$apply;
          };
          $scope.showFalseInput=false;
          $scope.$apply;
          temp=1; //setze temp auf 1 damit showfalseinput nicht angezeigt wird
        } //end of if
      }); //end of forEach
      if (temp==0){
        $scope.showFalseInput=true;
        $scope.showAcc=false;
      }
    } //end of getPosition function
    

    $scope.drawWay = function(x,y,z){

      $scope.showAcc=false;
      $scope.showPos=false;
      $scope.$apply;
      marker2 = L.marker(map.unproject([x,y],mapMaxZoom)).addTo(map);
      marker2.bindPopup(z);
      map.panTo(new L.latLng(map.unproject([x,y],mapMaxZoom)));
      marker2.openPopup();
      latlngs.push(marker2.getLatLng());
      polyline = L.polyline(latlngs, {color: 'red'}).addTo(map);
        // zoom the map to the polyline
        map.fitBounds(polyline.getBounds());
    };

  });//end of jsonCtrl

// Function just allows numeric values as input
$(function() {
  $('#staticParent').on('keydown', '#child', function(e){-1!==$.inArray(e.keyCode,[46,8,9,27,13,110,190])||/65|67|86|88/.test(e.keyCode)&&(!0===e.ctrlKey||!0===e.metaKey)||35<=e.keyCode&&40>=e.keyCode||(e.shiftKey||48>e.keyCode||57<e.keyCode)&&(96>e.keyCode||105<e.keyCode)&&e.preventDefault()});
})
  