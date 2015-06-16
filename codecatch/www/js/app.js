

var CodeCatchApp = angular.module('Codecatch', ['ui.bootstrap']);

CodeCatchApp.controller('ModalCtrl', function ($scope, $modal, $log) {

  //$scope.items = ['Werners Wurstbude', 'Flying Horse', 'Free Willy', 'Rakete', 'Picknickpark', 'Accessoir-Shop'];
  //$scope.codes = ['1234', '4123', '2314'];


  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'POIContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


   $scope.search = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'search.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.codes;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };



});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

CodeCatchApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});

//JsonDataController
 CodeCatchApp.controller('jsonCtrl', function ($scope, $http){

    $scope.convertToInt= function (value) {
            return parseInt(value);
        };

    $scope.locateMap = function (x, y) {
        var marker3 = new L.marker(map.unproject([x,y],mapMaxZoom)).addTo(map);
        marker.bindPopup("Werners Wurstbude");} ;

    $scope.oneAtATime = true;

    $scope.status = {
    isFirstOpen: true,
    isFirstDisabled: false
    };

    $http.get('json/jsonData.json')
        .success(function (response)
                 {
                    $scope.infos=response.temp;
                 });
            });


