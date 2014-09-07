$(function () {

  var $priceChart = $('#price');
  var priceChartCtx = $priceChart.get(0).getContext('2d');
  var $waitChart = $('#wait');
  var waitChartCtx = $waitChart.get(0).getContext('2d');

  priceChartCtx.canvas.width = $priceChart.width();
  waitChartCtx.canvas.width = $waitChart.width();
  priceChartCtx.canvas.height = $priceChart.height();
  waitChartCtx.canvas.height = $waitChart.height();

  // map center
  var myLatlng = new google.maps.LatLng(37.332017799999996, -121.8899544);
  // map options,
  var myOptions = {
    zoom: 6,
    center: myLatlng,
    disableDefaultUI: true
  };
  // standard map
  map = new google.maps.Map(document.getElementById("map"), myOptions);
  // heatmap layer
  heatmap = new HeatmapOverlay(map, {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    "radius": 0.01,
    "maxOpacity": 0.6,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries 
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": false,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
  });

  // Try HTML5 geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      map.setCenter(pos);

      $.get('/api/' + position.coords.latitude + '/' + position.coords.longitude, function (data) {
        var map = data.map;
        var heatmapData = [];
        for (var i in map) {
          var pt = map[i];
          var lat = pt.lat;
          var lng = pt.lng;
          var surge = pt.price[0].surge_multiplier;
          heatmapData.push({
            lat: +lat,
            lng: +lng,
            count: surge
          });
        }
        heatmap.setData({
          min: 0,
          max: 3,
          data: heatmapData
        });

        // charts
        var hour = data.hour;
        
        var chartData = {
          labels: ["January", "February", "March", "April", "May", "June", "July"],
          datasets: [
            {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 80, 81, 56, 55, 40]
            },
            {
              label: "My Second dataset",
              fillColor: "rgba(222, 234, 255, 0.2)",
              strokeColor: "rgba(222, 234, 255, 1)",
              pointColor: "rgba(222, 234, 255, 1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 86, 27, 90]
            }
          ]
        };
        var priceChart = new Chart(priceChartCtx).Line(chartData, {
          scaleGridLineColor : "rgba(255, 255, 255,.07)",
          scaleLineColor: "rgba(255, 255, 255, .1)",
          scaleFontColor: "rgba(255, 255, 255, 0.6",
        });
        // var waitChart = new Chart(waitChartCtx);
      });
    }, function() {
    });
  } else {
    // Browser doesn't support Geolocation
  }
});