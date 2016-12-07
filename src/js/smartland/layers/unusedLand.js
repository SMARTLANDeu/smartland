/*global smartland, events, console, L, $, numeral */
if (!('dataLayers' in smartland)) {
  smartland.dataLayers = [];
} else {

}

function smartlandland() {

  var dataLayers = [],
    dataCode = [{
        title: "Continuous Urban Fabric (S.L. > 80%)",
        code: 11100,
        color: "#a03037"
  },
      {
        title: "Discontinuous Dense Urban Fabric (S.L. : 50% -  80%)",
        code: 11210,
        color: "#ce2430"
  },
      {
        title: "Discontinuous Medium Density Urban Fabric (S.L. : 30% - 50%)",
        code: 11220,
        color: "#ee2427"
  },
      {
        title: "Discontinuous Low Density Urban Fabric (S.L. : 10% - 30%)",
        code: 11230,
        color: "#f6997c"
  },
      {
        title: "Discontinuous Very Low Density Urban Fabric (S.L. less 10%)",
        code: 11240,
        color: "#fcc9b5"
  },
      {
        title: "Isolated Structures ",
        code: 11300,
        color: "#cb7e69"
  },
      {
        title: "Industrial, commercial, public, military and private units",
        code: 12100,
        color: "#c66ca5"
  },
      {
        title: "Fast transit roads and associated land",
        code: 12210,
        color: "#f37924"
  },
      {
        title: "Other roads and associated land",
        code: 12220,
        color: "#fab586"
  },
      {
        title: "Railways and associated land",
        code: 12230,
        color: "#828587"
  },
      {
        title: "Port areas",
        code: 12300,
        color: "#e0c1dd"
  },
      {
        title: "Airports",
        code: 12400,
        color: "#e1cbd1"
  },
      {
        title: "Mineral extraction and dump sites",
        code: 13100,
        color: "#9a6c5b"
  },
      {
        title: "Construction sites",
        code: 13300,
        color: "#cea879"
  },
      {
        title: "Land without current use",
        code: 13400,
        color: "#ffff00"
  },
      {
        title: "Green urban areas",
        code: 14100,
        color: "#a8bd3d"
  },
      {
        title: "Sports and leisure facilities",
        code: 14200,
        color: "#d9e591"
  },
      {
        title: "Agricultural + Semi-natural areas + Wetlands",
        code: 20000,
        color: "#fff8ba"
  },
      {
        title: "Forests",
        code: 30000,
        color: "#007149"
  },
      {
        title: "Water bodies",
        code: 50000,
        color: "#0095cf"
  }],
    fullLayerName = "smartland:land",
    layer = {
      "fullLayerName": fullLayerName,
      active: true,
      type: "wms",
      shortName: "unusedLand",
      "workspace": "smartland",
      "displayName": "Unused Land",
      infobar: {
        activeTab: 0,
        tabs: [
          {
            name: 'Description',
            text: '<strong>Unused land</strong> represents subset of data taken from the Urban Atlas Dataset limited to areas marked&nbsp;as&nbsp;<em>Land without current use<em>',
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
        "zIndex": 11,
        opacity: 1
      },
      "url": "http://smartland.vps.websupport.sk/geoserver/gwc/service/wms?",
      loading: false,
      "dataCode": dataCode,
      zIndexSvg: 230,
      svgLayers: [],
      featureData: []
    };

  function updateInfobarHTML(updateLayer) {
    console.log(updateLayer);
    console.log("layer.featureData", layer.featureData);
    updateLayer.infobar.activeTab = 1;
    layer.featureData.forEach(function (thisData, index) {
      console.log('thisData', thisData);
      console.log('dataCode', dataCode);
      dataCode.filter(function (dcode) {
        if (dcode.code.toString() === thisData.properties.code) {
          thisData.properties.color = dcode.color;
          thisData.properties.title = dcode.title;
          thisData.properties.area = numeral(thisData.properties.plocha).format("0.0[00]");

        }
      });
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
      dCode = code.properties.code;
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
      zIndex: 100
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
events.on('mapLoaded', smartlandland);
