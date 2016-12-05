/*global events, console, L, alert, window, Slovakia*/

if (!smartland) {
  var smartland = {};
}

function GeoJSONLayer(options, _map) {

  var layer = L.geoJSON(options.data, {
      style: options.style
    }),
    url = '',
    getUrl = function (e) {
      url = 'http://mapka.gku.sk/mapovyportal/?basemap=podklad&zoom=' + 12 + '&lng=' + e.latlng.lng + '&lat=' + e.latlng.lat + '#';
      events.emit('mapThirdPartyLink', {
        title: options.name,
        url: url
      });
      clearAllThirdPartyLinks();
      smartland.thirdPartyLinks.push({
        title: options.name,
        url: url
      });
    },
    externalLink = '',
    clearAllThirdPartyLinks = function () {
      smartland.thirdPartyLinks = [];
    };

  layer.addTo(_map);
  layer.on('click', getUrl);

  events.on('mapLoadData', clearAllThirdPartyLinks);

  return {
    layer: layer,
    getUtlFromClickEvent: getUrl,
    geoJSON: options.data,
    url: url

  };

}

smartland.thirdParty = [];
smartland.thirdPartyLinks = [];

events.on('mapLoaded', function () {
  smartland.thirdParty.push(GeoJSONLayer({
    name: "Slovak Catastral portal",
    data: Slovakia,
    style: {
      opacity: 0,
      fillOpacity: 0
    }
  }, smartland.mappi._map()));

  events.on("mapWmsDataLoadeComplete", function () {
    smartland.thirdParty.forEach(function (layer) {
      layer.layer.bringToFront();
    });
  });
});
