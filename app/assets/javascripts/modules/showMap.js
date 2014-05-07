var showMap = (function(){
  var _toggleMapView = function () {

      $.ajax({
      type: 'get',
      url: '/map',
      dataType: "text"
     }).done(function(data){
      console.log("hey the map!")

       $(".show_map").html(data);
       _renderGoogleMap();
     })

  }

  _renderGoogleMap = function(){
    var myLatlng = new google.maps.LatLng(37.78439893333333, -122.39711103333332);
    var mapOptions = {
    zoom: 4,
    center: myLatlng
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      title: 'Hello World!'
  })
  google.maps.event.trigger(map, "load")
  console.log("why map not work?")
  }

  return {
    toggleMapView: _toggleMapView,
    renderGoogleMap: _renderGoogleMap
  }
}())


