(function(document)
{
	window.maps = window.Maps || {};
	var map;

	maps.initialize = function(id, property, duration, timing)
	{
		var myOptions = {
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

		// Try HTML5 geolocation
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

				var infowindow = new google.maps.InfoWindow({
					map: map,
					position: pos,
					content: 'Você está aqui! ;)'
							+'<p>Latitude: '+position.coords.latitude
							+'<br>Longitude: '+position.coords.latitude+'</p>'
				});

				map.setCenter(pos);
			}, function() {
				handleNoGeolocation(true);
			});
		} else {
			// Browser doesn't support Geolocation
			handleNoGeolocation(false);
		}
	};
	
	maps.handleNoGeolocation = function(errorFlag)
	{
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		} else {
			var content = 'Error: Your browser doesn\'t support geolocation.';
		}

		var options = {
			map: map,
			position: new google.maps.LatLng(60, 105),
			content: content
		};

		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);
	};
	
})(document);