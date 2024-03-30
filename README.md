# ENGO551-Lab6

This is an interactive map application with leaflet and leaflet draw. Users are allowed to draw polylines on the map and to simplify them.

On the page is the base map of Calgary. On the left hand side is the tool bar from leaflet draw. Only polyline is enabled. On the right upper corner is the refresh button. Users can clear all the polylines when click on it.

To draw polylines, user need to click on the polyline button on the tool bar. The polyline is set to be deep orange so that it can be outstanding from the base map. Once the drawing is finished, the simplify button will show up on the right hand side of the end of the line. This is enabled by addeventlistener on mouse click and setattribute on z-index of the simplify button. Simplification is using the turf simplify function. The simplified line is dark red.

Users can draw multiple polylines on the map and simplified each of them. Once they click the refresh button, all the lines will be removed.