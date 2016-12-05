/*global angular, events, smartland, $, google, setTimeout*/

(function () {
  'use strict';

  angular
    .module('app.controllers')
    .controller('MapController', MapController);

  MapController.$inject = ['$rootScope', '$sce', '$timeout'];

  function MapController($rootScope, $sce, $timeout) {

    /*jshint validthis: true*/
    var vm = this;
    vm.title = 'Home Controller Content';
    vm.layers = [];
    vm.mapThirdPartyLinksTitle = 'asdasdsadasd';
    vm.smartland = smartland;
    vm.smartland.wms = vm.smartland.wms || [];
    vm.searchString = '';
    vm.thirdPartyLinks = smartland.thirdPartyLinks || [];


    vm.renderHtml = function (html_code) {
      return $sce.trustAsHtml(html_code);
    };

    function watchWms() {
      vm.smartland.wms.forEach(function (layer, index) {
        $rootScope.$watch(function () {
          return vm.smartland.wms[index].infobar.activeTab;
        }, function (newValue, oldValue, scope) {
          vm.smartland.wms[vm.smartland.wms.indexOf(layer)].infobar.tabs[oldValue].active = false;
          vm.smartland.wms[vm.smartland.wms.indexOf(layer)].infobar.tabs[newValue].active = true;
        });
        $rootScope.$watch(function () {
          return vm.smartland.wms[index].active;
        }, function (newValue, oldValue, scope) {
          var visible = vm.smartland.wms[index].active;
          if (visible) {
            events.emit('mapDisplayLayer', layer);
          } else {
            events.emit('mapHideLayer', layer);
          }
        });
      });
    }

    function getLayerIndex(layer) {
      return vm.smartland[layer.type.toLowerCase()].map(function (l) {
        return l.fullLayerName;
      }).indexOf(layer.fullLayerName);
    }

    function mapLoadDataBeforSend(layer) {
      var lIndex = getLayerIndex(layer);
      if (layer.type.toLowerCase() === 'wms') {

        $timeout(function () {
          vm.smartland.wms[lIndex].loading = true;
        }, 0);
      }
    }
    events.on('mapWmsDataLoadeComplete', mapWmsDataLoadeComplete);

    function mapWmsDataLoadeComplete(layer) {
      var lIndex = getLayerIndex(layer);
      $timeout(function () {
        vm.smartland.wms[lIndex].loading = false;
      }, 0);
    }


    function updateInfobar() {
      $timeout(function () {}, 0);
    }

    $rootScope.executeSearch = function (searchString) {
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode({
        'address': searchString
      }, function (results, status) {
        if (results.length > 0) {
          events.emit('mapPanTo', {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          });
          $timeout(function () {
            $rootScope.searchString = results[0].formatted_address;
            vm.searchString = results[0].formatted_address;
          }, 0);
        }
      });
    };

    $rootScope.removePolygon = function (layer, wmsData) {
      var layerIndex = layer.featureData.indexOf(wmsData),
        svgLayer = layer.svgLayers[layerIndex],
        $jSvg = $(svgLayer._path),
        _map = smartland.mappi._map();
      layer.svgLayers.splice(layerIndex, 1);
      layer.featureData.splice(layerIndex, 1);
      _map.removeLayer(svgLayer);
    };

    $rootScope.pointOn = function (layer, wmsData) {

      var layerIndex = layer.featureData.indexOf(wmsData),
        svgLayer = layer.svgLayers[layerIndex],
        bounds = svgLayer.getBounds(),
        _map = smartland.mappi._map();
      _map.fitBounds(bounds);
      svgLayer.setStyle({
        weight: 5,
        fillOpacity: 1
      });
      setTimeout(function () {
        svgLayer.setStyle({
          weight: 2,
          fillOpacity: 0.5
        });
      }, 500);
    };

    function mapThirdPartyLink(link) {
      $timeout(function () {
        vm.mapThirdPartyLinksTitle = link.name;
        vm.mapThirdPartyLinks = [];
        vm.mapThirdPartyLinks.push(link);
      }, 0);
    }

    events.on('mapWmsLayerAdded', watchWms);
    //events.on('mapAddDataLayer', watchWms);

    events.on('mapThirdPartyLink', mapThirdPartyLink);
    events.on('updateInfobar', updateInfobar);
    events.on('mapLoadDataBeforSend', mapLoadDataBeforSend);
    events.emit('LoadMap', {});

  }

})();
