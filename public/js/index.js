$(function () {
  var $priceChart = $('#price');
  var priceChartCtx = $priceChart.get(0).getContext('2d');
  var $waitChart = $('#wait');
  var waitChartCtx = $waitChart.get(0).getContext('2d');

  priceChartCtx.canvas.width = $priceChart.width();
  waitChartCtx.canvas.width = $waitChart.width();
  priceChartCtx.canvas.height = $priceChart.height();
  waitChartCtx.canvas.height = $waitChart.height();
  var data = {
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
        fillColor: "rgba(151,187,205,0.2)",
        strokeColor: "rgba(151,187,205,1)",
        pointColor: "rgba(151,187,205,1)",
        pointStrokeColor: "#fff",
        pointHighlightFill: "#fff",
        pointHighlightStroke: "rgba(151,187,205,1)",
        data: [28, 48, 40, 19, 86, 27, 90]
      }
    ]
  };
  var priceChart = new Chart(priceChartCtx).Line(data);
  // var waitChart = new Chart(waitChartCtx);
});