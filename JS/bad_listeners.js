// Though this could work...
// http://stackoverflow.com/questions/17673580/google-maps-drag-rectangle-to-select-markers
	this.mouseDownPos = 0
	this.gridBoundingBox = null,
	this.mouseIsDown = 0;
	this.bounds = null;

			mousemove: function(e){
				if(conptr.mouseIsDown && (conptr.clickState == 2 || conptr.gribBoundingBox != null)){
					if (conptr.gribBoundingBox !== null){
						var newbounds = new google.maps.LatLngBounds(conptr.mouseDownPos,null);
						newbounds.extend(e.latLng);    
						conptr.gribBoundingBox.setBounds(newbounds); // If this statement is enabled, I lose mouseUp events
					}
					else{
						console.log("first move");
						conptr.gribBoundingBox = new google.maps.Rectangle({
							map: conptr.Gmap,
							bounds: null,
							fillOpacity: 0.15,
							strokeWeight: 0.9,
							clickable: false
						});
					}
				}
			},
			
			drag: function (e) {
				if (conptr.clickState == 2 ) {
					conptr.mouseIsDown = 1;
            	conptr.mouseDownPos = e.latLng;
					conptr.Gmap.setOptions({
						draggable: false
					});
				}
			},
			
			dragend:function (e) {
				if (conptr.mouseIsDown && (conptr.selecting || conptr.gribBoundingBox != null)) {
					conptr.mouseIsDown = 0;
					if (conptr.gribBoundingBox !== null){
						var boundsSelectionArea = new google.maps.LatLngBounds(conptr.gribBoundingBox.getBounds().getSouthWest(), conptr.gribBoundingBox.getBounds().getNorthEast());
						conptr.gribBoundingBox.setMap(null); // remove the rectangle
					}
					conptr.gribBoundingBox = null;
				}
				
				conptr.Gmap.setOptions({
					draggable: true
				})
			}