/*global smartland, navigator, console, events*/

if (!smartland) {
  var smartland = {};
}

console.log(smartland);
smartland.getHTML5Location = (function () {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(getLocationSuccess);
  } else {
    console.log('Unable to get Location');
  }
  /**
   * Calls event for gettin the location
   * @param {object} position HTML5 loaction object https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation
   */
  function getLocationSuccess(position) {

    events.emit('mapSetMapCenter', [position.coords.latitude, position.coords.longitude]);
    events.emit('mapSetMapZoom', 14);
  }
})();;/*global L, smartland, console, events, document, navigator*/

if (!smartland) {
  var smartland = {};
}

smartland.map = (function () {
  var api = {},
    state = state || {
      mapOptions: {
        maxZoom: 15,
        minZoom: 5,
        zoomControl: false
      },
      mapCenter: [48.14455610362899, 17.114295959472656],
      mapZoom: 5
    },
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
        zIndex: 100
      })
      .addTo(_map);
  }

  events.on('LoadMap', render);

  events.on("mapSetMapCenter", setMapCenter);
  events.on("mapSetMapZoom", setMapZoom);

  api = {
    render: render
  };
  return api;
})();
