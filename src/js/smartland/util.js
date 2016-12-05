smartland.utils = (function () {



  function generatePolygon(fullLayerName) {

  }

  function displayPolygon(layer) {

  }

  function hidePolygon() {

  }

  events.on('mapWmsDataLoaded',displayPolygon)

  return {
    generatePolygon: generatePolygon,
    displayPolygon: displayPolygon,
    hidePolygon: hidePolygon,
  }
})();
