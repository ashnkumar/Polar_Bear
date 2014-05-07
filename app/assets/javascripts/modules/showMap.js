var showMap = (function(){
  var _loadMap = function () {

    console.log("we got into the module")

      $.ajax({
      type: 'get',
      url: '/test',
      dataType: "text"
     }).done(function(data){
      console.log("hey the map!")
      $('.show_map').html(data)
     })

  }

  // _renderGoogleMap = function(){
  //   var myLatlng = new google.maps.LatLng(37.78439893333333, -122.39711103333332);
  //   var mapOptions = {
  //   zoom: 4,
  //   center: myLatlng
  // }
  // var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

  // var marker = new google.maps.Marker({
  //     position: myLatlng,
  //     map: map,
  //     title: 'Hello World!'
  // })
  // google.maps.event.addDomListener(window, 'load', _toggleMapView);
  // console.log("why map not work?")
  // }

  return {
    loadMap: _loadMap
    // renderGoogleMap: _renderGoogleMap
  }
}())


