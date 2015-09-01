function drawChart(item) {
  var barChartData = {
    labels : ['Pre-Patch', 'Post-Patch'],
    datasets : [
      {
        fillColor : "rgba(163,247,70,0.6)",
        strokeColor : "rgba(220,220,220,0.8)",
        highlightFill: "rgba(163,247,70,1)",
        highlightStroke: "rgba(220,220,220,1)",
        data : [item.percentUsedPre, item.percentUsedPost]
      }
    ],
  };

  var ctx = document.getElementById("item" + item.id).getContext("2d");

  window.myBarChart = new Chart(ctx).Bar(barChartData, {
    responsive: false,
    scaleGridLineColor: "rgba(100,100,100,.1)",
    scaleLineColor: "rgba(255,255,255,.3)",
    scaleLabel: "<%= value + ' %'%>",
    barShowStroke: false,
    scaleFontFamily: "Roboto Mono",
    scaleFontSize: 10,
    scaleFontColor: "#CCC",
  });
}
