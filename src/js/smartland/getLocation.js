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
})();
