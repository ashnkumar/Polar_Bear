var showMap = (function(){
  var _loadMap = function () {

    console.log("we got into the module")

      $.ajax({
      type: 'get',
      url: '/map',
      dataType: "html"
     }).done(function(data){
      console.log("partial has come back")
      $('.show_map').html(data)
      var map = new google.maps.Map(document.getElementById("map-div"), {
        center: new google.maps.LatLng(33.810890, -117.918772),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });
     })

  }


  return {
    loadMap: _loadMap,
    // readyMap: _readyMap,
    // loadScript: _loadScript,
    // mapTry: _mapTry
    // renderGoogleMap: _renderGoogleMap
  }
}())
















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

//   _readyMap = function () {
//   var mapOptions = {
//     zoom: 8,
//     center: new google.maps.LatLng(-34.397, 150.644)
//   };

//   var map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);
// }

// _loadScript = function() {
//   var script = document.createElement('script');
//   script.type = 'text/javascript';
//   script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&' +
//       'callback=showMap.readyMap';
//   document.body.appendChild(script);

//   console.log("we've run loadscript")
//   _readyMap()

// }

// _mapTry = function() {
//   function initialize() {
//   var mapOptions = {
//     zoom: 5,
//     center: new google.maps.LatLng(24.886436490787712, -70.2685546875),
//     mapTypeId: google.maps.MapTypeId.TERRAIN
//   };

//   var bermudaTriangle;

//   var map = new google.maps.Map(document.getElementById('map-canvas'),
//       mapOptions);

//   // Define the LatLng coordinates for the polygon's path.
//   var triangleCoords = [
//     new google.maps.LatLng(25.774252, -80.190262),
//     new google.maps.LatLng(18.466465, -66.118292),
//     new google.maps.LatLng(32.321384, -64.75737),
//   ];

//   // Construct the polygon.
//   bermudaTriangle = new google.maps.Polygon({
//     paths: triangleCoords,
//     strokeColor: '#FF0000',
//     strokeOpacity: 0.8,
//     strokeWeight: 2,
//     fillColor: '#FF0000',
//     fillOpacity: 0.35
//   });

//   bermudaTriangle.setMap(map);
// }

//   google.maps.event.trigger('mapReady')
// }
