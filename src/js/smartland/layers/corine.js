/*global smartland, events, console, L, numeral,_FeaturInfoData,_converCordinates, $, _getPolygonOptions*/
if (!('dataLayers' in smartland)) {
  smartland.dataLayers = [];
} else {

}

function corine() {

  var dataLayers = [],
    dataCode = [{
        "title": "Continuous urban fabric",
        "code": 111,
        "color": "#e6004d"
      },
      {
        "title": "Discontinuous urban fabric",
        "code": 112,
        "color": "#ff0000"
      },
      {
        "title": "Industrial or commercial units",
        "code": 121,
        "color": "#cc4df2"
      },
      {
        "title": "Road and rail networks and associated land",
        "code": 122,
        "color": "#cc0000"
      },
      {
        "title": "Port areas",
        "code": 123,
        "color": "#e6cccc"
      },
      {
        "title": "Airports",
        "code": 124,
        "color": "#e6cce6"
      },
      {
        "title": "Mineral extraction sites",
        "code": 131,
        "color": "#a600cc"
      },
      {
        "title": "Dump sites",
        "code": 132,
        "color": "#a64d00"
      },
      {
        "title": "Construction sites",
        "code": 133,
        "color": "#ff4dff"
      },
      {
        "title": "Green urban areas",
        "code": 141,
        "color": "#ffa6ff"
      },
      {
        "title": "Sport and leisure facilities",
        "code": 142,
        "color": "#ffe6ff"
      },
      {
        "title": "Non-irrigated arable land",
        "code": 211,
        "color": "#ffffa8"
      },
      {
        "title": "Permanently irrigated land",
        "code": 212,
        "color": "#ffff00"
      },
      {
        "title": "Rice fields",
        "code": 213,
        "color": "#e6e600"
      },
      {
        "title": "Vineyards",
        "code": 221,
        "color": "#e68000"
      },
      {
        "title": "Fruit trees and berry plantations",
        "code": 222,
        "color": "#f2a64d"
      },
      {
        "title": "Olive groves",
        "code": 223,
        "color": "#e6a600"
      },
      {
        "title": "Pastures",
        "code": 231,
        "color": "#e6e64d"
      },
      {
        "title": "Annual crops associated with permanent crops",
        "code": 241,
        "color": "#ffe6a6"
      },
      {
        "title": "Complex cultivation patterns",
        "code": 242,
        "color": "#ffe64d"
      },
      {
        "title": "Land principally occupied by agriculture with significant areas of natural vegetation",
        "code": 243,
        "color": "#e6cc4d"
      },
      {
        "title": "Agro-forestry areas",
        "code": 244,
        "color": "#f2cca6"
      },
      {
        "title": "Broad-leaved forest",
        "code": 311,
        "color": "#80ff00"
      },
      {
        "title": "Coniferous forest",
        "code": 312,
        "color": "#00a600"
      },
      {
        "title": "Mixed forest",
        "code": 313,
        "color": "#4dff00"
      },
      {
        "title": "Natural grasslands",
        "code": 321,
        "color": "#ccf24d"
      },
      {
        "title": "Moors and heathland",
        "code": 322,
        "color": "#a6ff80"
      },
      {
        "title": "Sclerophyllous vegetation",
        "code": 323,
        "color": "#a6e64d"
      },
      {
        "title": "Transitional woodland-shrub",
        "code": 324,
        "color": "#a6f200"
      },
      {
        "title": "Beaches - dunes - sands",
        "code": 331,
        "color": "#e6e6e6"
      },
      {
        "title": "Bare rocks",
        "code": 332,
        "color": "#cccccc"
      },
      {
        "title": "Sparsely vegetated areas",
        "code": 333,
        "color": "#ccffcc"
      },
      {
        "title": "Burnt areas",
        "code": 334,
        "color": "#000000"
      },
      {
        "title": "Glaciers and perpetual snow",
        "code": 335,
        "color": "#a6e6cc"
      },
      {
        "title": "Inland marshes",
        "code": 411,
        "color": "#a6a6ff"
      },
      {
        "title": "Peat bogs",
        "code": 412,
        "color": "#4d4dff"
      },
      {
        "title": "Salt marshes",
        "code": 421,
        "color": "#ccccff"
      },
      {
        "title": "Salines",
        "code": 422,
        "color": "#e6e6ff"
      },
      {
        "title": "Intertidal flats",
        "code": 423,
        "color": "#a6a6e6"
      },
      {
        "title": "Water courses",
        "code": 511,
        "color": "#00ccf2"
      },
      {
        "title": "Water bodies",
        "code": 512,
        "color": "#80f2e6"
      },
      {
        "title": "Coastal lagoons",
        "code": 521,
        "color": "#00ffa6"
      },
      {
        "title": "Estuaries",
        "code": 522,
        "color": "#a6ffe6"
      },
      {
        "title": "Sea and ocean",
        "code": 523,
        "color": "#e6f2ff"
      }],
    fullLayerName = "smartland:corine4",
    layer = {
      "fullLayerName": fullLayerName,
      active: true,
      type: "wms",
      "shortName": "corine4",
      "workspace": "smartland",
      "displayName": "Corine",
      infobar: {
        title: "Corine",
        activeTab: 0,
        tabs: [
          {
            name: 'Description',
            text: '<strong>CORINE (Coordination of Information on the Environment)</strong> is a European programme initiated in 1985 by the European Commission, aimed at gathering information relating to the environment on certain priority topics for the European Union (air, water, soil, land cover, coastal erosion, biotopes, etc.). From CORINE we use in our application data about land cover.',
        },
          {
            name: 'View loaded data',
            text: '',
            data: true
        },
          {
            name: "Legend",
            text: '<strong>Color codes:</strong>',
            legend: dataCode,

        }
      ]
      },
      "options": {
        "format": "image/png8",
        "version": "1.1.1",
        "layers": fullLayerName,
        "transparent": true,
        "zIndex": 10,
        opacity: 0.5
      },
      "url": "http://smartland.vps.websupport.sk/geoserver/gwc/service/wms?",
      loading: false,
      "dataCode": dataCode,
      svgLayers: [],
      featureData: []
    };

  function updateInfobarHTML(updateLayer) {
    console.log(updateLayer);
    console.log("layer.featureData", layer.featureData);

    updateLayer.infobar.activeTab = 1;
    layer.featureData.forEach(function (thisData, index) {
      dataCode.filter(function (dcode) {
        if (dcode.code.toString() === thisData.properties.code_12) {
          thisData.properties.color = dcode.color;
          thisData.properties.title = dcode.title;
          thisData.properties.area = numeral(thisData.properties.plocha).format("0.0[00]");

        }
      });
      console.log(thisData);
    });
  }

  function loadData(e) {
    if (layer.active) {
      var dLayer = smartland.dataLayers[layer.fullLayerName],
        wmsLayerIndex = smartland.wms.map(function (wmsLayer) {
          return wmsLayer.fullLayerName;
        }).indexOf(layer.fullLayerName);

      var point = dLayer._map.latLngToContainerPoint(e.latlng, dLayer._map.getZoom()),
        size = dLayer._map.getSize(),
        url = '',
        params = {
          request: 'GetFeatureInfo',
          service: 'WMS',
          srs: 'EPSG:4326',
          version: dLayer.wmsParams.version,
          bbox: dLayer._map.getBounds().toBBoxString(),
          height: size.y,
          width: size.x,
          layers: dLayer.wmsParams.layers,
          query_layers: dLayer.wmsParams.layers,
          info_format: 'application/json'
        };

      params[params.version === '1.3.0' ? 'i' : 'x'] = point.x;
      params[params.version === '1.3.0' ? 'j' : 'y'] = point.y;

      url = dLayer._url + L.Util.getParamString(params, dLayer._url, true);

      $.ajax({
          url: url,
          context: {
            'layerID': layer.fullLayerName
          },
          beforeSend: function () {
            console.log('smartland.wms[wmsLayerIndex]:', smartland.wms[wmsLayerIndex]);
            events.emit('mapLoadDataBeforSend', smartland.wms[wmsLayerIndex]);
          }
        })
        .success(function (data) {
          if (data.features.length > 0) {
            smartland.wms[wmsLayerIndex].data = data;
            events.emit('mapWmsDataLoaded', smartland.wms[wmsLayerIndex]);
            // _FeaturInfoData[context] = data;
          }
        })
        .fail(function (data) {
          /**TODO handle fail*/
          events.emit('mapWmsDataLoadeFail', smartland.wms[wmsLayerIndex]);
        })
        .complete(function (data) {
          events.emit('mapWmsDataLoadeComplete', smartland.wms[wmsLayerIndex]);
        });
    }

  }

  function getSvgOptions(code) {
    var dCode = '',
      options = {};
    if (typeof code === 'object') {
      dCode = code.properties.code_12;
    } else if (typeof code === 'string') {
      dCode = code;
    }
    console.log(typeof dataCode);

    options = dataCode.filter(function (item) {
      if (item.code == dCode) {
        return true;
      }
    })[0];

    return {
      weight: 2,
      color: '#FFF',
      stroke: true,
      fill: true,
      fillColor: options.color,
      fillOpacity: 0.5,
      zIndex: layer.options.zIndex * 10
    };
  }

  function _renderPolygons() {
    var layerIDs = dataLayers.map(function (item) {
        return item.shortName;
      }),
      data, options, coordinates;

    layerIDs.forEach(function (item) {
      data = _FeaturInfoData[item];
      if (data) {
        var coordinates = _converCordinates(data.features[0].geometry.coordinates[0]),
          options = _getPolygonOptions[item](data);
        console('_getPolygonOptions[item](data)', options);
        //_polygons[item] = L.polygon(coordinates, options).addTo(_map);
      }
    });
  }


  layer.loadData = loadData;
  layer.getSvgOptions = getSvgOptions;

  events.on('mapLoadData', loadData);
  events.on('updateInfobarHTML', updateInfobarHTML);
  events.emit('mapAddDataLayer', layer);

  return layer;
}

//events.emit('mapAddDataLayer', corine());
events.on('mapLoaded', corine);
