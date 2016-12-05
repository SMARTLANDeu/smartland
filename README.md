# SMARTLAND

**Smartland** is an application for people, who are looking for the unused land for a purpose of establishing of urban gardens. That means is mostly dedicated to urban gardeners, gardeners a and communities with the urban gardening background.    

We are hosting data(Urban Atlas - Land use, Corine - Land cover) for whole Danube Region. The strategy of serving the geospatial data is built on the top of the geoserver, which is hosting it in tile cached format. 

Smartland is meant to be the open-source application, what means everybody can take it's core and build the application on the top of it or develop extensions.    

However the developers of Smartland does not know the local data of all the countries, it brings opportunity for local developers to add some new dataset or functionality, which would bring the added value to local urban gardeners.    

##Technology used:

### Server side:
For the server part we used:
* *nginx* (https://nginx.org/) used as reversed proxy to be able to serve the user with static files from Apache web server and the GeoServer under one domain and default port.
* *Apache* (https://www.apache.org/) serving static files of the application (Html, css, javascripts , images)
* *GeoServer* (http://geoserver.org/) used to publish the Urban Atlas and Corine data using openLayer’s tiled layer.    


### Client side:
For the client side we used various commonly used open source libraries:
* *Bootstrap* (http://getbootstrap.com/) HTML, CSS, and JS framework
* *Angular* (http://angularjs.org) for the single page application, and provide space for future functionality
* *jQuery* (https://jquery.com/)  dependency for Bootstrap
* *leafletjs* (http://leafletjs.com/) enables us to display the GeoServer and interact with the GeoServer to get the information about the area of intetrest.