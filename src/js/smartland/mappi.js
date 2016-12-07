/*global L, smartland, console, events, document, setTimeout, navigator, clearTimeout*/

smartland.dataLayers = {};
smartland.mappi = (function () {
  'use strict';
  var api = {},
    state = state || {
      mapOptions: {
        maxZoom: 15,
        minZoom: 5
      },
      mapCenter: [48.14455610362899, 17.114295959472656],
      mapZoom: 5
    },
    deteckDoubleClick = 0,
    _map;

  function setMapCenter(position) {
    console.log(position);
    _map.setView(position, getMapZoom());
    state.mapCenter = position;
  }

  function getMapCenter() {
    return state.mapCenter;
  }

  function setMapZoom(zoom) {
    _map.setView(getMapCenter(), zoom);
    state.mapZoom = zoom;
  }

  function getMapZoom() {
    return state.mapZoom;
  }


  function render() {
    console.log('smartland.map.render called');
    _map = L.map('map', state.mapOptions).setView(getMapCenter(), getMapZoom());
    L.control.scale({
      imperial: false
    }).addTo(_map);
    L.tileLayer("https://api.mapbox.com/styles/v1/oksid/ciqu276fx000rccmfkt2y7h68/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoib2tzaWQiLCJhIjoiY2lqYWtwN2s3MDAyeHZva3E0OWlsZTZwNyJ9.wMClMXnln0J9ePTZpRuHvQ", {
        zIndex: 1000
      })
      .addTo(_map);

    events.emit('mapLoaded', _map);

    _map.on('click', function (e) {
      ++deteckDoubleClick;
      events.emit('mapClicked', e);
      clearTimeout(state.clickTimepout);
      state.clickTimepout = setTimeout(function () {
        if (deteckDoubleClick === 1) {
          if (state.mapZoom > 10) {
            events.emit('mapLoadData', e);
          }
          deteckDoubleClick = 0;
        } else {
          deteckDoubleClick = 0;
        }
      }, 300);

    });
    _map.on('move', function (e) {
      events.emit('mapMoved', e);
      state.mapCenter = [_map.getCenter().lat, _map.getCenter().lng];
    });

    _map.on('zoomend', function (e) {
      state.mapZoom = _map.getZoom();
    });

    events.on('mapPanTo', function (latlng) {
      _map.panTo(latlng);
    });
  }

  function mapAddDataLayer(layer) {
    console.log('mapAddDataLayer called:', layer);
    if (layer.type.toLocaleLowerCase() === "wms") {
      smartland.dataLayers[layer.fullLayerName] = L.tileLayer.wms(layer.url, layer.options);
      _map.createPane(layer.shortName);
      _map.getPane(layer.shortName).style.zIndex = layer.zIndexSvg;
      //do not add already added layers
      var indexOfLayer = smartland.wms.map(function (wmsLayer) {
        return wmsLayer.fullLayerName;
      }).indexOf(layer.fullLayerName);
      if (indexOfLayer === -1) {
        smartland.wms.push(layer);
        events.emit('mapWmsLayerAdded', layer);
        smartland.dataLayers[layer.fullLayerName].addTo(_map);
      } else {
        if (smartland.wms[indexOfLayer].active) {
          smartland.dataLayers[layer.fullLayerName].addTo(_map);
        }
        if (smartland.wms[indexOfLayer].svgLayers.length > 0) {
          smartland.wms[indexOfLayer].svgLayers.forEach(function (item, index) {
            item.addTo(_map);
          });
        }
      }
    }
  }

  function mapDisplayLayer(layer) {
    _map.addLayer(smartland.dataLayers[layer.fullLayerName]);
  }

  function mapHideLayer(layer) {
    _map.removeLayer(smartland.dataLayers[layer.fullLayerName]);
  }

  function displayWmsData(layer) {

  }

  function renderWmsData(layer) {
    var layerIndex = smartland.wms.map(function (l) {
        return l.fullLayerName;
      }).indexOf(layer.fullLayerName),
      wmsLayerObj = smartland.wms[layerIndex],
      polygons = layer.data.features;
    console.log('polygons', polygons);
    polygons.forEach(function (featureData) {
      var featureDataId = featureData.properties.datauid,
        featureDataIds = wmsLayerObj.svgLayers.map(function (layer) {
          return layer.datauid;
        }),
        coordinates = _converCordinates(featureData.geometry.coordinates),
        featureDataIndex = featureDataIds.indexOf(featureDataId);


      if (featureData.geometry.type.toLocaleLowerCase() === 'multipolygon') {
        console.log('featureDataIds.indexOf(featureDataId)', featureDataIds.indexOf(featureDataId));
        if (featureDataIndex !== -1) {
          _map.removeLayer(wmsLayerObj.svgLayers[featureDataIndex]);
          wmsLayerObj.svgLayers.splice(featureDataIndex, 1);
          wmsLayerObj.featureData.splice(featureDataIndex, 1);
        }

        var options = wmsLayerObj.getSvgOptions(featureData),
          s;
        options.pane = layer.shortName;
        s = L.polygon(coordinates, options);
        wmsLayerObj.svgLayers.unshift(s);
        wmsLayerObj.featureData.unshift(featureData);
        s.addTo(_map);
        s.datauid = featureDataId;
        s._path.id = "_id-" + featureDataId;
      }
    });
    events.emit("updateInfobarHTML", layer);
  }

  function _converCordinates(latlngs) {
    var i = 0,
      coordinatesArray = [];
    if (typeof latlngs[0] === 'object') {
      for (i = 0; i < latlngs.length; i++) {
        coordinatesArray.push(_converCordinates(latlngs[i]));
      }
      return coordinatesArray;
    } else {
      var point = new L.Point(latlngs[0], latlngs[1]),
        latlng = L.Projection.SphericalMercator.unproject(point);
      return latlng;
    }
  }

  function returnMap() {
    return _map;
  }

  events.on('mapDisplayLayer', mapDisplayLayer);
  events.on('mapHideLayer', mapHideLayer);

  events.on('mapAddDataLayer', mapAddDataLayer);
  events.on('LoadMap', render);
  events.on("mapSetMapCenter", setMapCenter);
  events.on("mapSetMapZoom", setMapZoom);
  events.on('mapWmsDataLoaded', renderWmsData);

  api = {
    render: render,
    getZoom: getMapZoom,
    _map: returnMap,
    _mapp: _map
  };
  return api;
})();
