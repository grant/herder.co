$(function () {

  var $priceChart = $('#price');
  var priceChartCtx = $priceChart.get(0).getContext('2d');

  priceChartCtx.canvas.width = $('.graphArea').width();
  // priceChartCtx.canvas.height = $('.graphArea').height();

  // map center
  var myLatlng = new google.maps.LatLng(37.332017799999996, -121.8899544);
  // map options,
  var myOptions = {
    zoom: 9,
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

  var priceChart;
  function updateData (lat, lng) {
    $('canvas.canvas').fadeOut();
    priceChartCtx.canvas.width = $('.graphArea').width();
    priceChartCtx.canvas.height = 180;
    $.get('/api/' + lat + '/' + lng, function (data) {
      $('canvas.canvas').html('');
      $('canvas.canvas').fadeIn();
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
      var hours = data.hour;
      var demoDataPrice = [];
      var demoDataWait = [];
      for (var time in hours) {
        var date = new Date(time);
        var price = hours[time][0];
        demoDataPrice.push({
          time: time,
          surge: price[0].surge_multiplier
        });
        var wait = hours[time][1];
        demoDataWait.push({
          time: time,
          wait: wait[0].estimate
        });
      }

      var demoDataWeightLabels = [];
      var demoDataWeightValues = [];
      for (var i in demoDataWait) {
        var date = new Date(demoDataWait[i].time);
        var min = date.getMinutes();
        if (min < 10) {
          min = '0' + min;
        }
        if (i % 3 == 0) {
          demoDataWeightLabels.push(date.getHours() + ':' + min);
        } else {
          demoDataWeightLabels.push('');
        }
        demoDataWeightValues.push(demoDataWait[i].wait);
      }
      demoDataWeightLabels = demoDataWeightLabels.reverse();
      demoDataWeightValues = demoDataWeightValues.reverse();

      var demoDataPriceValues = [];
      for (var i in demoDataPrice) {
        demoDataPriceValues.push(demoDataPrice[i].surge * 500);
      }

      var chartData = {
        labels: demoDataWeightLabels,
        datasets: [{
          label: "My first dataset",
          fillColor: "rgba(222, 23, 25, 0.2)",
          strokeColor: "rgba(222, 23, 25, 1)",
          pointColor: "rgba(222, 23, 25, 1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: demoDataPriceValues
        }, {
          label: "My Second dataset",
          fillColor: "rgba(222, 234, 255, 0.2)",
          strokeColor: "rgba(222, 234, 255, 1)",
          pointColor: "rgba(222, 234, 255, 1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: demoDataWeightValues
        }]
      };
      priceChart = new Chart(priceChartCtx).Line(chartData, {
        scaleGridLineColor : "rgba(255, 255, 255,.07)",
        scaleLineColor: "rgba(255, 255, 255, .1)",
        scaleFontColor: "rgba(255, 255, 255, 0.6",
      });
      // var waitChart = new Chart(waitChartCtx);
    });
  }

  setInterval(function () {
    var center = map.getCenter();
    var lat = center.lat();
    var lng = center.lng();
    updateData(lat, lng);
  }, 10000);

  function getZip (lat, lng, cb) {
    var point = new google.maps.LatLng(lat, lng);
    new google.maps.Geocoder().geocode({'latLng': point}, function (res, status) {
      if(status == google.maps.GeocoderStatus.OK && typeof res[0] !== 'undefined') {
        var zip = res[0].formatted_address.match(/,\s\w{2}\s(\d{5})/);
        if (zip) {
          cb(zip[1]);
        } else {
          cb();
        }
      }
    });
  }

  setInterval(function () {
    var center = map.getCenter();
    var lat = center.lat();
    var lng = center.lng();
    getZip(lat, lng, function (zip) {
      if (zip) {
        $.get('/api/gas/'+zip, function (data) {
          $('.gasArea').show();
          var stations = data.stations;
          var bestStation = stations.reduce(function (lastStation, nextStation) {
            if (lastStation.RegPrice < nextStation.RegPrice) {
              return lastStation;
            } else {
              return nextStation;
            }
          });

          $('.gasArea .price').html('$' + bestStation.RegPrice);
          $('.gasArea .name').html(bestStation.StationName);
          $('.gasArea .address').html(bestStation.Address);
        });
      } else {
        $('.gasArea').hide();
      }
    });
  }, 3300);

  // Try HTML5 geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      
      map.setCenter(pos);

      updateData(position.coords.latitude, position.coords.longitude);
    }, function() {
    });
  } else {
    // Browser doesn't support Geolocation
  }
});